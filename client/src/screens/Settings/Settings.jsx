import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCamera,
    faMapMarkerAlt,
    faInfoCircle,
    faEnvelope,
    faCheck,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
    const { user, updateUser } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [formData, setFormData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        location: user?.location || "",
        photoURL: user?.photoURL || ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.photoURL || null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setSuccess(false);
        }
    };

    const uploadImage = () => {
        return new Promise((resolve, reject) => {
            if (!imageFile) return resolve(formData.photoURL);

            const storageRef = ref(storage, `profiles/${user._id || Date.now()}_${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            let finalPhotoURL = formData.photoURL;

            if (imageFile) {
                finalPhotoURL = await uploadImage();
            }

            const updatedData = {
                ...formData,
                photoURL: finalPhotoURL
            };

            // Update in context and localStorage
            updateUser(updatedData);

            setSuccess(true);
            setUploadProgress(0);
            setImageFile(null);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${isDark ? "bg-gray-900 border border-white/5" : "bg-white border border-black/5"}`}>
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className={`w-40 h-40 rounded-3xl overflow-hidden border-4 ${isDark ? "border-purple-500/30" : "border-purple-100"} shadow-2xl relative transition-transform duration-500 group-hover:scale-[1.02]`}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-5xl font-bold ${isDark ? "bg-white/5 text-purple-400" : "bg-purple-50 text-purple-600"}`}>
                                        {formData.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}

                                {loading && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <FontAwesomeIcon icon={faSpinner} className="text-white text-3xl animate-spin" />
                                            <span className="text-white text-xs font-bold">{Math.round(uploadProgress)}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => fileInputRef.current.click()}
                                className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all duration-300 ${isDark ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-purple-600 text-white hover:bg-purple-700"}`}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className={`text-4xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Account Settings</h1>
                            <p className={`text-sm font-semibold opacity-60`}>Update your profile information and how you appear on HexaBlog.</p>

                            {success && (
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-left-4">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Profile updated successfully!
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-3">
                                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faUser} className="text-purple-500" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300 border ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
                                />
                            </div>

                            {/* Email (Read Only) */}
                            <div className="space-y-3">
                                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className={`w-full px-5 py-4 rounded-2xl opacity-50 cursor-not-allowed border ${isDark ? "bg-white/5 border-white/10 text-gray-500" : "bg-gray-100 border-transparent text-gray-500"}`}
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-3">
                                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. New York, USA"
                                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300 border ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
                                />
                            </div>

                            {/* Bio */}
                            <div className="space-y-3 md:col-span-2">
                                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-orange-500" />
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                    className={`w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300 border resize-none ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-10 py-4 rounded-2xl font-black text-white shadow-2xl transition-all duration-300 flex items-center gap-3 ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-purple-500/40"} ${isDark ? "bg-purple-600" : "bg-purple-600"}`}
                            >
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        Save Changes
                                        <FontAwesomeIcon icon={faCheck} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
