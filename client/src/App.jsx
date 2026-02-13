import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/nprogress-custom.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/ui/container/Container";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import BannedGuard from "./Components/BannedGuard/BannedGuard";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";
import { useRouteProgress } from "./hooks/useRouteProgress";

import HomeSkeleton from "./Components/skeletons/HomeSkeleton";
import BlogDetailSkeleton from "./Components/skeletons/BlogDetailSkeleton";
import AuthSkeleton from "./Components/skeletons/AuthSkeleton";
import CreateBlogSkeleton from "./Components/skeletons/CreateBlogSkeleton";
import ProfileSkeleton from "./Components/skeletons/ProfileSkeleton";
import SettingsSkeleton from "./Components/skeletons/SettingsSkeleton";
import AdminSkeleton from "./Components/skeletons/AdminSkeleton";
import ReadingListSkeleton from "./Components/skeletons/ReadingListSkeleton";
import AuthorProfileSkeleton from "./Components/skeletons/AuthorProfileSkeleton";
import NotificationsSkeleton from "./Components/skeletons/NotificationsSkeleton";

const Home = lazy(() => import("./screens/Home/Home"));
const SingleBlog = lazy(() => import("./screens/SingleBlog/SingleBlog"));
const Login = lazy(() => import("./screens/Login/Login"));
const Register = lazy(() => import("./screens/Register/Register"));
const CreateBlog = lazy(() => import("./screens/CreateBlog/CreateBlog"));
const Profile = lazy(() => import("./screens/Profile/Profile"));
const Settings = lazy(() => import("./screens/Settings/Settings"));
const Admin = lazy(() => import("./screens/Admin/Admin"));
const ForgotPassword = lazy(() => import("./screens/ForgotPassword/ForgotPassword"));
const ReadingList = lazy(() => import("./screens/ReadingList/ReadingList"));
const AuthorProfile = lazy(() => import("./screens/AuthorProfile/AuthorProfile"));
const Notifications = lazy(() => import("./screens/Notifications/Notifications"));
const TagsPage = lazy(() => import("./screens/Tags/TagsPage"));
const TagBlogsPage = lazy(() => import("./screens/Tags/TagBlogsPage"));
const SeriesPage = lazy(() => import("./screens/Series/SeriesPage"));
const NotFound = lazy(() => import("./screens/NotFound/NotFound"));

function RouteProgressBar() {
  useRouteProgress();
  return null;
}

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <RouteProgressBar />
      <div
        className={`min-h-screen transition-all duration-500 ${isDark
          ? "bg-slate-900 text-gray-200"
          : "bg-slate-50 text-gray-900"
          }`}
      >
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />

        {/* Page Content */}
        <main className="relative pt-16 flex justify-center">

          <Container>
            <div
              className={`relative w-full rounded-md px-4 sm:px-6 transition-all duration-300 `}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
                <Route path="/tutorials" element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
                <Route path="/design" element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
                <Route path="/community" element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
                <Route path="/blog-details/:id" element={<Suspense fallback={<BlogDetailSkeleton />}><SingleBlog /></Suspense>} />
                <Route path="/author/:id" element={<Suspense fallback={<AuthorProfileSkeleton />}><AuthorProfile /></Suspense>} />
                <Route path="/tags" element={<Suspense fallback={<HomeSkeleton />}><TagsPage /></Suspense>} />
                <Route path="/tags/:tag" element={<Suspense fallback={<HomeSkeleton />}><TagBlogsPage /></Suspense>} />
                <Route path="/series/:id" element={<Suspense fallback={<HomeSkeleton />}><SeriesPage /></Suspense>} />

                {/* Auth Routes - Only accessible when NOT logged in */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Suspense fallback={<AuthSkeleton />}>
                        <Login />
                      </Suspense>
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Suspense fallback={<AuthSkeleton />}>
                        <Register />
                      </Suspense>
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <Suspense fallback={<AuthSkeleton />}>
                        <ForgotPassword />
                      </Suspense>
                    </PublicRoute>
                  }
                />

                {/* Protected Routes - Only accessible when logged in */}
                <Route
                  path="/create-blog"
                  element={
                    <ProtectedRoute>
                      <BannedGuard>
                        <Suspense fallback={<CreateBlogSkeleton />}>
                          <CreateBlog />
                        </Suspense>
                      </BannedGuard>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<ProfileSkeleton />}>
                        <Profile />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<NotificationsSkeleton />}>
                        <Notifications />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reading-list"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<ReadingListSkeleton />}>
                        <ReadingList />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<SettingsSkeleton />}>
                        <Settings />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Route */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Suspense fallback={<AdminSkeleton />}>
                        <Admin />
                      </Suspense>
                    </AdminRoute>
                  }
                />

                {/* 404 Not Found */}
                <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
              </Routes>
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
