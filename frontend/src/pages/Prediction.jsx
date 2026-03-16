import { useState } from "react";
import UploadForm from "../components/UploadForm";
import GlassCard from "../components/GlassCard";

function Prediction() {
  const [isDragging, setIsDragging] = useState(false);
  
  // Generate stable random values for particles
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    delay: `${(i * 0.4) % 5}s`,
    duration: `${8 + (i % 10)}s`
  }));

  return (
    <div className="
      relative
      min-h-screen
      bg-gradient-to-br
      from-[#EBF4F6]
      via-[#7AB2B2]/20
      to-[#EBF4F6]
      flex
      items-center
      justify-center
      p-4
      sm:p-6
      md:p-8
      overflow-hidden
    ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#088395]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#37B7C3]/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#7AB2B2]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating particles with stable positions */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#088395]/20 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
              animation: `float ${particle.duration} linear infinite`,
              animationDelay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-2xl">
        {/* Decorative back card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-3xl blur-xl opacity-20 animate-pulse" />
        
        {/* Main glass card */}
        <GlassCard className="
          relative
          backdrop-blur-xl
          bg-white/30
          border border-white/40
          shadow-2xl
          rounded-3xl
          p-6
          sm:p-8
          md:p-10
          transition-all
          duration-500
          hover:shadow-[#088395]/20
        ">
          {/* Decorative header line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#088395] via-[#37B7C3] to-[#7AB2B2] rounded-full" />

          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#088395] blur-xl opacity-50 rounded-full animate-pulse" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-2xl rotate-3 shadow-lg flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="
              text-3xl
              sm:text-4xl
              font-bold
              mb-2
              bg-gradient-to-r
              from-[#09637E]
              to-[#37B7C3]
              bg-clip-text
              text-transparent
            ">
              Upload Skin Image
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Upload a clear image of the affected skin area for accurate AI analysis
            </p>
          </div>

         

          {/* Upload Form with enhanced props */}
          <div className="relative">
            <UploadForm 
              onDragStateChange={setIsDragging}
              className={isDragging ? 'scale-102' : ''}
            />
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure upload (256-bit encryption)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Results in 30 seconds</span>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.history.back()}
              className="
                text-sm
                text-gray-500
                hover:text-[#088395]
                transition-colors
                duration-300
                flex
                items-center
                justify-center
                gap-1
                mx-auto
                group
              "
            >
              <svg 
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </button>
          </div>
        </GlassCard>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-20px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default Prediction;