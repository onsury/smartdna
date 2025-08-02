export const INDUSTRY_CONTENT_MAPPING = {
  // TechHub Industry Mappings
  techHub: {
    'manufacturing': [
      'productManual',
      'technicalSpecifications',
      'manufacturingDocs',
      'serviceManual',
      'safetyDocumentation',
      'technicalTraining',
      'engineeringProposal',
      'knowledgeBase'
    ],
    'automotive': [
      'productManual',
      'technicalSpecifications',
      'serviceManual',
      'manufacturingDocs',
      'safetyDocumentation',
      'engineeringProposal',
      'productComparison',
      'patentDocumentation'
    ],
    'pharmaceutical': [
      'technicalSpecifications',
      'manufacturingDocs',
      'safetyDocumentation',
      'researchPapers',
      'knowledgeBase',
      'industryTechnical',
      'technicalTraining'
    ],
    'aerospace': [
      'technicalSpecifications',
      'engineeringProposal',
      'manufacturingDocs',
      'safetyDocumentation',
      'serviceManual',
      'patentDocumentation',
      'industryTechnical'
    ],
    'construction': [
      'engineeringProposal',
      'technicalSpecifications',
      'safetyDocumentation',
      'technicalProposalClient',
      'industryTechnical',
      'technicalTraining'
    ],
    'energy': [
      'technicalSpecifications',
      'engineeringProposal',
      'safetyDocumentation',
      'serviceManual',
      'researchPapers',
      'industryTechnical'
    ],
    'medical-devices': [
      'productManual',
      'technicalSpecifications',
      'serviceManual',
      'safetyDocumentation',
      'technicalTraining',
      'researchPapers',
      'industryTechnical'
    ],
    'electronics': [
      'productManual',
      'technicalSpecifications',
      'manufacturingDocs',
      'serviceManual',
      'patentDocumentation',
      'productComparison'
    ],
    'software': [
      'technicalDocumentation', // API docs
      'knowledgeBase',
      'technicalTraining',
      'serviceCatalog',
      'productComparison',
      'technicalProposalClient'
    ],
    'general-technical': [
      'productManual',
      'technicalSpecifications',
      'serviceManual',
      'technicalTraining',
      'knowledgeBase'
    ]
  },
  
  // OmniHub Industry Mappings
  omniHub: {
    'retail': [
      'ecommerceContent',
      'retailStoreContent',
      'omnichannelCampaign',
      'customerServiceScripts',
      'customerExperience',
      'stakeholderReports'
    ],
    'e-commerce': [
      'ecommerceContent',
      'onlineCustomerJourney',
      'customerServiceScripts',
      'customerExperience',
      'legalDocuments',
      'logisticsComms'
    ],
    'manufacturing': [
      'operationalProcedures',
      'vendorCommunication',
      'logisticsComms',
      'complianceContent',
      'businessProposals',
      'stakeholderReports'
    ],
    'services': [
      'customerServiceScripts',
      'serviceCatalog',
      'operationalProcedures',
      'legalDocuments',
      'businessProposals',
      'customerExperience'
    ],
    'b2b': [
      'businessProposals',
      'vendorCommunication',
      'legalDocuments',
      'stakeholderReports',
      'complianceContent'
    ],
    'regulated': [ // Finance, Healthcare, etc.
      'complianceContent',
      'legalDocuments',
      'stakeholderReports',
      'operationalProcedures',
      'customerServiceScripts'
    ],
    'startup': [
      'businessProposals',
      'onlineCustomerJourney',
      'ecommerceContent',
      'customerServiceScripts',
      'stakeholderReports'
    ],
    'enterprise': [
      'operationalProcedures',
      'vendorCommunication',
      'complianceContent',
      'stakeholderReports',
      'businessProposals',
      'legalDocuments'
    ]
  },
  
  // Cross-Hub Mappings (content available in multiple hubs)
  crossHub: {
    'all': [
      'stakeholderReports', // Available in OmniHub for all
      'knowledgeBase',      // Available in TechHub for all
      'businessProposals'   // Available in OmniHub for all
    ]
  }
};

// Helper function to get relevant content for a client
export function getRelevantContent(
  hub: string, 
  clientIndustry: string, 
  clientType: string
): string[] {
  const hubMappings = INDUSTRY_CONTENT_MAPPING[hub];
  if (!hubMappings) return [];
  
  // Get industry-specific content
  const industryContent = hubMappings[clientIndustry] || [];
  
  // Add client-type specific content (for OmniHub)
  const clientTypeContent = hubMappings[clientType] || [];
  
  // Add universal content
  const universalContent = INDUSTRY_CONTENT_MAPPING.crossHub.all;
  
  // Combine and deduplicate
  const allContent = [...new Set([
    ...industryContent,
    ...clientTypeContent,
    ...universalContent
  ])];
  
  return allContent;
}