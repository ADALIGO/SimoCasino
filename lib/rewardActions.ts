export const GUEST_USER_STORAGE_KEY = 'simocasino_guest_user_id';
export const GUEST_VISIT_HOMEPAGE_KEY = 'simocasino_guest_visit_homepage';
export const USER_VISIT_HOMEPAGE_KEY = 'simocasino_user_visit_homepage';

export async function createGuestUser(guestId?: string, username?: string) {
  const response = await fetch('/api/auth/guest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestId, username }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to create guest user');
  }

  return await response.json();
}

export async function submitRewardAction(userId: string, action: string) {
  const response = await fetch('/api/rewards/action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, action }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to submit reward action');
  }

  return await response.json();
}
