import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/ui/container/Container";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";

import { useTheme } from "./hooks/useTheme";
import CreateBlog from "./screens/CreateBlog/CreateBlog";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";
import Register from "./screens/Register/Register";
import SingleBlog from "./screens/SingleBlog/SingleBlog";
import NotFound from "./screens/NotFound/NotFound";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-all duration-500 ${isDark
          ? "bg-slate-900 text-gray-200"
          : "bg-slate-50 text-gray-900"
          }`}
      >
        <Navbar />

        {/* Page Content */}
        <main className="relative pt-15 flex justify-center">

          <Container>
            <div
              className={`relative rounded-2xl px-6 md:p-1 transition-all duration-300 `}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/tutorials" element={<Home />} />
                <Route path="/design" element={<Home />} />
                <Route path="/community" element={<Home />} />
                <Route path="/blog-details" element={<SingleBlog />} />

                {/* Auth Routes - Only accessible when NOT logged in */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />

                {/* Protected Routes - Only accessible when logged in */}
                <Route
                  path="/create-blog"
                  element={
                    <ProtectedRoute>
                      <CreateBlog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Container>
        </main>

        <Footer />
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
