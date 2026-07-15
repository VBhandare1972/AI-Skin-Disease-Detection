import { useState } from "react";
import UploadForm from "../components/UploadForm";
import GlassCard from "../components/GlassCard";
import { Link } from "react-router-dom";
import ResultsDisplay from "../components/ResultsDisplay";

function Prediction() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Generate stable values for particles
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    delay: `${(i * 0.4) % 5}s`,
    duration: `${8 + (i % 10)}s`
  }));

  const guidelines = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Good Lighting",
      description: "Ensure adequate lighting for clear visibility"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Focus on Area",
      description: "Center the affected skin region in frame"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      title: "Optimal Distance",
      description: "Maintain 15-20 cm distance for best results"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "No Filters",
      description: "Submit unedited, original photographs only"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Multiple Angles",
      description: "Capture 2-3 images from different angles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: "Clean Surface",
      description: "Remove makeup, creams, or obstructions"
    }
  ];

  // Handle image upload from UploadForm
  const handleImageUpload = (imageFile, previewUrl) => {
    console.log("Image uploaded:", imageFile.name);
    setUploadedImage({
      file: imageFile,
      preview: previewUrl
    });
    setPredictionResult(null); // Clear previous results
    setError(null);
  };

  // Handle image removal
  const handleImageRemove = () => {
    setUploadedImage(null);
    setPredictionResult(null);
    setError(null);
  };

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    // For demo purposes, simulate API call with mock data
    setTimeout(() => {
      // Mock prediction result based on "analysis"
      const mockResults = [
        {
          condition: "Eczema",
          confidence: 0.92,
          description: "Inflammatory skin condition characterized by red, itchy, and dry patches. Often triggered by allergens or stress.",
          recommendations: [
            "Consult a dermatologist for proper diagnosis",
            "Use prescribed moisturizers and corticosteroid creams",
            "Avoid known triggers like harsh soaps and allergens",
            "Keep skin moisturized with fragrance-free products"
          ],
          similarConditions: ["Contact Dermatitis", "Psoriasis", "Seborrheic Dermatitis"],
          hospitals: [
            { name: "City Skin Hospital", distance: "2.5 km", address: "FC Road, Shivajinagar" },
            { name: "Apollo Dermatology", distance: "5.1 km", address: "Pedder Road, South Mumbai" },
            { name: "Sunrise Skin Clinic", distance: "3.8 km", address: "Koregaon Park, Pune" }
          ]
        },
        {
          condition: "Psoriasis",
          confidence: 0.88,
          description: "Chronic autoimmune condition that causes rapid buildup of skin cells, forming scales and red patches.",
          recommendations: [
            "Consult a dermatologist for treatment options",
            "Use medicated creams and ointments",
            "Consider phototherapy treatments",
            "Manage stress levels"
          ],
          similarConditions: ["Eczema", "Lichen Planus", "Pityriasis Rosea"],
          hospitals: [
            { name: "Apollo Dermatology", distance: "5.1 km", address: "Pedder Road, South Mumbai" },
            { name: "Care Skin Center", distance: "4.2 km", address: "Connaught Place, Delhi" },
            { name: "Ruby Hall Clinic", distance: "6.3 km", address: "Sassoon Road, Pune" }
          ]
        },
        {
          condition: "Acne",
          confidence: 0.95,
          description: "Common skin condition where hair follicles become clogged with oil and dead skin cells, causing pimples, blackheads, and whiteheads.",
          recommendations: [
            "Use gentle, non-comedogenic skincare products",
            "Avoid picking or squeezing pimples",
            "Consider over-the-counter treatments with benzoyl peroxide",
            "Consult a dermatologist for persistent acne"
          ],
          similarConditions: ["Rosacea", "Folliculitis", "Keratosis Pilaris"],
          hospitals: [
            { name: "City Skin Hospital", distance: "2.5 km", address: "FC Road, Shivajinagar" },
            { name: "Jehangir Hospital", distance: "3.1 km", address: "Sassoon Road, Pune" },
            { name: "KEM Hospital", distance: "7.2 km", address: "Parel, Mumbai" }
          ]
        }
      ];

      // Randomly select a mock result for demo
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setPredictionResult(randomResult);
      setIsAnalyzing(false);
    }, 2000); // 2 second delay to simulate analysis
  };

  // Handle reset/upload new image
  const handleNewAnalysis = () => {
    setUploadedImage(null);
    setPredictionResult(null);
    setError(null);
  };

  return (
    <div className="
      relative
      min-h-screen
      bg-gradient-to-br
      from-[#EBF4F6]
      via-[#7AB2B2]/20
      to-[#EBF4F6]
      pt-24
      pb-16
      px-4
      sm:px-6
      lg:px-8
      overflow-hidden
    ">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#088395]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#37B7C3]/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-40 right-40 w-96 h-96 bg-[#7AB2B2]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
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
      <div className="relative max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#088395] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-[#088395] font-medium">AI Diagnosis</span>
        </div>
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="
            text-4xl
            lg:text-5xl
            font-bold
            mb-4
            bg-gradient-to-r
            from-[#09637E]
            via-[#088395]
            to-[#37B7C3]
            bg-clip-text
            text-transparent
            leading-tight
          ">
            AI Skin Analysis
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Advanced machine learning system for accurate skin condition assessment 
            and specialized healthcare recommendations.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload/Analysis Section */}
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
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 border-b border-white/30 pb-4">
              {[
                { id: "upload", label: "Upload Image", icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                ) },
                { id: "camera", label: "Take Photo", icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) },
                { id: "gallery", label: "Browse Gallery", icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  disabled={isAnalyzing || predictionResult}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-white/30'
                    }
                    ${(isAnalyzing || predictionResult) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Upload Form or Results */}
            {!predictionResult ? (
              <>
                <UploadForm 
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  isAnalyzing={isAnalyzing}
                />
                
                {/* Analyze Button - appears after image upload */}
                {uploadedImage && !isAnalyzing && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleAnalyze}
                      className="
                        group
                        relative
                        overflow-hidden
                        px-8
                        py-3
                        bg-gradient-to-r
                        from-[#088395]
                        to-[#37B7C3]
                        text-white
                        rounded-xl
                        font-semibold
                        shadow-lg
                        hover:shadow-xl
                        hover:shadow-[#088395]/30
                        transition-all
                        duration-300
                        hover:-translate-y-1
                      "
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Analyze Image
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {isAnalyzing && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6 text-[#088395]" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-gray-600">Analyzing your image...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Results Display */
              <ResultsDisplay 
                result={predictionResult} 
                image={uploadedImage?.preview}
                onNewAnalysis={handleNewAnalysis}
              />
            )}

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-white/30">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  <span className="text-sm">Results in 30 Seconds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Only show guidelines if no results yet */}
          {!predictionResult && (
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#088395]">Image Guidelines</h3>
                  <p className="text-sm text-gray-500">Follow these recommendations for optimal results</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guidelines.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 group"
                  >
                    <div className="text-[#088395] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => window.history.back()}
              className="
                flex
                items-center
                gap-2
                px-6
                py-3
                bg-white/30
                backdrop-blur-sm
                rounded-xl
                text-gray-700
                hover:text-[#088395]
                transition-all
                duration-300
                border border-white/40
                hover:border-[#088395]
                hover:bg-white/40
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </button>
            
            <Link
              to="/hospitals"
              className="
                flex
                items-center
                gap-2
                px-6
                py-3
                bg-gradient-to-r
                from-[#088395]
                to-[#37B7C3]
                text-white
                rounded-xl
                hover:shadow-lg
                hover:shadow-[#088395]/30
                transition-all
                duration-300
              "
            >
              <span>Find Hospitals</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
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