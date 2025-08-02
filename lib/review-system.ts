import { createClient } from '@supabase/supabase-js';
import { claudeMaster } from './claude-orchestrator';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class ReportReviewSystem {
  async submitForReview(reportId: string, report: any) {
    // Save report for review
    const { data: reviewItem, error } = await supabase
      .from('reports_for_review')
      .insert({
        id: reportId,
        client_id: report.clientId,
        report_content: report,
        status: 'pending_review',
        submitted_at: new Date().toISOString(),
        reviewer: 'Suryanarayanan'
      });
    
    if (error) {
      console.error('Error submitting report for review:', error);
      throw error;
    }
    
    // Create review interface
    return {
      reviewUrl: `/admin/review/${reportId}`,
      report: report,
      editableDoc: await this.createEditableVersion(report),
      claudeNotes: await this.generateReviewNotes(report)
    };
  }
  
  private async generateReviewNotes(report: any) {
    return await claudeMaster.orchestrateRequest({
      type: 'general-content',
      content: `As your AI assistant, analyze this report and highlight:
        1. Key insights that need your expert validation
        2. Recommendations that may need your industry perspective
        3. Areas where your 35 years experience could add value
        4. Any claims that need stronger evidence
        
        Report content: ${JSON.stringify(report).slice(0, 2000)}...`,
      context: {
        task: 'review-notes',
        reviewer: 'Suryanarayanan'
      }
    });
  }
  
  async finalizeReport(reportId: string, editedReport: any, reviewerNotes: string) {
    // Incorporate Suryanarayanan's changes
    const finalReport = await claudeMaster.orchestrateRequest({
      type: 'general-content',
      content: `Seamlessly integrate these expert review notes into the report:
        
        Original Report: ${JSON.stringify(editedReport).slice(0, 1000)}...
        
        Expert Notes: ${reviewerNotes}
        
        Maintain report flow while incorporating the expertise.`,
      context: {
        task: 'report-finalization'
      }
    });
    
    // Update report status in database
    const { error } = await supabase
      .from('reports_for_review')
      .update({
        status: 'approved',
        final_content: finalReport.response,
        approved_at: new Date().toISOString(),
        reviewer_notes: reviewerNotes
      })
      .eq('id', reportId);
    
    if (error) {
      console.error('Error finalizing report:', error);
      throw error;
    }
    
    // Generate final deliverables
    return {
      pdf: await this.generatePDF(finalReport.response),
      presentation: await this.generatePresentation(finalReport.response),
      executiveBrief: await this.generateExecutiveBrief(finalReport.response),
      status: 'approved',
      deliveryReady: true
    };
  }
  
  // Method to create editable version of report
  private async createEditableVersion(report: any) {
    // For now, return a structured version that can be edited
    return {
      id: report.id || `report_${Date.now()}`,
      sections: this.parseReportSections(report),
      metadata: {
        createdAt: new Date().toISOString(),
        format: 'editable',
        version: '1.0'
      }
    };
  }
  
  // Parse report into editable sections
  private parseReportSections(report: any) {
    if (typeof report === 'string') {
      // If report is a string, split into sections
      const sections = report.split(/(?=^#{1,3}\s)/m);
      return sections.map((section: string, index: number) => ({
        id: `section_${index}`,
        content: section.trim(),
        editable: true
      }));
    }
    
    // If report is already structured
    return report.sections || [{ 
      id: 'main', 
      content: report.report || report, 
      editable: true 
    }];
  }
  
  // Generate PDF from report
  private async generatePDF(reportContent: string): Promise<string> {
    // In a real implementation, you would use a PDF generation library
    // For now, return a mock URL
    console.log('Generating PDF...');
    
    // TODO: Integrate with PDF generation service
    // Options: puppeteer, pdfkit, react-pdf, etc.
    
    return `/api/reports/pdf/${Date.now()}.pdf`;
  }
  
  // Generate presentation from report
  private async generatePresentation(reportContent: string): Promise<string> {
    // In a real implementation, you would generate PPTX
    console.log('Generating presentation...');
    
    // TODO: Integrate with PPTX generation
    // Options: pptxgenjs, officegen, etc.
    
    return `/api/reports/pptx/${Date.now()}.pptx`;
  }
  
  // Generate executive brief
  private async generateExecutiveBrief(reportContent: string): Promise<string> {
    const brief = await claudeMaster.orchestrateRequest({
      type: 'general-content',
      content: `Create a 1-page executive brief from this report:
        
        ${reportContent.slice(0, 3000)}...
        
        Include only:
        1. Key findings (3-5 bullet points)
        2. Critical recommendations (3 max)
        3. Next steps (brief)
        4. Expected ROI/Impact
        
        Keep it concise for C-suite consumption.`,
      context: {
        task: 'executive-brief',
        format: 'one-pager'
      }
    });
    
    return brief.response;
  }
}

// Export singleton instance
export const reviewSystem = new ReportReviewSystem();