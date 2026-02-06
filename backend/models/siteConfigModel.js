import mongoose from 'mongoose';

const siteConfigSchema = mongoose.Schema(
    {
        navbar: {
            siteNamePrefix: { type: String, default: 'Hexa' },
            siteNameAccent: { type: String, default: 'Blog' },
            logoIcon: { type: String, default: 'H' },
            navLinks: {
                type: [
                    {
                        name: { type: String, required: true },
                        path: { type: String, required: true },
                    },
                ],
                default: [
                    { name: 'Explore', path: '/' },
                    { name: 'Tutorials', path: '/tutorials' },
                    { name: 'Design', path: '/design' },
                    { name: 'Community', path: '/community' },
                ],
            },
        },
        hero: {
            title: { type: String, default: 'Discover Stories That Inspire' },
            subtitle: {
                type: String,
                default: 'Your go-to platform for insightful articles, trending topics, and expert perspectives.',
            },
            ctaText: { type: String, default: 'Start Reading' },
            ctaLink: { type: String, default: '/' },
            backgroundImage: { type: String, default: '' },
        },
        footer: {
            brandName: { type: String, default: 'HexaBlog' },
            brandDescription: {
                type: String,
                default: 'Your go-to platform for insightful articles, trending topics, and expert perspectives. Join our community of readers and writers sharing knowledge across diverse subjects.',
            },
            contactInfo: {
                type: [
                    {
                        icon: { type: String, required: true },
                        text: { type: String, required: true },
                        type: { type: String, required: true },
                    },
                ],
                default: [
                    { icon: 'faEnvelope', text: 'nazimdev10022001@gmail.com', type: 'email' },
                    { icon: 'faPhone', text: '+880 1518-373269', type: 'phone' },
                    { icon: 'faLocationDot', text: 'Baddha,Dhaka, Bangladesh', type: 'location' },
                ],
            },
            footerLinks: {
                type: [
                    {
                        title: { type: String, required: true },
                        links: [
                            {
                                name: { type: String, required: true },
                                path: { type: String, required: true },
                            },
                        ],
                    },
                ],
                default: [
                    {
                        title: 'Quick Links',
                        links: [
                            { name: 'Home', path: '/' },
                            { name: 'All Blogs', path: '/blogs' },
                            { name: 'Categories', path: '/categories' },
                            { name: 'About Us', path: '/about' },
                        ],
                    },
                    {
                        title: 'Resources',
                        links: [
                            { name: 'Write for Us', path: '/write' },
                            { name: 'Guidelines', path: '/guidelines' },
                            { name: 'FAQs', path: '/faq' },
                            { name: 'Sitemap', path: '/sitemap' },
                        ],
                    },
                    {
                        title: 'Community',
                        links: [
                            { name: 'Authors', path: '/authors' },
                            { name: 'Contributors', path: '/contributors' },
                            { name: 'Forum', path: '/forum' },
                            { name: 'Events', path: '/events' },
                        ],
                    },
                    {
                        title: 'Legal',
                        links: [
                            { name: 'Terms of Service', path: '/terms' },
                            { name: 'Privacy Policy', path: '/privacy' },
                            { name: 'Cookie Policy', path: '/cookies' },
                            { name: 'Disclaimer', path: '/disclaimer' },
                        ],
                    },
                ],
            },
            socialLinks: {
                type: [
                    {
                        icon: { type: String, required: true },
                        link: { type: String, required: true },
                    },
                ],
                default: [
                    { icon: 'fa-facebook', link: 'https://fb.com' },
                    { icon: 'fa-twitter', link: 'https://twitter.com' },
                    { icon: 'fa-github', link: 'https://github.com/Nazim6269' },
                    { icon: 'fa-linkedin', link: 'https://www.linkedin.com/in/nazim-uddin-23a93a216/' },
                    { icon: 'fa-instagram', link: 'https://github.io' },
                ],
            },
            copyrightText: {
                type: String,
                default: 'HexaBlog. All rights reserved. Crafted with love by Nazim.',
            },
        },
    },
    {
        timestamps: true,
    }
);

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

export default SiteConfig;
