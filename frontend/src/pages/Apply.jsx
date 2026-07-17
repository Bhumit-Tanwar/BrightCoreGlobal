import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Award, AlertCircle } from 'lucide-react';

const COURSE_OPTIONS = {
  "Management": [
    "D.B.M (Diploma in Business Management)",
    "A.D.B.M (Advance Diploma in Business Management)"
  ],
  "Computer": [
    "D.C.A (Diploma in Computer Applications)",
    "C.T.T (Computer Teacher Training)",
    "CADD (Computer-Aided Design and Drafting)",
    "Certificate in Information Technology",
    "P.G.D.C.A (Post Graduate Diploma)",
    "Diploma in Software Engineering",
    "Advanced Diploma in Software Engineering"
  ],
  "Technical": [
    "Plumber", "Carpenter", "Fitter", "Electrician", "Welder", 
    "Painting", "Beauty Parlour", "Diesel Mechanic", "Air Condition & Refrigerator"
  ],
  "Accounting": [
    "Diploma in Computer Accounts", "Diploma in Manual Accounting",
    "Diploma in Management Accountant", "Diploma in Public Accountant",
    "Diploma in Financial Planner", "Diploma in Tax Preparation",
    "Diploma in Tax Fraud/Forensic Training"
  ],
  "Hotel & Hospitality": [
    "Certificate Courses (Hotel Mgt, Food Production, etc.)",
    "1-Year Diploma (Hospitality, Travel, Catering, etc.)",
    "2-Year Advance Diploma (Hospitality, Event, etc.)"
  ],
  "Health & Care": [
    "Nutrition & Dietetics", "Support Roles", "Old Age / Day Care", "Nanny Care"
  ],
  "Engineering & Technology": [
    "ITI Courses (All Trades)",
    "Diploma in Mechanical Engineering",
    "Diploma in Electrical Engineering",
    "Diploma in Civil Engineering",
    "Diploma in IT/Computer Science",
    "Diploma in Automobile Engineering",
    "Other Engineering Diplomas"
  ],
  "Agriculture": [
    "Botany", "Agriculture Management", "Horticulture", 
    "Agriculture Engineering", "Food Science/Technology"
  ]
};

const Apply = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    'First Name': '',
    'Last Name': '',
    'Email': '',
    'Phone': '',
    'Address': '',
    'State': '',
    'Country': '',
    'Pincode': '',
    'Course': '',
    'Message': ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7YKt3XpiXFnbFopmodZZDHngpBjL0CGkdfwFB1_KCSFo_csAXuhfx95MtC9GzEsHM/exec';

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseParam = searchParams.get('course');
    if (courseParam) {
      setFormData(prev => ({ ...prev, 'Course': courseParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // URLSearchParams use karenge, ye Google Sheet ke liye best hai
    const formBody = new URLSearchParams();
    for (const key in formData) {
      formBody.append(key, formData[key]);
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors', // CORS error block karega
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setIsSuccess(true);

      setFormData({
        'First Name': '', 'Last Name': '', 'Email': '', 'Phone': '',
        'Address': '', 'State': '', 'Country': '', 'Pincode': '',
        'Course': '', 'Message': ''
      });

    } catch (err) {
      console.error(err);
      setError('Connection error. Please check your internet or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border-b-2 border-white/20 px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-[#BE9A4A] focus:bg-white/10 transition-all peer text-sm md:text-base";
  const labelClasses = "absolute left-4 top-2 text-xs font-semibold text-[#BE9A4A] uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#BE9A4A] pointer-events-none";

  return (
    <div className="w-full min-h-screen bg-[#031B33] relative pt-32 pb-24 overflow-hidden font-sans">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#BE9A4A]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#e6ca8a]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">Apply for Admission</h1>
            <p className="text-white/80 text-lg">Take the first step towards a brilliant international career.</p>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BE9A4A] to-[#e6ca8a]"></div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8 flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-400" /> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input type="text" id="First Name" name="First Name" required value={formData['First Name']} onChange={handleChange} className={inputClasses} placeholder="First Name" />
                      <label htmlFor="First Name" className={labelClasses}>First Name</label>
                    </div>
                    <div className="relative">
                      <input type="text" id="Last Name" name="Last Name" required value={formData['Last Name']} onChange={handleChange} className={inputClasses} placeholder="Last Name" />
                      <label htmlFor="Last Name" className={labelClasses}>Last Name</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input type="email" id="Email" name="Email" required value={formData['Email']} onChange={handleChange} className={inputClasses} placeholder="Email Address" />
                      <label htmlFor="Email" className={labelClasses}>Email Address</label>
                    </div>
                    <div className="relative">
                      <input type="tel" id="Phone" name="Phone" required value={formData['Phone']} onChange={handleChange} className={inputClasses} placeholder="Phone Number" />
                      <label htmlFor="Phone" className={labelClasses}>Phone Number</label>
                    </div>
                  </div>

                  <div className="relative">
                    <input type="text" id="Address" name="Address" required value={formData['Address']} onChange={handleChange} className={inputClasses} placeholder="Full Address" />
                    <label htmlFor="Address" className={labelClasses}>Full Address</label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="relative">
                      <input type="text" id="State" name="State" required value={formData['State']} onChange={handleChange} className={inputClasses} placeholder="State" />
                      <label htmlFor="State" className={labelClasses}>State</label>
                    </div>
                    <div className="relative">
                      <input type="text" id="Country" name="Country" required value={formData['Country']} onChange={handleChange} className={inputClasses} placeholder="Country" />
                      <label htmlFor="Country" className={labelClasses}>Country</label>
                    </div>
                    <div className="relative">
                      <input type="text" id="Pincode" name="Pincode" required value={formData['Pincode']} onChange={handleChange} className={inputClasses} placeholder="Pincode" />
                      <label htmlFor="Pincode" className={labelClasses}>Pincode</label>
                    </div>
                  </div>

                  <div className="relative">
                    <select id="Course" name="Course" required value={formData['Course']} onChange={handleChange} className={`w-full bg-white/5 border-b-2 border-white/20 px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[#BE9A4A] focus:bg-[#031B33] transition-all peer appearance-none ${!formData['Course'] && 'text-white/60'}`}>
                      <option value="" disabled className="text-gray-500">Select a course...</option>
                      
                      {Object.entries(COURSE_OPTIONS).map(([category, courses]) => (
                        <optgroup key={category} label={category} className="text-[#031B33] bg-white font-bold">
                          {courses.map((courseName, idx) => (
                            <option key={idx} value={courseName} className="font-normal">{courseName}</option>
                          ))}
                        </optgroup>
                      ))}
                      
                      <optgroup label="Other" className="text-[#031B33] bg-white font-bold">
                        <option value="Other / Not Sure Yet" className="font-normal">Other / Not Sure Yet</option>
                      </optgroup>
                    </select>
                    <label htmlFor="Course" className="absolute left-4 top-2 text-xs font-semibold text-[#BE9A4A] uppercase tracking-wider">Course Selection</label>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#BE9A4A]">▼</div>
                  </div>

                  <div className="relative">
                    <textarea id="Message" name="Message" rows="3" value={formData['Message']} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Message / Experience (Optional)"></textarea>
                    <label htmlFor="Message" className={labelClasses}>Message / Experience (Optional)</label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#BE9A4A] text-[#031B33] font-bold text-lg hover:bg-white hover:shadow-[0_0_20px_rgba(190,154,74,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? 'Processing Application...' : 'Submit Application'}
                      {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-md p-12 rounded-3xl border border-[#BE9A4A] text-center shadow-[0_0_50px_rgba(190,154,74,0.15)] relative overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-[#BE9A4A]/20 flex items-center justify-center mx-auto mb-6 text-[#BE9A4A]"
                >
                  <CheckCircle size={48} />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                  Thank you, <span className="font-semibold text-white">{formData['First Name']}</span>. We have received your inquiry. Our admission counselors will contact you shortly to process your application.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 rounded-full border border-[#BE9A4A] text-[#BE9A4A] hover:bg-[#BE9A4A] hover:text-[#031B33] transition-all font-semibold"
                >
                  Submit Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Apply;