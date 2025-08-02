import { NextResponse } from 'next/server';
import { ClientOnboardingOrchestrator } from '@/lib/client-onboarding';
import { InterviewOrchestrator } from '@/lib/interview-orchestrator';
import { DNAReportGenerator } from '@/lib/report-generator';
import { ReportReviewSystem } from '@/lib/review-system';

const onboarding = new ClientOnboardingOrchestrator();
const interviewer = new InterviewOrchestrator();
const reportGenerator = new DNAReportGenerator();
const reviewSystem = new ReportReviewSystem();

export async function POST(request: Request) {
  const { action, data } = await request.json();
  
  try {
    switch (action) {
      case 'new_application':
        // Claude evaluates and initiates process
        return NextResponse.json(
          await onboarding.processNewApplication(data)
        );
        
      case 'conduct_interview':
        // Claude orchestrates multi-lingual interview
        return NextResponse.json(
          await interviewer.conductInterview(data)
        );
        
      case 'generate_report':
        // Claude compiles comprehensive report
        return NextResponse.json(
          await reportGenerator.generateComprehensiveReport(
            data.clientId,
            data.assessmentId
          )
        );
        
      case 'submit_for_review':
        // Submit to Suryanarayanan for review
        return NextResponse.json(
          await reviewSystem.submitForReview(data.reportId, data.report)
        );
        
      case 'finalize_report':
        // Incorporate expert review and finalize
        return NextResponse.json(
          await reviewSystem.finalizeReport(
            data.reportId,
            data.editedReport,
            data.reviewerNotes
          )
        );
        
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Workflow error:', error);
    return NextResponse.json(
      { error: 'Workflow failed', details: error.message },
      { status: 500 }
    );
  }
}