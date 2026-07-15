import { useState } from "react";
import GlassCard from "../components/GlassCard";

function Hospital() {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Comprehensive Indian hospital data with real coordinates and images
  const hospitals = [
    // Delhi NCR
    { 
      name: "AIIMS Delhi", 
      city: "Delhi", 
      address: "Ansari Nagar, New Delhi", 
      rating: 4.9, 
      phone: "+91 11 2658 8500",
      specialists: ["Dermatology", "Cosmetology", "Skin Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "AIIMS Delhi Hospital Building",
      lat: 28.5672,
      lng: 77.2100,
      established: "1956",
      beds: 2500,
      website: "https://www.aiims.edu"
    },
    { 
      name: "Sir Ganga Ram Hospital", 
      city: "Delhi", 
      address: "Rajinder Nagar, New Delhi", 
      rating: 4.7, 
      phone: "+91 11 2575 0000",
      specialists: ["Dermatology", "Skin Care", "Laser Treatment"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "Sir Ganga Ram Hospital Building",
      lat: 28.6395,
      lng: 77.1868,
      established: "1951",
      beds: 675,
      website: "https://www.sgrh.com"
    },
    { 
      name: "Max Super Speciality Hospital", 
      city: "Delhi", 
      address: "Saket, New Delhi", 
      rating: 4.6, 
      phone: "+91 11 2651 5050",
      specialists: ["Dermatology", "Cosmetic Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Max Hospital Modern Building",
      lat: 28.5289,
      lng: 77.2189,
      established: "1996",
      beds: 500,
      website: "https://www.maxhealthcare.in"
    },
    { 
      name: "Fortis Hospital", 
      city: "Delhi", 
      address: "Vasant Kunj, New Delhi", 
      rating: 4.5, 
      phone: "+91 11 4277 6222",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "Fortis Hospital Exterior",
      lat: 28.5271,
      lng: 77.1420,
      established: "2001",
      beds: 300,
      website: "https://www.fortishealthcare.com"
    },

    // Mumbai
    { 
      name: "JJ Hospital", 
      city: "Mumbai", 
      address: "Byculla, Mumbai", 
      rating: 4.5, 
      phone: "+91 22 2373 5555",
      specialists: ["Dermatology", "Skin Diseases", "Leprosy Treatment"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1598301257982-0b0141c60fd1?w=600&h=400&fit=crop",
      imageAlt: "JJ Hospital Historic Building",
      lat: 18.9806,
      lng: 72.8358,
      established: "1845",
      beds: 1800,
      website: "https://www.jjhospital.org"
    },
    { 
      name: "Kokilaben Dhirubhai Ambani Hospital", 
      city: "Mumbai", 
      address: "Andheri West, Mumbai", 
      rating: 4.8, 
      phone: "+91 22 4269 6969",
      specialists: ["Dermatology", "Cosmetology", "Skin Cancer"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "Kokilaben Hospital Modern Architecture",
      lat: 19.1176,
      lng: 72.8333,
      established: "2008",
      beds: 750,
      website: "https://www.kokilabenhospital.com"
    },
    { 
      name: "Lilavati Hospital", 
      city: "Mumbai", 
      address: "Bandra West, Mumbai", 
      rating: 4.7, 
      phone: "+91 22 2655 1000",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "Lilavati Hospital Building",
      lat: 19.0544,
      lng: 72.8254,
      established: "1997",
      beds: 350,
      website: "https://www.lilavatihospital.com"
    },
    { 
      name: "KEM Hospital", 
      city: "Mumbai", 
      address: "Parel, Mumbai", 
      rating: 4.8, 
      phone: "+91 22 2410 7000",
      specialists: ["Dermatology", "Skin OPD"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "KEM Hospital Campus",
      lat: 19.0022,
      lng: 72.8415,
      established: "1926",
      beds: 1800,
      website: "https://www.kem.edu"
    },
    { 
      name: "Nanavati Max Hospital", 
      city: "Mumbai", 
      address: "Vile Parle West, Mumbai", 
      rating: 4.6, 
      phone: "+91 22 2626 7500",
      specialists: ["Dermatology", "Cosmetic Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Nanavati Hospital Building",
      lat: 19.1025,
      lng: 72.8392,
      established: "1950",
      beds: 350,
      website: "https://www.nanavatimaxhospital.org"
    },

    // Pune
    { 
      name: "Sassoon General Hospital", 
      city: "Pune", 
      address: "Sassoon Road, Pune", 
      rating: 4.4, 
      phone: "+91 20 2612 8000",
      specialists: ["Dermatology", "Skin OPD"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "Sassoon Hospital Historic Building",
      lat: 18.5268,
      lng: 73.8725,
      established: "1867",
      beds: 1500,
      website: "https://www.sassoonhospital.com"
    },
    { 
      name: "Jehangir Hospital", 
      city: "Pune", 
      address: "Sassoon Road, Pune", 
      rating: 4.6, 
      phone: "+91 20 2605 0505",
      specialists: ["Dermatology", "Cosmetic Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1598301257982-0b0141c60fd1?w=600&h=400&fit=crop",
      imageAlt: "Jehangir Hospital Front View",
      lat: 18.5275,
      lng: 73.8720,
      established: "1946",
      beds: 350,
      website: "https://www.jehangirhospital.com"
    },
    { 
      name: "Ruby Hall Clinic", 
      city: "Pune", 
      address: "Sassoon Road, Pune", 
      rating: 4.5, 
      phone: "+91 20 2616 3391",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "Ruby Hall Clinic Building",
      lat: 18.5260,
      lng: 73.8730,
      established: "1959",
      beds: 600,
      website: "https://www.rubyhall.com"
    },
    { 
      name: "Sancheti Hospital", 
      city: "Pune", 
      address: "Shivajinagar, Pune", 
      rating: 4.7, 
      phone: "+91 20 2553 3555",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "Sancheti Hospital Complex",
      lat: 18.5290,
      lng: 73.8420,
      established: "1962",
      beds: 300,
      website: "https://www.sancheti.com"
    },
    { 
      name: "Deenanath Mangeshkar Hospital", 
      city: "Pune", 
      address: "Erandwane, Pune", 
      rating: 4.8, 
      phone: "+91 20 2545 1111",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "Deenanath Mangeshkar Hospital",
      lat: 18.5110,
      lng: 73.8290,
      established: "2001",
      beds: 800,
      website: "https://www.dmhospital.org"
    },

    // Bangalore
    { 
      name: "Manipal Hospital", 
      city: "Bangalore", 
      address: "Old Airport Road, Bangalore", 
      rating: 4.7, 
      phone: "+91 80 2502 4444",
      specialists: ["Dermatology", "Cosmetology"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Manipal Hospital Modern Building",
      lat: 12.9615,
      lng: 77.6485,
      established: "1991",
      beds: 500,
      website: "https://www.manipalhospitals.com"
    },
    { 
      name: "Apollo Hospital", 
      city: "Bangalore", 
      address: "Bannerghatta Road, Bangalore", 
      rating: 4.8, 
      phone: "+91 80 2630 4050",
      specialists: ["Dermatology", "Skin Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "Apollo Hospital Building",
      lat: 12.8900,
      lng: 77.5975,
      established: "2000",
      beds: 250,
      website: "https://www.apollohospitals.com"
    },
    { 
      name: "Narayana Health", 
      city: "Bangalore", 
      address: "Bommasandra, Bangalore", 
      rating: 4.6, 
      phone: "+91 80 2783 5000",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "Narayana Health Campus",
      lat: 12.8196,
      lng: 77.6698,
      established: "2000",
      beds: 800,
      website: "https://www.narayanahealth.org"
    },
    { 
      name: "Columbia Asia Hospital", 
      city: "Bangalore", 
      address: "Yeshwanthpur, Bangalore", 
      rating: 4.5, 
      phone: "+91 80 3989 8960",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1598301257982-0b0141c60fd1?w=600&h=400&fit=crop",
      imageAlt: "Columbia Asia Hospital",
      lat: 13.0288,
      lng: 77.5505,
      established: "2005",
      beds: 150,
      website: "https://www.columbiaasia.com"
    },

    // Chennai
    { 
      name: "Apollo Hospitals", 
      city: "Chennai", 
      address: "Greams Road, Chennai", 
      rating: 4.9, 
      phone: "+91 44 2829 3333",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "Apollo Hospitals Chennai",
      lat: 13.0594,
      lng: 80.2505,
      established: "1983",
      beds: 600,
      website: "https://www.apollohospitals.com"
    },
    { 
      name: "MIOT International", 
      city: "Chennai", 
      address: "Manapakkam, Chennai", 
      rating: 4.6, 
      phone: "+91 44 4200 2288",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "MIOT International Hospital",
      lat: 13.0215,
      lng: 80.1800,
      established: "1999",
      beds: 500,
      website: "https://www.miotinternational.com"
    },
    { 
      name: "Fortis Malar Hospital", 
      city: "Chennai", 
      address: "Adyar, Chennai", 
      rating: 4.7, 
      phone: "+91 44 2444 0404",
      specialists: ["Dermatology", "Cosmetic Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Fortis Malar Hospital",
      lat: 13.0059,
      lng: 80.2563,
      established: "1992",
      beds: 180,
      website: "https://www.fortismalarhospital.com"
    },

    // Kolkata
    { 
      name: "AMRI Hospital", 
      city: "Kolkata", 
      address: "Salt Lake City, Kolkata", 
      rating: 4.5, 
      phone: "+91 33 4010 2000",
      specialists: ["Dermatology", "Skin Diseases"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "AMRI Hospital Kolkata",
      lat: 22.5860,
      lng: 88.4020,
      established: "1999",
      beds: 450,
      website: "https://www.amrihospitals.in"
    },
    { 
      name: "Apollo Gleneagles", 
      city: "Kolkata", 
      address: "Bidhannagar, Kolkata", 
      rating: 4.7, 
      phone: "+91 33 2320 3040",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "Apollo Gleneagles Hospital",
      lat: 22.5800,
      lng: 88.4300,
      established: "2003",
      beds: 400,
      website: "https://www.apollogleneagles.in"
    },
    { 
      name: "Fortis Hospital", 
      city: "Kolkata", 
      address: "Anandapur, Kolkata", 
      rating: 4.6, 
      phone: "+91 33 6621 4000",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1598301257982-0b0141c60fd1?w=600&h=400&fit=crop",
      imageAlt: "Fortis Hospital Kolkata",
      lat: 22.5200,
      lng: 88.4000,
      established: "1995",
      beds: 200,
      website: "https://www.fortishealthcare.com"
    },

    // Hyderabad
    { 
      name: "Apollo Hospitals", 
      city: "Hyderabad", 
      address: "Jubilee Hills, Hyderabad", 
      rating: 4.7, 
      phone: "+91 40 2360 7777",
      specialists: ["Dermatology", "Cosmetic Surgery"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "Apollo Hospitals Hyderabad",
      lat: 17.4305,
      lng: 78.4055,
      established: "1988",
      beds: 350,
      website: "https://www.apollohospitals.com"
    },
    { 
      name: "Yashoda Hospitals", 
      city: "Hyderabad", 
      address: "Somajiguda, Hyderabad", 
      rating: 4.6, 
      phone: "+91 40 4567 4567",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "Yashoda Hospitals Building",
      lat: 17.4100,
      lng: 78.4600,
      established: "1989",
      beds: 500,
      website: "https://www.yashodahospitals.com"
    },
    { 
      name: "Care Hospitals", 
      city: "Hyderabad", 
      address: "Banjara Hills, Hyderabad", 
      rating: 4.5, 
      phone: "+91 40 3041 8000",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Care Hospitals Hyderabad",
      lat: 17.4200,
      lng: 78.4300,
      established: "1998",
      beds: 400,
      website: "https://www.carehospitals.com"
    },

    // Ahmedabad
    { 
      name: "Sterling Hospital", 
      city: "Ahmedabad", 
      address: "Ahmedabad", 
      rating: 4.4, 
      phone: "+91 79 4020 3000",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "Sterling Hospital Ahmedabad",
      lat: 23.0340,
      lng: 72.5360,
      established: "1993",
      beds: 300,
      website: "https://www.sterlinghospitals.com"
    },
    { 
      name: "Apollo Hospitals", 
      city: "Ahmedabad", 
      address: "Bhatt GIDC, Ahmedabad", 
      rating: 4.6, 
      phone: "+91 79 6630 0000",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "Apollo Hospital Ahmedabad",
      lat: 23.0700,
      lng: 72.6700,
      established: "2007",
      beds: 250,
      website: "https://www.apollohospitals.com"
    },

    // Jaipur
    { 
      name: "SMS Hospital", 
      city: "Jaipur", 
      address: "Jaipur", 
      rating: 4.3, 
      phone: "+91 141 256 0291",
      specialists: ["Dermatology", "Skin OPD"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1598301257982-0b0141c60fd1?w=600&h=400&fit=crop",
      imageAlt: "SMS Hospital Jaipur",
      lat: 26.9025,
      lng: 75.8025,
      established: "1947",
      beds: 1200,
      website: "https://www.smshospital.com"
    },
    { 
      name: "Fortis Escorts Hospital", 
      city: "Jaipur", 
      address: "Jawahar Lal Nehru Marg, Jaipur", 
      rating: 4.5, 
      phone: "+91 141 432 2222",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=600&h=400&fit=crop",
      imageAlt: "Fortis Hospital Jaipur",
      lat: 26.8900,
      lng: 75.8100,
      established: "2003",
      beds: 200,
      website: "https://www.fortishealthcare.com"
    },

    // Lucknow
    { 
      name: "SGPGI", 
      city: "Lucknow", 
      address: "Lucknow", 
      rating: 4.8, 
      phone: "+91 522 266 8000",
      specialists: ["Dermatology", "Skin Research"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      imageAlt: "SGPGI Lucknow",
      lat: 26.8445,
      lng: 80.9360,
      established: "1983",
      beds: 800,
      website: "https://www.sgpgi.ac.in"
    },
    { 
      name: "Medanta Hospital", 
      city: "Lucknow", 
      address: "Sector G, Lucknow", 
      rating: 4.7, 
      phone: "+91 522 670 0000",
      specialists: ["Dermatology", "Skin Clinic"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
      imageAlt: "Medanta Hospital Lucknow",
      lat: 26.8300,
      lng: 80.9500,
      established: "2014",
      beds: 350,
      website: "https://www.medanta.org"
    },

    // Chandigarh
    { 
      name: "PGIMER", 
      city: "Chandigarh", 
      address: "Sector 12, Chandigarh", 
      rating: 4.9, 
      phone: "+91 172 275 5001",
      specialists: ["Dermatology", "Skin Research"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1632833232315-4f1d5c9a7c8d?w=600&h=400&fit=crop",
      imageAlt: "PGIMER Chandigarh",
      lat: 30.7645,
      lng: 76.7680,
      established: "1962",
      beds: 1500,
      website: "https://www.pgimer.edu.in"
    },
    { 
      name: "Fortis Hospital", 
      city: "Chandigarh", 
      address: "Sector 62, Mohali", 
      rating: 4.6, 
      phone: "+91 172 469 0000",
      specialists: ["Dermatology", "Skin Care"],
      emergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      imageAlt: "Fortis Hospital Mohali",
      lat: 30.7200,
      lng: 76.7000,
      established: "2001",
      beds: 250,
      website: "https://www.fortishealthcare.com"
    }
  ];

  // Generate stable random values for particles
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    delay: `${(i * 0.4) % 5}s`,
    duration: `${8 + (i % 10)}s`
  }));

  // Get unique cities for suggestions
  const uniqueCities = [...new Set(hospitals.map(h => h.city))].sort();

  const searchHospital = async () => {
    if (!city.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filtered = hospitals.filter(
      h => h.city.toLowerCase().includes(city.toLowerCase()) ||
           h.city.toLowerCase() === city.toLowerCase()
    );
    
    setResults(filtered);
    setShowMap(false);
    setSelectedHospital(null);
    
    // Add to search history
    if (!searchHistory.includes(city) && filtered.length > 0) {
      setSearchHistory(prev => [city, ...prev].slice(0, 5));
    }
    
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchHospital();
    }
  };

  const filteredResults = results.filter(h => {
    if (filterType === "emergency") return h.emergency;
    if (filterType === "high-rated") return h.rating >= 4.5;
    return true;
  });

  const openGoogleMaps = (hospital) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`;
    window.open(url, '_blank');
  };

  const showHospitalMap = (hospital) => {
    setSelectedHospital(hospital);
    setShowMap(true);
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
      flex-col
      items-center
      px-4
      sm:px-6
      py-12
      sm:py-16
      md:py-20
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
      <div className="relative w-full max-w-6xl z-10">
        {/* Header with icon - matching Prediction page style */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#088395] blur-xl opacity-50 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-2xl rotate-6 shadow-lg flex items-center justify-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-bold
            mb-4
            bg-gradient-to-r
            from-[#09637E]
            via-[#088395]
            to-[#37B7C3]
            bg-clip-text
            text-transparent
          ">
            Find Hospitals in India
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Search for specialized skin care hospitals and clinics across all major Indian cities
          </p>
        </div>

        {/* Search section with glass effect - matching Prediction page style */}
        <GlassCard className="mb-10 p-6 md:p-8">
          {/* Decorative header line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#088395] via-[#37B7C3] to-[#7AB2B2] rounded-full" />
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Enter your city (e.g., Pune, Mumbai, Delhi)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="
                  w-full
                  p-4
                  pl-12
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <button
              onClick={searchHospital}
              disabled={isSearching || !city.trim()}
              className="
                group
                relative
                overflow-hidden
                bg-gradient-to-r
                from-[#088395]
                to-[#37B7C3]
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:shadow-[#088395]/30
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                min-w-[140px]
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
          </div>

          {/* City suggestions chips */}
          {uniqueCities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600 mr-2">Popular cities:</span>
              {uniqueCities.slice(0, 8).map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => {
                    setCity(cityName);
                    setTimeout(() => searchHospital(), 100);
                  }}
                  className="
                    px-3
                    py-1
                    text-sm
                    bg-white/30
                    backdrop-blur-sm
                    rounded-full
                    border border-white/50
                    text-[#088395]
                    hover:bg-[#088395]
                    hover:text-white
                    transition-colors
                    duration-300
                  "
                >
                  {cityName}
                </button>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Results section */}
        {results.length > 0 && (
          <>
            {/* Filter tabs - replaced emojis with icons */}
            <div className="flex justify-center gap-2 mb-6">
              {[
                { type: "all", label: "All Hospitals", icon: null },
                { type: "emergency", label: "Emergency", icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) },
                { type: "high-rated", label: "High Rated (4.5+)", icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ) }
              ].map((filter) => (
                <button
                  key={filter.type}
                  onClick={() => setFilterType(filter.type)}
                  className={`
                    flex
                    items-center
                    gap-1
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${filterType === filter.type
                      ? 'bg-[#088395] text-white shadow-lg'
                      : 'bg-white/30 backdrop-blur-sm text-gray-700 hover:bg-white/50'
                    }
                  `}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Map View Toggle */}
            {filteredResults.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-white/30
                    backdrop-blur-sm
                    rounded-lg
                    text-[#088395]
                    hover:bg-[#088395]
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>{showMap ? "Show List View" : "Show Map View"}</span>
                </button>
              </div>
            )}

            {showMap && selectedHospital ? (
              // Single Hospital Map View
              <GlassCard className="p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#088395]">{selectedHospital.name} - Location</h3>
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-gray-500 hover:text-[#088395]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="aspect-video w-full bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    title="hospital-map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedHospital.lat},${selectedHospital.lng}`}
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.lat},${selectedHospital.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#088395] text-white px-4 py-2 rounded-lg text-center hover:bg-[#09637E] transition-colors"
                  >
                    Get Directions
                  </a>
                  <button
                    onClick={() => openGoogleMaps(selectedHospital)}
                    className="flex-1 border-2 border-[#088395] text-[#088395] px-4 py-2 rounded-lg hover:bg-[#088395] hover:text-white transition-colors"
                  >
                    Open in Google Maps
                  </button>
                </div>
              </GlassCard>
            ) : showMap ? (
              // All Hospitals Map View
              <GlassCard className="p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#088395]">Hospitals in {city} - Map View</h3>
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-gray-500 hover:text-[#088395]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="aspect-video w-full bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    title="hospitals-map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=hospitals+in+${city}+india`}
                    allowFullScreen
                  />
                </div>
              </GlassCard>
            ) : (
              // Hospital cards grid with images
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((hospital, index) => (
                  <div
                    key={index}
                    className="
                      group
                      bg-white/30
                      backdrop-blur-xl
                      rounded-2xl
                      overflow-hidden
                      border border-white/40
                      shadow-xl
                      hover:shadow-2xl
                      hover:shadow-[#088395]/20
                      transition-all
                      duration-500
                      hover:-translate-y-2
                    "
                  >
                    {/* Hospital image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={hospital.image} 
                        alt={hospital.imageAlt || hospital.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Emergency badge */}
                      {hospital.emergency && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>Emergency</span>
                        </div>
                      )}
                      
                      {/* Rating badge */}
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>{hospital.rating}</span>
                      </div>
                      
                      {/* Established badge */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                        Est. {hospital.established}
                      </div>
                    </div>

                    {/* Hospital details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#088395] mb-2 line-clamp-1">
                        {hospital.name}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600 text-sm flex items-start gap-2">
                          <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="line-clamp-2">{hospital.address}</span>
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{hospital.phone}</span>
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{hospital.beds.toLocaleString()} Beds</span>
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hospital.specialists.slice(0, 3).map((spec, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-[#088395]/10 text-[#088395] text-xs rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                          {hospital.specialists.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{hospital.specialists.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <a
                          href={`tel:${hospital.phone}`}
                          className="flex-1 bg-[#088395] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#09637E] transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>Contact</span>
                        </a>
                        <button
                          onClick={() => showHospitalMap(hospital)}
                          className="flex-1 border-2 border-[#088395] text-[#088395] px-4 py-2 rounded-lg text-sm hover:bg-[#088395] hover:text-white transition-colors flex items-center justify-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span>Map</span>
                        </button>
                      </div>
                      
                      <a
                        href={hospital.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block text-center text-sm text-[#088395] hover:underline"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results count */}
            <p className="text-center text-gray-600 mt-8">
              Found {filteredResults.length} hospital{filteredResults.length !== 1 ? 's' : ''} in {city}
            </p>
          </>
        )}

        {/* No results message */}
        {results.length === 0 && city && !isSearching && (
          <GlassCard className="text-center p-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gray-200/50 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No hospitals found</h3>
            <p className="text-gray-600">
              We couldn't find any hospitals in "{city}". Try searching for a different city.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600">Try these cities:</span>
              {["Mumbai", "Delhi", "Pune", "Bangalore", "Chennai"].map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => {
                    setCity(cityName);
                    setTimeout(() => searchHospital(), 100);
                  }}
                  className="
                    px-3
                    py-1
                    bg-white/30
                    backdrop-blur-sm
                    rounded-full
                    text-sm
                    text-[#088395]
                    hover:bg-[#088395]
                    hover:text-white
                    transition-colors
                  "
                >
                  {cityName}
                </button>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Search history */}
        {searchHistory.length > 0 && results.length === 0 && !city && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {searchHistory.map((city, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCity(city);
                    setTimeout(() => searchHospital(), 100);
                  }}
                  className="
                    px-3
                    py-1
                    bg-white/30
                    backdrop-blur-sm
                    rounded-full
                    text-sm
                    text-[#088395]
                    hover:bg-[#088395]
                    hover:text-white
                    transition-colors
                  "
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back button - matching Prediction page style */}
        <div className="mt-10 text-center">
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
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(-20px) translateX(-5px); }
            75% { transform: translateY(-10px) translateX(5px); }
          }
          
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

export default Hospital;