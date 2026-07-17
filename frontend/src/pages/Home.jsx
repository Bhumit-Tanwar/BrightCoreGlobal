import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, GraduationCap, Globe, Users, Award, 
  CheckCircle, Star, UserCheck, ShieldCheck, 
  CreditCard, Tag
} from 'lucide-react';

const Home = () => {
  // Marquee Content 
  const marqueeItems = [
    "Building Brighter Futures, Globally",
    "Premium Academic Excellence",
    "100% Certified Courses",
    "Learn. Stratify. Succeed.",
    "Brightcore Global Academy"
  ];

  return (
    <div className="w-full font-sans text-[#031B33]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#031B33] pt-20">
        {/* Background Image & Overlay */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="University Campus" 
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#031B33]/90 via-[#031B33]/80 to-[#031B33]"></div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-[#BE9A4A]/10 animate-pulse"
              style={{
                width: `${Math.random() * 120 + 40}px`,
                height: `${Math.random() * 120 + 40}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 8}s`
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg p-8 md:p-14 rounded-3xl text-center border border-white/10 shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#BE9A4A]/10 text-[#BE9A4A] font-medium mb-8 text-sm border border-[#BE9A4A]/20"
              >
                <GraduationCap size={16} /> Premium Academic Excellence
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building Brighter <br/>
                <span className="text-[#BE9A4A]">Futures Globally</span>
              </motion.h1>

              <motion.p 
                className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Empowering students with globally recognized professional and vocational education programs. Your journey to success starts here.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/apply" className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#BE9A4A] text-[#031B33] font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-[#BE9A4A]/20">
                  Apply Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FIXED MARQUEE SECTION */}
      <div className="w-full bg-[#031B33] border-y border-[#BE9A4A]/20 py-4 overflow-hidden relative z-10 flex">
        <motion.div 
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
        >
          {/* First Block */}
          <div className="flex items-center text-[#BE9A4A] font-bold tracking-[0.15em] uppercase text-xs md:text-sm">
            {marqueeItems.map((item, idx) => (
              <div key={`m1-${idx}`} className="flex items-center">
                <span className="px-8">{item}</span>
                <span className="text-[#BE9A4A]/50">▲</span>
              </div>
            ))}
          </div>
          {/* Second Block */}
          <div className="flex items-center text-[#BE9A4A] font-bold tracking-[0.15em] uppercase text-xs md:text-sm">
            {marqueeItems.map((item, idx) => (
              <div key={`m2-${idx}`} className="flex items-center">
                <span className="px-8">{item}</span>
                <span className="text-[#BE9A4A]/50">▲</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-[#F8FAFC] relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, count: "50+", label: "Global Partners" },
              { icon: Users, count: "10k+", label: "Alumni Worldwide" },
              { icon: Award, count: "100%", label: "Certified Courses" },
              { icon: GraduationCap, count: "15+", label: "Years Excellence" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white py-10 px-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 border border-slate-100"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5 text-[#031B33]">
                  <stat.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-[#031B33] mb-2">{stat.count}</h3>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it all works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl md:text-5xl font-bold text-[#031B33] mb-4 leading-tight">How it <br/>all works</h2>
              <p className="text-[#BE9A4A] font-semibold mb-6">Start your journey within a few clicks</p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[2px] bg-slate-100 z-0"></div>
              
              {[
                { step: "1", title: "Find the perfect course", desc: "Browse our curated catalog of industry-focused programs and choose the course that aligns with your goals." },
                { step: "2", title: "Apply for the course", desc: "Complete a simple enrollment process and secure your spot in a structured, career-driven program." },
                { step: "3", title: "Start your learning", desc: "Access expert-led lessons, practical projects, and real-world training to build job-ready skills." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#031B33] text-white font-bold text-xl flex items-center justify-center mb-6 shadow-xl border-4 border-white ring-1 ring-slate-100">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-[#031B33] mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UserCheck, title: "Expert Tutors", desc: "Learn from experienced industry professionals with practical insights." },
              { icon: ShieldCheck, title: "Verified Profiles", desc: "All instructors and mentors are carefully vetted for credibility." },
              { icon: CreditCard, title: "Pay Per Lesson", desc: "Flexible payment options to invest one lesson at a time." },
              { icon: Tag, title: "Affordable Prices", desc: "High-quality courses offered at competitive prices for everyone." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center border border-slate-100"
              >
                <div className="w-14 h-14 rounded-full bg-[#eef2f6] text-[#031B33] flex items-center justify-center mb-6">
                  <feature.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#031B33] mb-3">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold text-[#BE9A4A] tracking-widest uppercase mb-3 block">Why Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#031B33] mb-8 leading-tight">
                Learn a new skill online <br/>anywhere, anytime!
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: "Customized learning", desc: "Personalized learning paths tailored to your goals." },
                  { title: "Get expert help", desc: "Access experienced mentors who guide you." },
                  { title: "Learn anytime, anywhere", desc: "Flexible online courses designed to fit your schedule." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle className="text-[#031B33]" size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#031B33] text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-50 p-10 md:p-12 rounded-3xl relative border border-slate-100">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#BE9A4A] rounded-l-3xl"></div>
                <h3 className="text-2xl font-bold italic text-[#031B33] mb-8 leading-relaxed">
                  "We prepare you to achieve your goals with professional courses."
                </h3>
                <Link to="/about" className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-[#031B33] text-[#031B33] font-semibold rounded-lg hover:bg-[#031B33] hover:text-white transition-colors">
                  Read More
                </Link>
                
                {/* Certification Badges (Images Added Here) */}
                <div className="mt-12 flex gap-4 items-center pt-8 border-t border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden p-2">
                    <img 
                      src="https://stratifyedu.com/images/iaf.png" 
                      alt="IAF" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden p-2">
                    <img 
                      src="https://stratifyedu.com/images/iso.png" 
                      alt="ISO" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="h-12 w-28 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden p-2">
                    <img 
                      src="https://stratifyedu.com/images/msme.png" 
                      alt="MSME" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#031B33] mb-4">Our success stories</h2>
            <p className="text-slate-500">Choose a course for a new skill in your career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                text: "The tutors here are amazing. I learned so much in such a short time.", 
                name: "Shiv Kumar",
                image: "https://assets.about.me/background/users/s/o/u/sourabhc_1712229973_791.jpg" 
              },
              { 
                text: "Highly recommend this platform. The courses are structured perfectly.", 
                name: "Navdeep Kaur",
                image: "https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=" 
              },
              { 
                text: "Affordable and flexible. Exactly what I needed to upgrade my skills.", 
                name: "Mandeep Singh",
                image: "https://i.pinimg.com/736x/e6/df/8e/e6df8e508b91d2cb25d9ffc431c676f3.jpg" 
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-6 text-[#BE9A4A]">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-slate-600 italic text-sm mb-8 min-h-[60px] leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#031B33] overflow-hidden shrink-0 border border-slate-200">
                    {review.image && review.image !== "PASTE_IMAGE_URL_HERE" ? (
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserCheck size={20} />
                    )}
                  </div>
                  <h5 className="font-bold text-[#031B33] text-sm">{review.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#031B33] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Start learning a new skill today!</h2>
          <Link to="/apply" className="inline-block px-10 py-4 bg-white text-[#031B33] font-bold rounded-lg hover:bg-[#BE9A4A] hover:text-white transition-colors shadow-xl">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;