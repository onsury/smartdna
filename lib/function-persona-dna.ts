import { claudeMaster } from './claude-orchestrator';

interface CorePersonaDNA {
  communicationStyle: {
    tone: string;
    formality: 'casual' | 'professional' | 'formal';
    vocabulary: 'simple' | 'technical' | 'sophisticated';
    sentenceStructure: 'short' | 'medium' | 'complex';
  };
  values: string[];
  decisionMaking: {
    speed: 'fast' | 'moderate' | 'deliberate';
    approach: 'data-driven' | 'intuitive' | 'balanced';
  };
  leadershipStyle: string;
  brandVoice: {
    personality: string[];
    emotions: string[];
    uniquePhrases: string[];
  };
}

export class FunctionPersonaDNA {
  private coreDNA: CorePersonaDNA;
  
  constructor(coreDNA: CorePersonaDNA) {
    this.coreDNA = coreDNA;
  }
  
  // Master content generator that maintains DNA across all hubs
  async generateContent(hub: string, contentType: string, parameters: any) {
    const hubGenerator = this.getHubGenerator(hub);
    return await hubGenerator.generate(contentType, parameters, this.coreDNA);
  }
  
  private getHubGenerator(hub: string) {
    const generators = {
      'HRHub': new HRHubGenerator(),
      'FinHub': new FinHubGenerator(),
      'TechHub': new TechHubGenerator(),
      'SalesHub': new SalesHubGenerator(),
      'MarketingHub': new MarketingHubGenerator(),
      'OmniHub': new OmniHubGenerator()
    };
    return generators[hub];
  }
}