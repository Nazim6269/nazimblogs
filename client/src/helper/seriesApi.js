const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const createSeries = async (data) => {
    const res = await fetch(`${API_URL}/api/series`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) { const d = await res.json(); throw new Error(d.message || 'Failed to create series'); }
    return res.json();
};

export const fetchUserSeries = async () => {
    const res = await fetch(`${API_URL}/api/series/user`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch series');
    return res.json();
};

export const fetchSeriesById = async (id) => {
    const res = await fetch(`${API_URL}/api/series/${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Series not found');
    return res.json();
};

export const addBlogToSeries = async (seriesId, blogId) => {
    const res = await fetch(`${API_URL}/api/series/${seriesId}/add-blog`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ blogId }),
    });
    if (!res.ok) { const d = await res.json(); throw new Error(d.message || 'Failed'); }
    return res.json();
};
