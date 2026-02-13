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
            className={`relative w-full min-h-[180px] sm:min-h-[220px] md:min-h-[280px] flex items-center justify-center rounded-lg overflow-hidden mb-6 ${!backgroundImage
                ? (isDark ? "bg-gradient-to-br from-purple-900/30 via-slate-900 to-slate-800" : "bg-gradient-to-br from-purple-50 via-white to-blue-50")
                : ""
                }`}
        >
            {backgroundImage && (
                <>
                    <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </>
            )}

            <div className="relative z-10 text-center px-4 py-6 sm:px-6 sm:py-8 md:py-10 max-w-2xl mx-auto">
                <h1
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 ${backgroundImage
                        ? "text-white"
                        : (isDark ? "text-white" : "text-gray-900")
                        }`}
                >
                    {title}
                </h1>
                <p
                    className={`text-sm sm:text-base mb-5 max-w-lg mx-auto ${backgroundImage
                        ? "text-gray-200"
                        : (isDark ? "text-gray-400" : "text-gray-500")
                        }`}
                >
                    {subtitle}
                </p>
                {ctaText && (
                    <Link
                        to={ctaLink || "/"}
                        className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors duration-200"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
};

export default Hero;
