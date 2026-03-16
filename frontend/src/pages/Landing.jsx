import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Landing() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate particles once only
  const [particles] = useState(() =>
  [...Array(15)].map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 5
  }))
);;


  return (
    <div
      className="
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
      md:p-10
      overflow-hidden
    "
    >

      {/* Animated background orbs */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7AB2B2]/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#088395]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#37B7C3]/10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2 delay-2000"></div>

      </div>


      {/* Mouse light effect */}

      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(8,131,149,0.2), transparent 80%)`
        }}
      />


      {/* Floating particles */}

      <div className="absolute inset-0 pointer-events-none">

        {particles.map((p, i) => (

          <div
            key={i}
            className="absolute w-1 h-1 bg-[#088395]/30 rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          />

        ))}

      </div>


      {/* Main Card */}

      <div
        className="
        relative
        group
        bg-white/30
        backdrop-blur-xl
        border border-white/40
        shadow-2xl
        rounded-3xl
        p-8
        sm:p-10
        md:p-12
        text-center
        max-w-xl
        w-full
        transition-all
        duration-500
        hover:scale-[1.02]
      "
      >

        {/* Top Accent Bar */}

        <div className="absolute top-0 left-1/2 w-24 h-1 bg-gradient-to-r from-[#088395] via-[#37B7C3] to-[#7AB2B2] rounded-full -translate-x-1/2"></div>


        {/* Logo */}

        <div className="mb-8 flex justify-center">

          <div className="relative">

            <div className="absolute inset-0 bg-[#088395] blur-xl opacity-40 rounded-2xl animate-pulse"></div>

            <div className="relative w-20 h-20 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-2xl rotate-6 shadow-lg flex items-center justify-center transition-transform group-hover:rotate-12">

              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>

            </div>

          </div>

        </div>


        {/* Title */}

        <h1
          className="
          text-4xl
          sm:text-5xl
          font-bold
          mb-6
          bg-gradient-to-r
          from-[#09637E]
          via-[#088395]
          to-[#37B7C3]
          bg-clip-text
          text-transparent
          animate-gradient
        "
        >
          AI Skin Disease Detection
        </h1>


        {/* Description */}

        <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed px-4">

          Upload your skin image and get instant AI diagnosis with recommended hospitals near you.

        </p>


        {/* Feature badges */}

        <div className="flex flex-wrap gap-2 justify-center mb-10">

          {["Instant Results", "98% Accuracy", "Free", "Secure"].map((f, i) => (

            <span
              key={i}
              className="
              px-4
              py-2
              bg-white/40
              backdrop-blur-sm
              rounded-full
              text-sm
              text-[#09637E]
              border border-white/60
              shadow-sm
              hover:bg-white/60
              transition
            "
            >
              {f}
            </span>

          ))}

        </div>


        {/* CTA */}

        <Link
          to="/predict"
          className="
          group
          relative
          inline-flex
          items-center
          gap-2
          bg-gradient-to-r
          from-[#088395]
          to-[#37B7C3]
          text-white
          px-10
          py-4
          rounded-xl
          text-lg
          font-semibold
          shadow-lg
          hover:shadow-xl
          hover:shadow-[#088395]/30
          transition
          hover:-translate-y-1
        "
        >

          Start Diagnosis

          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>

        </Link>

      </div>


      <style>{`

      @keyframes float {
        0%,100%{transform:translateY(0)}
        50%{transform:translateY(-20px)}
      }

      @keyframes gradient {
        0%,100%{background-position:0% 50%}
        50%{background-position:100% 50%}
      }

      .animate-gradient{
        background-size:200% 200%;
        animation:gradient 4s ease infinite;
      }

      `}</style>

    </div>
  );
}

export default Landing;