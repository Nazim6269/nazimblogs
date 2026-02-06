import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const SiteConfigContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DEFAULT_CONFIG = {
    navbar: {
        siteNamePrefix: "Hexa",
        siteNameAccent: "Blog",
        logoIcon: "H",
        navLinks: [
            { name: "Explore", path: "/" },
            { name: "Tutorials", path: "/tutorials" },
            { name: "Design", path: "/design" },
            { name: "Community", path: "/community" },
        ],
    },
    hero: {
        title: "Discover Stories That Inspire",
        subtitle: "Your go-to platform for insightful articles, trending topics, and expert perspectives.",
        ctaText: "Start Reading",
        ctaLink: "/",
        backgroundImage: "",
    },
    footer: {
        brandName: "HexaBlog",
        brandDescription: "Your go-to platform for insightful articles, trending topics, and expert perspectives. Join our community of readers and writers sharing knowledge across diverse subjects.",
        contactInfo: [
            { icon: "faEnvelope", text: "nazimdev10022001@gmail.com", type: "email" },
            { icon: "faPhone", text: "+880 1518-373269", type: "phone" },
            { icon: "faLocationDot", text: "Baddha,Dhaka, Bangladesh", type: "location" },
        ],
        footerLinks: [
            {
                title: "Quick Links",
                links: [
                    { name: "Home", path: "/" },
                    { name: "All Blogs", path: "/blogs" },
                    { name: "Categories", path: "/categories" },
                    { name: "About Us", path: "/about" },
                ],
            },
            {
                title: "Resources",
                links: [
                    { name: "Write for Us", path: "/write" },
                    { name: "Guidelines", path: "/guidelines" },
                    { name: "FAQs", path: "/faq" },
                    { name: "Sitemap", path: "/sitemap" },
                ],
            },
            {
                title: "Community",
                links: [
                    { name: "Authors", path: "/authors" },
                    { name: "Contributors", path: "/contributors" },
                    { name: "Forum", path: "/forum" },
                    { name: "Events", path: "/events" },
                ],
            },
            {
                title: "Legal",
                links: [
                    { name: "Terms of Service", path: "/terms" },
                    { name: "Privacy Policy", path: "/privacy" },
                    { name: "Cookie Policy", path: "/cookies" },
                    { name: "Disclaimer", path: "/disclaimer" },
                ],
            },
        ],
        socialLinks: [
            { icon: "fa-facebook", link: "https://fb.com" },
            { icon: "fa-twitter", link: "https://twitter.com" },
            { icon: "fa-github", link: "https://github.com/Nazim6269" },
            { icon: "fa-linkedin", link: "https://www.linkedin.com/in/nazim-uddin-23a93a216/" },
            { icon: "fa-instagram", link: "https://github.io" },
        ],
        copyrightText: "HexaBlog. All rights reserved. Crafted with love by Nazim.",
    },
};

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            const response = await fetch(`${API_URL}/api/site-config`);
            if (response.ok) {
                const data = await response.json();
                setSiteConfig(data);
            }
        } catch (error) {
            console.error("Failed to fetch site config:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const refreshConfig = async () => {
        await fetchConfig();
    };

    const value = { siteConfig, loading, refreshConfig };

    return (
        <SiteConfigContext.Provider value={value}>
            {children}
        </SiteConfigContext.Provider>
    );
};

SiteConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
