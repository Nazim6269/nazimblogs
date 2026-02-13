import { useEffect, useRef, useState, useCallback } from "react";
import { useSiteConfig } from "../../contexts/SiteConfigContext";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { fetchCategoryCounts, fetchTags } from "../../helper/blogApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNewspaper, faLayerGroup, faTags } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const ROTATING_WORDS = ["Inspire", "Educate", "Transform", "Connect", "Empower"];
const WORD_CYCLE_MS = 2500;

const Hero = () => {
    const { siteConfig } = useSiteConfig();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { title, subtitle, ctaText, backgroundImage } = siteConfig.hero;

    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const subtitleRef = useRef(null);
    const searchBarRef = useRef(null);
    const statsRef = useRef(null);
    const wordSlotRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [stats, setStats] = useState({ blogs: 0, categories: 0, tags: 0 });
    const [statsLoaded, setStatsLoaded] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Parse title: if last word matches a rotating word, split it out
    const titleParts = (() => {
        const words = title.split(" ");
        const lastWord = words[words.length - 1];
        if (ROTATING_WORDS.includes(lastWord)) {
            return { before: words.slice(0, -1).join(" ") + " ", hasRotation: true };
        }
        return { before: title, hasRotation: false };
    })();

    // Fetch live stats (non-blocking)
    useEffect(() => {
        let cancelled = false;
        const loadStats = async () => {
            try {
                const [categoryData, tagData] = await Promise.all([
                    fetchCategoryCounts(),
                    fetchTags(),
                ]);
                if (cancelled) return;
                const totalBlogs = categoryData.Explore || 0;
                const totalCategories = Object.keys(categoryData).filter(k => k !== "Explore").length;
                const totalTags = tagData.length;
                setStats({ blogs: totalBlogs, categories: totalCategories, tags: totalTags });
                setStatsLoaded(true);
            } catch {
                setStatsLoaded(true);
            }
        };
        loadStats();
        return () => { cancelled = true; };
    }, []);

    // GSAP entrance animation
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ctx = gsap.context(() => {
            const targets = [headlineRef.current, subtitleRef.current, searchBarRef.current, statsRef.current];
            if (prefersReducedMotion) {
                gsap.set(targets, { opacity: 1 });
                return;
            }
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
                .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
                .fromTo(searchBarRef.current, { y: 25, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, "-=0.3")
                .fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // Stats count-up animation
    useEffect(() => {
        if (!statsLoaded) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ctx = gsap.context(() => {
            const counterEls = statsRef.current?.querySelectorAll("[data-stat-value]");
            if (!counterEls) return;
            counterEls.forEach((el) => {
                const target = parseInt(el.dataset.statValue, 10);
                if (prefersReducedMotion || target === 0) {
                    el.textContent = target.toLocaleString();
                    return;
                }
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: 0.3,
                    onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); },
                });
            });
        }, heroRef);
        return () => ctx.revert();
    }, [statsLoaded, stats]);

    // Rotating word animation
    useEffect(() => {
        if (!titleParts.hasRotation) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const wordEl = wordSlotRef.current;
            if (!wordEl) return;

            const cycleWord = () => {
                gsap.to(wordEl, {
                    y: -20,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
                        gsap.set(wordEl, { y: 20, opacity: 0 });
                        gsap.to(wordEl, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                    },
                });
            };

            const intervalId = setInterval(cycleWord, WORD_CYCLE_MS);
            return () => clearInterval(intervalId);
        }, heroRef);

        return () => ctx.revert();
    }, [titleParts.hasRotation]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed) {
            navigate(`/?search=${encodeURIComponent(trimmed)}`);
        }
    }, [searchTerm, navigate]);

    const textColor = backgroundImage ? "text-white" : (isDark ? "text-white" : "text-gray-900");
    const subtextColor = backgroundImage ? "text-gray-200" : (isDark ? "text-gray-400" : "text-gray-500");

    return (
        <section
            ref={heroRef}
            className={`relative w-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center rounded-lg overflow-hidden mb-6 ${
                !backgroundImage
                    ? (isDark
                        ? "bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900"
                        : "bg-gradient-to-br from-purple-50/80 via-white to-blue-50/80")
                    : ""
            }`}
        >
            {/* Animated Background Orbs */}
            {!backgroundImage && (
                <>
                    <div className={`hero-orb hero-orb-1 w-48 h-48 sm:w-64 sm:h-64 -top-10 -left-10 ${isDark ? "bg-brand-primary/40" : "bg-brand-tertiary/20"}`} />
                    <div className={`hero-orb hero-orb-2 w-36 h-36 sm:w-56 sm:h-56 top-1/2 -right-12 ${isDark ? "bg-brand-secondary/30" : "bg-purple-200/25"}`} />
                    <div className={`hero-orb hero-orb-3 w-40 h-40 sm:w-48 sm:h-48 -bottom-8 left-1/3 ${isDark ? "bg-blue-500/25" : "bg-blue-200/20"}`} />
                </>
            )}

            {/* Background Image Overlay */}
            {backgroundImage && (
                <>
                    <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </>
            )}

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 py-8 sm:px-6 sm:py-10 md:py-14 max-w-2xl mx-auto w-full">
                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight ${textColor}`}
                    style={{ opacity: 0 }}
                >
                    {titleParts.before}
                    {titleParts.hasRotation && (
                        <span className="hero-word-slot">
                            <span ref={wordSlotRef} className="inline-block text-brand-secondary">
                                {ROTATING_WORDS[currentWordIndex]}
                            </span>
                        </span>
                    )}
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className={`text-sm sm:text-base md:text-lg mb-6 max-w-lg mx-auto ${subtextColor}`}
                    style={{ opacity: 0 }}
                >
                    {subtitle}
                </p>

                {/* Search Bar */}
                <form
                    ref={searchBarRef}
                    onSubmit={handleSearch}
                    className={`flex items-center gap-2 max-w-md mx-auto rounded-xl px-4 py-2.5 sm:py-3 mb-6 ${
                        isDark ? "hero-search-glass" : "hero-search-glass-light"
                    }`}
                    style={{ opacity: 0 }}
                >
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search articles, topics, tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
                            isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
                        }`}
                    />
                    <button
                        type="submit"
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors duration-200"
                    >
                        {ctaText || "Search"}
                    </button>
                </form>

                {/* Live Stats Bar */}
                <div
                    ref={statsRef}
                    className={`flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm ${
                        backgroundImage ? "text-gray-300" : (isDark ? "text-gray-500" : "text-gray-400")
                    }`}
                    style={{ opacity: 0 }}
                >
                    <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faNewspaper} className="text-brand-secondary" />
                        <span data-stat-value={stats.blogs}>0</span>
                        <span>Articles</span>
                    </div>
                    <div className={`w-px h-3 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
                    <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faLayerGroup} className="text-brand-tertiary" />
                        <span data-stat-value={stats.categories}>0</span>
                        <span>Categories</span>
                    </div>
                    <div className={`w-px h-3 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
                    <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faTags} className="text-blue-400" />
                        <span data-stat-value={stats.tags}>0</span>
                        <span>Tags</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
