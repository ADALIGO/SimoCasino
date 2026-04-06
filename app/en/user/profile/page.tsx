'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RootState, setUser } from '@/store/store';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Camera, Upload, X } from 'lucide-react';
import CloudinaryUploadWidget from '@/components/CloudinaryUploadWidget';
import styles from './profile.module.scss';

interface ImageUploadProps {
  type: 'avatar' | 'profile' | 'banner' | 'gallery';
  currentImage?: string;
  // eslint-disable-next-line no-unused-vars
  onImageChange: (url: string, publicId?: string) => void;
  onImageRemove?: () => void;
  label: string;
  dimensions: string;
  className?: string | undefined;
  uploadFolder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  type,
  currentImage,
  onImageChange,
  onImageRemove,
  label,
  dimensions,
  className = '',
  uploadFolder,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageChange(result.url, result.public_id);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onImageChange, type]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, []);

  const handleRemove = useCallback(() => {
    if (onImageRemove) {
      onImageRemove();
    }
  }, [onImageRemove]);

  const handleChangeBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleClick();
    },
    [handleClick]
  );

  const handleRemoveBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleRemove();
    },
    [handleRemove]
  );

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  return (
    <div className={`${styles.imageUpload} ${className}`}>
      <label className={styles.uploadLabel}>
        {label} <span className={styles.dimensions}>({dimensions})</span>
      </label>

      <div
        className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ''} ${currentImage ? styles.hasImage : ''}`}
        role="button"
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {currentImage ? (
          <div className={styles.imagePreview}>
            <Image
              src={currentImage}
              alt={label}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.imageActions}>
              <button
                type="button"
                className={styles.changeBtn}
                onClick={handleChangeBtnClick}
              >
                <Camera size={16} />
              </button>
              {onImageRemove && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={handleRemoveBtnClick}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.uploadPlaceholder}>
            {uploading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Upload size={24} />
                <p>Click to upload or drag and drop</p>
                <div className={styles.uploadActions}>
                  <CloudinaryUploadWidget
                    uwConfig={{
                      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
                      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
                      multiple: false,
                      maxFileSize: 5 * 1024 * 1024,
                      folder: uploadFolder ?? `users/${type}`,
                      buttonLabel: 'Upload from Cloudinary',
                      resourceType: 'image',
                      clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
                    }}
                    setState={onImageChange}
                    className={styles.cloudinaryWidgetButton ?? ''}
                  />
                  <button type="button" className={styles.uploadButton} onClick={handleClick}>Upload image</button>
                </div>
                <p className={styles.uploadHint}>PNG, JPG up to 5MB</p>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

const getAuthUserId = (user: any) => user?.id || user?._id || user?.userId || '';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  // Demo mode: Check URL params for testing
  const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');

  console.log('🔍 ProfilePage render:', {
    isAuthenticated: auth.isAuthenticated,
    userId: auth.user?.id,
    userName: auth.user?.name || auth.user?.email,
    demoMode: isDemo,
  });

  const [userData, setUserData] = useState({
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    bannerImage: '',
    profileVideo: '',
    imageGallery: [] as string[],
    bio: '',
    personalQuote: '',
    signature: '',
    location: '',
    gender: '',
    dateOfBirth: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadUserProfile = useCallback(async () => {
    const userId = getAuthUserId(auth.user);
    if (!userId) return;

    try {
      const response = await fetch(`/api/user/profile?userId=${encodeURIComponent(userId)}`);
      if (!response.ok) {
        const body = await response.text();
        console.error('Profile load failed', response.status, body);
        setMessage(`Unable to load profile data (${response.status})`);
        return;
      }
      const { user } = await response.json();
      setUserData({
        id: user.id || '',
        email: user.email || '',
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImage: user.profileImage || '',
        bannerImage: user.bannerImage || '',
        profileVideo: user.profileVideo || '',
        imageGallery: user.imageGallery || [],
        bio: user.bio || '',
        personalQuote: user.personalQuote || '',
        signature: user.signature || '',
        location: user.location || '',
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      setMessage('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [auth.user]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setLoading(false);
      return;
    }

    loadUserProfile();
  }, [auth.isAuthenticated, loadUserProfile]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setMessage('');

    try {
      const userId = getAuthUserId(auth.user);
      if (!userId) {
        setMessage('Unable to save profile: missing user ID');
        return;
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...userData,
        }),
      });

      if (response.ok) {
        const { user } = await response.json();
        dispatch(setUser(user));
        setMessage('Profile updated successfully!');
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('Failed to save profile');
    } finally {
      setSaving(false);
    }
  }, [auth.user, dispatch, userData]);

  const handleImageChange = useCallback((type: 'profileImage' | 'bannerImage', url: string) => {
    setUserData(prev => ({ ...prev, [type]: url }));
  }, []);

  const handleImageRemove = useCallback((type: 'profileImage' | 'bannerImage') => {
    setUserData(prev => ({ ...prev, [type]: '' }));
  }, []);

  const handleProfileImageChange = useCallback((url: string) => handleImageChange('profileImage', url), [handleImageChange]);
  const handleBannerImageChange = useCallback((url: string) => handleImageChange('bannerImage', url), [handleImageChange]);
  const handleProfileImageRemove = useCallback(() => handleImageRemove('profileImage'), [handleImageRemove]);
  const handleBannerImageRemove = useCallback(() => handleImageRemove('bannerImage'), [handleImageRemove]);

  const handleGalleryImageAdd = useCallback((url: string) => {
    setUserData(prev => ({
      ...prev,
      imageGallery: [...prev.imageGallery, url]
    }));
  }, []);

  const handleVideoChange = useCallback((url: string) => {
    setUserData(prev => ({ ...prev, profileVideo: url }));
  }, []);

  const handleGalleryImageRemove = useCallback((index: number) => {
    setUserData(prev => ({
      ...prev,
      imageGallery: prev.imageGallery.filter((_, i) => i !== index)
    }));
  }, []);

  const galleryRemoveHandlers = useMemo(
    () => userData.imageGallery.map((_, index) => () => handleGalleryImageRemove(index)),
    [userData.imageGallery, handleGalleryImageRemove]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUserData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  if (loading) {
    return (
      <HOMELayouts>
        <div className={styles.loading}>
          <LoadingSpinner />
          <p style={{ marginTop: '20px', textAlign: 'center' }}>Loading profile...</p>
        </div>
      </HOMELayouts>
    );
  }

  const isLoggedIn = auth.isAuthenticated && getAuthUserId(auth.user);

  if (!isLoggedIn && !isDemo) {
    return (
      <HOMELayouts>
        <div className={styles.profilePage}>
          <div className={styles.header}>
            <h1>Profile</h1>
            <p>Please log in to access your profile</p>
          </div>
          <div className={styles.content}>
            <div style={{
              background: '#f0f0f0',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p><strong>Debug Info:</strong></p>
              <p>Auth Status: {auth.isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</p>
              <p>User ID: {auth.user?.id || 'None'}</p>
              <p>User Email: {auth.user?.email || 'None'}</p>
            </div>
            <button
              onClick={() => router.push('/auth/login')}
              style={{
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginRight: '10px'
              }}
            >
              Go to Login
            </button>
            <a
              href="?demo=true"
              style={{
                padding: '12px 24px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              View Demo
            </a>
          </div>
        </div>
      </HOMELayouts>
    );
  }

  return (
    <HOMELayouts>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1>Edit Profile</h1>
          <p>Update your profile information and images</p>
        </div>

        {message && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        <div className={styles.content}>
          {/* Images Section */}
          <section className={styles.section}>
            <h2>Profile Images</h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>Upload images to customize your profile</p>

            <div className={styles.imagesGrid}>
              <ImageUpload
                type="avatar"
                currentImage={userData.profileImage}
                onImageChange={handleProfileImageChange}
                onImageRemove={handleProfileImageRemove}
                label="Profile Picture"
                dimensions="150x150px"
                className={styles.avatarUpload}
                uploadFolder={`users/${userData.id || auth.user?.id || 'guest'}/avatar`}
              />

              <ImageUpload
                type="banner"
                currentImage={userData.bannerImage}
                onImageChange={handleBannerImageChange}
                onImageRemove={handleBannerImageRemove}
                label="Banner Image"
                dimensions="1200x300px"
                className={styles.bannerUpload}
                uploadFolder={`users/${userData.id || auth.user?.id || 'guest'}/banner`}
              />
            </div>

            {/* Image Gallery */}
            <div className={styles.gallerySection}>
              <h3>Image Gallery</h3>
              <div className={styles.galleryGrid}>
                {userData.imageGallery.map((image, index) => (
                  <div key={image} className={styles.galleryItem}>
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      className={styles.removeGalleryBtn}
                      onClick={galleryRemoveHandlers[index]}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {userData.imageGallery.length < 10 && (
                  <ImageUpload
                    type="gallery"
                    onImageChange={handleGalleryImageAdd}
                    label="Add Image"
                    dimensions="800x600px"
                    className={styles.galleryAddBtn}
                    uploadFolder={`users/${userData.id || auth.user?.id || 'guest'}/gallery`}
                  />
                )}
              </div>
            </div>

            <div className={styles.videoSection}>
              <h3>Profile Video</h3>
              <div className={styles.videoUploadRow}>
                <CloudinaryUploadWidget
                  uwConfig={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
                    multiple: false,
                    maxFileSize: 9000000,
                    folder: `users/${userData.id}/videos`,
                    buttonLabel: 'Upload Video',
                    resourceType: 'video',
                    clientAllowedFormats: ['mp4', 'mov', 'webm', 'mkv', 'avi'],
                  }}
                  setState={handleVideoChange}
                />
                {userData.profileVideo && (
                  <div className={styles.videoPreview}>
                    <video controls src={userData.profileVideo}>
                      <track kind="captions" srcLang="en" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Basic Information */}
          <section className={styles.section}>
            <h2>Basic Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Enter a username"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={userData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className={styles.section}>
            <h2>About You</h2>
            <div className={styles.field}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="personalQuote">Personal Quote</label>
              <input
                id="personalQuote"
                name="personalQuote"
                type="text"
                value={userData.personalQuote}
                onChange={handleInputChange}
                placeholder="Your favorite quote or motto"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="signature">Signature</label>
              <input
                id="signature"
                name="signature"
                type="text"
                value={userData.signature}
                onChange={handleInputChange}
                placeholder="Your signature or tagline"
              />
            </div>
          </section>

          {/* Save Button */}
          <div className={styles.actions}>
            {message && (
              <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}