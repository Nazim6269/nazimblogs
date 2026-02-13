const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const submitReport = async (targetType, targetId, reason) => {
    const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ targetType, targetId, reason }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit report');
    }
    return res.json();
};
