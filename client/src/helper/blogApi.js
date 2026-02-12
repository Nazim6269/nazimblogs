const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchBlogs = async ({ search, category, page, limit } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'Explore') params.set('category', category);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);

    const res = await fetch(`${API_URL}/api/blogs?${params}`, {
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const fetchBlogById = async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Blog not found');
    return res.json();
};

export const fetchUserBlogs = async ({ search } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);

    const res = await fetch(`${API_URL}/api/blogs/user?${params}`, {
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch your blogs');
    return res.json();
};

export const createBlog = async (blogData) => {
    const res = await fetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(blogData),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create blog');
    }
    return res.json();
};

export const updateBlog = async (id, blogData) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(blogData),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update blog');
    }
    return res.json();
};

export const deleteBlog = async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete blog');
    }
    return res.json();
};

export const likeBlog = async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}/like`, {
        method: 'PUT',
        credentials: 'include',
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to like blog');
    }
    return res.json();
};

export const addComment = async (blogId, text, parentComment) => {
    const body = { text };
    if (parentComment) body.parentComment = parentComment;

    const res = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add comment');
    }
    return res.json();
};

export const fetchTrendingBlogs = async () => {
    const res = await fetch(`${API_URL}/api/blogs/trending`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch trending blogs');
    return res.json();
};

export const fetchRecommendedBlogs = async () => {
    const res = await fetch(`${API_URL}/api/blogs/recommended`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch recommended blogs');
    return res.json();
};

export const toggleBookmark = async (blogId) => {
    const res = await fetch(`${API_URL}/api/blogs/${blogId}/bookmark`, {
        method: 'PUT',
        credentials: 'include',
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to toggle bookmark');
    }
    return res.json();
};

export const fetchBookmarks = async () => {
    const res = await fetch(`${API_URL}/api/users/bookmarks`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch bookmarks');
    return res.json();
};

export const deleteComment = async (blogId, commentId) => {
    const res = await fetch(`${API_URL}/api/blogs/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete comment');
    }
    return res.json();
};
