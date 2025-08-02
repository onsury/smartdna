// Manufacturing - Product Manual
const machineManual = await techHub.generate('productManual', {
  product_type: 'CNC Milling Machine',
  product_category: 'Industrial Machinery',
  user_level: 'Operator',
  documentation_scope: 'Complete operation and maintenance'
}, founderDNA);

// Automotive - Technical Specifications
const autoSpecs = await techHub.generate('technicalSpecifications', {
  product_name: 'Electric Motor Controller',
  industry: 'Automotive',
  specifications: 'Power ratings, efficiency curves, thermal management',
  standards_compliance: 'ISO 26262, AEC-Q100'
}, founderDNA);

// Pharmaceutical - Manufacturing Documentation
const pharmaDoc = await techHub.generate('manufacturingDocs', {
  product_category: 'API Manufacturing',
  production_volume: 'Batch Production',
  quality_standards: 'cGMP, FDA Guidelines',
  equipment: 'Reactor vessels, Centrifuges, Dryers'
}, founderDNA);

// Construction - Engineering Proposal
const constructionProposal = await techHub.generate('engineeringProposal', {
  project_type: 'Bridge Construction',
  technical_requirements: 'Load capacity 100 tons, Span 500m',
  constraints: 'Environmental protection zone, Seismic zone 4',
  deliverables: 'Design, BOQ, Timeline, Safety Plan'
}, founderDNA);

// Energy - Safety Documentation
const energySafety = await techHub.generate('safetyDocumentation', {
  equipment_type: 'Solar Power Plant',
  industry_standards: 'IEC 62109, NEC Article 690',
  risk_level: 'Medium-High',
  regulatory_body: 'MNRE, CERC'
}, founderDNA);

// Medical Device - Service Manual
const medicalService = await techHub.generate('serviceManual', {
  equipment_type: 'MRI Scanner',
  service_level: 'Preventive and Corrective',
  technician_expertise: 'Certified Specialist',
  safety_requirements: 'High - Magnetic field, Cryogenics'
}, founderDNA);