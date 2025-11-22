import { useEffect, useState } from 'react';
import api from '../services/api';
import getImageUrl from '../utils/imageUrl';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import ContactForm from '../components/ContactForm';

const Home = () => {
  const [bio, setBio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bioResponse, projectsResponse, skillsResponse] = await Promise.all([
          api.get('/bio'),
          api.get('/projects'),
          api.get('/skills')
        ]);
        setBio(bioResponse.data);
        setProjects(projectsResponse.data);
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const displaySkills = skills.slice(0, 7);
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Introduction */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-6xl md:text-7xl font-bold">Hello.</h2>
                <span className="w-3 h-3 bg-orange-500 rounded-full mt-4"></span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-orange-500"></div>
                <h3 className="text-4xl md:text-5xl font-bold">I'm {bio?.name?.split(' ')[0] || 'Your Name'}</h3>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                {bio?.title || 'Software Developer'}
              </h1>
              
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                {bio?.description || 'Welcome to my portfolio website.'}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-all duration-300 transform hover:scale-105"
                >
                  Got a project?
                </button>
                {bio?.resumeLink && (
                  <a
                    href={bio.resumeLink}
                    download
                    className="px-6 py-3 border-2 border-white hover:bg-white hover:text-[#1a1a1a] text-white font-semibold rounded transition-all duration-300 transform hover:scale-105"
                  >
                    My resume
                  </a>
                )}
              </div>
            </div>

            {/* Right Side - Portrait */}
            <div className="relative flex justify-center items-center">
              {bio?.image && (
                <div className="relative">
                  <div className="absolute inset-0 w-full h-full rounded-full border-4 border-orange-500 opacity-30 animate-pulse"></div>
                  <div className="absolute inset-0 w-full h-full rounded-full border-4 border-orange-500 opacity-20 blur-xl"></div>
                  <div className="relative z-10">
                    <img
                      src={getImageUrl(bio.image)}
                      alt={bio.name}
                      className="w-80 h-80 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
                    />
                  </div>
                  <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-gray-600 text-6xl font-thin">
                    &lt;
                  </div>
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-gray-600 text-6xl font-thin">
                    &gt;
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills/Technologies Bar */}
      {displaySkills.length > 0 && (
        <div className="border-t border-b border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-gray-400">
              {displaySkills.map((skill, index) => (
                <span 
                  key={skill._id || index}
                  className="text-lg font-medium hover:text-orange-500 transition-colors cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services and About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Services */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-orange-500"></div>
              <div className="space-y-8 pl-12">
                <div className="relative">
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Website Development</h3>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">App Development</h3>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Website Hosting</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - About Me */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">About me</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                {bio?.description || 'I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.'}
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">120+</div>
                  <div className="text-sm text-gray-400">Completed Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-sm text-gray-400">Client satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">10+</div>
                  <div className="text-sm text-gray-400">Years of experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">My Projects</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore my latest work and creative projects
            </p>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-gray-800 rounded-2xl">
                <p className="text-xl text-gray-400">No projects available yet.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">My Skills</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>
          
          <div className="flex justify-center mb-12 flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {Object.keys(groupedSkills).length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-gray-800 rounded-2xl">
                <p className="text-xl text-gray-400">No skills available yet.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                    <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill) => (
                      <SkillCard key={skill._id} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-400">
                Have a question or want to work together? Send me a message!
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
