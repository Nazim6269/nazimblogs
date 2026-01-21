import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileEditForm = ({ initial, onCancel, onSave }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [form, setForm] = useState(initial);

    return (
        <div className="space-y-4">
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Name
                </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Bio
                </label>
                <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Photo URL (optional)
                </label>
                <input
                    type="url"
                    value={form.photoURL || ""}
                    onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200 placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Location
                </label>
                <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>
            <div className="flex gap-3 justify-end">
                <button
                    onClick={onCancel}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${isDark
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Cancel
                </button>
                <button
                    onClick={() => onSave(form)}
                    className={`px-4 py-2 rounded-md font-medium text-white transition-all duration-300 ${isDark
                        ? "bg-brand-primary hover:bg-purple-700"
                        : "bg-violet-600 hover:bg-violet-700"
                        }`}
                >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
    );
};


export default ProfileEditForm