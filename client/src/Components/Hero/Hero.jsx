import { useSiteConfig } from "../../contexts/SiteConfigContext";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const Hero = () => {
    const { siteConfig } = useSiteConfig();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { title, subtitle, ctaText, ctaLink, backgroundImage } = siteConfig.hero;

    return (
        <section
            className={`relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex items-center justify-center rounded-md overflow-hidden mb-8 ${!backgroundImage
                ? (isDark ? "bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-800" : "bg-gradient-to-br from-purple-100 via-white to-blue-50")
                : ""
                }`}
        >
            {backgroundImage && (
                <>
                    <img
                        src={backgroundImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </>
            )}

            {!backgroundImage && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl" />
                </div>
            )}

            <div className="relative z-10 text-center px-4 py-8 sm:px-6 sm:py-12 md:py-16 max-w-3xl mx-auto">
                <h1
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${backgroundImage
                        ? "text-white"
                        : (isDark ? "text-white" : "text-gray-900")
                        }`}
                >
                    {title}
                </h1>
                <p
                    className={`text-base sm:text-lg mb-8 max-w-xl mx-auto ${backgroundImage
                        ? "text-gray-200"
                        : (isDark ? "text-gray-400" : "text-gray-600")
                        }`}
                >
                    {subtitle}
                </p>
                {ctaText && (
                    <Link
                        to={ctaLink || "/"}
                        className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
};

export default Hero;
