'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser, setAuthLoading } from '@/store/store';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from '../auth.module.scss';
import bg1 from '@/SIMOCASINOphoto/backgroun image 1080/registerpage.png';
import bg2 from '@/SIMOCASINOphoto/backgroun image 1080/registerpage1.png';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');
  const backgroundImages = [bg1, bg2];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      dispatch(setAuthLoading(true));

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('register_failed'));
      }

      dispatch(
        setUser({
          ...result.user,
          name: result.user.firstName || result.user.name || 'Player',
          userCountry: result.user.lastCountry || result.user.userCountry,
          avatarUrl: result.user.profileImage || result.user.avatarUrl || undefined,
        })
      );
      toast.success(t('register_success'));
      router.push(preserveLocalePath(pathname, '/user/dashboard'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('register_failed'));
      console.error(error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #2c3e50 0%, #34495e 100%)">
      <div className={styles['auth-page']}>
        <div className={`${styles['background-slide']} ${styles.active}`}>
          <Image
            src={backgroundImages[activeIndex]!}
            alt={`Register background ${activeIndex + 1}`}
            fill
            sizes="100vw"
            className={styles['background-image']}
            priority
            fetchPriority="high"
            quality={70}
          />
        </div>
        <div className={styles['auth-container']}>
          <h1 className={styles['auth-title']}>{t('register_page_title')}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['form-group']}>
              <label htmlFor="name">{t('register_full_name_label')}</label>
              <input
                id="name"
                type="text"
                placeholder={t('register_full_name_placeholder') as string}
                autoComplete="name"
                {...register('name', { required: t('register_name_required') as string })}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">{t('register_email_label')}</label>
              <input
                id="email"
                type="email"
                placeholder={t('register_email_placeholder') as string}
                autoComplete="email"
                {...register('email', { required: t('register_email_required') as string })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="password">{t('register_password_label')}</label>
              <input
                id="password"
                type="password"
                placeholder={t('register_password_placeholder') as string}
                autoComplete="new-password"
                {...register('password', {
                  required: t('register_password_required') as string,
                  minLength: {
                    value: 6,
                    message: t('register_password_minlength') as string,
                  },
                })}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="confirmPassword">{t('register_confirm_password_label')}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder={t('register_confirm_password_placeholder') as string}
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: t('register_confirm_password_required') as string,
                  validate: (value) =>
                    value === password || (t('register_passwords_no_match') as string),
                })}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button type="submit" className={styles['submit-btn']}>
              {t('register_button')}
            </button>
          </form>

          <p className={styles['auth-link']}>
            {t('register_already_have_account')} <Link href={preserveLocalePath(pathname, '/auth/login')}>{t('register_login_here')}</Link>
          </p>
        </div>
      </div>
    </HOMELayouts>
  );
}
