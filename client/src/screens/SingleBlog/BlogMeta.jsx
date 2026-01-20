import React from 'react'
import { faClock, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import MetaBadge from './MetaBadge'
import User from '../../Components/User/User'

const BlogMeta = ({ blog, isDark }) => {
    const readingTime = Math.ceil((blog.body?.length || 0) / 1000) || 5;
    const views = (blog.id * 123) + 456;
    const likes = blog.likes || 0;

    return (
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <User author={blog.author} date={blog.date} />

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