import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Blog from './models/blogModel.js';
import Notification from './models/notificationModel.js';
import Message from './models/messageModel.js';

const sampleBlogs = [
    {
        title: 'Getting Started with React Hooks',
        body: 'React Hooks revolutionized the way we write React components. With useState and useEffect, you can manage state and side effects in functional components without ever needing class components. This guide walks you through the basics of hooks, including custom hooks for reusable logic. We cover useState for simple state management, useEffect for handling side effects like API calls and subscriptions, useContext for consuming context values, and useRef for accessing DOM elements directly. By the end of this tutorial, you will have a solid understanding of how hooks work and how to use them effectively in your projects.',
        tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/react-hooks/800/600',
        views: 342,
    },
    {
        title: 'Modern CSS Grid Layout Techniques',
        body: 'CSS Grid has transformed the way we create layouts for the web. Gone are the days of float-based layouts and complex positioning hacks. In this article, we explore advanced Grid techniques including subgrid, auto-placement algorithms, and responsive layouts without media queries. We also discuss how to combine Grid with Flexbox for maximum layout power. Learn how to create magazine-style layouts, card grids, and dashboard interfaces using pure CSS Grid. The examples in this article demonstrate real-world scenarios you will encounter in professional web development.',
        tags: ['CSS', 'Grid', 'Layout', 'Design'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/css-grid/800/600',
        views: 218,
    },
    {
        title: 'Building RESTful APIs with Express.js',
        body: 'Express.js remains one of the most popular frameworks for building web APIs in Node.js. In this comprehensive guide, we cover everything from setting up your first Express server to building production-ready APIs with proper error handling, validation, and authentication. You will learn about middleware patterns, route organization, request validation using express-validator, and how to structure your project for scalability. We also discuss best practices for error handling, logging, and security headers.',
        tags: ['Node.js', 'Express', 'API', 'Backend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/express-api/800/600',
        views: 456,
    },
    {
        title: 'UI Design Principles Every Developer Should Know',
        body: 'Great user interfaces are not just about aesthetics — they are about usability, accessibility, and creating delightful experiences. This article covers fundamental design principles including visual hierarchy, consistency, whitespace, typography, and color theory. Whether you are a full-stack developer or a frontend specialist, understanding these principles will elevate the quality of your work. We explore practical examples of good and bad design patterns, and how small changes in layout and spacing can dramatically improve user experience.',
        tags: ['UI', 'Design', 'UX', 'Typography'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/ui-design/800/600',
        views: 567,
    },
    {
        title: 'Understanding MongoDB Aggregation Pipeline',
        body: 'MongoDB aggregation pipeline is a powerful framework for data transformation and analysis. Instead of pulling all data to your application layer, you can perform complex operations directly in the database. This tutorial covers the most commonly used pipeline stages: $match, $group, $sort, $project, $lookup, and $unwind. We build several real-world examples including sales analytics, user activity reports, and inventory management queries. Each example includes detailed explanations of how each stage works and how they combine to produce the desired output.',
        tags: ['MongoDB', 'Database', 'NoSQL', 'Backend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/mongodb-agg/800/600',
        views: 289,
    },
    {
        title: 'Creating Accessible Web Applications',
        body: 'Web accessibility is not just a nice-to-have — it is a legal requirement in many jurisdictions and a moral imperative. This article explores how to build web applications that everyone can use, regardless of ability. We cover semantic HTML, ARIA attributes, keyboard navigation, screen reader compatibility, color contrast requirements, and focus management. Practical code examples show you how to implement accessible forms, modals, dropdown menus, and tab interfaces. We also discuss testing tools and automated accessibility auditing.',
        tags: ['Accessibility', 'A11y', 'HTML', 'Web Standards'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/accessibility/800/600',
        views: 321,
    },
    {
        title: 'Tailwind CSS Tips and Tricks for Faster Development',
        body: 'Tailwind CSS has become the go-to utility-first CSS framework for modern web development. But are you using it to its full potential? In this article, we share advanced tips including custom theme configuration, creating reusable component classes with @apply, responsive design patterns, dark mode implementation, and animation utilities. We also cover the new features in Tailwind v4 including CSS-first configuration and the simplified setup process. Learn how to write cleaner, more maintainable Tailwind code that scales with your project.',
        tags: ['Tailwind', 'CSS', 'Frontend', 'Styling'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/tailwind-tips/800/600',
        views: 412,
    },
    {
        title: 'Authentication Best Practices for Web Apps',
        body: 'Authentication is one of the most critical aspects of web application security. Getting it wrong can expose your users to data breaches, session hijacking, and identity theft. This article covers modern authentication best practices including JWT vs session-based auth, secure password hashing with bcrypt, OAuth 2.0 and social login integration, two-factor authentication, and secure cookie configuration. We discuss the trade-offs between different approaches and provide code examples for implementing each pattern in a Node.js and Express backend.',
        tags: ['Security', 'Authentication', 'JWT', 'OAuth'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/auth-best/800/600',
        views: 534,
    },
    {
        title: 'Open Source Contribution Guide for Beginners',
        body: 'Contributing to open source can be intimidating, but it does not have to be. This guide walks you through everything you need to know to make your first open source contribution. From finding beginner-friendly projects to understanding Git workflows, creating pull requests, and communicating with maintainers, we cover the entire process. We also discuss the benefits of open source contribution including skill development, portfolio building, networking, and giving back to the community. Start your open source journey today with our step-by-step guide.',
        tags: ['Open Source', 'Git', 'GitHub', 'Community'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/opensource/800/600',
        views: 267,
    },
    {
        title: 'Responsive Design Patterns with Flexbox',
        body: 'Flexbox is an essential tool for creating responsive layouts. While CSS Grid is great for two-dimensional layouts, Flexbox excels at one-dimensional arrangement and alignment. In this article, we explore common responsive design patterns you can achieve with Flexbox alone: sticky footers, centering techniques, equal-height columns, flexible navigation bars, and card layouts. Each pattern includes HTML and CSS code you can copy directly into your projects, along with visual examples showing the layout at different breakpoints.',
        tags: ['CSS', 'Flexbox', 'Responsive', 'Layout'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/flexbox/800/600',
        views: 345,
    },
    {
        title: 'Introduction to TypeScript for JavaScript Developers',
        body: 'TypeScript adds static type checking to JavaScript, catching bugs at compile time rather than runtime. If you are already comfortable with JavaScript, transitioning to TypeScript is easier than you think. This tutorial covers TypeScript basics including type annotations, interfaces, generics, enums, and type guards. We also explore advanced features like utility types, conditional types, and mapped types. By the end of this article, you will understand why TypeScript has become the standard for large-scale JavaScript applications and how to start using it in your projects.',
        tags: ['TypeScript', 'JavaScript', 'Types', 'Frontend'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/typescript/800/600',
        views: 478,
    },
    {
        title: 'Color Theory in Web Design: A Practical Guide',
        body: 'Colors evoke emotions and guide user behavior. Understanding color theory is essential for creating visually appealing and effective web designs. This guide covers the color wheel, color harmonies (complementary, analogous, triadic), color psychology, and practical techniques for choosing color palettes for your web projects. We discuss tools like Coolors, Adobe Color, and Figma for generating and testing color schemes. Real-world case studies show how popular brands use color strategically to create memorable user experiences.',
        tags: ['Design', 'Color Theory', 'UI', 'Branding'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/color-theory/800/600',
        views: 234,
    },
    {
        title: 'Setting Up a CI/CD Pipeline with GitHub Actions',
        body: 'Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern software development teams. GitHub Actions makes it easy to automate your build, test, and deployment workflows directly from your repository. This tutorial walks you through creating your first GitHub Actions workflow, running tests automatically on every push, deploying to various platforms (Vercel, AWS, Heroku), and setting up environment secrets. We also cover matrix builds for testing across multiple Node.js versions and caching strategies to speed up your builds.',
        tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automation'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/cicd/800/600',
        views: 312,
    },
    {
        title: 'Building a Developer Community: Lessons Learned',
        body: 'Developer communities drive innovation and learning. Whether you are building a local meetup, an online forum, or a Discord server, there are key principles that help communities thrive. This article shares lessons from community builders across the tech industry. Topics include creating welcoming environments, moderating discussions, organizing events, fostering mentorship, and maintaining engagement over time. We also discuss tools and platforms for community management, and how to measure the health and growth of your community.',
        tags: ['Community', 'Leadership', 'Networking', 'Culture'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/dev-community/800/600',
        views: 189,
    },
    {
        title: 'State Management in React: Context vs Redux vs Zustand',
        body: 'Managing state in React applications is a topic of endless debate. With so many options available — Context API, Redux, Zustand, Jotai, Recoil — how do you choose the right one for your project? This article compares the three most popular approaches: React Context for simple state sharing, Redux for complex global state with time-travel debugging, and Zustand for lightweight yet powerful state management. We build the same feature (a shopping cart) with each approach so you can see the differences in code complexity, bundle size, and developer experience.',
        tags: ['React', 'State Management', 'Redux', 'Zustand'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/state-mgmt/800/600',
        views: 523,
    },
    {
        title: 'Designing Effective Dashboard Interfaces',
        body: 'Dashboards are the command centers of web applications. A well-designed dashboard presents complex data in an intuitive, actionable format. This article covers dashboard design principles including information architecture, data visualization best practices, component organization, and progressive disclosure. We explore common dashboard patterns like KPI cards, charts, tables, and activity feeds. Practical examples show how to create responsive dashboards that work across devices using CSS Grid and Flexbox, with dark mode support.',
        tags: ['Dashboard', 'UI', 'Data Visualization', 'Design'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/dashboard/800/600',
        views: 387,
    },
    {
        title: 'The Art of Writing Clean Code',
        body: 'Clean code is code that is easy to read, understand, and maintain. It is not about clever one-liners or premature optimization — it is about clarity and simplicity. This article distills the most important principles from Robert C. Martin\'s Clean Code and applies them to modern JavaScript and TypeScript development. Topics include meaningful naming conventions, function design (single responsibility, small functions), avoiding side effects, proper error handling, and writing self-documenting code. Code examples show before-and-after transformations that illustrate each principle.',
        tags: ['Clean Code', 'Best Practices', 'JavaScript', 'Architecture'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/clean-code/800/600',
        views: 601,
    },
    {
        title: 'Docker for Frontend Developers',
        body: 'Docker is not just for backend developers. As a frontend developer, Docker can help you create consistent development environments, simplify onboarding for new team members, and streamline your deployment pipeline. This article introduces Docker concepts (images, containers, volumes, networks) in the context of frontend development. We create Dockerfiles for React applications, set up multi-stage builds for production, and use Docker Compose to run a full-stack application locally. No prior Docker experience is required.',
        tags: ['Docker', 'DevOps', 'Frontend', 'Containers'],
        category: 'Tutorials',
        imageSrc: 'https://picsum.photos/seed/docker-fe/800/600',
        views: 276,
    },
    {
        title: 'Growing as a Self-Taught Developer',
        body: 'The self-taught developer journey is both rewarding and challenging. Without a structured curriculum, it is easy to get lost in tutorial hell or suffer from imposter syndrome. This article shares strategies for effective self-learning including building projects instead of just consuming tutorials, contributing to open source, participating in coding challenges, finding mentors, and building a professional network. We also discuss how to overcome common obstacles like burnout, comparison trap, and the feeling of never knowing enough. Your journey is valid, and this guide will help you navigate it.',
        tags: ['Career', 'Learning', 'Self-Taught', 'Growth'],
        category: 'Community',
        imageSrc: 'https://picsum.photos/seed/self-taught/800/600',
        views: 445,
    },
    {
        title: 'Micro-Animations That Improve UX',
        body: 'Subtle animations can transform a static interface into a delightful, intuitive experience. Micro-animations provide visual feedback, guide attention, and create a sense of continuity between states. This article explores practical micro-animation patterns: button hover effects, loading indicators, page transitions, form validation feedback, scroll-triggered reveals, and skeleton screens. We implement each animation using CSS transitions, CSS keyframes, and Framer Motion. Performance considerations are discussed to ensure animations remain smooth on all devices, including tips for using GPU-accelerated properties.',
        tags: ['Animation', 'UX', 'CSS', 'Framer Motion'],
        category: 'Design',
        imageSrc: 'https://picsum.photos/seed/micro-anim/800/600',
        views: 356,
    },
];

const sampleAuthors = [
    {
        name: 'Nazim Uddin',
        email: 'nazimdev10022001@gmail.com',
        password: 'admin123456',
        isAdmin: true,
        bio: 'Full-stack developer & open-source enthusiast. Building things for the web.',
        location: 'Dhaka, Bangladesh',
    },
    {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        password: 'password123',
        bio: 'Frontend engineer at a fintech startup. Passionate about design systems and accessibility.',
        location: 'San Francisco, CA',
    },
    {
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        password: 'password123',
        bio: 'Backend developer who loves Node.js, databases, and DevOps. Writing about what I learn.',
        location: 'Austin, TX',
    },
    {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        password: 'password123',
        bio: 'UI/UX designer turned developer. I write about the intersection of design and code.',
        location: 'Mumbai, India',
    },
    {
        name: 'James Mitchell',
        email: 'james.mitchell@example.com',
        password: 'password123',
        bio: 'Self-taught developer, community builder, and technical writer. Sharing everything I know.',
        location: 'London, UK',
    },
];

// ── Sample comments for blogs ──
const sampleComments = [
    'Great article! This really helped me understand the topic better.',
    'Thanks for sharing this. I have been looking for a clear explanation like this.',
    'Really well written. The code examples are super helpful.',
    'I have a question — does this approach work well at scale?',
    'Bookmarked this for future reference. Excellent resource!',
    'I tried implementing this in my project and it works perfectly.',
    'This is exactly what I needed to read today. Thanks!',
    'Solid explanation. Would love a follow-up on advanced patterns.',
    'I disagree with the third point, but overall a solid post.',
    'The comparison section is really useful. Keep up the great work!',
    'I shared this with my team. Everyone found it valuable.',
    'Clear, concise, and practical. More articles like this please!',
    'How would you handle error cases in this setup?',
    'This changed how I think about the problem. Thank you!',
    'Nice write-up! Looking forward to more content from you.',
];

// ── Sample replies ──
const sampleReplies = [
    'Thanks for the kind words!',
    'Great question! I will cover that in a follow-up post.',
    'Glad it helped. Feel free to reach out if you have more questions.',
    'Absolutely, it scales well. I have used it in production.',
    'Good point — I should have clarified that part more.',
    'Thanks for sharing with your team! That means a lot.',
    'You are welcome! Happy coding.',
];

// ── Sample messages to admin ──
const sampleMessages = [
    'Love the blog platform! Any plans to add a dark code editor?',
    'Found a small typo on the homepage — the word "developrs" should be "developers".',
    'Would it be possible to add an RSS feed for new articles?',
    'Great work on the design refresh. The dark mode looks fantastic.',
    'I would love to write a guest post. How can I get involved?',
    'The reading list feature is super useful. Thanks for building it!',
    'Suggestion: add tag-based filtering on the main page.',
    'Is there an API I can use to fetch blog posts for my portfolio site?',
];

// ── Helpers ──
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickN = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(n, arr.length));
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

const seedDatabase = async () => {
    try {
        await connectDB();

        // ── Clear existing data ──
        await Blog.deleteMany({});
        await Notification.deleteMany({});
        await Message.deleteMany({});
        console.log('Cleared blogs, notifications, and messages');

        // ── Create or update authors ──
        const authors = [];
        for (const authorData of sampleAuthors) {
            let user = await User.findOne({ email: authorData.email });
            if (user) {
                if (authorData.isAdmin) user.isAdmin = true;
                user.bio = authorData.bio;
                user.location = authorData.location;
                user.followers = [];
                user.following = [];
                user.bookmarks = [];
                await user.save();
                console.log(`Author updated: ${user.name}`);
            } else {
                user = await User.create(authorData);
                console.log(`Author created: ${user.name}`);
            }
            authors.push(user);
        }

        // ── Create blogs with likes and comments ──
        const blogsWithAuthor = sampleBlogs.map((blog, index) => ({
            ...blog,
            author: authors[index % authors.length]._id,
            status: 'published',
        }));

        const createdBlogs = await Blog.insertMany(blogsWithAuthor);
        console.log(`Seeded ${createdBlogs.length} blogs`);

        const notifications = [];

        // ── Add likes to blogs ──
        for (const blog of createdBlogs) {
            const otherUsers = authors.filter((a) => !a._id.equals(blog.author));
            const likers = pickN(otherUsers, randomInt(1, otherUsers.length));

            blog.likes = likers.map((u) => u._id);

            for (const liker of likers) {
                notifications.push({
                    recipient: blog.author,
                    type: 'like',
                    message: `${liker.name} liked your post "${blog.title}"`,
                    relatedBlog: blog._id,
                    relatedUser: liker._id,
                    read: Math.random() > 0.4,
                    createdAt: daysAgo(randomInt(0, 14)),
                });
            }
        }
        console.log('Added likes to blogs');

        // ── Add comments and replies ──
        for (const blog of createdBlogs) {
            const otherUsers = authors.filter((a) => !a._id.equals(blog.author));
            const commentCount = randomInt(1, 4);
            const commenters = pickN(otherUsers, commentCount);

            for (const commenter of commenters) {
                const comment = {
                    _id: new mongoose.Types.ObjectId(),
                    user: commenter._id,
                    text: pick(sampleComments),
                    parentComment: null,
                    createdAt: daysAgo(randomInt(0, 12)),
                };
                blog.comments.push(comment);

                notifications.push({
                    recipient: blog.author,
                    type: 'comment',
                    message: `${commenter.name} commented on "${blog.title}"`,
                    relatedBlog: blog._id,
                    relatedUser: commenter._id,
                    read: Math.random() > 0.4,
                    createdAt: comment.createdAt,
                });

                // 50% chance the author replies
                if (Math.random() > 0.5) {
                    const reply = {
                        _id: new mongoose.Types.ObjectId(),
                        user: blog.author,
                        text: pick(sampleReplies),
                        parentComment: comment._id,
                        createdAt: new Date(comment.createdAt.getTime() + randomInt(1, 24) * 60 * 60 * 1000),
                    };
                    blog.comments.push(reply);

                    notifications.push({
                        recipient: commenter._id,
                        type: 'reply',
                        message: `${authors.find((a) => a._id.equals(blog.author)).name} replied to your comment on "${blog.title}"`,
                        relatedBlog: blog._id,
                        relatedUser: blog.author,
                        read: Math.random() > 0.3,
                        createdAt: reply.createdAt,
                    });
                }
            }
        }

        // Save all blogs with likes and comments
        for (const blog of createdBlogs) {
            await blog.save();
        }
        console.log('Added comments and replies to blogs');

        // ── Set up follower/following relationships ──
        // Each non-admin user follows admin + 1-2 random others
        // Admin follows 2 random users
        const admin = authors[0];
        const nonAdmins = authors.slice(1);

        for (const user of nonAdmins) {
            // Follow admin
            user.following.push(admin._id);
            admin.followers.push(user._id);

            notifications.push({
                recipient: admin._id,
                type: 'follow',
                message: `${user.name} started following you`,
                relatedUser: user._id,
                read: Math.random() > 0.3,
                createdAt: daysAgo(randomInt(1, 20)),
            });

            // Follow 1-2 random others
            const othersToFollow = pickN(
                nonAdmins.filter((u) => !u._id.equals(user._id)),
                randomInt(1, 2)
            );
            for (const target of othersToFollow) {
                if (!user.following.some((id) => id.equals(target._id))) {
                    user.following.push(target._id);
                    target.followers.push(user._id);

                    notifications.push({
                        recipient: target._id,
                        type: 'follow',
                        message: `${user.name} started following you`,
                        relatedUser: user._id,
                        read: Math.random() > 0.3,
                        createdAt: daysAgo(randomInt(1, 20)),
                    });
                }
            }
        }

        // Admin follows 2 random users
        const adminFollows = pickN(nonAdmins, 2);
        for (const target of adminFollows) {
            admin.following.push(target._id);
            target.followers.push(admin._id);

            notifications.push({
                recipient: target._id,
                type: 'follow',
                message: `${admin.name} started following you`,
                relatedUser: admin._id,
                read: Math.random() > 0.3,
                createdAt: daysAgo(randomInt(1, 20)),
            });
        }

        // Save all users with followers/following
        for (const user of authors) {
            await user.save();
        }
        console.log('Set up follower/following relationships');

        // ── Add bookmarks ──
        for (const user of authors) {
            const otherBlogs = createdBlogs.filter((b) => !b.author.equals(user._id));
            const bookmarked = pickN(otherBlogs, randomInt(2, 5));
            user.bookmarks = bookmarked.map((b) => b._id);
            await user.save();
        }
        console.log('Added bookmarks');

        // ── Create notifications ──
        await Notification.insertMany(notifications);
        console.log(`Seeded ${notifications.length} notifications`);

        // ── Create admin messages ──
        const messages = sampleMessages.map((text, i) => ({
            from: nonAdmins[i % nonAdmins.length]._id,
            text,
            read: i < 3,
            createdAt: daysAgo(randomInt(0, 10)),
        }));
        await Message.insertMany(messages);
        console.log(`Seeded ${messages.length} messages`);

        // ── Summary ──
        console.log('\n── Seed Summary ──');
        for (const a of authors) {
            const blogCount = createdBlogs.filter((b) => b.author.equals(a._id)).length;
            console.log(`  ${a.name} — ${blogCount} blogs, ${a.followers.length} followers, ${a.following.length} following, ${a.bookmarks.length} bookmarks${a.isAdmin ? ' [ADMIN]' : ''}`);
        }
        const totalLikes = createdBlogs.reduce((sum, b) => sum + b.likes.length, 0);
        const totalComments = createdBlogs.reduce((sum, b) => sum + b.comments.length, 0);
        console.log(`  Blogs: ${createdBlogs.length} | Likes: ${totalLikes} | Comments: ${totalComments}`);
        console.log(`  Notifications: ${notifications.length} | Messages: ${messages.length}`);
        console.log('\nSeed completed successfully!');

        process.exit(0);
    } catch (error) {
        console.error(`Seed error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
