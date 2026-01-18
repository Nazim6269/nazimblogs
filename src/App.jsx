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
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog-details" element={<SingleBlog />} />
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
