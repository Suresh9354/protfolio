import { useEffect, useState } from 'react';
import api from '../../services/api';
import getImageUrl from '../../utils/imageUrl';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'technologies') {
          submitData.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim())));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setStatus({ type: 'success', message: 'Project updated successfully!' });
      } else {
        await api.post('/projects', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setStatus({ type: 'success', message: 'Project created successfully!' });
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Operation failed'
      });
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      featured: project.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      setStatus({ type: 'success', message: 'Project deleted successfully!' });
      fetchProjects();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to delete project' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });
    setImageFile(null);
    setEditingProject(null);
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
          <h1 className="text-5xl font-bold text-white">Manage Projects</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? 'Cancel' : 'Add New Project'}
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
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
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
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Live Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  />
                  Featured
                </label>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {editingProject ? 'Update' : 'Create'}
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
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {project.image && (
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;

