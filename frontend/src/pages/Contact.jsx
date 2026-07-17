import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    'First Name': '',
    'Last Name': '',
    'Email': '',
    'Subject': '',
    'Message': ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // NAYI GOOGLE SHEET KA URL YAHAN DAALNA HAI
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwx5hvTKdQ4PyrE0CjlJfixUoufIX1ttem4tLPxPJOVNc--L739YPzNxRk_-9nNUdumsw/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Prepare data
    const formBody = new URLSearchParams();
    for (const key in formData) {
      formBody.append(key, formData[key]);
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors', // Solves the CORS issue
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setIsSuccess(true);
      // Reset Form
      setFormData({
        'First Name': '', 'Last Name': '', 'Email': '', 'Subject': '', 'Message': ''
      });
      
      // 5 seconds baad success message hata kar wapas form dikha denge
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] font-sans">
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#031B33] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE9A4A]/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We are here to answer your questions and guide you through your educational journey.
          </motion.p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#031B33] mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#BE9A4A] shrink-0 border border-slate-100">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#031B33] mb-1">Our Headquarters</h3>
                    <p className="text-gray-600">123 Global Education Avenue<br/>Innovation District, NY 10001, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#BE9A4A] shrink-0 border border-slate-100">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#031B33] mb-1">Phone Number</h3>
                    <p className="text-gray-600">+1 (800) 123-4567<br/>+1 (800) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#BE9A4A] shrink-0 border border-slate-100">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#031B33] mb-1">Email Address</h3>
                    <p className="text-gray-600">admissions@brightcore.edu<br/>info@brightcore.edu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#BE9A4A] shrink-0 border border-slate-100">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#031B33] mb-1">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#031B33] to-[#BE9A4A] rounded-t-3xl"></div>
            
            <h2 className="text-3xl font-bold text-[#031B33] mb-8">Send a Message</h2>
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3">
                  <AlertCircle size={20} /> {error}
                </motion.div>
              )}

              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="bg-green-50 text-green-700 p-8 rounded-2xl text-center border border-green-100 py-16"
                >
                  <CheckCircle size={60} className="mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <input type="text" name="First Name" required value={formData['First Name']} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <input type="text" name="Last Name" required value={formData['Last Name']} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input type="email" name="Email" required value={formData['Email']} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input type="text" name="Subject" required value={formData['Subject']} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]" placeholder="How can we help?" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea name="Message" required rows="5" value={formData['Message']} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all resize-none text-[#031B33]" placeholder="Your message here..."></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#031B33] text-white rounded-xl font-bold text-lg hover:bg-[#BE9A4A] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;