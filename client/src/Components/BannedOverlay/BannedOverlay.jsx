import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { sendMessageToAdmin } from "../../helper/messageApi";
import toast from "react-hot-toast";

const BannedOverlay = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            toast.error("Please enter a message");
            return;
        }
        setSending(true);
        try {
            await sendMessageToAdmin(text.trim());
            toast.success("Message sent to admin");
            setText("");
            setSent(true);
        } catch (err) {
            toast.error(err.message || "Failed to send message");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto py-12 px-4 text-center">
            <div className={`p-8 rounded-md border ${isDark ? "bg-gray-900/90 border-gray-700" : "bg-white border-gray-200"}`}>
                <div className={`text-5xl mb-4 ${isDark ? "text-red-400" : "text-red-500"}`}>&#9888;</div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Account Suspended
                </h2>
                <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Your account has been banned by an administrator. You cannot create blogs,
                    comments, or likes. If you believe this is a mistake, please contact the admin below.
                </p>

                {sent ? (
                    <div className={`p-4 rounded-md ${isDark ? "bg-green-900/20 border border-green-800/50" : "bg-green-50 border border-green-200"}`}>
                        <p className={`font-semibold text-sm ${isDark ? "text-green-400" : "text-green-600"}`}>
                            Your message has been sent. An admin will review it.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Explain why you think you should be unbanned..."
                            rows={4}
                            className={`w-full px-4 py-3 rounded-md text-sm resize-none focus:outline-none border transition-colors ${isDark
                                ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500 focus:border-purple-500"
                                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                            }`}
                        />
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? "Sending..." : "Send Message to Admin"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BannedOverlay;
