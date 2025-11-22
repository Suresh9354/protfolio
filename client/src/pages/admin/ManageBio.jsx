import { useEffect, useState } from "react";
import api from "../../services/api";
import getImageUrl from "../../utils/imageUrl";

const ManageBio = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    resumeLink: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      portfolio: "",
    },
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      const response = await api.get("/bio");
      setBio(response.data);
      setFormData({
        name: response.data.name || "",
        title: response.data.title || "",
        description: response.data.description || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        location: response.data.location || "",
        resumeLink: response.data.resumeLink || "",
        socialLinks: {
          github: response.data.socialLinks?.github || "",
          linkedin: response.data.socialLinks?.linkedin || "",
          twitter: response.data.socialLinks?.twitter || "",
          portfolio: response.data.socialLinks?.portfolio || "",
        },
      });
    } catch (error) {
      console.error("Error fetching bio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const socialKey = name.split(".")[1];
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "socialLinks") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      await api.put("/bio", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ type: "success", message: "Bio updated successfully!" });
      fetchBio();
    } catch (error) {
      console.error("Bio update error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Update failed";
      setStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-white">Manage Bio</h1>

        {status.message && (
          <div
            className={`mb-4 p-4 rounded-xl border-2 ${
              status.type === "success"
                ? "bg-green-900/30 text-green-400 border-green-600"
                : "bg-red-900/30 text-red-400 border-red-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Resume/CV Link
              </label>
              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              {/* Show quick actions for the resume link (open in new tab / download) */}
              {(formData.resumeLink || bio?.resumeLink) && (
                <div className="mt-4 flex gap-3">
                  <a
                    href={formData.resumeLink || bio?.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
                  >
                    Open Resume
                  </a>
                  <a
                    href={formData.resumeLink || bio?.resumeLink}
                    download
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 transition-all"
              />
              {bio?.image && (
                <img
                  src={getImageUrl(bio.image)}
                  alt="Current profile"
                  className="mt-4 w-32 h-32 object-cover rounded-xl border-2 border-orange-500"
                />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Social Links
              </h3>
              <div className="space-y-3">
                <input
                  type="url"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <input
                  type="url"
                  name="socialLinks.portfolio"
                  value={formData.socialLinks.portfolio}
                  onChange={handleChange}
                  placeholder="Portfolio URL"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Update Bio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageBio;
