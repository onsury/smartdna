import { NextResponse } from 'next/server';

// Interview questions bank
const INTERVIEW_QUESTIONS = [
  "Tell me about the moment you decided to become an entrepreneur. What was happening in your life?",
  "What personal experience or pain point led to founding your company?",
  "What three principles from your upbringing still guide your business decisions today?",
  "How do you explain your company's mission to a 10-year-old child?",
  "Describe a time when you had to choose between profit and principles. What did you do?",
  "Walk me through how you handled the last major crisis in your company.",
  "How do you balance short-term pressures with long-term vision?",
  "What's your approach when a trusted team member fundamentally disagrees with you?",
  "How do you decide where to invest limited resources?",
  "What's the biggest risk you've taken that failed? What did you learn?",
  "How do you ensure your vision is understood at every level of your organization?",
  "What major belief about business have you changed your mind about?",
  "How are you preparing your company for changes 5 years out?",
  "What would you want a case study about your company to highlight?",
  "How has leadership changed you as a person?"
];

// For now, we'll use mock responses until API keys are set up
// This gives you a working system immediately
async function getMockAIResponse(messages: any[], questionIndex: number): Promise<string> {
  const lastUserMessage = messages[messages.length - 1].content;
  const currentQuestion = INTERVIEW_QUESTIONS[questionIndex];
  
  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate contextual follow-up responses
  const followUpResponses = [
    "That's fascinating. Can you tell me more about what motivated that decision?",
    "I can see how that shaped your leadership style. How did that experience influence your approach to building teams?",
    "That's a powerful insight. How do you apply that principle when facing difficult decisions today?",
    "Interesting perspective. Can you share a specific example of when this approach made a difference?",
    "Thank you for sharing that. How has this philosophy evolved as your company has grown?",
  ];
  
  // For the first few messages, ask the current question
  if (messages.length <= 2) {
    return currentQuestion;
  }
  
  // After some conversation, provide a follow-up and transition
  if (messages.length % 6 === 0 && questionIndex < INTERVIEW_QUESTIONS.length - 1) {
    return `${followUpResponses[Math.floor(Math.random() * followUpResponses.length)]} 

Let me ask you about another aspect of your leadership: ${INTERVIEW_QUESTIONS[questionIndex + 1]}`;
  }
  
  // Otherwise, provide a contextual follow-up
  return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
}

// This is where you'll add real LLM calls once API keys are configured
async function getAIResponse(messages: any[], questionIndex: number): Promise<{ response: string, nextQuestion: boolean }> {
  try {
    // Check if we have API keys
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
    const hasGemini = !!process.env.GEMINI_API_KEY;
    
    // For now, use mock responses if no API keys are configured
    if (!hasOpenAI && !hasAnthropic && !hasGemini) {
      const response = await getMockAIResponse(messages, questionIndex);
      const shouldMoveToNext = messages.length % 6 === 0 && questionIndex < INTERVIEW_QUESTIONS.length - 1;
      return { response, nextQuestion: shouldMoveToNext };
    }
    
    // When you add API keys, this is where the real LLM calls will go
    // For now, return mock response
    const response = await getMockAIResponse(messages, questionIndex);
    const shouldMoveToNext = messages.length % 6 === 0 && questionIndex < INTERVIEW_QUESTIONS.length - 1;
    return { response, nextQuestion: shouldMoveToNext };
    
  } catch (error) {
    console.error('AI Response Error:', error);
    return {
      response: "I apologize for the technical difficulty. Let me rephrase - could you tell me more about your leadership journey?",
      nextQuestion: false
    };
  }
}

export async function POST(request: Request) {
  try {
    const { messages, questionIndex } = await request.json();
    
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }
    
    // Get AI response
    const { response, nextQuestion } = await getAIResponse(messages, questionIndex || 0);
    
    // Return response
    return NextResponse.json({
      response,
      nextQuestion,
      llmUsed: 'mock', // Will update when real LLMs are connected
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}