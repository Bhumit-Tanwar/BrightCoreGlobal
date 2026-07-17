import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Monitor, Wrench, Calculator, Utensils, HeartPulse, Cpu, Leaf, Clock, BookOpen, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const courseData = {
  'management': {
    title: 'Management Courses',
    subtitle: 'Develop leadership skills for the modern business world.',
    icon: Briefcase,
    courses: [
      { name: 'D.B.M (Diploma in Business Management)', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'A.D.B.M (Advance Diploma in Business Management)', duration: '1-2 Years', eligibility: '10th Pass / D.B.M', fee: 'Contact Us' }
    ]
  },
  'computer': {
    title: 'Computer Courses',
    subtitle: 'Master the latest technologies and software skills.',
    icon: Monitor,
    courses: [
      { name: 'D.C.A (Diploma in Computer Applications)', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'C.T.T (Computer Teacher Training)', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'CADD (Computer-Aided Design and Drafting)', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate in Information Technology', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'P.G.D.C.A (Post Graduate Diploma)', duration: '1 Year', eligibility: 'Graduation', fee: 'Contact Us' },
      { name: 'Diploma in Software Engineering', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Advanced Diploma in Software Engineering', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' }
    ]
  },
  'technical': {
    title: 'Technical Courses',
    subtitle: 'Hands-on training for high-demand technical roles.',
    icon: Wrench,
    courses: [
      { name: 'Plumber', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Carpenter', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Fitter', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Electrician', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Welder', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Painting', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Beauty Parlour', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Diesel Mechanic', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Air Condition & Refrigerator', duration: '6 Months', eligibility: 'As per norms', fee: 'Contact Us' }
    ]
  },
  'accounting': {
    title: 'Accounting Courses',
    subtitle: 'Build a solid foundation in finance and accounting.',
    icon: Calculator,
    courses: [
      { name: 'Diploma in Computer Accounts', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Manual Accounting', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Management Accountant', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Public Accountant', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Financial Planner', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Tax Preparation', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Tax Fraud/Forensic Training', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' }
    ]
  },
  'hotel-hospitality': {
    title: 'Hotel & Hospitality',
    subtitle: 'Build a premium career in global hospitality.',
    icon: Utensils,
    courses: [
      // 6 Month Courses (After 10th)
      { name: 'Certificate in Hotel Management', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate in Cook and Kitchen Care', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate in Food Production', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate in Wedding Management', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate in Accommodation Operations', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Certificate Cake & Patisserie', duration: '6 Months', eligibility: '10th Pass', fee: 'Contact Us' },
      
      // 1 Year Courses (After 10th)
      { name: 'Diploma in Hospitality and Tourism', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Bar and Beverage Management', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Catering Technology', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Cook and Kitchen Care', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Food and Beverage Services', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Food Production (After 10th)', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Hotel Management', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'Diploma Cake & Patisserie (After 10th)', duration: '1 Year', eligibility: '10th Pass', fee: 'Contact Us' },

      // 1 Year Courses (After 12th)
      { name: 'Diploma in Travel and Tourism', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Hospitality Management', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Wedding Management', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Hotel & Catering Technology', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Food Production Management', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Event Management', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Catering Services', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma in Accommodation Operations', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Diploma Cake & Patisserie (After 12th)', duration: '1 Year', eligibility: '12th Pass', fee: 'Contact Us' },

      // 2 Year Advance Diplomas (After 12th)
      { name: 'Advance Diploma in Travel and Tourism', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Hospitality Management', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Wedding Management', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Hotel & Catering', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Food Production', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Event Management', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Catering Services', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma in Accommodation Operations', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' },
      { name: 'Advance Diploma Cake & Patisserie', duration: '2 Years', eligibility: '12th Pass', fee: 'Contact Us' }
    ]
  },
  'health-care': {
    title: 'Health & Care',
    subtitle: 'Compassionate care training for a better world.',
    icon: HeartPulse,
    courses: [
      { name: 'Nutrition & Dietetics', duration: '1 Year', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Support Roles', duration: '1 Year', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Old Age / Day Care', duration: '1-2 Years', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Nanny Care', duration: '1-2 Years', eligibility: 'As per norms', fee: 'Contact Us' }
    ]
  },
  'engineering-technology': {
    title: 'Engineering & Technology',
    subtitle: 'Advanced technical education for the future.',
    icon: Cpu,
    courses: [
      // ITI Courses
      { name: 'ITI Diesel Mechanic', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Surveyor', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI AC & Refrigerator Mechanic', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Plumber', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Electrician', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Mechanical Fitter', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Civil', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Wireman', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Carpenter', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Welder', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Mechanical Automobile', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Electronics', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Motor Mechanic', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Maintenance (LCD/LED/AC/Fridge)', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },
      { name: 'ITI Draughtsman (Mechanical)', duration: '1-2 Years', eligibility: '10th Pass', fee: 'Contact Us' },

      // Diploma Courses
      { name: 'Diploma in Mechanical Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Electrical Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Civil Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in IT Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Electronics & Communication', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Computer Science Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Solar System Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Automobile Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Instrumentation Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Plastic Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Chemical Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Textile Engineering', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Printing Technology', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Welding Technology', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Construction Management', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Telecommunication', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Chemical Technology', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Oil and Gas Piping Technology', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' },
      { name: 'Diploma in Plastic Technology', duration: '1-2 Years', eligibility: '12th/ITI Pass', fee: 'Contact Us' }
    ]
  },
  'agriculture': {
    title: 'Agriculture',
    subtitle: 'Modern farming and agricultural sciences.',
    icon: Leaf,
    courses: [
      { name: 'Botany', duration: '1 Year', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Agriculture Management', duration: '1 Year', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Horticulture', duration: '1 Year', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Agriculture Engineering', duration: '2 Years', eligibility: 'As per norms', fee: 'Contact Us' },
      { name: 'Food Science/Technology', duration: '2 Years', eligibility: 'As per norms', fee: 'Contact Us' }
    ]
  }
};

const CourseCategory = () => {
  const { category } = useParams();
  const data = courseData[category];

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><h1 className="text-3xl text-[#031B33] font-bold">Category Not Found</h1></div>;
  }

  const Icon = data.icon;

  return (
    <div className="w-full bg-[#F8FAFC] pb-24 font-sans">
      {/* Premium Hero Banner */}
      <section className="relative pt-32 pb-20 bg-[#031B33] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#BE9A4A] via-[#031B33] to-[#031B33]"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border-l-4 border-l-[#BE9A4A] inline-block shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#BE9A4A]/20 flex items-center justify-center text-[#BE9A4A]">
                <Icon size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">{data.title}</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {data.courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-[#BE9A4A] hover:shadow-[0_8px_30px_rgb(190,154,74,0.15)] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#031B33] to-[#BE9A4A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <h3 className="text-2xl font-bold text-[#031B33] mb-4 pr-8 leading-tight transition-colors">
                {course.name}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock size={18} className="text-[#BE9A4A]" />
                  <span>Duration: <strong className="text-[#031B33]">{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <BookOpen size={18} className="text-[#BE9A4A]" />
                  <span>Eligibility: <strong className="text-[#031B33]">{course.eligibility}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <IndianRupee size={18} className="text-[#BE9A4A]" />
                  <span>Fees: <strong className="text-[#031B33]">{course.fee}</strong></span>
                </div>
              </div>

              <Link 
                to={`/apply?course=${encodeURIComponent(course.name)}`}
                className="w-full py-3 rounded-xl bg-slate-50 text-[#031B33] font-bold text-center block hover:bg-[#BE9A4A] hover:text-white transition-colors duration-300 border border-slate-100 mt-auto"
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseCategory;