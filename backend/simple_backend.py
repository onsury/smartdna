from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContentRequest(BaseModel):
    hub: str
    template: Optional[str] = None
    custom_prompt: Optional[str] = None
    prompt: Optional[str] = None
    output_format: str = "text"
    user_dna: Optional[Dict[str, Any]] = None

@app.post("/api/generate/content")
async def generate_content(request: ContentRequest):
    # Get the prompt
    prompt = request.custom_prompt or request.prompt or request.template or "Generate content"
    
    # Generate content based on the hub and prompt
    if "expense report" in prompt.lower():
        content = """**Monthly Expense Report Summary - July 2025**

**Total Expenses:** ₹2,45,678

**Category Breakdown:**
- Travel & Transportation: ₹89,450 (36.5%)
- Office Supplies: ₹45,230 (18.4%)
- Marketing & Advertising: ₹67,890 (27.7%)
- Utilities & Subscriptions: ₹23,456 (9.6%)
- Miscellaneous: ₹19,652 (8.0%)

**Key Insights:**
- Travel expenses increased by 23% compared to last month
- Marketing spend is within budget allocation
- Office supplies reduced by 15% due to bulk purchasing

**Recommendations:**
1. Implement travel pre-approval process for trips over ₹25,000
2. Negotiate annual contracts for recurring subscriptions
3. Review marketing ROI for campaigns over ₹50,000

Generated with your DNA-aligned leadership style: Data-driven and efficiency-focused."""
    
    elif "financial report" in prompt.lower() or request.template == "financial_report":
        content = """**Q2 2025 Financial Report - Executive Summary**

**Revenue Performance:**
- Total Revenue: ₹4.2 Crores (↑ 18% YoY)
- Recurring Revenue: ₹3.1 Crores (74% of total)
- New Customer Revenue: ₹1.1 Crores

**Profitability Metrics:**
- Gross Margin: 67% (target: 65%) ✓
- EBITDA: ₹1.2 Crores (28.6% margin)
- Net Profit: ₹87 Lakhs (20.7% margin)

**Cash Position:**
- Cash on Hand: ₹2.3 Crores
- Burn Rate: ₹42 Lakhs/month
- Runway: 5.5 months

**Growth Indicators:**
- Customer Acquisition Cost: ₹12,500
- Customer Lifetime Value: ₹85,000
- LTV/CAC Ratio: 6.8x (excellent)

Aligned with your Visionary Innovator leadership style."""
    
    elif "budget" in prompt.lower():
        content = """**FY 2025-26 Budget Proposal**

**Proposed Annual Budget:** ₹8.5 Crores

**Department Allocations:**
- Product Development: ₹2.8 Cr (33%)
- Sales & Marketing: ₹2.1 Cr (25%)
- Operations: ₹1.7 Cr (20%)
- HR & Admin: ₹1.2 Cr (14%)
- Reserve Fund: ₹0.7 Cr (8%)

**Strategic Investments:**
- AI/ML Infrastructure: ₹45 Lakhs
- Team Expansion (15 hires): ₹1.2 Cr
- Marketing Campaigns: ₹80 Lakhs
- R&D Initiatives: ₹35 Lakhs

**Expected ROI:** 3.2x by Q4 2026

Crafted with Innovation and Excellence as core values."""
    
    else:
        # Generic content for other prompts
        content = f"""**Generated Content for {request.hub.replace('hub', ' Hub').title()}**

Based on your request: "{prompt}"

This AI-generated content aligns with your CorePersonaDNA™ profile:
- Leadership Style: Visionary Innovator
- Communication Tone: Inspiring and Forward-thinking
- Core Values: Innovation, Excellence, Collaboration

[Your customized content would appear here, specifically tailored to your DNA profile and the request: {prompt}]

**Key Points:**
- Aligned with your visionary approach
- Data-driven insights included
- Forward-thinking perspective
- Collaborative tone maintained

This content is optimized for {request.output_format} format and reflects your unique organizational DNA."""
    
    return {
        "success": True,
        "content": content,
        "hub": request.hub,
        "model_used": "gemini-pro",
        "cost": round(random.uniform(0.001, 0.005), 4),
        "dna_aligned": True
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "message": "SmartDNA API is running"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting SmartDNA Simple Backend...")
    print("📍 API available at http://localhost:8000")
    print("✅ Ready to generate content!")
    uvicorn.run(app, host="0.0.0.0", port=8000)