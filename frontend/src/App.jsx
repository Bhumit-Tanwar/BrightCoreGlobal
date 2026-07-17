import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import Layout from './components/layouts/Layout';
import AdminLayout from './components/layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import CourseCategory from './pages/CourseCategory';
import Apply from './pages/Apply';
import CertificateTracking from './pages/CertificateTracking';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// 👇 IN DONO KO UNCOMMENT KARNA HAI 👇
import StudentsManager from './pages/StudentsManager';
import CertificatesManager from './pages/CertificatesManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apply" element={<Apply />} />
          <Route path="certificate-tracking" element={<CertificateTracking />} />
          <Route path=":category" element={<CourseCategory />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="students" replace />} /> {/* Default route */}
          <Route path="students" element={<StudentsManager />} />
          <Route path="certificates" element={<CertificatesManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;