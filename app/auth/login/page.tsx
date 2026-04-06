'use client';

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

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(setAuthLoading(true));
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password.trim(),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || t('login_failed'));
      }

      dispatch(setUser({
        ...result.user,
        name: `${result.user.firstName || result.user.name || 'Player'}`,
        userCountry: result.user.lastCountry || result.user.userCountry,
        avatarUrl: result.user.profileImage || result.user.avatarUrl || undefined,
      }));

      toast.success(t('login_success'));
      router.push(preserveLocalePath(pathname, '/user/dashboard'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('login_failed'));
      console.error(error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #2c3e50 0%, #34495e 100%)">
      <div className={`${styles['auth-page']} ${styles['auth-background']}`}>
        <div className={styles['auth-container']}>
          <h1 className={styles['auth-title']}>{t('login_page_title')}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['form-group']}>
              <label htmlFor="email">{t('login_email_label')}</label>
              <input
                id="email"
                type="email"
                placeholder={t('login_email_placeholder') as string}
                autoComplete="email"
                {...register('email', { required: t('login_email_required') as string })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="password">{t('login_password_label')}</label>
              <input
                id="password"
                type="password"
                placeholder={t('login_password_placeholder') as string}
                autoComplete="current-password"
                {...register('password', { required: t('login_password_required') as string })}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className={styles['submit-btn']}>
              {t('login_button')}
            </button>
          </form>

          <p className={styles['auth-link']}>
            {t('login_no_account_text')} <Link href={preserveLocalePath(pathname, '/auth/register')}>{t('login_register_here')}</Link>
          </p>
        </div>
      </div>
    </HOMELayouts>
  );
}
