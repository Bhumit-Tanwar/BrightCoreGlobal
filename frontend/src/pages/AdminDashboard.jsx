import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    certificateId: '',
    studentName: '',
    studentEmail: '',
    courseName: '',
    issueDate: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://brightglobal-repo-production.up.railway.app/api/certificates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Certificate added successfully!' });
        setFormData({ certificateId: '', studentName: '', studentEmail: '', courseName: '', issueDate: '' }); // Reset form
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to add certificate' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Server connection error.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#031B33]">Admin Dashboard</h1>
            <p className="text-slate-500">Upload new student certificates</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
          <h2 className="text-xl font-bold text-[#031B33] mb-6 flex items-center gap-2">
            <PlusCircle className="text-[#BE9A4A]" /> Add New Certificate
          </h2>

          {status.message && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Certificate ID *</label>
              <input type="text" name="certificateId" value={formData.certificateId} onChange={handleChange} required placeholder="e.g. BC-2026-001" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name *</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Student Email *</label>
              <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} required placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Course Enrolled *</label>
              <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required placeholder="Advanced Diploma in Tech" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Date *</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A]" />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={isLoading} className="w-full bg-[#031B33] text-white font-bold py-3.5 rounded-xl hover:bg-[#BE9A4A] transition-colors disabled:opacity-70">
                {isLoading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;