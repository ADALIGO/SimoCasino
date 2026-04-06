'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

interface UploadWidgetConfig {
  cloudName: string;
  uploadPreset: string;
  multiple?: boolean;
  maxFileSize?: number;
  folder?: string;
  buttonLabel?: string;
  resourceType?: 'image' | 'video' | 'auto';
  clientAllowedFormats?: string[];
  tags?: string[];
}

interface CloudinaryUploadWidgetProps {
  uwConfig: UploadWidgetConfig;
  setState: (url: string) => void; // eslint-disable-line no-unused-vars
  onUploadSuccess?: (result: any) => void; // eslint-disable-line no-unused-vars
  className?: string | undefined;
  buttonStyle?: CSSProperties | undefined;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    cloudinary?: any;
  }
}

export default function CloudinaryUploadWidget({ uwConfig, setState, onUploadSuccess, className, buttonStyle }: CloudinaryUploadWidgetProps) {
  const [widgetReady, setWidgetReady] = useState(false);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).cloudinary) {
      setWidgetReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      setWidgetReady(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const openWidget = useCallback(() => {
    if (!widgetReady || typeof window === 'undefined' || !window.cloudinary) return;

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: uwConfig.cloudName,
          uploadPreset: uwConfig.uploadPreset,
          multiple: uwConfig.multiple ?? false,
          maxFileSize: uwConfig.maxFileSize,
          folder: uwConfig.folder,
          resourceType: uwConfig.resourceType ?? 'auto',
          clientAllowedFormats:
            uwConfig.clientAllowedFormats ??
            (uwConfig.resourceType === 'video'
              ? ['mp4', 'mov', 'webm', 'mkv', 'avi']
              : ['png', 'jpg', 'jpeg', 'gif', 'webp']),
          sources: ['local', 'url', 'camera'],
          maxFiles: uwConfig.multiple ? 5 : 1,
          tags: uwConfig.tags,
        },
        (error: any, result: any) => {
          if (!error && result?.event === 'success') {
            setState(result.info.secure_url);
            onUploadSuccess?.(result.info);
          }
        }
      );
    }

    widgetRef.current.open();
  }, [widgetReady, uwConfig, setState, onUploadSuccess]);

  return (
    <button
      type="button"
      className={className}
      style={{
        padding: '12px 22px',
        border: 'none',
        borderRadius: '8px',
        background: '#2563eb',
        color: '#ffffff',
        fontWeight: 700,
        cursor: widgetReady ? 'pointer' : 'not-allowed',
        minWidth: '170px',
        opacity: widgetReady ? 1 : 0.65,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...(buttonStyle ?? {}),
      }}
      onClick={openWidget}
      disabled={!widgetReady}
    >
      {uwConfig.buttonLabel ?? 'Upload'}
    </button>
  );
}
