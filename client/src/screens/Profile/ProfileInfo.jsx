import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileInfo = ({ profile, handleToggleFollow, isFollowing, setIsFollowing }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    return (
        <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
                {profile.photoURL ? (
                    <img
                        src={profile.photoURL}
                        alt={profile.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-purple-500/20 shadow-md"
                    />
                ) : (
                    <div
                        className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300 ${isDark ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"}`}
                    >
                        {profile.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
                <Link
                    to="/settings"
                    title="Edit profile"
                    className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${isDark ? "bg-brand-primary hover:bg-purple-500" : "bg-brand-primary hover:bg-purple-700"}`}
                >
                    <FontAwesomeIcon icon={faPen} className="text-white text-sm" />
                </Link>
            </div>

            <div className="flex-1 text-center md:text-left">
                <h1 className={`text-3xl font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{profile.name}</h1>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>{profile.email}</p>
                <p className={`mt-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{profile.bio}</p>
                <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{profile.location}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
                <button
                    onClick={handleToggleFollow}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${isFollowing ? "bg-gray-200 text-gray-900" : "bg-violet-600 text-white"}`}
                >
                    {isFollowing ? "Following" : "Follow"}
                </button>
                <Link to="/create-blog" className={`px-4 py-2 rounded-md font-semibold ${isDark ? "bg-brand-primary text-white" : "bg-violet-600 text-white"}`}>Create</Link>
            </div>
        </div>
    )
}

export default ProfileInfo