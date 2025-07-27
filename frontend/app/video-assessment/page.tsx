'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Assessment configurations
const ASSESSMENT_TYPES = {
  express: {
    name: 'Express Assessment',
    rounds: [
      {
        round: 1,
        title: "Leadership Vision",
        duration: 10,
        questions: [
          "What inspired you to start this company?",
          "Describe your vision for the next 5 years.",
          "What core values drive your decisions?"
        ]
      },
      {
        round: 2,
        title: "Leadership Style",
        duration: 10,
        questions: [
          "How would you describe your leadership approach?",
          "Give an example of how you motivate your team.",
          "How do you handle conflicts within your organization?"
        ]
      },
      {
        round: 3,
        title: "Decision Making",
        duration: 10,
        questions: [
          "Walk me through your decision-making process.",
          "How do you balance data vs intuition?",
          "Describe a difficult decision you made recently."
        ]
      },
      {
        round: 4,
        title: "Communication",
        duration: 10,
        questions: [
          "How do you communicate your vision to stakeholders?",
          "What's your approach to giving feedback?",
          "How do you ensure message consistency across teams?"
        ]
      },
      {
        round: 5,
        title: "Innovation & Growth",
        duration: 10,
        questions: [
          "How do you foster innovation in your company?",
          "What's your strategy for scaling?",
          "How do you stay ahead of market changes?"
        ]
      }
    ],
    totalTime: 50,
    price: 35000,
    type: 'single-session'
  },
  standard: {
    name: 'Standard Assessment',
    rounds: [
      {
        round: 1,
        day: 1,
        title: "Leadership Vision",
        duration: 15,
        questions: [
          "What inspired you to start this company?",
          "Describe your vision for the next 5 years.",
          "What core values drive your decisions?",
          "How do you see your industry evolving?"
        ]
      },
      {
        round: 2,
        day: 2,
        title: "Leadership Style",
        duration: 15,
        questions: [
          "How would you describe your leadership approach?",
          "Give an example of how you motivate your team.",
          "How do you handle conflicts within your organization?",
          "What leadership qualities do you value most?"
        ]
      },
      {
        round: 3,
        day: 3,
        title: "Decision Making",
        duration: 15,
        questions: [
          "Walk me through your decision-making process.",
          "How do you balance data vs intuition?",
          "Describe a difficult decision you made recently.",
          "How do you involve others in decision-making?"
        ]
      },
      {
        round: 4,
        day: 4,
        title: "Communication",
        duration: 15,
        questions: [
          "How do you communicate your vision to stakeholders?",
          "What's your approach to giving feedback?",
          "How do you ensure message consistency across teams?",
          "Describe your crisis communication strategy."
        ]
      },
      {
        round: 5,
        day: 5,
        title: "Innovation & Growth",
        duration: 15,
        questions: [
          "How do you foster innovation in your company?",
          "What's your strategy for scaling?",
          "How do you stay ahead of market changes?",
          "What role does failure play in your growth strategy?"
        ]
      }
    ],
    totalTime: 75,
    price: 50000,
    type: 'multi-day'
  },
  premium: {
    name: 'Premium Assessment',
    rounds: [
      {
        round: 1,
        day: 1,
        title: "Leadership Vision & Mission",
        duration: 30,
        questions: [
          "Tell me the story of why you started this company.",
          "Describe your vision for the next 5 years in detail.",
          "What core values drive your decisions?",
          "How do you see your industry evolving?",
          "What legacy do you want to create?",
          "How does your personal mission align with the company?"
        ]
      },
      {
        round: 2,
        day: 2,
        title: "Leadership Style & Culture",
        duration: 30,
        questions: [
          "How would you describe your leadership philosophy?",
          "Give examples of how you build and motivate teams.",
          "How do you handle conflicts and difficult conversations?",
          "What kind of culture are you building?",
          "How do you develop other leaders?",
          "What does accountability mean in your organization?"
        ]
      },
      {
        round: 3,
        day: 3,
        title: "Strategic Decision Making",
        duration: 30,
        questions: [
          "Walk through your strategic planning process.",
          "How do you balance short-term vs long-term decisions?",
          "Describe your approach to risk management.",
          "How do you make decisions under uncertainty?",
          "What frameworks guide your thinking?",
          "How do you learn from failed decisions?"
        ]
      },
      {
        round: 4,
        day: 4,
        title: "Communication & Influence",
        duration: 30,
        questions: [
          "How do you craft and communicate your narrative?",
          "Describe your stakeholder management approach.",
          "How do you build consensus around difficult changes?",
          "What's your approach to public communication?",
          "How do you maintain authenticity at scale?",
          "How do you measure communication effectiveness?"
        ]
      },
      {
        round: 5,
        day: 5,
        title: "Innovation & Future Growth",
        duration: 30,
        questions: [
          "How do you build an innovation ecosystem?",
          "What's your approach to disruption?",
          "How do you balance innovation with execution?",
          "Describe your competitive strategy.",
          "How do you prepare for future challenges?",
          "What does sustainable growth mean to you?"
        ]
      }
    ],
    totalTime: 150,
    price: 75000,
    type: 'multi-day'
  }
};

export default function VideoAssessment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentType = searchParams.get('type') || 'express';
  
  const [currentRound, setCurrentRound] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const assessment = ASSESSMENT_TYPES[assessmentType as keyof typeof ASSESSMENT_TYPES];
  const currentRoundData = assessment.rounds[currentRound];

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        setRecordedChunks(chunks);
        console.log(`Recording completed for ${currentRoundData.title}`);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Please allow camera and microphone access to continue with the assessment');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const handleNextRound = () => {
    setCompletedRounds([...completedRounds, currentRound]);
    
    if (currentRound < assessment.rounds.length - 1) {
      if (assessment.type === 'multi-day') {
        // For multi-day assessments, show completion message
        alert(`Day $(currentRoundData as any).day assessment complete! Please return tomorrow for Day ${(currentRoundData as any).day + 1}.`);
        router.push('/platform');
      } else {
        // For single session, continue to next round
        setCurrentRound(currentRound + 1);
        setRecordedChunks([]);
      }
    } else {
      // Assessment complete
      alert('Assessment complete! Your CorePersonaDNA profile is being generated...');
      router.push('/platform');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-600">Core</span>
              <span className="text-orange-500">Persona</span>
              <span className="text-green-500">DNA</span>
              <span className="text-gray-400 text-xl align-super">™</span>
              <span className="ml-2">Assessment</span>
            </h1>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
                  router.push('/');
                }
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Exit
            </button>
          </div>
          
          {/* Assessment Type Badge */}
          <div className="mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {assessment.name} - ₹{assessment.price.toLocaleString()}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {assessment.type === 'multi-day' 
                  ? `Day $(currentRoundData as any).day of ${assessment.rounds.length}` 
                  : `Round ${currentRound + 1} of ${assessment.rounds.length}`}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentRound + 1) / assessment.rounds.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-teal-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentRound + 1) / assessment.rounds.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Round Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{currentRoundData.title}</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {currentRoundData.duration} minutes
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Today's Focus Questions:</h3>
            <ul className="space-y-2">
              {currentRoundData.questions.map((question, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Remember:</strong> There are no right or wrong answers. Be authentic and speak naturally. 
              The AI analyzes your communication style, not just content.
            </p>
          </div>
        </div>

        {/* Video Recording Area */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isRecording && !videoRef.current?.srcObject && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-lg">Camera preview will appear here</p>
                </div>
              </div>
            )}
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <span className="animate-pulse mr-2">●</span>
                REC {formatTime(recordingTime)}
              </div>
            )}
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition flex items-center"
                >
                  <span className="mr-2 text-xl">🔴</span>
                  Start Recording
                </button>
              ) : (
                <>
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition flex items-center"
                  >
                    <span className="mr-2">⏹️</span>
                    Stop Recording
                  </button>
                  <div className="text-gray-600">
                    <span className="font-semibold">Time:</span> {formatTime(recordingTime)} / {currentRoundData.duration}:00
                  </div>
                </>
              )}
            </div>

            {recordedChunks.length > 0 && !isRecording && (
              <button
                onClick={handleNextRound}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition"
              >
                {currentRound < assessment.rounds.length - 1 
                  ? (assessment.type === 'multi-day' ? 'Complete Today\'s Session →' : 'Next Topic →')
                  : 'Complete Assessment ✓'}
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-purple-900">📋 Assessment Guidelines</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Find a quiet, well-lit environment</li>
              <li>• Speak clearly and naturally</li>
              <li>• Take your time with responses</li>
              <li>• Be genuine and authentic</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-green-900">🎯 What We Analyze</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Leadership communication style</li>
              <li>• Decision-making patterns</li>
              <li>• Core values and priorities</li>
              <li>• Vision articulation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}