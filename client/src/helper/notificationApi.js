const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchNotifications = async (page = 1) => {
    const res = await fetch(`${API_URL}/api/notifications?page=${page}`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
};

export const fetchUnreadCount = async () => {
    const res = await fetch(`${API_URL}/api/notifications/unread-count`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch unread count');
    return res.json();
};

export const markNotificationRead = async (id) => {
    const res = await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to mark notification as read');
    return res.json();
};

export const markAllNotificationsRead = async () => {
    const res = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to mark all as read');
    return res.json();
};
