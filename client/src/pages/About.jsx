import { useEffect, useState } from "react";
import api from "../services/api";
import getImageUrl from "../utils/imageUrl";

const services = [
  {
    title: "Full‑stack Web Development",
    desc: "React, Node.js, Express, MongoDB",
    iconPath:
      "M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 3v10h10V7H6z",
  },
  {
    title: "API & Backend",
    desc: "REST, GraphQL, Authentication",
    iconPath:
      "M12 2a7 7 0 00-7 7v3H3l4 4 4-4H9V9a3 3 0 016 0v7h-2l4 4 4-4h-2v-3a7 7 0 00-7-7z",
  },
  {
    title: "Databases",
    desc: "MongoDB, PostgreSQL",
    iconPath: "M5 3h14v4H5V3z",
  },
  {
    title: "UI / UX",
    desc: "Design systems & accessibility",
    iconPath: "M12 2l3 6 6 .5-4.5 3.5z",
  },
  {
    title: "Deployment",
    desc: "Vercel, Docker, Atlas",
    iconPath: "M3 12h18v7H3z",
  },
  {
    title: "Monitoring",
    desc: "Logging & performance",
    iconPath: "M12 2a10 10 0 100 20z",
  },
];

const About = () => {
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

  const fallbackResume =
    "https://drive.google.com/uc?export=download&id=1CqlEVKiR3CuaimP38I7PCLfmPibm7pwr";
  const resumeLink = bio?.resumeLink || fallbackResume;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {bio?.image && (
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(bio.image)}
                  alt={bio.name}
                  className="w-36 h-36 md:w-48 md:h-48 rounded-2xl object-cover border-4 border-orange-500 shadow-lg"
                />
              </div>
            )}

            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold">{bio?.name || "Your Name"}</h1>
              <p className="text-orange-500 font-semibold mt-1">{bio?.title}</p>
              <p className="text-gray-300 mt-4 whitespace-pre-line">
                {bio?.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-lg font-semibold"
                  aria-label="View resume (opens in new tab)"
                >
                  <span className="inline-icon bg-black rounded-full w-6 h-6 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM13 3.5L18.5 9H13V3.5z" />
                    </svg>
                  </span>
                  View Resume
                </a>

                <a
                  href={resumeLink}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg"
                  aria-label="Download resume"
                >
                  <span className="inline-icon bg-black rounded-full w-6 h-6 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12 2a1 1 0 00-1 1v10H8l4 4 4-4h-3V3a1 1 0 00-1-1zM4 18v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                  </span>
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              What I do
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-gray-900 p-4 rounded-2xl flex items-start gap-4 border border-gray-700"
                >
                  <div className="icon-circle bg-black rounded-full w-12 h-12 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d={s.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {s.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-900 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
            <div className="space-y-3 text-gray-300">
              {bio?.email && (
                <div className="flex items-center gap-3">
                  <span className="icon-sm bg-black rounded-full w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0l8 5 8-5" />
                    </svg>
                  </span>
                  <a
                    href={`mailto:${bio.email}`}
                    className="text-orange-500"
                    aria-label={`Email ${bio.email}`}
                  >
                    {bio.email}
                  </a>
                </div>
              )}

              {bio?.phone && (
                <div className="flex items-center gap-3">
                  <span className="icon-sm bg-black rounded-full w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.86.74a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.26 2.66.74 3.86a1 1 0 01-.21 1.11l-2.2 2.2z" />
                    </svg>
                  </span>
                  <a
                    href={`tel:${bio.phone}`}
                    className="text-orange-500"
                    aria-label={`Call ${bio.phone}`}
                  >
                    {bio.phone}
                  </a>
                </div>
              )}

              {bio?.location && (
                <div className="flex items-center gap-3">
                  <span className="icon-sm bg-black rounded-full w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                    </svg>
                  </span>
                  <span>{bio.location}</span>
                </div>
              )}
            </div>

            {bio?.socialLinks && (
              <div className="mt-4 flex items-center gap-3">
                {bio.socialLinks.github && (
                  <a
                    href={bio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-circle w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full"
                    aria-label="GitHub (opens in new tab)"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.18 9.07 7.6 10.54.56.1.76-.24.76-.53 0-.26-.01-.94-.01-1.85-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.55 1.18 3.17.9.1-.71.38-1.18.69-1.45-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.12-2.98-.11-.28-.49-1.4.11-2.92 0 0 .91-.29 2.98 1.13a10.4 10.4 0 012.72-.37c.92.01 1.85.12 2.72.37 2.07-1.42 2.98-1.13 2.98-1.13.6 1.52.22 2.64.11 2.92.7.78 1.12 1.77 1.12 2.98 0 4.27-2.6 5.22-5.08 5.5.39.34.73 1.01.73 2.04 0 1.48-.01 2.67-.01 3.03 0 .29.2.64.77.53 4.43-1.47 7.6-5.64 7.6-10.54C23.25 5.48 18.27.5 12 .5z" />
                    </svg>
                  </a>
                )}
                {bio.socialLinks.linkedin && (
                  <a
                    href={bio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-circle w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full"
                    aria-label="LinkedIn (opens in new tab)"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8h4.17V24H.4zM8.98 8h3.99v2.2h.06c.56-1.06 1.93-2.2 3.98-2.2 4.25 0 5.04 2.8 5.04 6.44V24h-4.17v-7.03c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.82-2.7 3.7V24H8.98z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
