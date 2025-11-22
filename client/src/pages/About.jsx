import { useEffect, useState } from "react";
import api from "../services/api";
import getImageUrl from "../utils/imageUrl";

const About = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await api.get("/bio");
        setBio(response.data);
      } catch (error) {
        console.error("Error fetching bio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  // Fallback resume link (uses seeded Drive link if bio.resumeLink is missing)
  const fallbackResume =
    "https://drive.google.com/uc?export=download&id=1CqlEVKiR3CuaimP38I7PCLfmPibm7pwr";
  const resumeLink = bio?.resumeLink || fallbackResume;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              About Me
            </h1>
            <p className="text-gray-400 text-lg">Get to know me better</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-8">
              {bio?.image && (
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-2xl opacity-20"></div>
                    <img
                      src={getImageUrl(bio.image)}
                      alt={bio.name}
                      className="relative w-64 h-64 rounded-2xl object-cover shadow-xl border-2 border-orange-500 transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              )}

              <div className="flex-grow">
                <h2 className="text-4xl font-bold mb-2 text-white">
                  {bio?.name || "Your Name"}
                </h2>
                <p className="text-2xl text-orange-500 mb-6 font-semibold">
                  {bio?.title || "Your Title"}
                </p>

                <div className="prose max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line mb-6">
                    {bio?.description || "Add your description here."}
                  </p>
                </div>

                <div className="mt-8 space-y-3 p-6 bg-gray-700/50 rounded-xl border border-gray-600">
                  {bio?.email && (
                    <p className="text-gray-300 flex items-center gap-2">
                      <span className="font-semibold text-white">Email:</span>
                      <a
                        href={`mailto:${bio.email}`}
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {bio.email}
                      </a>
                    </p>
                  )}
                  {bio?.phone && (
                    <p className="text-gray-300 flex items-center gap-2">
                      <span className="font-semibold text-white">Phone:</span>
                      <a
                        href={`tel:${bio.phone}`}
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {bio.phone}
                      </a>
                    </p>
                  )}
                  {bio?.location && (
                    <p className="text-gray-300 flex items-center gap-2">
                      <span className="font-semibold text-white">
                        Location:
                      </span>
                      <span>{bio.location}</span>
                    </p>
                  )}
                </div>

                {resumeLink && (
                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-all duration-300"
                    >
                      View Resume
                    </a>
                    <a
                      href={resumeLink}
                      download
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-all duration-300"
                    >
                      Download Resume
                    </a>
                  </div>
                )}

                {bio?.socialLinks && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Connect with me
                    </h3>
                    <div className="flex space-x-4">
                      {bio.socialLinks.github && (
                        <a
                          href={bio.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 transform"
                          title="GitHub"
                        >
                          <span className="text-lg">GitHub</span>
                        </a>
                      )}
                      {bio.socialLinks.linkedin && (
                        <a
                          href={bio.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 transform"
                          title="LinkedIn"
                        >
                          <span className="text-lg">LinkedIn</span>
                        </a>
                      )}
                      {bio.socialLinks.twitter && (
                        <a
                          href={bio.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 transform"
                          title="Twitter"
                        >
                          <span className="text-lg">Twitter</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
