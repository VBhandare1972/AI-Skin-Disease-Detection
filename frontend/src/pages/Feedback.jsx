import { useState } from "react";
import GlassCard from "../components/GlassCard";

function Feedback() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate stable random values for particles
  const particles = [...Array(8)].map((_, i) => ({
    id: i,
    top: `${(i * 12) % 100}%`,
    left: `${(i * 15) % 100}%`,
    delay: `${(i * 0.5) % 5}s`,
    duration: `${10 + (i % 8)}s`
  }));

  const submit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setText("");
      setName("");
      setEmail("");
      setRating(0);
      setCategory("general");
    }, 3000);
    
    setIsSubmitting(false);
  };

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" 
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
              Share Your Feedback
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Help us improve your experience with our AI skin disease detection system
            </p>
          </div>

          {/* Success Message */}
          {submitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="
                      w-full
                      p-3
                      pl-10
                      rounded-xl
                      border-2
                      border-white/50
                      bg-white/40
                      backdrop-blur-sm
                      focus:border-[#088395]
                      focus:outline-none
                      transition-all
                      duration-300
                      text-gray-800
                      placeholder-gray-500
                    "
                  />
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="
                      w-full
                      p-3
                      pl-10
                      rounded-xl
                      border-2
                      border-white/50
                      bg-white/40
                      backdrop-blur-sm
                      focus:border-[#088395]
                      focus:outline-none
                      transition-all
                      duration-300
                      text-gray-800
                      placeholder-gray-500
                    "
                  />
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Rating Stars */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Rate Your Experience
                </label>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <svg 
                          className={`w-8 h-8 transition-colors duration-200 ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <span className="text-sm text-[#088395] font-medium">
                      {ratingLabels[rating - 1]}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    w-full
                    p-3
                    rounded-xl
                    border-2
                    border-white/50
                    bg-white/40
                    backdrop-blur-sm
                    focus:border-[#088395]
                    focus:outline-none
                    transition-all
                    duration-300
                    text-gray-800
                  "
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="accuracy">AI Accuracy</option>
                  <option value="ui">User Interface</option>
                  <option value="hospital">Hospital Recommendations</option>
                </select>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="
                    w-full
                    p-4
                    rounded-xl
                    border-2
                    border-white/50
                    bg-white/40
                    backdrop-blur-sm
                    focus:border-[#088395]
                    focus:outline-none
                    transition-all
                    duration-300
                    text-gray-800
                    placeholder-gray-500
                    resize-none
                  "
                  rows="5"
                  placeholder="Please share your thoughts, suggestions, or report any issues..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {text.length} characters (minimum 10)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || text.length < 10}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  bg-gradient-to-r
                  from-[#088395]
                  to-[#37B7C3]
                  text-white
                  py-4
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
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
                
                {/* Shine effect */}
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

              {/* Character counter note */}
              {text.length < 10 && text.length > 0 && (
                <p className="text-xs text-red-500 text-center">
                  Please enter at least 10 characters
                </p>
              )}
            </form>
          )}

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

export default Feedback;