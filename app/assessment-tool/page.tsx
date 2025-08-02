'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function AssessmentTool() {
  const [assessmentData, setAssessmentData] = useState({
    founderName: '',
    companyName: '',
    email: '',
    phone: ''
  });
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionTimer, setSectionTimer] = useState(0);
  const [totalTimer, setTotalTimer] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [transcript, setTranscript] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const assessmentSections = [
    {
      title: "Vision & Mission",
      duration: 300, // 5 minutes
      prompts: [
        "Tell me about your company's vision for the next 5 years",
        "What problem are you solving and why does it matter?",
        "What drives you personally as a founder?",
        "How do you see your company changing the industry?"
      ],
      tips: "Speak about your long-term goals, the impact you want to create, and what motivates you daily"
    },
    {
      title: "Behavioral Patterns",
      duration: 240, // 4 minutes
      prompts: [
        "Describe your typical work day and how you prioritize tasks",
        "How do you handle stress and pressure?",
        "Tell me about your leadership style",
        "What are your personal strengths and areas for improvement?"
      ],
      tips: "Share specific examples from your daily work life and leadership experiences"
    },
    {
      title: "Decision Making",
      duration: 240, // 4 minutes
      prompts: [
        "Walk me through a major business decision you made recently",
        "How do you gather information before making decisions?",
        "How do you balance data vs intuition?",
        "Tell me about a decision you regret and what you learned"
      ],
      tips: "Use real examples and explain your thought process"
    },
    {
      title: "Risk Appetite",
      duration: 180, // 3 minutes
      prompts: [
        "What's the biggest risk you've taken in business?",
        "How do you evaluate risk vs reward?",
        "What risks keep you up at night?",
        "How do you manage financial risk?"
      ],
      tips: "Be honest about your comfort level with different types of risk"
    },
    {
      title: "Crisis Management",
      duration: 180, // 3 minutes
      prompts: [
        "Tell me about a crisis your company faced and how you handled it",
        "How do you communicate during difficult times?",
        "What's your approach to damage control?",
        "How do you keep your team motivated during crises?"
      ],
      tips: "Share a specific crisis example and your step-by-step approach"
    },
    {
      title: "People Management",
      duration: 180, // 3 minutes
      prompts: [
        "How do you hire and build your team?",
        "How do you handle conflicts within your team?",
        "Describe your approach to employee development",
        "How do you maintain company culture as you grow?"
      ],
      tips: "Discuss your people philosophy and give examples"
    },
    {
      title: "Finance Management",
      duration: 180, // 3 minutes
      prompts: [
        "How do you manage cash flow and budgeting?",
        "What's your approach to fundraising?",
        "How do you make investment decisions?",
        "How do you balance growth vs profitability?"
      ],
      tips: "Share your financial strategy and key metrics you track"
    },
    {
      title: "Problem Spotting",
      duration: 180, // 3 minutes
      prompts: [
        "How do you identify problems before they become critical?",
        "What systems do you have for monitoring business health?",
        "Tell me about a problem you spotted early and prevented",
        "What warning signs do you look for?"
      ],
      tips: "Explain your monitoring systems and intuition"
    },
    {
      title: "Troubleshooting",
      duration: 120, // 2 minutes
      prompts: [
        "Walk me through how you solve complex problems",
        "How do you prioritize multiple urgent issues?",
        "What's your methodology for root cause analysis?",
        "How do you prevent problems from recurring?"
      ],
      tips: "Share your problem-solving framework with examples"
    }
  ];

  const languages = [
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mr', name: 'मराठी' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'en', name: 'English' }
  ];

  useEffect(() => {
    // Get data from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('name')) {
      setAssessmentData({
        founderName: params.get('name') || '',
        companyName: params.get('company') || '',
        email: params.get('email') || '',
        phone: params.get('phone') || ''
      });
      setShowAssessment(true);
    }
  }, []);

  useEffect(() => {
    if (isRecording && assessmentMode === 'voice') {
      timerIntervalRef.current = setInterval(() => {
        setSectionTimer(prev => {
          const newTime = prev + 1;
          // Auto-advance to next section when time is up
          if (newTime >= assessmentSections[currentSection].duration) {
            if (currentSection < assessmentSections.length - 1) {
              handleNextSection();
            } else {
              stopRecording();
            }
            return 0;
          }
          return newTime;
        });
        setTotalTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRecording, currentSection, assessmentMode]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAssessment(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await uploadAudio(audioBlob);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setSectionTimer(0);
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleNextSection = () => {
    if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setSectionTimer(0);
    }
  };

  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('founderName', assessmentData.founderName);
    formData.append('companyName', assessmentData.companyName);
    formData.append('email', assessmentData.email);
    formData.append('phone', assessmentData.phone);
    formData.append('transcript', transcript);
    
    try {
      const response = await fetch('https://smart-deep-neural-assessment-dna.onrender.com/api/process-interview', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Assessment completed successfully! Check your email for the report.');
      } else {
        alert('Error processing assessment. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
    }
  };

  const handleTextSubmit = async () => {
    const formData = new FormData();
    formData.append('textInput', textInput);
    formData.append('language', selectedLanguage);
    formData.append('founderName', assessmentData.founderName);
    formData.append('companyName', assessmentData.companyName);
    formData.append('email', assessmentData.email);
    formData.append('phone', assessmentData.phone);
    
    try {
      const response = await fetch('https://smart-deep-neural-assessment-dna.onrender.com/api/process-interview', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Assessment submitted successfully! Check your email for the report.');
      } else {
        alert('Error processing assessment. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
    }
  };

  const currentSectionData = assessmentSections[currentSection];
  const sectionProgress = currentSectionData ? (sectionTimer / currentSectionData.duration) * 100 : 0;
  const totalProgress = (currentSection / assessmentSections.length) * 100 + (sectionProgress / assessmentSections.length);

  if (!showAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StartHub Media AI Assessment
            </h1>
            <p className="text-center text-gray-600 mb-8">
              30-minute comprehensive founder assessment
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founder Name / संस्थापक का नाम
                </label>
                <input
                  type="text"
                  required
                  value={assessmentData.founderName}
                  onChange={(e) => setAssessmentData({...assessmentData, founderName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name / कंपनी का नाम
                </label>
                <input
                  type="text"
                  required
                  value={assessmentData.companyName}
                  onChange={(e) => setAssessmentData({...assessmentData, companyName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email / ईमेल
                </label>
                <input
                  type="email"
                  required
                  value={assessmentData.email}
                  onChange={(e) => setAssessmentData({...assessmentData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone / फ़ोन
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={assessmentData.phone}
                  onChange={(e) => setAssessmentData({...assessmentData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                Start Assessment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Assessment Mode</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => setAssessmentMode('voice')}
              className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <Mic className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Voice Recording (English)</h3>
                <p className="text-gray-600 mb-4">30-minute guided voice assessment</p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li>✓ Structured interview format</li>
                  <li>✓ Timer for each section</li>
                  <li>✓ On-screen prompts</li>
                  <li>✓ Covers all assessment areas</li>
                </ul>
              </div>
            </div>
            
            <div
              onClick={() => setAssessmentMode('text')}
              className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Text Input (Any Language)</h3>
                <p className="text-gray-600 mb-4">Type in your preferred language</p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li>✓ 10 Indian languages</li>
                  <li>✓ Answer at your pace</li>
                  <li>✓ Same assessment questions</li>
                  <li>✓ No time pressure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentMode === 'voice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(totalProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>

          {/* Current Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section {currentSection + 1}: {currentSectionData.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {formatTime(currentSectionData.duration - sectionTimer)} remaining
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-blue-600">{formatTime(totalTimer)}</p>
              </div>
            </div>

            {/* Section Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${sectionProgress}%` }}
              />
            </div>

            {/* Prompts */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Talk About These Points:
              </h3>
              <ul className="space-y-2">
                {currentSectionData.prompts.map((prompt, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{prompt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> {currentSectionData.tips}
                </p>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="text-center">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow flex items-center mx-auto"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording This Section
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-red-500 font-semibold">Recording in Progress...</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={stopRecording}
                      className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 flex items-center"
                    >
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </button>
                    <button
                      onClick={handleNextSection}
                      disabled={currentSection >= assessmentSections.length - 1}
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      Next Section →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section Navigator */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-3">Assessment Sections</h3>
            <div className="grid grid-cols-3 gap-2">
              {assessmentSections.map((section, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-center text-sm ${
                    index === currentSection
                      ? 'bg-blue-600 text-white'
                      : index < currentSection
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}. {section.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentMode === 'text') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Text Assessment</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Language / अपनी भाषा चुनें
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Please answer these questions:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. What is your company vision and mission?</li>
                <li>2. Describe your leadership and work style</li>
                <li>3. How do you make important decisions?</li>
                <li>4. What risks have you taken in business?</li>
                <li>5. How do you handle crises?</li>
                <li>6. How do you manage people and teams?</li>
                <li>7. What's your approach to finance management?</li>
                <li>8. How do you identify and solve problems?</li>
              </ol>
            </div>

            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your answers here in your preferred language..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />

            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim()}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}