import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSiteConfig } from "../../contexts/SiteConfigContext";
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

const iconMap = { faEnvelope, faPhone, faLocationDot };

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { siteConfig } = useSiteConfig();
  const {
    brandName,
    brandDescription,
    contactInfo: configContactInfo,
    footerLinks: configFooterLinks,
    socialLinks,
    copyrightText,
  } = siteConfig.footer;

  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmailError("");
    setSubscribeStatus(null);
    if (!email) { setEmailError("Email is required"); return; }
    if (!validateEmail(email)) { setEmailError("Please enter a valid email"); return; }
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus(null), 5000);
    }, 500);
  };

  return (
    <footer
      className={`relative mt-10 border-t transition-colors ${isDark
        ? "bg-slate-900/95 border-slate-800 text-gray-300"
        : "bg-gray-50 border-gray-200 text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top: Brand + Social */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-500/10">
          <div className="max-w-md">
            <h2 className={`text-lg font-bold mb-1 ${isDark ? "text-brand-secondary" : "text-alter-brand-secondary"}`}>
              {brandName}
            </h2>
            <p className={`text-xs leading-relaxed mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {brandDescription}
            </p>
            <div className="flex flex-col gap-1.5">
              {configContactInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FontAwesomeIcon icon={iconMap[item.icon] || faEnvelope} className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                  <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <span className={`text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Follow</span>
            <Social links={socialLinks} />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {configFooterLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.path}
                      className={`text-xs transition-colors ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className={`max-w-lg mx-auto p-4 rounded-lg mb-6 ${isDark ? "bg-white/5" : "bg-white border border-gray-200"}`}>
          <p className={`text-sm font-semibold text-center mb-1 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Stay updated
          </p>
          <p className={`text-xs text-center mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Get the latest articles in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); setSubscribeStatus(null); }}
                placeholder="your@email.com"
                className={`w-full px-3 py-2 rounded-md text-xs transition-colors ${isDark
                  ? "bg-gray-800 text-white placeholder-gray-500 border border-gray-700"
                  : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200"
                  } focus:outline-none focus:ring-1 focus:ring-purple-500 ${emailError ? "ring-1 ring-red-500" : ""}`}
              />
              {emailError && <p className="text-red-500 text-[10px] mt-1">{emailError}</p>}
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-md text-white bg-brand-primary hover:bg-purple-700 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
          {subscribeStatus === "success" && (
            <div className="flex items-center justify-center gap-1.5 text-green-500 text-xs mt-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
              Subscribed!
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-500/10">
          <p className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            &copy; {new Date().getFullYear()} {copyrightText}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}
          >
            Back to top <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
