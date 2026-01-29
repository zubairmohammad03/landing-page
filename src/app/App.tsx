import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { supabase } from "../utils/supabase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { JSX, useState } from "react";
import {
  UserCheck,
  GraduationCap,
  ClipboardCheck,
  Wallet,
  Home,
  BookOpen,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  shortLine: string;
  points: string[];
  icon: JSX.Element;
};

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [openRegister, setOpenRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const serviceDetails: Service[] = [
    {
      id: "counseling",
      title: "Personalized Career Counseling",
      shortLine:
        "Understand your goals and align them with the right global opportunities.",
      icon: <UserCheck className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "One-to-one counseling sessions with experienced advisors",
        "Assessment of academic background, interests, and career plans",
        "Guidance on country, course, and intake selection",
        "Clear roadmap tailored to your long-term goals",
      ],
    },
    {
      id: "admission",
      title: "University & Admission Management",
      shortLine:
        "End-to-end support to secure offers from the right universities",
      icon: <GraduationCap className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "Shortlisting of universities based on profile strength",
        "Application strategy planning and timeline management",
        "Documentation support and application submission",
        "Faster offer turnaround with expert follow-ups",
      ],
    },
    {
      id: "profile",
      title: "In-depth Profile Evaluation & Strategy",
      shortLine: "Strengthen your profile to improve admission outcomes.",
      icon: <ClipboardCheck className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "Academic and extracurricular profile assessment",
        "Identification of strengths and improvement areas",
        "Course and university fit analysis",
        "Guidance to enhance competitiveness for top institutions",
      ],
    },
    {
      id: "finance",
      title: "Scholarships & Financial Aid Guidance",
      shortLine:
        "Maximize funding opportunities to reduce your education cost.",
      icon: <Wallet className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "Identification of eligible scholarships and grants",
        "Support for merit-based and need-based funding options",
        "Assistance with scholarship applications and documentation",
        "Transparent guidance on funding expectations",
      ],
    },
    {
      id: "visa",
      title: "Visa & Accommodation Support",
      shortLine: "From admission to arrival abroad, made simple and stress-free.",
      icon: <Home className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "Complete visa filing and documentation assistance",
        "Interview preparation and compliance guidance",
        "Support in finding safe and verified student accommodation",
        "Pre-departure assistance for a stress-free move",
      ],
    },
    {
      id: "exams",
      title: "Test Preparation & Exam Guidance",
      shortLine:
        "Prepare strategically to meet university and visa requirements.",
      icon: <BookOpen className="w-8 h-8 text-[#7C3AED]" />,
      points: [
        "Guidance on required exams (IELTS, TOEFL, GRE, GMAT, etc.)",
        "Test selection based on country and university requirements",
        "Preparation strategy and resource recommendations",
        "Timelines aligned with application deadlines",
      ],
    },
  ];

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    destination_country: "",
    preferred_study_level: "",
    english_test_taken: "",
  });

  const carouselSlides = [
    {
      title: "Vidyayatra – Your Study Abroad Partner",
      image:
        "https://images.unsplash.com/photo-1758270704524-596810e891b5?auto=format&fit=crop&w=1080&q=80",
      points: [
        "Expert counseling for international students",
        "Personalized university selection guidance",
        "Complete application support from start to finish",
        "Visa assistance and documentation help",
        "Pre-departure orientation and support",
      ],
    },
    {
      title: "Scholarships & Student Support",
      image:
        "https://images.unsplash.com/photo-1686030323326-63991462052e?auto=format&fit=crop&w=1080&q=80",
      points: [
        "Access to exclusive scholarship opportunities",
        "Financial aid and funding guidance",
        "Educational loan assistance",
        "Part-time work permit information",
        "Cost estimation and budgeting support",
      ],
    },
    {
      title: "Study in the UK",
      image:
        "https://images.unsplash.com/photo-1697978242964-a101791e3181?auto=format&fit=crop&w=1080&q=80",
      points: [
        "World-renowned universities and programs",
        "Post-study work visa for 2–3 years",
        "Diverse cultural experience and heritage",
        "High-quality education system",
        "Gateway to European opportunities",
      ],
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
  };

  const countries = [
    {
      id: "uk",
      name: "Study in UK",
      flag: "🇬🇧",
      image:
        "https://images.unsplash.com/photo-1689446800111-28fc9cb0583d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBCaWclMjBCZW4lMjBVS3xlbnwxfHx8fDE3Njc4Nzc2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admissionInfo: {
        requirements: [
          "Academic transcripts and certificates",
          "English proficiency test (IELTS/TOEFL)",
          "Statement of Purpose",
          "Letters of Recommendation",
          "Valid passport",
        ],
        intakes: ["September (Main)", "January", "May"],
        duration: "Undergraduate: 3 years | Postgraduate: 1-2 years",
        popularCourses: [
          "Business & Management",
          "Engineering",
          "Computer Science",
          "Medicine",
          "Arts & Humanities",
        ],
        workRights: "Up to 20 hours/week during studies",
      },
    },
    {
      id: "usa",
      name: "Study in USA",
      flag: "🇺🇸",
      image:
        "https://images.unsplash.com/photo-1734900715044-ef86383fd704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrJTIwQ2l0eSUyMFVTQXxlbnwxfHx8fDE3Njc4Nzc2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admissionInfo: {
        requirements: [
          "SAT/ACT (Undergraduate) or GRE/GMAT (Graduate)",
          "Academic transcripts",
          "English proficiency (TOEFL/IELTS)",
          "Essays and Personal Statement",
          "Letters of Recommendation",
          "Financial documents",
        ],
        intakes: [
          "Fall (August/September)",
          "Spring (January)",
          "Summer (May)",
        ],
        duration: "Undergraduate: 4 years | Postgraduate: 1.5-2 years",
        popularCourses: [
          "Computer Science",
          "Business Administration",
          "Engineering",
          "Data Science",
          "Medicine",
        ],
        workRights: "On-campus jobs and CPT/OPT programs available",
      },
    },
    {
      id: "canada",
      name: "Study in Canada",
      flag: "🇨🇦",
      image:
        "https://images.unsplash.com/photo-1668882698355-923d532fa985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JvbnRvJTIwQ2FuYWRhJTIwc2t5bGluZXxlbnwxfHx8fDE3Njc4NTY2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admissionInfo: {
        requirements: [
          "Academic transcripts and diplomas",
          "English/French proficiency (IELTS/TOEFL)",
          "Statement of Purpose",
          "Letters of Recommendation",
          "Study permit application",
          "Proof of funds",
        ],
        intakes: ["Fall (September)", "Winter (January)", "Summer (May)"],
        duration: "Undergraduate: 3-4 years | Postgraduate: 1-2 years",
        popularCourses: [
          "Engineering",
          "Business",
          "Computer Science",
          "Healthcare",
          "Natural Resources",
        ],
        workRights: "20 hours/week during studies, full-time during breaks",
      },
    },
    {
      id: "australia",
      name: "Study in Australia",
      flag: "🇦🇺",
      image:
        "https://images.unsplash.com/photo-1718185795639-c442aff612cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTeWRuZXklMjBPcGVyYSUyMEhvdXNlJTIwQXVzdHJhbGlhfGVufDF8fHx8MTc2Nzg1NjY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admissionInfo: {
        requirements: [
          "Academic transcripts",
          "English proficiency (IELTS/TOEFL/PTE)",
          "Statement of Purpose",
          "Genuine Temporary Entrant (GTE) statement",
          "Health insurance (OSHC)",
          "Financial capacity proof",
        ],
        intakes: ["February (Main)", "July"],
        duration: "Undergraduate: 3 years | Postgraduate: 1.5-2 years",
        popularCourses: [
          "Engineering",
          "Business",
          "IT",
          "Health Sciences",
          "Education",
        ],
        workRights:
          "48 hours per fortnight during semester, unlimited during breaks",
      },
    },
    {
      id: "germany",
      name: "Study in Germany",
      flag: "🇩🇪",
      image:
        "https://images.unsplash.com/photo-1618260397416-12801af7ff7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBHZXJtYW55JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2Nzg3NzYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admissionInfo: {
        requirements: [
          "Academic certificates (APS certified)",
          "German language proficiency (TestDaF/DSH) or English (IELTS/TOEFL)",
          "Motivation letter",
          "CV/Resume",
          "Blocked account (€11,208/year)",
          "Health insurance",
        ],
        intakes: ["Winter Semester (October)", "Summer Semester (April)"],
        duration: "Undergraduate: 3-4 years | Postgraduate: 2 years",
        popularCourses: [
          "Engineering",
          "Computer Science",
          "Business",
          "Natural Sciences",
          "Medicine",
        ],
        workRights: "120 full days or 240 half days per year",
      },
    },
    {
      id: "uae",
      name: "Study in UAE",
      flag: "🇦🇪",
      image:
        "https://www.agoda.com/wp-content/uploads/2024/04/Featured-image-Dubai-UAE.jpg",
      admissionInfo: {
        requirements: [
          "Academic transcripts and certificates",
          "English proficiency (IELTS/TOEFL) – varies by university",
          "Statement of Purpose",
          "Letters of Recommendation",
          "Valid passport",
          "Student visa application",
        ],
        intakes: ["September (Main)", "January", "May"],
        duration: "Undergraduate: 3-4 years | Postgraduate: 1-2 years",
        popularCourses: [
          "Business & Management",
          "Engineering",
          "Computer Science & IT",
          "Hospitality & Tourism",
          "Media & Design",
        ],
        workRights:
          "Part-time work permitted with university and visa approval",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Right Side Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#ffffff] backdrop-blur-sm shadow-sm z-50 px-8 md:px-16 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Vidyayatra Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-700 hover:text-[#7C3AED]">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#7C3AED]">
              Why Choose Us
            </a>
            <a href="#countries" className="text-gray-700 hover:text-[#7C3AED]">
              Destinations
            </a>

            <button
              onClick={() => setOpenRegister(true)}
              className="bg-[#FCD34D] text-gray-900 px-6 py-2 rounded-full hover:bg-[#FBBF24] shadow-md transition"
            >
              Register Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
              <div className="flex flex-col p-6 gap-4">
                <a
                  href="#services"
                  className="text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </a>

                <a
                  href="#about"
                  className="text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Why Choose Us
                </a>

                <a
                  href="#countries"
                  className="text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Destinations
                </a>

                <button
                  onClick={() => {
                    setOpenRegister(true);
                    setMenuOpen(false);
                  }}
                  className="bg-[#FCD34D] text-gray-900 py-2 rounded-full hover:bg-[#FBBF24] transition"
                >
                  Register Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Announcement / Marquee Strip */}
      <div className="fixed top-[110px] left-0 right-0 z-40 bg-[#7C3AED] text-white overflow-hidden">
        <div className="whitespace-nowrap flex items-center h-8">
          <div className="animate-marquee flex items-center gap-12 px-6">
            <span className="text-sm font-medium">
              🎓 Study in UK • USA • Canada • Australia • Germany • UAE
            </span>
            <span className="text-sm font-medium">
              ✨ What we offer: Counseling • University Selection • Applications
              • Visa Support
            </span>
            <span className="text-sm font-medium">
              🌍 Your global education journey starts with Vidyayatra
            </span>
          </div>

          {/* duplicate for seamless loop */}
          <div className="animate-marquee flex items-center gap-12 px-6">
            <span className="text-sm font-medium">
              🎓 Study in UK • USA • Canada • Australia • Germany • UAE
            </span>
            <span className="text-sm font-medium">
              ✨ What we offer: Counseling • University Selection • Applications
              • Visa Support
            </span>
            <span className="text-sm font-medium">
              🌍 Your global education journey starts with Vidyayatra
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <Slider {...sliderSettings} className="h-full">
            {carouselSlides.map((slide, index) => (
              <div key={index} className="h-screen relative">
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/90 via-[#7C3AED]/70 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
                  <div className="max-w-4xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                      {slide.title}
                    </h2>

                    <ul className="space-y-3 mb-8">
                      {slide.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2" />
                          <span className="text-base sm:text-lg md:text-xl text-white/90">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* CTA */}
        <div className="absolute bottom-10 left-4 sm:left-8 md:left-16 z-20">
          <button
            onClick={() => setOpenRegister(true)}
            className="bg-[#FCD34D] text-gray-900 px-8 py-4 rounded-full hover:bg-[#FBBF24] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#7C3AED] mb-4">
              How We Guide You
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Structured, end-to-end guidance at every stage of your study
              abroad journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {serviceDetails.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveService(service)}
                className="cursor-pointer rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4">{service.icon}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>

                {/* Short descriptive line */}
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  {service.shortLine}
                </p>

                <p className="text-sm text-gray-600 font-medium">
                  Click to explore detailed support →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setActiveService(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl max-w-md w-full p-6 z-10">
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-4">
              {activeService.title}
            </h3>

            <ul className="space-y-3 mb-6">
              {activeService.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveService(null)}
              className="w-full py-2 rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#7C3AED] mb-6">
                Why Choose Vidyayatra?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl text-gray-900 mb-2">
                      Expert Guidance
                    </h4>
                    <p className="text-gray-600">
                      Experienced counselors with in-depth knowledge of global
                      education systems
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl text-gray-900 mb-2">
                      Personalized Approach
                    </h4>
                    <p className="text-gray-600">
                      Tailored strategies that align with your unique academic
                      profile and goals
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl text-gray-900 mb-2">
                      Proven Track Record
                    </h4>
                    <p className="text-gray-600">
                      Hundreds of successful placements in top universities
                      worldwide
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl text-gray-900 mb-2">
                      End-to-End Support
                    </h4>
                    <p className="text-gray-600">
                      From initial counseling to visa approval - we're with you
                      every step
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-12 rounded-3xl shadow-2xl text-white sm:p-12 md:p-12">
              <div className="text-center mb-8">
                <p className="text-6xl mb-4">🎓</p>
                <h3 className="text-3xl mb-2">Ready to Begin?</h3>
                <p className="text-white/90">
                  Take the first step towards your international education
                </p>
              </div>
              <button
                className="w-full bg-[#FCD34D] text-gray-900 px-8 py-4 rounded-full hover:bg-[#FBBF24] transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => setOpenRegister(true)}
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section
        className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"
        id="countries"
      >
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#7C3AED] mb-4">
              Choose Your Destination
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore admission requirements and opportunities in top study
              destinations
            </p>
          </div>

          {/* Country Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {countries.map((country) => (
              <div
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-52 sm:h-64"
              >
                <div className="relative h-64">
                  <ImageWithFallback
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-5xl mb-2">{country.flag}</p>
                    <h3 className="text-2xl text-white">{country.name}</h3>
                    <p className="text-white/80 text-sm mt-2">
                      Click to view admission details →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setOpenRegister(true)}
              className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Register Now
            </button>
          </div>

          {openRegister && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl text-[#7C3AED]">
                    Student Registration
                  </h3>
                  <button onClick={() => setOpenRegister(false)}>✕</button>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    const { error } = await supabase.from("students").insert({
                      full_name: formData.full_name,
                      email: formData.email,
                      phone: formData.phone,
                      destination_country: formData.destination_country,
                      preferred_study_level: formData.preferred_study_level,
                    });

                    setLoading(false);

                    if (error) {
                      alert(error.message);
                    } else {
                      alert("Registration successful!");
                      setOpenRegister(false);
                    }
                  }}
                >
                  <input
                    required
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    required
                    placeholder="Phone"
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <select
                    required
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destination_country: e.target.value,
                      })
                    }
                  >
                    <option value="">Country Interested</option>
                    {[
                      "UK",
                      "USA",
                      "UAE",
                      "Canada",
                      "Australia",
                      "New Zealand",
                      "Ireland",
                      "Germany",
                      "Italy",
                      "France",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    required
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferred_study_level: e.target.value,
                      })
                    }
                  >
                    <option value="">Preferred Study Level</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    required
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        english_test_taken: e.target.value,
                      })
                    }
                  >
                    <option value="">English Proficiency Test Taken?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <button
                    disabled={loading}
                    className="w-full bg-[#7C3AED] text-white py-3 rounded-lg hover:bg-[#5B21B6] transition"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Admission Details Modal */}
          {selectedCountry && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] p-8 rounded-t-3xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-6xl mb-3">
                        {countries.find((c) => c.id === selectedCountry)?.flag}
                      </p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2">
                        {countries.find((c) => c.id === selectedCountry)?.name}
                      </h3>
                      <p className="text-white/90">Complete Admission Guide</p>
                    </div>
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Requirements */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#7C3AED]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-2xl text-gray-900">
                        Admission Requirements
                      </h4>
                    </div>
                    <ul className="space-y-3 ml-13">
                      {countries
                        .find((c) => c.id === selectedCountry)
                        ?.admissionInfo.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-[#FCD34D] rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Intakes */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#FCD34D]/30 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#F59E0B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl text-gray-900">
                        Available Intakes
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-3 ml-13">
                      {countries
                        .find((c) => c.id === selectedCountry)
                        ?.admissionInfo.intakes.map((intake, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-4 py-2 rounded-full text-gray-700 border border-gray-200"
                          >
                            {intake}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#7C3AED]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl text-gray-900">Course Duration</h4>
                    </div>
                    <p className="text-gray-700 ml-13">
                      {
                        countries.find((c) => c.id === selectedCountry)
                          ?.admissionInfo.duration
                      }
                    </p>
                  </div>

                  {/* Popular Courses */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#FCD34D]/30 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#F59E0B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl text-gray-900">Popular Courses</h4>
                    </div>
                    <div className="flex flex-wrap gap-3 ml-13">
                      {countries
                        .find((c) => c.id === selectedCountry)
                        ?.admissionInfo.popularCourses.map((course, idx) => (
                          <span
                            key={idx}
                            className="bg-[#7C3AED]/10 text-[#7C3AED] px-4 py-2 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Work Rights */}
                  <div className="bg-[#7C3AED]/5 p-6 rounded-2xl border border-[#7C3AED]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#7C3AED]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl text-gray-900">
                        Work Rights for Students
                      </h4>
                    </div>
                    <p className="text-gray-700 ml-13">
                      {
                        countries.find((c) => c.id === selectedCountry)
                          ?.admissionInfo.workRights
                      }
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Get Started with{" "}
                      {countries.find((c) => c.id === selectedCountry)?.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F1F1F] text-white py-14 px-6 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Vidyayatra Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl text-[#FCD34D]">Vidyayatra</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner in international education
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 font-semibold">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>vidyayatrasolutions@gmail.com</li>
                <li>+91-92119 17228</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="mb-4 font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1738SVe5Rs/"
                  className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center hover:bg-[#FCD34D] transition-colors"
                >
                  <span className="text-white">f</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/vidyayatra/"
                  className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center hover:bg-[#FCD34D] transition-colors"
                >
                  <span className="text-white">in</span>
                </a>

                <a
                  href="https://www.instagram.com/vidyayatra_studyabroad?igsh=aDVtZ2E0YWhxOHU="
                  className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center hover:bg-[#FCD34D] transition-colors"
                >
                  <span className="text-white">ig</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Vidyayatra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
