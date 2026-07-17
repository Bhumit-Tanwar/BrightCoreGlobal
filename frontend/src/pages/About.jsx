import { motion } from 'framer-motion';
import { Target, Globe, Award, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="w-full bg-light-bg overflow-hidden">
      <section className="relative pt-32 pb-24 bg-primary text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6 text-glow"
          >
            About BrightCore
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-body text-white/80 leading-relaxed"
          >
            A premier global institution dedicated to shaping the leaders and innovators of tomorrow through world-class professional and vocational education.
          </motion.p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent rounded-3xl translate-x-4 translate-y-4"></div>
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000" alt="Campus" className="relative z-10 rounded-3xl shadow-xl w-full h-[500px] object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-primary">Our Mission</h2>
              </div>
              <p className="text-gray-600 font-body text-lg leading-relaxed pl-16 border-l-4 border-transparent">
                To empower students globally by providing high-quality, accessible, and industry-relevant education that bridges the gap between academic learning and professional success.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-primary">Global Vision</h2>
              </div>
              <p className="text-gray-600 font-body text-lg leading-relaxed pl-16 border-l-4 border-transparent">
                To be the world's leading academic institution, recognized for excellence, innovation, and our commitment to creating globally competent professionals ready to tackle future challenges.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">Why Choose BrightCore?</h2>
            <p className="text-gray-600 font-body text-lg">We offer an unparalleled educational experience designed to maximize your potential and career prospects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Recognized Certifications", desc: "Our programs are globally accredited, giving your resume an international edge." },
              { icon: BookOpen, title: "Expert Faculty", desc: "Learn from industry veterans and academic experts with decades of real-world experience." },
              { icon: Users, title: "Vibrant Community", desc: "Join a diverse, global network of ambitious peers and supportive alumni." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 font-body leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')] opacity-5 bg-cover"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Shape Your Future?</h2>
          <p className="text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">Join thousands of students who have transformed their lives with BrightCore Global Academy.</p>
          <Link to="/apply" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary rounded-full font-heading font-bold text-lg hover:bg-white transition-colors group">
            Start Your Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
