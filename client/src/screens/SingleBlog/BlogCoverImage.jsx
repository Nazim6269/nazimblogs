const BlogCoverImage = ({ id, title, isDark, imageUrl }) => (
    <div className="relative mb-6 overflow-hidden rounded-lg">
        <img
            src={imageUrl || `https://picsum.photos/seed/${id}/1200/600`}
            alt={title}
            className="w-full h-52 sm:h-64 md:h-80 object-cover"
            loading="lazy"
        />
    </div>
);

export default BlogCoverImage
