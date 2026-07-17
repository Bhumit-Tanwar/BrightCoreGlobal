import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, X, FileText, User, UploadCloud, CheckCircle, AlertCircle, Edit, Eye } from 'lucide-react';

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const CLOUDINARY_UPLOAD_PRESET = 'default';
  const CLOUDINARY_CLOUD_NAME = 'de6hrb6io';

  const [searchRoll, setSearchRoll] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [issueDate, setIssueDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [editData, setEditData] = useState(null);
  const [editFile, setEditFile] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('https://brightglobal-repo-production.up.railway.app/api/certificates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (err) {
      console.error("Error fetching certificates", err);
    }
  };

  const handleStudentSearch = async (e) => {
    e.preventDefault();
    if (!searchRoll.trim()) return;
    setStatus({ type: '', message: '' });
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`https://brightglobal-repo-production.up.railway.app/api/students/${searchRoll}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudentData(data);
      } else {
        setStatus({ type: 'error', message: 'No student found with this ID.' });
        setStudentData(null);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Error searching database.' });
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.error) {
        alert("Cloudinary Upload Error: " + data.error.message);
        return null;
      }
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      alert("Network error while uploading image.");
      return null;
    }
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    if (!studentData || !selectedFile || !issueDate) {
      setStatus({ type: 'error', message: 'Please complete all fields and select a file.' });
      return;
    }
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const fileUrl = await uploadToCloudinary(selectedFile);
      
      // Safety check: Agar image upload nahi hui toh process rok do
      if (!fileUrl) {
        setStatus({ type: 'error', message: 'Image upload failed. Certificate not saved.' });
        setIsLoading(false);
        return;
      }

      // CLIENT REQUIREMENT: Random ID hata kar Enrollment Number use kiya
      const generatedCertId = studentData.enrollmentNumber;

      const certificateRecord = {
        certificateId: generatedCertId,
        rollNumber: studentData.rollNumber,
        studentName: `${studentData.firstName} ${studentData.lastName}`,
        studentEmail: studentData.email,
        courseName: studentData.enrolledProgram,
        issueDate: issueDate,
        certificateUrl: fileUrl
      };

      const token = localStorage.getItem('adminToken');
      const dbRes = await fetch('https://brightglobal-repo-production.up.railway.app/api/certificates/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(certificateRecord)
      });

      if (dbRes.ok) {
        fetchCertificates();
        closeAddModal();
      } else {
        const errData = await dbRes.json();
        setStatus({ type: 'error', message: errData.message || 'Failed to save record.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Upload failed. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSearchRoll('');
    setStudentData(null);
    setIssueDate('');
    setSelectedFile(null);
    setStatus({ type: '', message: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`https://brightglobal-repo-production.up.railway.app/api/certificates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchCertificates();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const openEditModal = (cert) => {
    const formattedDate = new Date(cert.issueDate).toISOString().split('T')[0];
    setEditData({ ...cert, issueDate: formattedDate });
    setEditFile(null);
    setStatus({ type: '', message: '' });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let updatedUrl = editData.certificateUrl;
      if (editFile) {
        const newUrl = await uploadToCloudinary(editFile);
        if (newUrl) {
            updatedUrl = newUrl;
        }
      }

      const updatePayload = {
        courseName: editData.courseName,
        issueDate: editData.issueDate,
        certificateUrl: updatedUrl
      };

      const token = localStorage.getItem('adminToken');
      const res = await fetch(`https://brightglobal-repo-production.up.railway.app/api/certificates/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatePayload)
      });

      if (res.ok) {
        fetchCertificates();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Update failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FILTER ---
  const filteredCerts = certificates.filter(cert =>
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.rollNumber && cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[85vh] flex flex-col">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#031B33]">Issued Certificates</h1>
          <p className="text-slate-500 text-sm">Manage and verify all student certificates</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search ID, Roll No or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#BE9A4A]"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#031B33] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BE9A4A] transition-colors whitespace-nowrap"
          >
            <Plus size={18} /> Issue Certificate
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1 p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
              <th className="pb-3 font-semibold">Certificate ID</th>
              <th className="pb-3 font-semibold">Student Info</th>
              <th className="pb-3 font-semibold">Course</th>
              <th className="pb-3 font-semibold">Issue Date</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert) => (
                <tr key={cert._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-[#031B33] whitespace-nowrap">{cert.certificateId}</td>
                  <td className="py-4">
                    <div className="font-semibold text-slate-800">{cert.studentName}</div>
                    <div className="text-sm text-slate-500 font-mono">R: {cert.rollNumber || 'N/A'}</div>
                  </td>
                  <td className="py-4 text-sm font-medium text-slate-700">{cert.courseName}</td>
                  <td className="py-4 text-sm text-slate-600">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Certificate">
                      <Eye size={18} />
                    </a>
                    <button onClick={() => openEditModal(cert)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-500">No certificates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-[#031B33]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#031B33] flex items-center gap-2">
                <FileText className="text-[#BE9A4A]" /> Issue New Certificate
              </h2>
              <button onClick={closeAddModal} className="text-slate-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            {status.message && (
              <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />} {status.message}
              </div>
            )}

            {!studentData && (
              <form onSubmit={handleStudentSearch} className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Step 1: Enter Roll No or Enrollment No</label>
                <div className="flex gap-2">
                  <input type="text" value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} placeholder="e.g. BGA-123456 or ENR-2026-001" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-4 uppercase focus:outline-none focus:border-[#BE9A4A]" required />
                  <button type="submit" className="bg-[#031B33] text-white px-6 rounded-lg hover:bg-[#BE9A4A] transition-colors">Search</button>
                </div>
              </form>
            )}

            {studentData && (
              <form onSubmit={handleIssueSubmit} className="space-y-6">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                  <User className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-green-800">{studentData.firstName} {studentData.lastName} <span className="font-mono text-sm text-green-600">(R: {studentData.rollNumber})</span></p>
                    <p className="text-sm text-green-700">{studentData.enrolledProgram}</p>
                    <p className="text-sm font-bold mt-1 text-[#031B33]">Cert ID will be: {studentData.enrollmentNumber}</p>
                  </div>
                  <button type="button" onClick={() => setStudentData(null)} className="ml-auto text-sm text-red-500 hover:underline">Change</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Date *</label>
                    <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:border-[#BE9A4A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Certificate File (Img/PDF) *</label>
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#BE9A4A] file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#031B33] file:text-white hover:file:bg-[#BE9A4A] transition-all cursor-pointer" accept="image/*,application/pdf" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={closeAddModal} className="px-6 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
                  <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-[#031B33] text-white rounded-lg font-bold hover:bg-[#BE9A4A] disabled:opacity-70">
                    {isLoading ? 'Generating...' : 'Issue Certificate'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================== EDIT MODAL ===================== */}
      {isEditModalOpen && editData && (
        <div className="fixed inset-0 bg-[#031B33]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-[#031B33] mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Edit className="text-amber-500" /> Edit Certificate Record
            </h2>

            {status.message && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{status.message}</div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-slate-500">Student: <span className="font-bold text-[#031B33]">{editData.studentName} ({editData.rollNumber})</span></p>
                <p className="text-sm text-slate-500">Cert ID: <span className="font-bold font-mono text-[#031B33]">{editData.certificateId}</span></p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Course Enrolled</label>
                <input type="text" value={editData.courseName} onChange={(e) => setEditData({ ...editData, courseName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Date</label>
                <input type="date" value={editData.issueDate} onChange={(e) => setEditData({ ...editData, issueDate: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Update Certificate File (Optional)</label>
                <p className="text-xs text-slate-400 mb-2">Leave empty if you don't want to change the existing file.</p>
                <input type="file" onChange={(e) => setEditFile(e.target.files[0])} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" accept="image/*,application/pdf" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-70">
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesManager;