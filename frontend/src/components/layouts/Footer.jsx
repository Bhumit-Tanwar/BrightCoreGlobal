import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Facebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Footer = () => {
  return (
    <footer className="bg-dark-footer border-t-4 border-accent text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-heading font-bold text-xl group-hover:box-glow transition-all">
                <img 
              src="/Logo.jpeg" 
              alt="Logo" 
              className="h-10 w-10 object-contain rounded-full"
            />
              </div>
              <span className="font-heading font-bold text-xl tracking-wide text-white group-hover:text-glow transition-all">
                Brightcore Global Academy
              </span>
            </Link>
            <p className="mb-6 font-body text-sm leading-relaxed max-w-sm">
              Empowering students globally with recognized professional and vocational education programs. Building brighter futures through excellence in academics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-body text-sm">
              <li><Link to="/about" className="hover:text-accent transition-colors relative group inline-block">About Us<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/certificate-tracking" className="hover:text-accent transition-colors relative group inline-block">Certificate Tracking<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/apply" className="hover:text-accent transition-colors relative group inline-block">Apply Now<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors relative group inline-block">Contact Us<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6">Courses</h4>
            <ul className="flex flex-col gap-3 font-body text-sm">
              <li><Link to="/management" className="hover:text-accent transition-colors relative group inline-block">Management<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/computer" className="hover:text-accent transition-colors relative group inline-block">Computer Science<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/technical" className="hover:text-accent transition-colors relative group inline-block">Technical<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/health-care" className="hover:text-accent transition-colors relative group inline-block">Health & Care<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 font-body text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <span>123 Global Education Avenue, Innovation District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>info.brightcoreglobalacademy@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} BrightCore Global Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
