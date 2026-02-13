import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "../../helper/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
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
    const [uploadProgress, setUploadProgress] = useState(0);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        const updateToast = toast.loading("Updating profile...");

        try {
            let finalPhotoURL = formData.photoURL;

            if (imageFile) {
                finalPhotoURL = await uploadImage();
            }

            const updatedData = {
                ...formData,
                photoURL: finalPhotoURL
            };

            // Persist to backend
            await updateProfile(updatedData);

            // Update in context and localStorage
            updateUser(updatedData);

            toast.success("Profile updated successfully!", { id: updateToast });
            setUploadProgress(0);
            setImageFile(null);
        } catch (error) {
            toast.error("Failed to update profile", { id: updateToast });
            console.error("Failed to update profile", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
            <div className={`rounded-md shadow-md overflow-hidden transition-all duration-500 ${isDark ? "bg-gray-900 border border-white/5" : "bg-white border border-black/5"}`}>
                <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 mb-5">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden border-2 ${isDark ? "border-purple-500/30" : "border-purple-100"} shadow-sm relative`}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${isDark ? "bg-white/5 text-brand-tertiary" : "bg-purple-50 text-brand-primary"}`}>
                                        {formData.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}

                                {loading && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <FontAwesomeIcon icon={faSpinner} className="text-white text-xl animate-spin" />
                                            <span className="text-white text-xs font-bold">{Math.round(uploadProgress)}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => fileInputRef.current.click()}
                                className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-md flex items-center justify-center shadow-sm text-sm transition-all duration-300 ${isDark ? "bg-brand-primary text-white hover:bg-purple-500" : "bg-brand-primary text-white hover:bg-purple-700"}`}
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
                            <h1 className={`text-lg sm:text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Account Settings</h1>
                            <p className={`text-xs opacity-60`}>Update your profile information.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faUser} className="text-brand-secondary" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className={`w-full px-3 py-2.5 rounded-md text-sm outline-none transition-all duration-300 border ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
                                />
                            </div>

                            {/* Email (Read Only) */}
                            <div className="space-y-1.5">
                                <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className={`w-full px-3 py-2.5 rounded-md text-sm opacity-50 cursor-not-allowed border ${isDark ? "bg-white/5 border-white/10 text-gray-500" : "bg-gray-100 border-transparent text-gray-500"}`}
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-1.5">
                                <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. New York, USA"
                                    className={`w-full px-3 py-2.5 rounded-md text-sm outline-none transition-all duration-300 border ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
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
                                    rows="3"
                                    placeholder="Tell us about yourself..."
                                    className={`w-full px-3 py-2.5 rounded-md text-sm outline-none transition-all duration-300 border resize-none ${isDark ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50" : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30"}`}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-3 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm transition-all duration-300 flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""} bg-brand-primary hover:bg-purple-700`}
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
