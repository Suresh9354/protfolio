import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            My Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and creative projects
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-800 rounded-2xl border border-gray-700">
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
    </div>
  );
};

export default Projects;

