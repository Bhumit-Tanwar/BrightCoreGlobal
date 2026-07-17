import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from "../AdminSidebar.jsx";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ye URL track karega

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      // replace: true se user back dabakar wapas admin me nahi aa payega
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, location.pathname]); // Har route change par chalega

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;