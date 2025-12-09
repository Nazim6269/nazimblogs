import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/ui/container/Container";

import { useTheme } from "./hooks/useTheme";
import CreateBlog from "./screens/CreateBlog/CreateBlog";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";
import Register from "./screens/Register/Register";
import SingleBlog from "./screens/SingleBlog/SingleBlog";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-all duration-500 ${
          isDark
            ? "bg-linear-to-br from-[#0b1025] via-[#0d0f2c] to-[#050816] text-gray-200"
            : "bg-linear-to-br from-[#f3d9ff] via-[#e0e7ff] to-[#c7ddff] text-gray-900"
        }`}
      >
        <Navbar />

        {/* Page Content */}
        <main className="relative pt-15 flex justify-center">
          {/* Glowing blobs */}
          <div className="absolute -top-40 -left-40 h-[400px] w-[400px] bg-purple-500/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-40 -right-40 h-[400px] w-[400px] bg-blue-500/30 rounded-full blur-[120px]"></div>

          <Container>
            <div
              className={`relative rounded-2xl px-6 md:p-1 transition-all duration-300 `}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog-details" element={<SingleBlog />} />
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
