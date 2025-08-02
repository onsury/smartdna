export class HRHubGenerator {
  private contentTypes = {
    jobDescription: {
      name: 'Job Description',
      description: 'Role descriptions that reflect company culture',
      requiredInputs: ['role', 'department', 'level', 'keyResponsibilities']
    },
    employeeHandbook: {
      name: 'Employee Handbook Sections',
      description: 'Policy documents in founder\'s voice',
      requiredInputs: ['section', 'policyArea']
    },
    performanceReview: {
      name: 'Performance Review Templates',
      description: 'Feedback forms aligned with values',
      requiredInputs: ['role', 'reviewPeriod']
    },
    cultureCode: {
      name: 'Culture Code Document',
      description: 'Company culture manifesto',
      requiredInputs: ['values', 'mission', 'vision']
    },
    onboardingMaterial: {
      name: 'Onboarding Content',
      description: 'Welcome materials for new employees',
      requiredInputs: ['role', 'department']
    },
    internalComms: {
      name: 'Internal Communications',
      description: 'Town halls, announcements, updates',
      requiredInputs: ['type', 'topic', 'audience']
    }
  };
  
  async generate(contentType: string, parameters: any, coreDNA: any) {
    const prompt = this.buildPrompt(contentType, parameters, coreDNA);
    
    return await claudeMaster.generateHubContent({
      hub: 'HRHub',
      contentType,
      prompt,
      coreDNA,
      outputFormat: this.getOutputFormat(contentType)
    });
  }
  
  private buildPrompt(contentType: string, params: any, dna: any) {
    const templates = {
      jobDescription: `Create a job description for ${params.role} that:
        - Reflects our ${dna.values.join(', ')} values
        - Uses ${dna.communicationStyle.tone} tone
        - Attracts candidates who align with our ${dna.leadershipStyle} culture
        - Emphasizes ${dna.decisionMaking.approach} approach
        
        Include: Role overview, Responsibilities, Requirements, What we offer, 
        Why join us (in founder's voice)`,
        
      cultureCode: `Write our culture code document that:
        - Embodies founder's ${dna.brandVoice.personality.join(', ')} personality
        - Communicates in ${dna.communicationStyle.formality} style
        - Centers on values: ${dna.values.join(', ')}
        - Uses phrases like: ${dna.brandVoice.uniquePhrases.join(', ')}`,
        
      internalComms: `Draft ${params.type} about ${params.topic} that:
        - Maintains ${dna.communicationStyle.tone} founder tone
        - Reflects ${dna.leadershipStyle} leadership style
        - Keeps ${dna.communicationStyle.sentenceStructure} sentence structure
        - Conveys ${dna.brandVoice.emotions.join(', ')} emotions`
    };
    
    return templates[contentType] || 'Generate HR content aligned with founder DNA';
  }
  
  private getOutputFormat(contentType: string) {
    const formats = {
      jobDescription: 'structured_sections',
      employeeHandbook: 'policy_format',
      performanceReview: 'form_template',
      cultureCode: 'manifesto_style',
      onboardingMaterial: 'guide_format',
      internalComms: 'message_format'
    };
    return formats[contentType];
  }
}