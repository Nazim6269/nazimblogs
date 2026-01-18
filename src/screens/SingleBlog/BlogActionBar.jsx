import React, { useState } from 'react'
import ActionButton from './ActionButton'
import { faBookmark, faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'

const BlogActionBar = ({ isDark, likes, comments }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div
            className={`sticky bottom-0 left-0 right-0 border-t backdrop-blur-lg z-40 ${isDark
                ? "bg-gray-900/80 border-gray-700"
                : "bg-white/80 border-gray-200"
                }`}
        >
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <ActionButton
                        icon={faHeart}
                        text={isLiked ? likes + 1 : likes}
                        onClick={() => setIsLiked(!isLiked)}
                        isActive={isLiked}
                        isDark={isDark}
                        activeColor="text-red-500"
                    />

                    <ActionButton
                        icon={faComment}
                        text={comments}
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                        isDark={isDark}
                    />

                    <ActionButton
                        icon={faShare}
                        text="Share"
                        onClick={() => navigator.share?.({ title: "Blog Post", url: window.location.href })}
                        isDark={isDark}
                    />
                </div>

                <ActionButton
                    icon={faBookmark}
                    text={isBookmarked ? "Saved" : "Save"}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    isActive={isBookmarked}
                    isDark={isDark}
                    activeColor="text-yellow-500"
                />
            </div>
        </div>
    );
}

export default BlogActionBar