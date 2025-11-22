import { useState } from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Get In Touch
            </h1>
            <p className="text-gray-400 text-lg">
              Have a question or want to work together? Send me a message!
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

