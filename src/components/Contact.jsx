import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Your EmailJS credentials
      const serviceID = 'service_olqygvs';
      const templateID = 'template_a6ru3s9';
      const publicKey = 'hszhse_QzXRgK_Pqr';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'aaronzimba11@gmail.com',
        reply_to: formData.email
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Get In <span className="text-blue-600">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Let's work together!</h3>
            <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll get back to you!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-blue-600">📧</span>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a 
                    href="mailto:zynergy3nt@gmail.com"
                    className={`hover:text-blue-600 transition-colors ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    zynergy3nt@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-blue-600">💬</span>
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <a 
                    href="https://wa.me/message/SI2LC2E5XXCWO1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-600 transition-colors ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Message me on WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-blue-600">📍</span>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Kitwe, Zambia</p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                required
              ></textarea>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                Failed to send message. Please try again or contact me directly via email.
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}