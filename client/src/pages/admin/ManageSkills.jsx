import { useEffect, useState } from 'react';
import api from '../../services/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    icon: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill._id}`, formData);
        setStatus({ type: 'success', message: 'Skill updated successfully!' });
      } else {
        await api.post('/skills', formData);
        setStatus({ type: 'success', message: 'Skill created successfully!' });
      }

      fetchSkills();
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Operation failed'
      });
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await api.delete(`/skills/${id}`);
      setStatus({ type: 'success', message: 'Skill deleted successfully!' });
      fetchSkills();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to delete skill' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 50,
      icon: ''
    });
    setEditingSkill(null);
    setShowForm(false);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-white">Manage Skills</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? 'Cancel' : 'Add New Skill'}
          </button>
        </div>

        {status.message && (
          <div className={`mb-4 p-4 rounded-xl border-2 ${
            status.type === 'success' 
              ? 'bg-green-900/30 text-green-400 border-green-600' 
              : 'bg-red-900/30 text-red-400 border-red-600'
          }`}>
            {status.message}
          </div>
        )}

        {showForm && (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
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
                <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Proficiency: <span className="text-orange-500 font-bold">{formData.proficiency}%</span>
                </label>
                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Icon (emoji or text)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="💻 or icon text"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {editingSkill ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                {skill.icon && <span className="text-3xl">{skill.icon}</span>}
              </div>
              <p className="text-gray-400 mb-2">Category: <span className="text-orange-500">{skill.category}</span></p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-400 mb-4">Proficiency: <span className="text-white font-semibold">{skill.proficiency}%</span></p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;

