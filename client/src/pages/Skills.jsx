import { useEffect, useState } from 'react';
import SkillCard from '../components/SkillCard';
import api from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

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
            My Skills
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-800 rounded-2xl border border-gray-700">
              <p className="text-xl text-gray-400">No skills available yet.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
                  {category}
                </h2>
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
    </div>
  );
};

export default Skills;

