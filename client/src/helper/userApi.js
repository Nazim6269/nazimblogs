const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const followUser = async (userId) => {
    const res = await fetch(`${API_URL}/api/users/${userId}/follow`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to follow user');
    }
    return res.json();
};

export const unfollowUser = async (userId) => {
    const res = await fetch(`${API_URL}/api/users/${userId}/unfollow`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to unfollow user');
    }
    return res.json();
};

export const fetchAuthorProfile = async (userId) => {
    const res = await fetch(`${API_URL}/api/users/${userId}/profile`, {
        credentials: 'include',
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch author profile');
    }
    return res.json();
};

export const fetchUserAnalytics = async () => {
    const res = await fetch(`${API_URL}/api/users/analytics`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
};

export const toggleEmailSubscription = async () => {
    const res = await fetch(`${API_URL}/api/users/email-subscription`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to toggle email subscription');
    return res.json();
};

export const updateProfile = async (data) => {
    const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message || 'Failed to update profile');
    }
    return res.json();
};
