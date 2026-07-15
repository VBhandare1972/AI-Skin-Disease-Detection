import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context";
import GlassCard from "../components/GlassCard";

function Landing() {
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const stats = [
    { id: 1, value: 50000, label: "Users", suffix: "+" },
    { id: 2, value: 95, label: "Accuracy", suffix: "%" },
    { id: 3, value: 1000, label: "Hospitals", suffix: "+" },
    { id: 4, value: 24, label: "Support", suffix: "/7" }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "AI-Powered Analysis",
      description: "Advanced deep learning algorithms trained on 100,000+ skin images"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Instant Results",
      description: "Get diagnosis within 30 seconds with 95% accuracy"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Hospital Network",
      description: "Connected to 1000+ hospitals across India"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure & Private",
      description: "HIPAA compliant with 256-bit encryption"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Easy to Use",
      description: "Simple 3-step process: Upload, Analyze, Get Results"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Completely Free",
      description: "No hidden charges, free for all users"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Image",
      description: "Take a clear photo of the affected skin area",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person taking photo of skin with smartphone"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI analyzes the image using deep learning",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "AI analyzing medical data on screen"
    },
    {
      number: "03",
      title: "Get Results",
      description: "Receive diagnosis and hospital recommendations",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Doctor showing medical results on tablet"
    }
  ];

  // Get user's first name
  const getFirstName = () => {
    if (!user || !user.name) return '';
    return user.name.split(' ')[0];
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EBF4F6] via-[#7AB2B2]/20 to-[#EBF4F6] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(8, 131, 149, 0.15), transparent 80%)`
          }}
        />
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#088395]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#37B7C3]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7AB2B2]/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              {user ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 mb-6">
                  <svg className="w-5 h-5 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium text-[#088395]">
                    Welcome back, {getFirstName()}!
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 mb-6">
                  <svg className="w-5 h-5 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-medium text-[#088395]">
                    Trusted by 50,000+ Users
                  </span>
                </div>
              )}
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#09637E] via-[#088395] to-[#37B7C3] bg-clip-text text-transparent">
                  AI Skin Disease
                </span>
                <br />
                <span className="text-gray-800">Detection & Care</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload your skin image and get instant AI-powered diagnosis. 
                Connect with specialized hospitals and dermatologists near you 
                for professional care.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/predict"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-[#088395]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Diagnosis
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </Link>

                <Link
                  to="/hospitals"
                  className="group relative overflow-hidden bg-white/30 backdrop-blur-sm border-2 border-[#088395] text-[#088395] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#088395] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Find Hospitals
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-2xl font-bold text-[#088395]">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative hidden md:block">
              <GlassCard className="p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Medical Professional"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">95% Accuracy Rate</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#09637E] to-[#37B7C3] bg-clip-text text-transparent">
                  Why Choose Us
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced AI technology combined with extensive healthcare network
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <GlassCard key={index} className="p-8 hover:scale-105 transition-all duration-300">
                  <div className="text-[#088395] mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#088395] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 px-4 bg-white/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#09637E] to-[#37B7C3] bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={step.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#088395]/40 to-transparent" />
                      {/* Step Number Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </GlassCard>
                  
                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - Updated with Image */}
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <GlassCard className="p-12 overflow-hidden relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content - Text */}
                <div className="text-center md:text-left z-10 relative">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#09637E] to-[#37B7C3] bg-clip-text text-transparent">
                      {user ? 'Ready to Check Your Skin?' : 'Join Thousands of Happy Users'}
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {user 
                      ? 'Start your skin analysis now and get instant results'
                      : 'Join 50,000+ users who trust our AI for skin health analysis'
                    }
                  </p>
                  <Link
                    to="/predict"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white px-10 py-5 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#088395]/30 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {user ? 'Start Analysis' : 'Get Started Now'}
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                {/* Right Content - Image */}
                <div className="relative hidden md:block">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                      alt="Person using skin analysis app on smartphone"
                      className="w-full h-80 object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#088395]/20 to-transparent" />
                    
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-800">Live Analysis</span>
                      </div>
                    </div>
                    
                    {/* Floating badge 2 */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white px-3 py-1.5 rounded-lg shadow-lg">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs font-semibold">95% Accurate</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#37B7C3]/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#088395]/20 rounded-full blur-2xl" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/30 backdrop-blur-sm border-t border-white/40 py-8 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-[#088395]">SkinCare AI</h3>
              </div>
              <p className="text-sm text-gray-600">Advanced AI-powered skin disease detection and healthcare recommendations</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/predict" className="hover:text-[#088395]">Diagnosis</Link></li>
                <li><Link to="/hospitals" className="hover:text-[#088395]">Hospitals</Link></li>
                <li><Link to="/feedback" className="hover:text-[#088395]">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  help@skincareai.com
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 12345 67890
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 Support
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-[#088395] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#088395] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.066-11.77c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#088395] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#088395] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-8 pt-8 border-t border-white/40">
            © 2024 SkinCare AI. All rights reserved.
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
}

export default Landing;