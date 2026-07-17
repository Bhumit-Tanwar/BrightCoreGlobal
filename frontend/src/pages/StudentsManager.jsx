import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, X, UserPlus } from 'lucide-react';

const StudentsManager = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Admission Form State - Naye fields add kiye hain
  const [formData, setFormData] = useState({
    enrollmentNumber: '', rollNumber: '',
    firstName: '', lastName: '', email: '', phone: '',
    address: '', state: '', country: '', pincode: '', enrolledProgram: ''
  });

  // Fetch all students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // TERI ORIGINAL API YAHAN WAPAS LAGA DI HAI 👇
      const res = await fetch('https://brightcoreglobal-production.up.railway.app/api/students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      // TERI ORIGINAL API YAHAN WAPAS LAGA DI HAI 👇
      const res = await fetch('https://brightcoreglobal-production.up.railway.app/api/students/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // Form clear karo, modal close karo, aur list update karo
        setFormData({
          enrollmentNumber: '', rollNumber: '',
          firstName: '', lastName: '', email: '', phone: '',
          address: '', state: '', country: '', pincode: '', enrolledProgram: ''
        });
        setIsModalOpen(false);
        fetchStudents();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student record?")) return;

    try {
      const token = localStorage.getItem('adminToken');
      // TERI ORIGINAL API YAHAN WAPAS LAGA DI HAI 👇
      const res = await fetch(`https://brightcoreglobal-production.up.railway.app/api/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Search Filter logic (Ab Enrollment Number se bhi search hoga)
  const filteredStudents = students.filter(student =>
    (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.enrollmentNumber && student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.firstName && student.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[85vh] flex flex-col">
      {/* Header section */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#031B33]">Students Database</h1>
          <p className="text-slate-500 text-sm">Manage admissions and records</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Enroll No, Roll No, Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#BE9A4A]"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#031B33] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BE9A4A] transition-colors whitespace-nowrap"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto flex-1 p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
              <th className="pb-3 font-semibold">Identifiers</th>
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Contact</th>
              <th className="pb-3 font-semibold">Program</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <div className="font-bold text-[#031B33]">E: {student.enrollmentNumber}</div>
                    <div className="text-sm font-mono text-slate-500">R: {student.rollNumber}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-slate-800">{student.firstName} {student.lastName}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-slate-600">{student.email}</div>
                    <div className="text-sm text-slate-500">{student.phone}</div>
                  </td>
                  <td className="py-4 text-sm font-medium text-slate-700">{student.enrolledProgram}</td>
                  <td className="py-4 text-right">
                    <button onClick={() => handleDelete(student._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Admission Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#031B33]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-[#031B33] flex items-center gap-2">
                <UserPlus className="text-[#BE9A4A]" /> New Admission Entry
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Naye Fields: Enrollment No aur Roll No */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Enrollment Number *</label>
                <input type="text" name="enrollmentNumber" required value={formData.enrollmentNumber} onChange={handleInputChange} placeholder="e.g. ENR-2026-001" className="w-full bg-amber-50 border border-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Roll Number *</label>
                <input type="text" name="rollNumber" required value={formData.rollNumber} onChange={handleInputChange} placeholder="e.g. BGA-123456" className="w-full bg-amber-50 border border-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name *</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name *</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Enrolled Program *</label>
                <input type="text" name="enrolledProgram" required value={formData.enrolledProgram} onChange={handleInputChange} placeholder="e.g. Advanced Diploma in Management" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">State *</label>
                <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Country *</label>
                <input type="text" name="country" required value={formData.country} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#BE9A4A]" />
              </div>

              <div className="md:col-span-2 mt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-[#031B33] text-white rounded-lg font-bold hover:bg-[#BE9A4A] transition-colors disabled:opacity-70">
                  {isLoading ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManager;