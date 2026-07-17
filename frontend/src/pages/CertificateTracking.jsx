import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, Award, Calendar, User, Mail, AlertCircle, Eye, Download } from 'lucide-react';

const CertificateTracking = () => {
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setCertificateData(null);
    setError(null);

    try {
      const response = await fetch(`https://brightcoreglobal-production.up.railway.app/api/certificates/verify/${searchId.trim()}`);

      if (response.ok) {
        const data = await response.json();
        setCertificateData(data);
      } else if (response.status === 404) {
        setError('not-found');
      } else {
        setError('server-error');
      }
    } catch (err) {
      console.error("Verification Error:", err);
      setError('network-error');
    } finally {
      setIsSearching(false);
    }
  };

  // Function to create a force-download URL for Cloudinary images
  const getDownloadUrl = (url) => {
    if (!url) return '#';
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
      }
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#031B33] mb-4">Certificate Verification</h1>
            <p className="text-slate-600 text-lg">Verify the authenticity of Brightcore Global Academy certificates.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,31,91,0.08)] p-8 md:p-12 border-t-4 border-[#BE9A4A] relative z-10"
          >
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <div className="absolute left-6 text-[#031B33]">
                  <Award size={24} />
                </div>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., BC-2026-001)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-full py-5 pl-16 pr-40 text-lg focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all shadow-inner text-[#031B33] uppercase"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-2 bottom-2 px-8 bg-[#031B33] text-white rounded-full font-semibold hover:bg-[#BE9A4A] transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Award size={20} />
                    </motion.div>
                  ) : (
                    <>Verify <Search size={18} /></>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-12 min-h-[300px]">
              <AnimatePresence mode="wait">

                {/* Default State */}
                {!certificateData && !error && !isSearching && (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 py-12"
                  >
                    <Search size={64} className="mb-4 opacity-20" />
                    <p className="text-lg">Enter a valid Certificate ID to view records.</p>
                  </motion.div>
                )}

                {/* Success State */}
                {certificateData && (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-green-600">
                      <Award size={120} />
                    </div>

                    <div className="flex items-start gap-4 mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                        <CheckCircle size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-800 mb-1">Certificate Verified</h3>
                        <p className="text-green-700 font-medium">This certificate is authentic and officially issued by Brightcore Global Academy.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 shadow-sm border border-green-100 relative z-10">
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Student Name</p>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#031B33]">
                          <User size={18} className="text-[#BE9A4A]" /> {certificateData.studentName}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Student Email</p>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#031B33]">
                          <Mail size={18} className="text-[#BE9A4A]" /> {certificateData.studentEmail}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Course Enrolled</p>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#031B33]">
                          <Award size={18} className="text-[#BE9A4A]" /> {certificateData.courseName}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Issue Date</p>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#031B33]">
                          <Calendar size={18} className="text-[#BE9A4A]" /> {new Date(certificateData.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Certificate ID</p>
                        <div className="text-lg font-bold text-[#031B33] font-mono bg-slate-100 px-3 py-1 rounded inline-block">
                          {certificateData.certificateId}
                        </div>
                      </div>

                      {/* View & Download Buttons Logic */}
                      <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {certificateData.certificateUrl ? (
                          <>
                            <a
                              href={certificateData.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white border-2 border-[#031B33] text-[#031B33] px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                              <Eye size={18} /> View Original
                            </a>

                            <a
                              href={getDownloadUrl(certificateData.certificateUrl)}
                              download={`Certificate_${certificateData.certificateId}`}
                              className="bg-[#031B33] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#BE9A4A] transition-colors shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                              <Download size={18} /> Download Certificate
                            </a>
                          </>
                        ) : (
                          <div className="text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm font-medium border border-amber-200 w-full text-center">
                            ⚠️ The original certificate file is currently unavailable for this record.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Errors */}
                {error === 'not-found' && (
                  <motion.div
                    key="not-found"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-200 rounded-2xl p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 mx-auto mb-6 shadow-sm">
                      <XCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">Record Not Found</h3>
                    <p className="text-red-600 max-w-md mx-auto">We couldn't find any certificate matching the ID "{searchId}". Please check the ID and try again.</p>
                  </motion.div>
                )}

                {error === 'network-error' && (
                  <motion.div
                    key="network-error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mx-auto mb-6 shadow-sm">
                      <AlertCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-2">Connection Error</h3>
                    <p className="text-amber-700 max-w-md mx-auto">Unable to connect to the verification server. Please check your internet connection or try again later.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CertificateTracking;