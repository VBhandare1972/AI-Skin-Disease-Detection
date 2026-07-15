import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import GlassCard from "../components/GlassCard";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Generate stable random values for particles
  const particles = [...Array(6)].map((_, i) => ({
    id: i,
    top: `${(i * 15) % 100}%`,
    left: `${(i * 20) % 100}%`,
    delay: `${(i * 0.6) % 5}s`,
    duration: `${12 + (i % 6)}s`
  }));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, create a user based on email
      // In a real app, this would come from your backend
      const mockUser = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0], // Use part before @ as name
        email: formData.email
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      login(mockUser, mockToken);
      
      alert('Login successful!');
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

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
      overflow-hidden
    ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#088395]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#37B7C3]/10 rounded-full blur-3xl animate-pulse delay-700" />
        
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
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-3xl blur-xl opacity-20 animate-pulse" />
        
        <GlassCard className="
          relative
          backdrop-blur-xl
          bg-white/30
          border border-white/40
          shadow-2xl
          rounded-3xl
          p-8
          transition-all
          duration-500
        ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#088395] via-[#37B7C3] to-[#7AB2B2] rounded-full" />

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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="
              text-3xl
              font-bold
              mb-2
              bg-gradient-to-r
              from-[#09637E]
              to-[#37B7C3]
              bg-clip-text
              text-transparent
            ">
              Welcome Back
            </h2>
            
            <p className="text-gray-600 text-sm">
              Sign in to continue
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`
                    w-full
                    p-3
                    pl-10
                    rounded-xl
                    border-2
                    bg-white/40
                    backdrop-blur-sm
                    focus:outline-none
                    transition-all
                    duration-300
                    ${errors.email ? 'border-red-400' : 'border-white/50 focus:border-[#088395]'}
                  `}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`
                    w-full
                    p-3
                    pl-10
                    pr-10
                    rounded-xl
                    border-2
                    bg-white/40
                    backdrop-blur-sm
                    focus:outline-none
                    transition-all
                    duration-300
                    ${errors.password ? 'border-red-400' : 'border-white/50 focus:border-[#088395]'}
                  `}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-[#088395] hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group
                relative
                w-full
                overflow-hidden
                bg-gradient-to-r
                from-[#088395]
                to-[#37B7C3]
                text-white
                py-3
                px-6
                rounded-xl
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:shadow-[#088395]/30
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
              
              <div className="
                absolute
                inset-0
                -translate-x-full
                group-hover:translate-x-full
                transition-transform
                duration-1000
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
              " />
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#088395] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </GlassCard>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(-20px) translateX(-5px); }
            75% { transform: translateY(-10px) translateX(5px); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;