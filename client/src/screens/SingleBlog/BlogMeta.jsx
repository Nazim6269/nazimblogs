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
    const authorPhoto = blog.authorObj?.photoURL || blog.author?.photoURL;

    return (
        <div className="flex flex-wrap items-center gap-3 mb-5">
            <User author={authorName} date={blog.date} authorId={authorId} photoURL={authorPhoto} />
            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-300"}`}>|</span>
            <MetaBadge icon={faClock} text={`${readingTime} min`} isDark={isDark} />
            <MetaBadge icon={faEye} text={views.toLocaleString()} isDark={isDark} />
            <MetaBadge icon={faHeart} text={likes} isDark={isDark} variant="accent" />
            <MetaBadge icon={faComment} text={commentCount} isDark={isDark} />
        </div>
    );
};

export default BlogMeta
