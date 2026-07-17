import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Award, LayoutDashboard, LogOut } from 'lucide-react'

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
  ];

  return (
    <div className="w-64 bg-[#031B33] min-h-screen fixed left-0 top-0 text-white flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
          <img src="/Logo.jpeg" alt="BGA" className="w-full h-full object-contain rounded-full" />
        </div>
        <h2 className="font-bold text-lg leading-tight text-[#BE9A4A]">Bright Global Academy <br /><span className="text-sm text-white font-normal">Admin Panel</span></h2>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-[#BE9A4A] text-[#031B33] font-bold shadow-lg' : 'hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;