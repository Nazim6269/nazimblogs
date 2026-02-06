import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Blog from './models/blogModel.js';

const sampleBlogs = [
    {
        title: 'Getting Started with React Hooks',
        body: 'React Hooks revolutionized the way we write React components. With useState and useEffect, you can manage state and side effects in functional components without ever needing class components. This guide walks you through the basics of hooks, including custom hooks for reusable logic. We cover useState for simple state management, useEffect for handling side effects like API calls and subscriptions, useContext for consuming context values, and useRef for accessing DOM elements directly. By the end of this tutorial, you will have a solid understanding of how hooks work and how to use them effectively in your projects.',
        tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/react-hooks/800/600',
        likes: 342,
    },
    {
        title: 'Modern CSS Grid Layout Techniques',
        body: 'CSS Grid has transformed the way we create layouts for the web. Gone are the days of float-based layouts and complex positioning hacks. In this article, we explore advanced Grid techniques including subgrid, auto-placement algorithms, and responsive layouts without media queries. We also discuss how to combine Grid with Flexbox for maximum layout power. Learn how to create magazine-style layouts, card grids, and dashboard interfaces using pure CSS Grid. The examples in this article demonstrate real-world scenarios you will encounter in professional web development.',
        tags: ['CSS', 'Grid', 'Layout', 'Design'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/css-grid/800/600',
        likes: 218,
    },
    {
        title: 'Building RESTful APIs with Express.js',
        body: 'Express.js remains one of the most popular frameworks for building web APIs in Node.js. In this comprehensive guide, we cover everything from setting up your first Express server to building production-ready APIs with proper error handling, validation, and authentication. You will learn about middleware patterns, route organization, request validation using express-validator, and how to structure your project for scalability. We also discuss best practices for error handling, logging, and security headers.',
        tags: ['Node.js', 'Express', 'API', 'Backend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/express-api/800/600',
        likes: 456,
    },
    {
        title: 'UI Design Principles Every Developer Should Know',
        body: 'Great user interfaces are not just about aesthetics — they are about usability, accessibility, and creating delightful experiences. This article covers fundamental design principles including visual hierarchy, consistency, whitespace, typography, and color theory. Whether you are a full-stack developer or a frontend specialist, understanding these principles will elevate the quality of your work. We explore practical examples of good and bad design patterns, and how small changes in layout and spacing can dramatically improve user experience.',
        tags: ['UI', 'Design', 'UX', 'Typography'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/ui-design/800/600',
        likes: 567,
    },
    {
        title: 'Understanding MongoDB Aggregation Pipeline',
        body: 'MongoDB aggregation pipeline is a powerful framework for data transformation and analysis. Instead of pulling all data to your application layer, you can perform complex operations directly in the database. This tutorial covers the most commonly used pipeline stages: $match, $group, $sort, $project, $lookup, and $unwind. We build several real-world examples including sales analytics, user activity reports, and inventory management queries. Each example includes detailed explanations of how each stage works and how they combine to produce the desired output.',
        tags: ['MongoDB', 'Database', 'NoSQL', 'Backend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/mongodb-agg/800/600',
        likes: 289,
    },
    {
        title: 'Creating Accessible Web Applications',
        body: 'Web accessibility is not just a nice-to-have — it is a legal requirement in many jurisdictions and a moral imperative. This article explores how to build web applications that everyone can use, regardless of ability. We cover semantic HTML, ARIA attributes, keyboard navigation, screen reader compatibility, color contrast requirements, and focus management. Practical code examples show you how to implement accessible forms, modals, dropdown menus, and tab interfaces. We also discuss testing tools and automated accessibility auditing.',
        tags: ['Accessibility', 'A11y', 'HTML', 'Web Standards'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/accessibility/800/600',
        likes: 321,
    },
    {
        title: 'Tailwind CSS Tips and Tricks for Faster Development',
        body: 'Tailwind CSS has become the go-to utility-first CSS framework for modern web development. But are you using it to its full potential? In this article, we share advanced tips including custom theme configuration, creating reusable component classes with @apply, responsive design patterns, dark mode implementation, and animation utilities. We also cover the new features in Tailwind v4 including CSS-first configuration and the simplified setup process. Learn how to write cleaner, more maintainable Tailwind code that scales with your project.',
        tags: ['Tailwind', 'CSS', 'Frontend', 'Styling'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/tailwind-tips/800/600',
        likes: 412,
    },
    {
        title: 'Authentication Best Practices for Web Apps',
        body: 'Authentication is one of the most critical aspects of web application security. Getting it wrong can expose your users to data breaches, session hijacking, and identity theft. This article covers modern authentication best practices including JWT vs session-based auth, secure password hashing with bcrypt, OAuth 2.0 and social login integration, two-factor authentication, and secure cookie configuration. We discuss the trade-offs between different approaches and provide code examples for implementing each pattern in a Node.js and Express backend.',
        tags: ['Security', 'Authentication', 'JWT', 'OAuth'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/auth-best/800/600',
        likes: 534,
    },
    {
        title: 'Open Source Contribution Guide for Beginners',
        body: 'Contributing to open source can be intimidating, but it does not have to be. This guide walks you through everything you need to know to make your first open source contribution. From finding beginner-friendly projects to understanding Git workflows, creating pull requests, and communicating with maintainers, we cover the entire process. We also discuss the benefits of open source contribution including skill development, portfolio building, networking, and giving back to the community. Start your open source journey today with our step-by-step guide.',
        tags: ['Open Source', 'Git', 'GitHub', 'Community'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/opensource/800/600',
        likes: 267,
    },
    {
        title: 'Responsive Design Patterns with Flexbox',
        body: 'Flexbox is an essential tool for creating responsive layouts. While CSS Grid is great for two-dimensional layouts, Flexbox excels at one-dimensional arrangement and alignment. In this article, we explore common responsive design patterns you can achieve with Flexbox alone: sticky footers, centering techniques, equal-height columns, flexible navigation bars, and card layouts. Each pattern includes HTML and CSS code you can copy directly into your projects, along with visual examples showing the layout at different breakpoints.',
        tags: ['CSS', 'Flexbox', 'Responsive', 'Layout'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/flexbox/800/600',
        likes: 345,
    },
    {
        title: 'Introduction to TypeScript for JavaScript Developers',
        body: 'TypeScript adds static type checking to JavaScript, catching bugs at compile time rather than runtime. If you are already comfortable with JavaScript, transitioning to TypeScript is easier than you think. This tutorial covers TypeScript basics including type annotations, interfaces, generics, enums, and type guards. We also explore advanced features like utility types, conditional types, and mapped types. By the end of this article, you will understand why TypeScript has become the standard for large-scale JavaScript applications and how to start using it in your projects.',
        tags: ['TypeScript', 'JavaScript', 'Types', 'Frontend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/typescript/800/600',
        likes: 478,
    },
    {
        title: 'Color Theory in Web Design: A Practical Guide',
        body: 'Colors evoke emotions and guide user behavior. Understanding color theory is essential for creating visually appealing and effective web designs. This guide covers the color wheel, color harmonies (complementary, analogous, triadic), color psychology, and practical techniques for choosing color palettes for your web projects. We discuss tools like Coolors, Adobe Color, and Figma for generating and testing color schemes. Real-world case studies show how popular brands use color strategically to create memorable user experiences.',
        tags: ['Design', 'Color Theory', 'UI', 'Branding'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/color-theory/800/600',
        likes: 234,
    },
    {
        title: 'Setting Up a CI/CD Pipeline with GitHub Actions',
        body: 'Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern software development teams. GitHub Actions makes it easy to automate your build, test, and deployment workflows directly from your repository. This tutorial walks you through creating your first GitHub Actions workflow, running tests automatically on every push, deploying to various platforms (Vercel, AWS, Heroku), and setting up environment secrets. We also cover matrix builds for testing across multiple Node.js versions and caching strategies to speed up your builds.',
        tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automation'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/cicd/800/600',
        likes: 312,
    },
    {
        title: 'Building a Developer Community: Lessons Learned',
        body: 'Developer communities drive innovation and learning. Whether you are building a local meetup, an online forum, or a Discord server, there are key principles that help communities thrive. This article shares lessons from community builders across the tech industry. Topics include creating welcoming environments, moderating discussions, organizing events, fostering mentorship, and maintaining engagement over time. We also discuss tools and platforms for community management, and how to measure the health and growth of your community.',
        tags: ['Community', 'Leadership', 'Networking', 'Culture'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/dev-community/800/600',
        likes: 189,
    },
    {
        title: 'State Management in React: Context vs Redux vs Zustand',
        body: 'Managing state in React applications is a topic of endless debate. With so many options available — Context API, Redux, Zustand, Jotai, Recoil — how do you choose the right one for your project? This article compares the three most popular approaches: React Context for simple state sharing, Redux for complex global state with time-travel debugging, and Zustand for lightweight yet powerful state management. We build the same feature (a shopping cart) with each approach so you can see the differences in code complexity, bundle size, and developer experience.',
        tags: ['React', 'State Management', 'Redux', 'Zustand'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/state-mgmt/800/600',
        likes: 523,
    },
    {
        title: 'Designing Effective Dashboard Interfaces',
        body: 'Dashboards are the command centers of web applications. A well-designed dashboard presents complex data in an intuitive, actionable format. This article covers dashboard design principles including information architecture, data visualization best practices, component organization, and progressive disclosure. We explore common dashboard patterns like KPI cards, charts, tables, and activity feeds. Practical examples show how to create responsive dashboards that work across devices using CSS Grid and Flexbox, with dark mode support.',
        tags: ['Dashboard', 'UI', 'Data Visualization', 'Design'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/dashboard/800/600',
        likes: 387,
    },
    {
        title: 'The Art of Writing Clean Code',
        body: 'Clean code is code that is easy to read, understand, and maintain. It is not about clever one-liners or premature optimization — it is about clarity and simplicity. This article distills the most important principles from Robert C. Martin\'s Clean Code and applies them to modern JavaScript and TypeScript development. Topics include meaningful naming conventions, function design (single responsibility, small functions), avoiding side effects, proper error handling, and writing self-documenting code. Code examples show before-and-after transformations that illustrate each principle.',
        tags: ['Clean Code', 'Best Practices', 'JavaScript', 'Architecture'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/clean-code/800/600',
        likes: 601,
    },
    {
        title: 'Docker for Frontend Developers',
        body: 'Docker is not just for backend developers. As a frontend developer, Docker can help you create consistent development environments, simplify onboarding for new team members, and streamline your deployment pipeline. This article introduces Docker concepts (images, containers, volumes, networks) in the context of frontend development. We create Dockerfiles for React applications, set up multi-stage builds for production, and use Docker Compose to run a full-stack application locally. No prior Docker experience is required.',
        tags: ['Docker', 'DevOps', 'Frontend', 'Containers'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/docker-fe/800/600',
        likes: 276,
    },
    {
        title: 'Growing as a Self-Taught Developer',
        body: 'The self-taught developer journey is both rewarding and challenging. Without a structured curriculum, it is easy to get lost in tutorial hell or suffer from imposter syndrome. This article shares strategies for effective self-learning including building projects instead of just consuming tutorials, contributing to open source, participating in coding challenges, finding mentors, and building a professional network. We also discuss how to overcome common obstacles like burnout, comparison trap, and the feeling of never knowing enough. Your journey is valid, and this guide will help you navigate it.',
        tags: ['Career', 'Learning', 'Self-Taught', 'Growth'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/self-taught/800/600',
        likes: 445,
    },
    {
        title: 'Micro-Animations That Improve UX',
        body: 'Subtle animations can transform a static interface into a delightful, intuitive experience. Micro-animations provide visual feedback, guide attention, and create a sense of continuity between states. This article explores practical micro-animation patterns: button hover effects, loading indicators, page transitions, form validation feedback, scroll-triggered reveals, and skeleton screens. We implement each animation using CSS transitions, CSS keyframes, and Framer Motion. Performance considerations are discussed to ensure animations remain smooth on all devices, including tips for using GPU-accelerated properties.',
        tags: ['Animation', 'UX', 'CSS', 'Framer Motion'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/micro-anim/800/600',
        likes: 356,
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Find or create admin user
        let adminUser = await User.findOne({ email: 'nazimdev10022001@gmail.com' });

        if (adminUser) {
            adminUser.isAdmin = true;
            await adminUser.save();
            console.log(`Admin user updated: ${adminUser.name} (${adminUser.email})`);
        } else {
            adminUser = await User.create({
                name: 'Nazim Uddin',
                email: 'nazimdev10022001@gmail.com',
                password: 'admin123456',
                isAdmin: true,
            });
            console.log(`Admin user created: ${adminUser.name} (${adminUser.email})`);
        }

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log('Existing blogs cleared');

        // Create blogs with the admin as author
        const blogsWithAuthor = sampleBlogs.map((blog) => ({
            ...blog,
            author: adminUser._id,
        }));

        const createdBlogs = await Blog.insertMany(blogsWithAuthor);
        console.log(`Seeded ${createdBlogs.length} blog posts`);

        console.log('\nSeed completed successfully!');
        console.log(`Admin: ${adminUser.email} (isAdmin: true)`);
        console.log(`Blogs: ${createdBlogs.length} posts created`);

        process.exit(0);
    } catch (error) {
        console.error(`Seed error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
