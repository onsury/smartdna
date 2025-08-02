export const OMNIHUB_EXAMPLES = {
  'retail': {
    title: 'Retail Industry Examples',
    examples: [
      {
        type: 'omnichannelCampaign',
        name: 'Holiday Season Campaign',
        description: 'Unified online-offline holiday promotion',
        parameters: {
          campaign_goal: 'Increase holiday sales by 30%',
          online_channels: ['Website', 'App', 'Social Media', 'Email'],
          offline_touchpoints: ['Stores', 'Pop-ups', 'Events'],
          timeline: 'November-December 2025'
        }
      },
      {
        type: 'retailStoreContent',
        name: 'Store Launch Materials',
        description: 'Grand opening campaign materials',
        parameters: {
          store_type: 'Flagship Store',
          location: 'Mumbai High Street',
          campaign: 'Grand Opening',
          materials_needed: ['Signage', 'Staff Scripts', 'POS Materials']
        }
      }
    ]
  },
  'e-commerce': {
    title: 'E-commerce Examples',
    examples: [
      {
        type: 'ecommerceContent',
        name: 'Product Launch Content',
        description: 'New product line descriptions',
        parameters: {
          product_type: 'Smart Home Devices',
          target_audience: 'Tech-savvy Millennials',
          key_features: ['Voice Control', 'Energy Saving', 'App Integration'],
          pricing: '₹5,999 - ₹15,999'
        }
      },
      {
        type: 'onlineCustomerJourney',
        name: 'Checkout Optimization',
        description: 'Streamlined checkout flow copy',
        parameters: {
          journey_stage: 'Checkout',
          user_persona: 'First-time Buyer',
          desired_action: 'Complete Purchase'
        }
      }
    ]
  },
  'manufacturing': {
    title: 'Manufacturing Examples',
    examples: [
      {
        type: 'operationalProcedures',
        name: 'Quality Control SOP',
        description: 'Manufacturing quality procedures',
        parameters: {
          process_name: 'Quality Inspection',
          department: 'Production',
          complexity: 'medium',
          audience: 'Quality Inspectors'
        }
      },
      {
        type: 'vendorCommunication',
        name: 'Supplier RFP',
        description: 'Raw material supplier request',
        parameters: {
          vendor_type: 'Raw Material Supplier',
          communication_purpose: 'RFP for Annual Contract',
          requirements: 'ISO certified, JIT delivery, Quality guarantee'
        }
      }
    ]
  }
};