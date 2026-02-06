import React from 'react'
import { faClock, faComment, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import MetaBadge from './MetaBadge'
import User from '../../Components/User/User'

const BlogMeta = ({ blog, isDark }) => {
    const readingTime = Math.ceil((blog.body?.length || 0) / 1000) || 5;
    const views = blog.views || 0;
    const likes = blog.likes?.length || 0;
    const commentCount = blog.comments?.length || 0;
    const authorName = typeof blog.authorObj === 'object' ? blog.authorObj?.name : (typeof blog.author === 'object' ? blog.author?.name : blog.author);
    const authorId = blog.authorObj?._id || blog.author?._id;

    return (
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <User author={authorName} date={blog.date} authorId={authorId} />

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

            <MetaBadge
                icon={faComment}
                text={`${commentCount} comments`}
                isDark={isDark}
                variant="default"
            />
        </div>
    );
};

export default BlogMeta
