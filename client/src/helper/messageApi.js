const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sendMessageToAdmin = async (text) => {
    const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to send message');
    }
    return data;
};
