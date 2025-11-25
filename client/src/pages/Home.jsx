import { useEffect, useState } from "react";
import api from "../services/api";
import getImageUrl from "../utils/imageUrl";

const Home = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await api.get("/bio");
        setBio(res.data);
      } catch (err) {
        console.error("Error fetching bio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4" />
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] text-white">
      {/* HERO SECTION (HOME) */}
      <section
        id="home"
        className="min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: intro */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight">
                  Hello<span className="text-orange-500">.</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                <h3 className="text-4xl md:text-5xl font-semibold">
                  I&apos;m {bio?.name?.split(" ")[0] || "Your Name"}
                </h3>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {bio?.title || "Software Developer"}
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                {bio?.description || "Welcome to my portfolio website."}
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Got a project?
                </button>
                {bio?.resumeLink && (
                  <a
                    href={
                      bio.resumeLink.includes("export=download")
                        ? bio.resumeLink.replace(
                            "export=download",
                            "export=view"
                          )
                        : bio.resumeLink
                    }
                    className="px-7 py-3 border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-white font-semibold rounded-xl transition-all duration-300 transform"
                  >
                    My resume
                  </a>
                )}
              </div>
            </div>

            {/* Right: portrait */}
            <div className="relative flex justify-center items-center">
              {bio?.image && (
                <div className="relative">
                  <div className="absolute -inset-6 md:-inset-10 rounded-full bg-gradient-to-br from-transparent via-orange-700/30 to-transparent opacity-40 blur-3xl" />
                  <div className="absolute inset-0 rounded-full border-4 border-orange-600 opacity-30" />
                  <div className="absolute inset-6 md:inset-8 rounded-full border-8 border-orange-700/20 blur-xl" />

                  <div className="relative z-10">
                    <img
                      src={getImageUrl(bio?.image)}
                      alt={bio?.name}
                      className="w-56 h-56 md:w-96 md:h-96 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
                    />
                  </div>

                  <div className="absolute -left-10 top-1/3 transform text-gray-600 text-6xl font-thin">
                    &lt;
                  </div>
                  <div className="absolute -right-10 bottom-1/3 transform text-gray-600 text-6xl font-thin">
                    &gt;
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
