const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchDashboardStats = async () => {
    const res = await fetch(`${API_URL}/api/admin/stats`, {
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch stats');
    }
    return data;
};

export const banUser = async (userId) => {
    const res = await fetch(`${API_URL}/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to ban user');
    }
    return data;
};

export const unbanUser = async (userId) => {
    const res = await fetch(`${API_URL}/api/admin/users/${userId}/unban`, {
        method: 'PUT',
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to unban user');
    }
    return data;
};

export const fetchAdminMessages = async () => {
    const res = await fetch(`${API_URL}/api/admin/messages`, {
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch messages');
    }
    return data;
};

export const fetchReports = async (status) => {
    const params = status ? `?status=${status}` : '';
    const res = await fetch(`${API_URL}/api/admin/reports${params}`, { credentials: 'include' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch reports');
    return data;
};

export const updateReportStatus = async (reportId, status) => {
    const res = await fetch(`${API_URL}/api/admin/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update report');
    return data;
};

export const markMessageRead = async (messageId) => {
    const res = await fetch(`${API_URL}/api/admin/messages/${messageId}/read`, {
        method: 'PUT',
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to mark message as read');
    }
    return data;
};
