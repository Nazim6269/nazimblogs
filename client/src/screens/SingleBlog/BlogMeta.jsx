import React from 'react'
import { faClock, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import MetaBadge from './MetaBadge'
import User from '../../Components/User/User'

const BlogMeta = ({ blog, isDark }) => {
    const readingTime = Math.ceil(blog.body.split(" ").length / 200); // Avg reading speed: 200 words/min
    const views = Math.floor(Math.random() * 10000) + 1000;
    const likes = Math.floor(Math.random() * 500) + 50;

    return (
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <User />

            <MetaBadge
                icon={faClock}
                text={`${readingTime} min read`}
                isDark={isDark}
                variant="default"
            />

            <MetaBadge
                icon={faEye}
                text={`${views.toLocaleString()} views`}
                isDark={isDark}
                variant="default"
            />

            <MetaBadge
                icon={faHeart}
                text={`${likes} likes`}
                isDark={isDark}
                variant="accent"
            />
        </div>
    );
};

export default BlogMeta