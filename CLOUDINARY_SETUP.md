# Cloudinary Image Upload Setup

## Prerequisites

1. **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com) if you don't have an account
2. **API Credentials**: Get your Cloud Name, API Key, and API Secret from your Cloudinary dashboard

## Environment Variables

Update your `.env.local` file with your Cloudinary credentials:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLOUDINARY_UPLOAD_PRESET=simocasino
```

## Features

The profile page now supports:

- **Avatar Upload**: 150x150px profile picture
- **Banner Image**: 1200x300px banner image
- **Image Gallery**: Up to 10 images (800x600px each)

## API Endpoints

- `POST /api/upload` - Upload images to Cloudinary
- `DELETE /api/upload` - Delete images from Cloudinary

## Usage

1. Navigate to `http://localhost:3000/en/user/profile`
2. Upload images using the drag-and-drop interface
3. Save your profile to persist changes

## Image Types Supported

- PNG, JPG, JPEG, GIF, WebP
- Maximum file size: 5MB per image

## Security

- Images are automatically optimized and transformed by Cloudinary
- File type validation on the client and server
- Secure URLs are used for all uploaded images