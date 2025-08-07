// app/assessment-tool/page.tsx - Next.js version
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export default function AssessmentTool() {
  // Backend URL - Update this if needed
  const API_URL = 'https://smart-deep-neural-assessment-dna.onrender.com';
  
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [selectedMode, setSelectedMode] = useState<'voice' | 'text'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const languages = [
    { code: 'en-IN', name: 'English' },
    { code: 'hi-IN', name: 'हिंदी' },
    { code: 'ta-IN', name: 'தமிழ்' },
    { code: 'te-IN', name: 'తెలుగు' },
    { code: 'bn-IN', name: 'বাংলা' },
    { code: 'gu-IN', name: 'ગુજરાતી' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'മലയാളം' },
    { code: 'mr-IN', name: 'मराठी' },
    { code: 'pa-IN', name: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = []; // Clear previous recordings

    // CRITICAL: Set up data collection BEFORE starting
    mediaRecorder.ondataavailable = (event) => {
      console.log('Data chunk received, size:', event.data.size);
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      console.log('Recording stopped. Total chunks:', audioChunksRef.current.length);
    };

    // Start recording with timeslice to ensure data is collected
    mediaRecorder.start(1000); // Collect data every 1 second
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 59) {
          stopRecording();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  } catch (error) {
    console.error('Error accessing microphone:', error);
    setError('Microphone access denied. Please allow microphone access and try again.');
  }
};
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      setError('Please fill all fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('language', selectedLanguage);
    formDataToSend.append('mode', selectedMode);

    if (selectedMode === 'voice') {
      if (audioChunksRef.current.length === 0) {
        setError('Please record your voice first');
        return;
      }
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      formDataToSend.append('audio', audioBlob, 'recording.webm');
    } else {
      if (!textInput.trim()) {
        setError('Please enter your business description');
        return;
      }
      formDataToSend.append('textInput', textInput);
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/assess`, {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setAssessmentResult(result);
      } else {
        setError(result.error || 'Assessment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (assessmentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Your Assessment Report</h1>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: assessmentResult.report.replace(/\n/g, '<br />') }} />
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Back to Home
            </button>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Powered by StartHub AI Technology
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Processing your assessment...</h2>
          <p className="text-gray-600">Our AI is analyzing your response</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">StartHub AI Assessment</h1>
          <p className="text-center text-gray-600 mb-8">Deep Neural Assessment Platform</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Language
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`px-3 py-2 text-sm rounded-lg border-2 transition ${
                        selectedLanguage === lang.code
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-600'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Assessment Mode
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMode('voice')}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedMode === 'voice'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">🎤</div>
                    <div className="font-semibold">Voice Assessment</div>
                    <div className="text-sm text-gray-600">Speak in your language</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMode('text')}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedMode === 'text'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">✍️</div>
                    <div className="font-semibold">Text Assessment</div>
                    <div className="text-sm text-gray-600">Type in any language</div>
                  </button>
                </div>
              </div>
<button
  type="button"
  onClick={() => console.log('Audio chunks:', audioChunksRef.current.length)}
  className="mt-2 text-sm text-gray-600 underline"
>
  Debug: Check Audio Chunks
</button>
              {selectedMode === 'voice' ? (
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold mb-2">Voice Recording</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click the button and speak about your business for up to 60 seconds
                  </p>
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-24 h-24 rounded-full text-white text-4xl transition ${
                      isRecording
                        ? 'bg-green-500 hover:bg-green-600 animate-pulse'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isRecording ? '⏹️' : '🎤'}
                  </button>
                  <div className="text-3xl font-bold text-purple-600 mt-4">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {isRecording ? 'Recording... Click to stop' : 
                     recordingTime > 0 ? 'Recording complete. Click to record again' : 
                     'Click to start recording'}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about your business
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    rows={6}
                    placeholder="Describe your business, challenges, and goals in your preferred language..."
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Start Assessment
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Powered by StartHub AI Technology
          </p>
        </div>
      </div>
    </div>
  );
}