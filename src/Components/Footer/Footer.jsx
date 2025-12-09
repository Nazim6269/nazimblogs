import { useTheme } from "../../hooks/useTheme";
import Social from "../Social/Social";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const footerLinks = [
    { title: "Company", links: ["About", "Careers", "Blog"] },
    { title: "Products", links: ["Features", "Pricing", "Integrations"] },
    { title: "Support", links: ["Help Center", "Contact Us", "API Docs"] },
    { title: "Legal", links: ["Terms", "Privacy", "Cookies"] },
  ];

  return (
    <footer
      className={`
        relative overflow-hidden mt-16 border-t backdrop-blur-lg transition-all duration-500
        ${
          isDark
            ? "bg-[#050816]/80 border-white/10 text-gray-300"
            : "bg-white/70 border-black/10 text-gray-900"
        }
      `}
    >
      {/* Glow Shapes */}
      <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full blur-[120px]"></div>
      <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-linear-to-tr from-purple-400 via-blue-500 to-purple-600 rounded-full blur-[120px]"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 py-10 flex flex-col gap-12">
        {/* Logo + Social */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p
            className={`text-3xl font-bold bg-clip-text text-transparent transition-all duration-500 ${
              isDark
                ? "bg-linear-to-r from-blue-400 via-purple-500 to-pink-500"
                : "bg-linear-to-r from-purple-400 to-indigo-500"
            }`}
          >
            HexaBlog
          </p>

          <Social />
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className={`
                      cursor-pointer transition-colors duration-300 
                      ${
                        isDark ? "hover:text-purple-400" : "hover:text-blue-500"
                      }
                    `}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-bold mb-4">
            Subscribe to our newsletter
          </h3>
          <div className="flex flex-col sm:flex sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={`
                flex-1 px-4 py-2 rounded 
                ${
                  isDark
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                } 
                focus:outline-none focus:ring-2 focus:ring-purple-500 transition
              `}
            />
            <button
              className={`
                px-6 py-2 font-bold rounded transition
                ${
                  isDark
                    ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
                    : "bg-linear-to-r from-purple-400 via-blue-500 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
                }
              `}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved By Nazim.
        </div>
      </div>

      {/* Bottom Neon Line */}
      <div className="h-1 bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
