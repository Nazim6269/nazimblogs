const BlogCoverImage = ({ id, title, isDark }) => (
    <div className="relative mb-10 overflow-hidden rounded-3xl group shadow-2xl">
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
            src={`https://picsum.photos/seed/${id}/1200/600`}
            alt={title}
            className="w-full h-72 md:h-96 lg:h-[500px] object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
        />
    </div>
);

export default BlogCoverImage