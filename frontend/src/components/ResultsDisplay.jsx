import { Link } from "react-router-dom";
import GlassCard from "./GlassCard";

function ResultsDisplay({ result, image, onNewAnalysis }) {
  if (!result) return null;

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Analysis Complete</h3>
        <p className="text-gray-600">Your skin analysis results are ready</p>
      </div>

      {/* Image and Result Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Uploaded Image */}
        {image && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Your Image</h4>
            <img 
              src={image} 
              alt="Uploaded skin" 
              className="w-full rounded-xl shadow-lg border-2 border-white/50"
            />
          </div>
        )}

        {/* Primary Result */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Diagnosis Result</h4>
          <GlassCard className="p-6">
            <div className="text-center mb-4">
              <span className="text-5xl mb-2 block">🔬</span>
              <h5 className="text-2xl font-bold text-[#088395]">{result.condition}</h5>
              <div className="mt-2">
                <span className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
                  {(result.confidence * 100).toFixed(0)}% Confidence
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{result.description}</p>
          </GlassCard>
        </div>
      </div>

      {/* Recommendations */}
      <GlassCard className="p-6">
        <h4 className="font-semibold text-[#088395] mb-3 flex items-center gap-2">
          <span>💡</span>
          Recommendations
        </h4>
        <ul className="space-y-2">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 mt-1">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Similar Conditions */}
      {result.similarConditions && result.similarConditions.length > 0 && (
        <GlassCard className="p-6">
          <h4 className="font-semibold text-[#088395] mb-3 flex items-center gap-2">
            <span>🔍</span>
            Similar Conditions
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.similarConditions.map((condition, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/30 rounded-full text-sm text-gray-700 border border-white/50"
              >
                {condition}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Nearby Hospitals */}
      {result.hospitals && result.hospitals.length > 0 && (
        <GlassCard className="p-6">
          <h4 className="font-semibold text-[#088395] mb-3 flex items-center gap-2">
            <span>🏥</span>
            Recommended Hospitals Near You
          </h4>
          <div className="space-y-3">
            {result.hospitals.map((hospital, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                <span className="font-medium text-gray-800">{hospital.name}</span>
                <span className="text-sm text-gray-600">{hospital.distance}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/hospitals"
              className="inline-flex items-center gap-2 text-[#088395] hover:underline"
            >
              View all hospitals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </GlassCard>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={onNewAnalysis}
          className="
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
          New Analysis
        </button>
        
        <Link
          to="/feedback"
          className="
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
          Provide Feedback
        </Link>
      </div>
    </div>
  );
}

export default ResultsDisplay;