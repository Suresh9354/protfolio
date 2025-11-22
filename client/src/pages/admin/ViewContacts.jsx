import { useEffect, useState } from 'react';
import api from '../../services/api';

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      fetchContacts();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await api.delete(`/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
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
        <h1 className="text-5xl font-bold mb-8 text-white">Contact Messages</h1>

        {contacts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-800 rounded-2xl border border-gray-700">
              <p className="text-xl text-gray-400">No contact messages yet.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`bg-gray-800 rounded-xl shadow-lg p-6 border-2 ${
                  !contact.read ? 'border-l-4 border-l-orange-500 border-r-2 border-t-2 border-b-2 border-gray-700' : 'border-gray-700'
                } hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <p className="text-gray-400">{contact.email}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!contact.read && (
                    <span className="bg-orange-500/20 text-orange-400 border-2 border-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                <div className="flex space-x-2">
                  {!contact.read && (
                    <button
                      onClick={() => handleMarkRead(contact._id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewContacts;

