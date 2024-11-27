import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/ui/container/Container";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useTheme } from "./hooks/useTheme";
import CreateBlog from "./screens/CreateBlog/CreateBlog";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";
import Register from "./screens/Register/Register";
import SingleBlog from "./screens/SingleBlog/SingleBlog";

const AppWrapper = () => {
  const [theme] = useTheme();
  return (
    <div
      className={theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}
    >
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/create-blog" element={<CreateBlog />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/blog-details" element={<SingleBlog />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export const App = () => (
  <ThemeProvider>
    <AppWrapper />
  </ThemeProvider>
);
