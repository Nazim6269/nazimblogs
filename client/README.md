# 📰 React Blog App

A simple **blog application** built with **ReactJS** that allows users to **read, add, and manage blog posts**.  
This project demonstrates **React state management**, **component-based architecture**, and **dynamic rendering** for CRUD operations.

![Blog App Preview](https://your-screenshot-link.com)

---

## 🚀 Features

- ✍️ **Create Posts** – Add new blog posts with title and content  
- 📝 **Read Posts** – View all published blog posts  
- 🗑️ **Delete Posts** – Remove posts from the list  
- ✏️ **Edit Posts** – Update the content of existing posts  
- 💾 **Local Storage Persistence** – Keeps blog posts after browser refresh  
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile  
- 🔧 **Reusable Components** – PostCard, PostForm, and PostList  

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Framework** | React 19 |
| **Styling** | Tailwind CSS / Optional CSS Modules |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Storage** | LocalStorage API |
| **Hosting** | Vercel / Netlify |
| **Language** | JavaScript / TypeScript |

---

## ⚙️ Installation

### Clone the repository
```bash
git clone https://github.com/Nazim6269/Blog_App.git
cd Blog_App
```
## Install Dependencies
```
yarn install
# or
npm install
```

## Run Development Server
```
yarn start
# or
npm start
```

## Open your Browser

Visit: [http://localhost:3000](http://localhost:3000)

## Project structure
```
.
├── src/
│   ├── components/
│   │   ├── PostCard.tsx       # Displays individual blog posts
│   │   ├── PostForm.tsx       # Form to create or edit posts
│   │   └── PostList.tsx       # Renders list of all posts
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts # Custom hook for handling localStorage
│   │
│   ├── pages/
│   │   └── Home.tsx           # Main page with all blog posts
│   │
│   ├── assets/                # Icons, images, logos
│   ├── App.tsx                # Root component
│   └── index.css              # Tailwind CSS global styles
│
├── public/                    # Static files
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json
└── README.md
```

## Screenshots
| Home Page                                 | Add Post                                     | Edit Post                                      |
| ----------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| ![Home](https://your-home-screenshot.com) | ![Add](https://your-add-post-screenshot.com) | ![Edit](https://your-edit-post-screenshot.com) |


## Key Functionalities

- CRUD Operations: Create, Read, Update, Delete posts
- LocalStorage: Persistent storage for posts without a backend
- Component-Based: Modular and reusable components
- Responsive UI: Works perfectly on all devices

## 🔮 Future Enhancements

- 🌐 Backend Integration: Connect with Firebase, MongoDB, or a REST API
- 🔎 Search & Filter Posts by title or content
- 🧾 Post Categories / Tags for better organization
- 🌙 Dark Mode toggle for user preference
- 📤 Share Posts to social media platforms

## 💻 Deployment

Deployed on Vercel or Netlify for live demo.

🔗 Live Demo: [https://blog-app-brown-kappa.vercel.app/](https://blog-app-brown-kappa.vercel.app/)

## 👨‍💻 Author

Nazim Uddin  
Front-End Developer | React & Next.js Enthusiast

- 🌐 [Portfolio](https://portfolio-nextjs-one-tau.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/nazim-uddin-23a93a216/)
- 🐙 [GitHub](https://github.com/Nazim6269)
