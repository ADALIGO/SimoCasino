from __future__ import annotations
import argparse
import math
import os
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageFilter


def split_image_2x2(image: Image.Image) -> list[Image.Image]:
    width, height = image.size
    half_width = width // 2
    half_height = height // 2
    boxes = [
        (0, 0, half_width, half_height),
        (half_width, 0, width, half_height),
        (0, half_height, half_width, height),
        (half_width, half_height, width, height),
    ]
    return [image.crop(box) for box in boxes]


def make_moving_background(source: Image.Image, frame_size: tuple[int, int], offset_x: int, offset_y: int) -> Image.Image:
    # Build a blurred larger version of the source image, then crop a moving window.
    src = source.convert("RGBA")
    large_width = frame_size[0] * 3
    large_height = frame_size[1] * 3
    blurred = src.resize((large_width, large_height), Image.LANCZOS).filter(ImageFilter.GaussianBlur(radius=22))
    crop_x = (large_width - frame_size[0]) // 2 + offset_x
    crop_y = (large_height - frame_size[1]) // 2 + offset_y
    crop_x = max(0, min(crop_x, large_width - frame_size[0]))
    crop_y = max(0, min(crop_y, large_height - frame_size[1]))
    background = blurred.crop((crop_x, crop_y, crop_x + frame_size[0], crop_y + frame_size[1]))
    return background


def create_animation(piece: Image.Image, output_path: Path, frames: int = 24, amplitude: int = 12) -> None:
    frame_size = piece.size
    frames_list: list[Image.Image] = []
    for frame_index in range(frames):
        t = frame_index / frames
        move_x = int(amplitude * math.sin(2 * math.pi * t))
        move_y = int(amplitude * math.cos(2 * math.pi * t * 1.2))
        bg = make_moving_background(piece, frame_size, move_x, move_y)
        frame = Image.new("RGBA", frame_size)
        frame.paste(bg, (0, 0))
        piece_x = int(amplitude * 0.5 * math.sin(2 * math.pi * t * 1.3))
        piece_y = int(amplitude * 0.5 * math.cos(2 * math.pi * t * 1.1))
        frame.paste(piece, (piece_x, piece_y), piece)
        frames_list.append(frame)

    frames_list[0].save(
        output_path,
        save_all=True,
        append_images=frames_list[1:],
        duration=60,
        loop=0,
        disposal=2,
        optimize=True,
    )


def process_image_file(image_path: Path, output_root: Path) -> None:
    image = Image.open(image_path).convert("RGBA")
    base_name = image_path.stem
    target_folder = output_root / base_name
    target_folder.mkdir(parents=True, exist_ok=True)

    pieces = split_image_2x2(image)
    for index, piece in enumerate(pieces, start=1):
        png_path = target_folder / f"split{index}.png"
        print(f"Writing {png_path}")
        piece.save(png_path)

        gif_path = target_folder / f"split{index}_anim.gif"
        print(f"Creating animated GIF {gif_path}")
        create_animation(piece, gif_path)

    print(f"Processed {image_path.name} -> {target_folder}")


def gather_png_files(folder: Path) -> Iterable[Path]:
    for path in sorted(folder.iterdir()):
        if path.is_file() and path.suffix.lower() == ".png":
            yield path


def main() -> None:
    parser = argparse.ArgumentParser(description="Split 2x2 PNG images and create animated outputs.")
    parser.add_argument("--input", type=Path, default=Path("SIMOCASINOphoto"), help="Input folder containing PNG files.")
    parser.add_argument("--output", type=Path, default=Path("SIMOCASINOphoto/splits"), help="Output root folder.")
    parser.add_argument("--file", type=Path, help="Optional single image file to process.")
    args = parser.parse_args()

    if args.file:
        if not args.file.exists():
            raise FileNotFoundError(f"Input file not found: {args.file}")
        process_image_file(args.file, args.output)
        return

    input_folder = args.input
    if not input_folder.exists() or not input_folder.is_dir():
        raise FileNotFoundError(f"Input folder not found: {input_folder}")

    args.output.mkdir(parents=True, exist_ok=True)
    png_files = list(gather_png_files(input_folder))
    if not png_files:
        raise SystemExit(f"No PNG files found in {input_folder}")

    for png_path in png_files:
        process_image_file(png_path, args.output)


if __name__ == "__main__":
    main()
