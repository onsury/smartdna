export class FinHubGenerator {
  private contentTypes = {
    investorPitch: {
      name: 'Investor Pitch Deck',
      description: 'Fundraising presentations in founder voice',
      requiredInputs: ['stage', 'amount', 'use_of_funds', 'metrics']
    },
    financialReport: {
      name: 'Financial Reports & Commentary',
      description: 'Shareholder updates with founder insights',
      requiredInputs: ['period', 'highlights', 'challenges', 'outlook']
    },
    budgetNarrative: {
      name: 'Budget Narratives',
      description: 'Strategic budget explanations',
      requiredInputs: ['department', 'period', 'priorities']
    },
    boardPresentation: {
      name: 'Board Presentations',
      description: 'Board meeting materials',
      requiredInputs: ['agenda', 'key_decisions', 'metrics']
    },
    investorUpdate: {
      name: 'Investor Updates',
      description: 'Monthly/Quarterly investor letters',
      requiredInputs: ['period', 'achievements', 'metrics', 'needs']
    },
    financialPolicy: {
      name: 'Financial Policies',
      description: 'Expense, investment, credit policies',
      requiredInputs: ['policy_type', 'guidelines']
    }
  };
  
  async generate(contentType: string, parameters: any, coreDNA: any) {
    const prompt = this.buildFinancePrompt(contentType, parameters, coreDNA);
    
    // Use specific LLM combination for financial content
    const result = await claudeMaster.orchestrateFinancialContent({
      primaryLLM: 'claude', // For narrative
      dataLLM: 'gpt-4',     // For calculations
      researchLLM: 'perplexity', // For market data
      prompt,
      coreDNA,
      requiresAccuracy: true
    });
    
    return result;
  }
  
  private buildFinancePrompt(contentType: string, params: any, dna: any) {
    const templates = {
      investorPitch: `Create investor pitch content that:
        - Opens with ${dna.brandVoice.personality[0]} hook
        - Presents data in ${dna.decisionMaking.approach} style
        - Maintains ${dna.communicationStyle.tone} while being credible
        - Shows ${dna.leadershipStyle} leadership vision
        - Addresses: Problem, Solution, Market, Traction, Team, Ask
        - Uses ${dna.communicationStyle.vocabulary} vocabulary level`,
        
      investorUpdate: `Write ${params.period} investor update that:
        - Starts with founder's authentic voice
        - Balances ${dna.values.includes('transparency') ? 'transparency' : 'optimism'}
        - Presents challenges with ${dna.decisionMaking.approach} solutions
        - Maintains ${dna.communicationStyle.formality} tone
        - Includes: Highlights, Metrics, Challenges, Wins, Asks, Outlook`,
        
      boardPresentation: `Structure board presentation that:
        - Reflects ${dna.leadershipStyle} executive presence
        - Uses ${dna.communicationStyle.sentenceStructure} sentences
        - Emphasizes ${dna.values.join(', ')} in decisions
        - Presents data supporting ${dna.decisionMaking.speed} decisions`
    };
    
    return templates[contentType];
  }
}