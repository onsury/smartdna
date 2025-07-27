// StartHub Media AI Brand Colors & Constants
export const BRAND_COLORS = {
  start: '#3B82F6',    // Blue from logo
  tart: '#F97316',     // Orange from logo  
  hub: '#10B981',      // Green from logo
  media: '#EC4899',    // Pink from logo
  ai: '#06B6D4',       // Teal from logo
  gradient: 'bg-gradient-to-r from-blue-500 via-orange-500 to-teal-500'
};

export const HUBS = [
  {
    id: 'hrhub',
    name: 'HRHub',
    description: 'Human Resources & Talent Management',
    color: BRAND_COLORS.start,
    icon: '👥',
    templates: [
      'Job Description',
      'Interview Questions',
      'Onboarding Plan',
      'Performance Review',
      'Employee Handbook',
      'Training Module',
      'Exit Interview',
      'Team Building Activity',
      'Recruitment Email',
      'Offer Letter'
    ]
  },
  {
    id: 'finhub', 
    name: 'FinHub',
    description: 'Finance & Business Operations',
    color: BRAND_COLORS.tart,
    icon: '💰',
    templates: [
      'Financial Report',
      'Budget Proposal',
      'Invoice Template',
      'Expense Policy',
      'Investment Pitch',
      'Cash Flow Analysis',
      'Audit Checklist',
      'Financial Dashboard',
      'Quarterly Review',
      'Cost Optimization Plan'
    ]
  },
  {
    id: 'techhub',
    name: 'TechHub', 
    description: 'Engineering, Manufacturing, Pharma, Heavy Industries',
    color: BRAND_COLORS.hub,
    icon: '⚙️',
    templates: [
      'Technical Documentation',
      'SOP Document',
      'Product Specification',
      'Safety Guidelines',
      'Quality Control Checklist',
      'R&D Proposal',
      'Manufacturing Process',
      'Compliance Report',
      'Technical Training',
      'Equipment Manual'
    ]
  },
  {
    id: 'saleshub',
    name: 'SalesHub',
    description: 'Sales Strategy & Revenue Growth',
    color: BRAND_COLORS.media,
    icon: '📈',
    templates: [
      'Sales Pitch',
      'Proposal Template',
      'Cold Email',
      'Follow-up Sequence',
      'Objection Handling',
      'Product Demo Script',
      'Pricing Strategy',
      'Customer Success Story',
      'Sales Report',
      'Lead Nurture Campaign'
    ]
  },
  {
    id: 'marketinghub',
    name: 'MarketingHub',
    description: 'Marketing & Brand Development',
    color: BRAND_COLORS.ai,
    icon: '🎯',
    templates: [
      'Social Media Post',
      'Blog Article',
      'Email Campaign',
      'Press Release',
      'Brand Guidelines',
      'Content Calendar',
      'Ad Copy',
      'Video Script',
      'Newsletter',
      'Marketing Strategy'
    ]
  },
  {
    id: 'omnihub',
    name: 'OmniHub',
    description: 'Cross-functional Operations',
    color: '#9333EA',
    icon: '🔄',
    templates: [
      'Company Announcement',
      'Meeting Agenda',
      'Project Brief',
      'Status Update',
      'Policy Document',
      'Partnership Proposal',
      'Event Plan',
      'Crisis Communication',
      'Stakeholder Update',
      'Strategic Initiative'
    ]
  }
];

export const ASSESSMENT_ROUNDS = [
  {
    round: 1,
    title: 'Leadership Vision',
    duration: '10 minutes',
    questions: [
      'What inspired you to start this company?',
      'Describe your vision for the next 5 years.',
      'What core values drive your decisions?'
    ]
  },
  {
    round: 2,
    title: 'Problem-Solving Approach',
    duration: '12 minutes',
    questions: [
      'How do you approach complex challenges?',
      'Describe a critical decision you made recently.',
      'What\'s your framework for risk assessment?'
    ]
  },
  {
    round: 3,
    title: 'Team & Culture',
    duration: '10 minutes',
    questions: [
      'How do you build and motivate teams?',
      'What culture are you creating?',
      'How do you handle conflicts?'
    ]
  },
  {
    round: 4,
    title: 'Innovation & Growth',
    duration: '12 minutes',
    questions: [
      'How do you foster innovation?',
      'What\'s your approach to scaling?',
      'How do you stay ahead of competition?'
    ]
  },
  {
    round: 5,
    title: 'Impact & Legacy',
    duration: '10 minutes',
    questions: [
      'What impact do you want to create?',
      'How do you measure success?',
      'What legacy do you want to leave?'
    ]
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    name: 'Starter',
    price: '₹9,999',
    credits: 100,
    hubs: 2,
    features: [
      '2 Hubs Access',
      '100 AI Credits/month',
      'Email Support',
      'Basic Templates'
    ]
  },
  {
    name: 'Professional',
    price: '₹24,999',
    credits: 500,
    hubs: 6,
    features: [
      'All 6 Hubs Access',
      '500 AI Credits/month',
      'Priority Support',
      'Advanced Templates',
      'WhatsApp Integration',
      'Multi-language Support'
    ]
  },
  {
    name: 'Enterprise',
    price: '₹49,999',
    credits: -1, // Unlimited
    hubs: 6,
    features: [
      'All 6 Hubs Access',
      'Unlimited AI Credits',
      'Dedicated Support',
      'Custom Templates',
      'API Access',
      'White-label Option',
      'Training Sessions'
    ]
  }
];
// Add this to your existing constants.ts file

export const CONTENT_TEMPLATES: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  prompt?: string;
}>> = {
  hrhub: [
    {
      id: "job_description",
      name: "Job Description",
      description: "Create compelling job descriptions that attract top talent",
      prompt: "Write a job description for"
    },
    {
      id: "interview_questions",
      name: "Interview Questions",
      description: "Generate role-specific interview questions",
      prompt: "Create interview questions for"
    },
    {
      id: "onboarding_plan",
      name: "Onboarding Plan",
      description: "Design comprehensive onboarding programs",
      prompt: "Create an onboarding plan for"
    },
    {
      id: "performance_review",
      name: "Performance Review",
      description: "Write constructive performance evaluations",
      prompt: "Write a performance review for"
    }
  ],
  finhub: [
    {
      id: "financial_report",
      name: "Financial Report",
      description: "Generate comprehensive financial reports",
      prompt: "Create a financial report for"
    },
    {
      id: "budget_proposal",
      name: "Budget Proposal",
      description: "Create detailed budget proposals",
      prompt: "Write a budget proposal for"
    },
    {
      id: "invoice_template",
      name: "Invoice Template",
      description: "Design professional invoice templates",
      prompt: "Create an invoice for"
    },
    {
      id: "expense_report",
      name: "Expense Report",
      description: "Generate expense report summaries",
      prompt: "Create an expense report for"
    }
  ],
  techhub: [
    {
      id: "technical_doc",
      name: "Technical Documentation",
      description: "Write clear technical documentation",
      prompt: "Write technical documentation for"
    },
    {
      id: "sop_document",
      name: "SOP Document",
      description: "Create Standard Operating Procedures",
      prompt: "Create an SOP for"
    },
    {
      id: "product_spec",
      name: "Product Specification",
      description: "Write detailed product specifications",
      prompt: "Write product specifications for"
    },
    {
      id: "test_report",
      name: "Test Report",
      description: "Generate comprehensive test reports",
      prompt: "Create a test report for"
    }
  ],
  saleshub: [
    {
      id: "sales_pitch",
      name: "Sales Pitch",
      description: "Create persuasive sales pitches",
      prompt: "Write a sales pitch for"
    },
    {
      id: "proposal_template",
      name: "Proposal Template",
      description: "Design winning business proposals",
      prompt: "Create a business proposal for"
    },
    {
      id: "cold_email",
      name: "Cold Email",
      description: "Write effective cold outreach emails",
      prompt: "Write a cold email for"
    },
    {
      id: "follow_up",
      name: "Follow-up Email",
      description: "Create timely follow-up messages",
      prompt: "Write a follow-up email for"
    }
  ],
  marketinghub: [
    {
      id: "social_media",
      name: "Social Media Post",
      description: "Create engaging social media content",
      prompt: "Write a social media post about"
    },
    {
      id: "blog_article",
      name: "Blog Article",
      description: "Write SEO-optimized blog posts",
      prompt: "Write a blog article about"
    },
    {
      id: "email_campaign",
      name: "Email Campaign",
      description: "Design effective email campaigns",
      prompt: "Create an email campaign for"
    },
    {
      id: "press_release",
      name: "Press Release",
      description: "Write professional press releases",
      prompt: "Write a press release for"
    }
  ],
  omnihub: [
    {
      id: "company_announcement",
      name: "Company Announcement",
      description: "Create important company communications",
      prompt: "Write a company announcement about"
    },
    {
      id: "meeting_agenda",
      name: "Meeting Agenda",
      description: "Design effective meeting agendas",
      prompt: "Create a meeting agenda for"
    },
    {
      id: "project_brief",
      name: "Project Brief",
      description: "Write comprehensive project briefs",
      prompt: "Write a project brief for"
    },
    {
      id: "executive_summary",
      name: "Executive Summary",
      description: "Create concise executive summaries",
      prompt: "Write an executive summary for"
    }
  ]
};