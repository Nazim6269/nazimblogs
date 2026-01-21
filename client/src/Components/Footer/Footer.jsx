import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import Social from "../Social/Social";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowUp,
  faCheckCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null); // null, 'success', 'error'
  const [emailError, setEmailError] = useState("");

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "All Blogs", path: "/blogs" },
        { name: "Categories", path: "/categories" },
        { name: "About Us", path: "/about" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Write for Us", path: "/write" },
        { name: "Guidelines", path: "/guidelines" },
        { name: "FAQs", path: "/faq" },
        { name: "Sitemap", path: "/sitemap" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Authors", path: "/authors" },
        { name: "Contributors", path: "/contributors" },
        { name: "Forum", path: "/forum" },
        { name: "Events", path: "/events" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Disclaimer", path: "/disclaimer" }
      ]
    },
  ];

  const contactInfo = [
    { icon: faEnvelope, text: "nazimdev10022001@gmail.com", type: "email" },
    { icon: faPhone, text: "+880 1518-373269", type: "phone" },
    { icon: faLocationDot, text: "Baddha,Dhaka, Bangladesh", type: "location" },
  ];

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmailError("");
    setSubscribeStatus(null);

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
    }, 500);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer
      className={`
        relative overflow-hidden mt-16 border-t backdrop-blur-lg transition-all duration-500
        ${isDark
          ? "bg-[#050816]/95 border-white/10 text-gray-300"
          : "bg-white/90 border-black/10 text-gray-900"
        }
      `}
    >

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-12">

        {/* Top Section: Brand + Description + Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <h2
              className={`text-4xl font-bold mb-4 transition-all duration-500 ${isDark
                ? "text-purple-500"
                : "text-violet-600"
                }`}
            >
              HexaBlog
            </h2>
            <p className={`text-base leading-relaxed max-w-xl mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your go-to platform for insightful articles, trending topics, and expert perspectives.
              Join our community of readers and writers sharing knowledge across diverse subjects.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-5 h-5 transition-colors duration-300 ${isDark
                      ? "text-purple-400 group-hover:text-purple-300"
                      : "text-purple-600 group-hover:text-purple-700"
                      }`}
                  />
                  <span className={`text-sm transition-colors duration-300 ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"
                    }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start lg:items-end justify-start">
            <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
            <Social />
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.path}
                      className={`
                        text-sm transition-all duration-300 inline-block
                        hover:translate-x-1
                        ${isDark
                          ? "text-gray-400 hover:text-purple-400"
                          : "text-gray-600 hover:text-blue-600"
                        }
                      `}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className={`max-w-2xl mx-auto p-8 rounded-md backdrop-blur-sm mb-12 ${isDark ? "bg-white/5" : "bg-gray-100/50"
          }`}>
          <div className="text-center mb-6">
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              📬 Stay Updated
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Subscribe to our newsletter and never miss our latest articles and updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setSubscribeStatus(null);
                  }}
                  placeholder="Enter your email address"
                  className={`
                    w-full px-5 py-3 rounded-md transition-all duration-300
                    ${isDark
                      ? "bg-gray-800/80 text-white placeholder-gray-500 border border-gray-700"
                      : "bg-white text-gray-900 placeholder-gray-400 border border-gray-300"
                    } 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    ${emailError ? "ring-2 ring-red-500" : ""}
                  `}
                  aria-label="Email address"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationCircle} className="w-3 h-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`
                  px-8 py-3 font-semibold rounded-md transition-all duration-300
                  transform hover:scale-105 active:scale-95
                  ${isDark
                    ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
                    : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md hover:shadow-violet-500/50"
                  }
                `}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>

            {/* Success Message */}
            {subscribeStatus === "success" && (
              <div className="flex items-center justify-center gap-2 text-green-500 animate-fade-in">
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
                <span className="text-sm font-medium">Successfully subscribed! Check your inbox.</span>
              </div>
            )}
          </form>
        </div>

        {/* Bottom Section: Copyright + Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
            &copy; {new Date().getFullYear()} HexaBlog. All rights reserved. Crafted with ❤️ by Nazim.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className={`
              group flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm
              transition-all duration-300 transform hover:scale-105
              ${isDark
                ? "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900"
              }
            `}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 ${isDark
        ? "bg-purple-500/30"
        : "bg-violet-500/30"
        }`}></div>
    </footer>
  );
};

export default Footer;
