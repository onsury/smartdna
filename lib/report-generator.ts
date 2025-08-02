import { claudeMaster } from './claude-orchestrator';
import { supabase } from './supabase';

export class DNAReportGenerator {
  // Add this method to your existing class
  async generateReport(clientData: any) {
    console.log('📝 Starting report generation for:', clientData.companyName);
    
    // Industry research (using Gemini instead of Perplexity)
    const research = await this.getIndustryResearch(clientData);
    
    // Deep analysis with Claude
    const analysis = await claudeMaster.orchestrateRequest({
      type: 'deep-analysis',
      content: `Analyze this founder's assessment data and create comprehensive DNA profile.
        
        Client Data:
        - Company: ${clientData.companyName}
        - Industry: ${clientData.industry}
        - Founder: ${clientData.founderName}
        - Assessment Type: ${clientData.assessmentType}
        - Interview Responses: ${JSON.stringify(clientData.interviewData)}
        
        Create a detailed CorePersonaDNA profile including:
        1. Leadership style patterns
        2. Communication DNA
        3. Decision-making framework
        4. Core values extraction
        5. Vision alignment
        6. Innovation quotient
        7. Risk profile`,
      context: { clientData, research }
    });
    
    // Report writing with Claude
    const report = await claudeMaster.orchestrateRequest({
      type: 'report-generation',
      content: `Generate a ${clientData.assessmentType === 'express' ? '20' : '50'} page 
                professional report based on this analysis.
                
                Structure:
                1. Executive Summary
                2. CorePersonaDNA Profile
                3. FunctionPersonaDNA Mapping (6 Hubs)
                4. Strategic Recommendations
                5. Implementation Roadmap
                6. Industry Benchmarking
                
                Tone: Professional, insightful, actionable
                Voice: Reflecting 35 years of industry expertise`,
      context: { 
        analysis: analysis.response, 
        clientData,
        research 
      }
    });
    
    // Save to database
    await this.saveReport(clientData.id, report.response);
    
    return {
      report: report.response,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: report.model,
        cost: report.cost
      }
    };
  }
  
  // Modified to use Gemini instead of Perplexity
  private async getIndustryResearch(clientData: any) {
    console.log('🔍 Conducting industry research...');
    
    const researchPrompt = `Provide comprehensive industry research for:
      Company: ${clientData.companyName}
      Industry: ${clientData.industry}
      Size: ${clientData.employeeCount} employees
      Revenue: ${clientData.revenue}
      
      Include:
      1. Industry Overview & Trends
      2. Key Competitors (top 5)
      3. Market Challenges
      4. Growth Opportunities
      5. Technological Disruptions
      6. Regulatory Environment
      7. Future Outlook (3-5 years)
      
      Note: Based on data available up to 2024.`;
    
    const research = await claudeMaster.orchestrateRequest({
      type: 'general-content', // This will use FREE Gemini
      content: researchPrompt,
      context: {
        task: 'industry-research',
        depth: 'comprehensive'
      }
    });
    
    return research.response;
  }
  
  private async saveReport(clientId: string, reportContent: string) {
    try {
      const { data, error } = await supabase
        .from('generated_reports')
        .insert({
          client_id: clientId,
          report_content: reportContent,
          report_type: 'dna_assessment',
          created_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      console.log('✅ Report saved successfully');
      return data;
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  }
  
  // Add other methods from earlier...
  async generateComprehensiveReport(clientId: string, assessmentId: string) {
    // Gather all data
    const clientData = await this.gatherClientData(clientId, assessmentId);
    
    // Use the generateReport method
    return await this.generateReport(clientData);
  }
  
  private async gatherClientData(clientId: string, assessmentId: string) {
    // Fetch from database
    const { data: client } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();
      
    const { data: assessment } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single();
      
    const { data: interviews } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('assessment_id', assessmentId);
    
    return {
      ...client,
      assessmentType: assessment.type,
      interviewData: interviews,
      assessmentId
    };
  }
}

// Export singleton instance
export const reportGenerator = new DNAReportGenerator();