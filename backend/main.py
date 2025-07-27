"""
SmartDNA Main API
FastAPI backend for CorePersonaDNA platform
Integrates Multi-LLM, DNA Engine, and Access Control
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List, Any
import os
import logging
from datetime import datetime
from dotenv import load_dotenv

# Import your custom modules
from core.multi_llm_engine import MultiLLMEngine
from core.dna_engine import DNAEngine
from core.access_control import DNAAccessControl

# Load environment variables
load_dotenv()

# Set up logger
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="SmartDNA API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
llm_engine = MultiLLMEngine()
dna_engine = DNAEngine()
dna_access_control = DNAAccessControl()

# Backend constants
HUBS = ["hrhub", "finhub", "techhub", "saleshub", "marketinghub", "omnihub"]

# Define TaskType
class TaskType:
    SIMPLE_GENERATION = "simple"
    TECHNICAL_CONTENT = "technical"
    CREATIVE_CONTENT = "creative"

# Hub data
HUBS_DATA = [
    {
        "id": "hrhub",
        "name": "HRHub",
        "icon": "👥",
        "color": "#6366F1",
        "description": "Human Resources & Talent Management",
        "templates": ["Job Description", "Interview Questions", "Onboarding Plan", "Performance Review", "Employee Handbook", "Training Material", "HR Policy"]
    },
    {
        "id": "finhub", 
        "name": "FinHub",
        "icon": "💰",
        "color": "#F59E0B",
        "description": "Finance & Business Operations",
        "templates": ["Financial Report", "Budget Proposal", "Invoice Template", "Expense Report", "Financial Analysis", "Investment Proposal", "Cash Flow Statement"]
    },
    {
        "id": "techhub",
        "name": "TechHub", 
        "icon": "⚙️",
        "color": "#10B981",
        "description": "Engineering, Manufacturing, Pharma, Heavy Industries",
        "templates": ["Technical Documentation", "SOP Document", "Product Specification", "Test Report", "Technical Proposal", "System Architecture", "API Documentation"]
    },
    {
        "id": "saleshub",
        "name": "SalesHub",
        "icon": "📈",
        "color": "#EC4899",
        "description": "Sales Strategy & Revenue Growth",
        "templates": ["Sales Pitch", "Proposal Template", "Cold Email", "Follow-up Email", "Sales Report", "Quote Template", "Contract Template"]
    },
    {
        "id": "marketinghub",
        "name": "MarketingHub",
        "icon": "🎯",
        "color": "#3B82F6",
        "description": "Marketing & Brand Development",
        "templates": ["Social Media Post", "Blog Article", "Email Campaign", "Press Release", "Marketing Plan", "Content Calendar", "Brand Guidelines"]
    },
    {
        "id": "omnihub",
        "name": "OmniHub",
        "icon": "🔄",
        "color": "#8B5CF6",
        "description": "Cross-functional Operations",
        "templates": ["Company Announcement", "Meeting Agenda", "Project Brief", "Executive Summary", "Business Plan", "Strategy Document", "Quarterly Report"]
    }
]

# Assessment rounds data
ASSESSMENT_ROUNDS = [
    {
        "round": 1,
        "title": "Vision & Mission",
        "duration": 30,
        "questions": ["Tell us about your company's vision", "What problem are you solving?", "What makes your solution unique?"]
    },
    {
        "round": 2,
        "title": "Leadership Style",
        "duration": 30,
        "questions": ["Describe your leadership approach", "How do you handle difficult decisions?", "How do you motivate your team?"]
    },
    {
        "round": 3,
        "title": "Decision Making",
        "duration": 30,
        "questions": ["Walk us through a major decision", "How do you evaluate risks?", "How do you handle uncertainty?"]
    },
    {
        "round": 4,
        "title": "Communication",
        "duration": 30,
        "questions": ["How do you communicate vision?", "How do you handle conflicts?", "How do you ensure alignment?"]
    },
    {
        "round": 5,
        "title": "Innovation & Growth",
        "duration": 30,
        "questions": ["How do you foster innovation?", "What's your growth strategy?", "How do you adapt to change?"]
    }
]

# Subscription plans
SUBSCRIPTION_PLANS = [
    {
        "id": "starter",
        "name": "Starter",
        "price": "₹9,999",
        "credits": 100,
        "features": ["100 content generations/month", "3 hubs access", "Email support"]
    },
    {
        "id": "professional",
        "name": "Professional",
        "price": "₹24,999",
        "credits": 500,
        "features": ["500 content generations/month", "All hubs access", "Priority support", "API access"]
    },
    {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "₹49,999",
        "credits": 2000,
        "features": ["2000 content generations/month", "All hubs access", "Dedicated support", "API access", "Custom integrations"]
    }
]

# -------------------- MODELS --------------------

class AssessmentVideo(BaseModel):
    round_number: int
    video_url: str
    transcript: str
    duration: int

class DNAAssessmentRequest(BaseModel):
    user_id: str
    company_name: str
    videos: List[AssessmentVideo]

class ContentGenerationRequest(BaseModel):
    hub: str
    template: Optional[str] = None
    prompt: Optional[str] = None
    custom_prompt: Optional[str] = None
    language: str = "en"
    format: str = "text"
    output_format: Optional[str] = "text"
    include_image: bool = False
    max_length: Optional[int] = 1000
    user_dna: Optional[Dict[str, Any]] = None

class SuperAdminLoginRequest(BaseModel):
    key: str

class UserProfile(BaseModel):
    user_id: str
    email: str
    full_name: Optional[str] = "User"
    company_name: str
    dna_assessment_completed: bool = False
    assessment_completed_at: Optional[datetime] = None
    is_superadmin: bool = False
    hub_alignments: Dict[str, float] = {}
    credits: int = 100
    subscription_plan: str = "starter"

# -------------------- MOCK DATABASE --------------------

USERS_DB = {
    "user123": {
        "user_id": "user123",
        "email": "surya@starthubmedia.ai",
        "full_name": "Surya Vamsi",
        "company_name": "StartHub Media AI",
        "dna_assessment_completed": True,
        "assessment_completed_at": datetime(2024, 1, 15),
        "is_superadmin": False,
        "hub_alignments": {
            "hrhub": 85,
            "finhub": 72,
            "techhub": 95,
            "saleshub": 78,
            "marketinghub": 88,
            "omnihub": 82
        },
        "credits": 450,
        "subscription_plan": "professional",
        "dna_profile": {
            "leadership_style": "Visionary Innovator",
            "communication_tone": "Inspiring and Forward-thinking",
            "core_values": ["Innovation", "Excellence", "Collaboration", "Impact"],
            "decision_making": "Data-driven with intuitive insights",
            "cultural_emphasis": "Innovation-driven and Growth-focused"
        }
    }
}

# -------------------- AUTHENTICATION --------------------

async def get_current_user(authorization: Optional[str] = Header(None)) -> UserProfile:
    """Get current user from token (simplified)"""
    if not authorization:
        return UserProfile(**USERS_DB["user123"])
    
    if dna_access_control.verify_superadmin(authorization.replace("Bearer ", "")):
        return UserProfile(
            user_id="superadmin",
            email="admin@starthubmedia.ai",
            full_name="Super Admin",
            company_name="StartHub Media AI",
            dna_assessment_completed=True,
            is_superadmin=True,
            hub_alignments={hub: 99 for hub in HUBS},
            credits=99999,
            subscription_plan="enterprise"
        )
    
    return UserProfile(**USERS_DB.get("user123", {}))

# -------------------- ENDPOINTS --------------------

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Welcome to SmartDNA API!", "status": "healthy"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "llm_status": "active",
        "dna_engine": "ready"
    }

# -------------------- AUTHENTICATION ENDPOINTS --------------------

@app.post("/api/auth/superadmin/login")
async def superadmin_login(request: SuperAdminLoginRequest):
    """SuperAdmin login with special key"""
    token = dna_access_control.create_superadmin_token(request.key)
    
    if not token:
        raise HTTPException(status_code=403, detail="Invalid SuperAdmin key")
    
    return {
        "token": token,
        "role": "superadmin",
        "message": "SuperAdmin access granted"
    }

@app.get("/api/user/profile")
async def get_user_profile(user: UserProfile = Depends(get_current_user)):
    """Get current user profile with DNA status"""
    return user

@app.get("/api/user/dna-status")
async def get_dna_status(user: UserProfile = Depends(get_current_user)):
    """Check user's DNA assessment status"""
    access_result = dna_access_control.check_dna_access(user.dict())
    
    return {
        "status": "completed" if user.dna_assessment_completed else "pending",
        "assessment_date": user.assessment_completed_at,
        "hub_access": {
            hub: {
                "access": score >= 40,
                "score": score
            }
            for hub, score in user.hub_alignments.items()
        },
        "days_remaining": access_result.get('days_remaining', 365)
    }

@app.get("/api/assessment/status")
async def get_assessment_status(user: UserProfile = Depends(get_current_user)):
    """Check if user has completed DNA assessment"""
    return {
        "completed": user.dna_assessment_completed,
        "profile": USERS_DB.get(user.user_id, {}).get('dna_profile') if user.dna_assessment_completed else None
    }

# -------------------- ASSESSMENT ENDPOINTS --------------------

@app.post("/api/assessment/analyze")
async def analyze_assessment(
    request: DNAAssessmentRequest,
    user: UserProfile = Depends(get_current_user)
):
    """Analyze 5-round video assessment to create CorePersonaDNA"""
    
    video_transcripts = [
        {"round": v.round_number, "content": v.transcript}
        for v in request.videos
    ]
    
    dna_profile = await dna_engine.analyze_assessment(
        user_id=request.user_id,
        company_name=request.company_name,
        video_transcripts=video_transcripts
    )
    
    report = dna_engine.generate_dna_report(dna_profile)
    
    if request.user_id in USERS_DB:
        USERS_DB[request.user_id]["dna_assessment_completed"] = True
        USERS_DB[request.user_id]["assessment_completed_at"] = datetime.now()
        USERS_DB[request.user_id]["hub_alignments"] = dna_profile.hub_alignments
    
    return {
        "success": True,
        "dna_profile": {
            "leadership_style": dna_profile.leadership_style.value,
            "communication_tone": dna_profile.communication_tone.value,
            "core_values": dna_profile.core_values,
            "hub_alignments": dna_profile.hub_alignments
        },
        "report": report
    }

@app.get("/api/assessment/questions/{round_number}")
async def get_assessment_questions(round_number: int):
    """Get questions for specific assessment round"""
    if round_number < 1 or round_number > 5:
        raise HTTPException(status_code=400, detail="Invalid round number")
    
    round_data = ASSESSMENT_ROUNDS[round_number - 1]
    return round_data

# -------------------- CONTENT GENERATION ENDPOINTS --------------------

@app.post("/api/generate/content")
async def generate_content(request: ContentGenerationRequest):
    """Generate DNA-aligned content for specific hub"""
    
    # Use mock user for now
    user = UserProfile(
        user_id="test-user",
        email="test@example.com",
        full_name="Test User",
        company_name="Test Company"
    )
    
    # Get DNA context from request or use default
    dna_context = request.user_dna or {
        "leadership_style": "Visionary Innovator",
        "communication_tone": "Inspiring and Forward-thinking",
        "core_values": ["Innovation", "Excellence", "Collaboration"]
    }
    
    try:
        # Build the prompt
        prompt = request.custom_prompt or request.prompt or f"Generate a {request.template} for {request.hub}"
        
        # Add DNA alignment to prompt
        enhanced_prompt = f"""
        Generate content that aligns with this leadership profile:
        - Leadership Style: {dna_context.get('leadership_style')}
        - Communication Tone: {dna_context.get('communication_tone')}
        - Core Values: {', '.join(dna_context.get('core_values', []))}
        
        Content Request: {prompt}
        Format: {request.output_format or request.format}
        Hub: {request.hub}
        """
        
        # Determine task type
        task_type = TaskType.SIMPLE_GENERATION
        if request.hub == 'techhub':
            task_type = TaskType.TECHNICAL_CONTENT
        elif request.hub in ['marketinghub', 'saleshub']:
            task_type = TaskType.CREATIVE_CONTENT
        
        # Generate content
        result = await llm_engine.generate(
            prompt=enhanced_prompt,
            task_type=task_type,
            max_tokens=request.max_length or 1000
        )
        
        if result["success"]:
            return {
                "success": True,
                "content": result["content"],
                "hub": request.hub,
                "model_used": result.get("model", "gemini"),
                "cost": result.get("cost", 0.001),
                "dna_aligned": True
            }
        else:
            return {
                "success": False,
                "error": result.get("error", "Generation failed")
            }
            
    except Exception as e:
        logger.error(f"Content generation error: {str(e)}")
        return {
            "success": False,
            "error": f"Generation failed: {str(e)}"
        }

@app.post("/api/generate/package")
async def generate_content_package(
    request: Dict[str, Any],
    user: UserProfile = Depends(get_current_user)
):
    """Generate complete content package (multiple formats)"""
    hub = request.get('hub')
    campaign_name = request.get('campaign_name')
    description = request.get('description')
    
    access_result = dna_access_control.check_dna_access(user.dict(), hub)
    if not access_result['access']:
        raise HTTPException(status_code=403, detail=access_result)
    
    dna_context = USERS_DB.get(user.user_id, {}).get('dna_profile', {})
    
    package = {
        "campaign_name": campaign_name,
        "created_at": datetime.now().isoformat(),
        "hub": hub,
        "contents": []
    }
    
    formats = [
        ("email", "Email Campaign"),
        ("social", "Social Media Posts"),
        ("document", "Detailed Document"),
        ("presentation", "Presentation Outline")
    ]
    
    for format_type, format_name in formats:
        result = await llm_engine.generate(
            prompt=f"Create {format_name} for: {description}",
            task_type=TaskType.CREATIVE_CONTENT,
            max_tokens=1500
        )
        
        package["contents"].append({
            "format": format_type,
            "name": format_name,
            "content": result['content'],
            "dna_alignment": 95
        })
    
    return {
        "success": True,
        "package": package,
        "credits_used": 50
    }

# -------------------- MULTI-LLM ENDPOINTS --------------------

@app.get("/api/ai/providers")
async def get_ai_providers():
    """Get status of all AI providers"""
    providers = []
    
    for provider, config in llm_engine.providers.items():
        providers.append({
            "name": provider.value,
            "model": config.model,
            "available": bool(config.api_key),
            "cost_per_1k_tokens": (config.cost_per_1k_input + config.cost_per_1k_output) / 2,
            "supports_images": config.supports_images
        })
    
    return {
        "providers": providers,
        "usage_stats": llm_engine.get_usage_stats()
    }

@app.get("/api/ai/usage-stats")
async def get_usage_stats(user: UserProfile = Depends(get_current_user)):
    """Get AI usage statistics"""
    if not user.is_superadmin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    stats = llm_engine.get_usage_stats()
    
    return {
        "total_requests": stats['total_requests'],
        "total_cost": f"${stats['total_cost']:.2f}",
        "average_cost": f"${stats['average_cost_per_request']:.4f}",
        "provider_distribution": stats['provider_usage'],
        "most_used_provider": stats['most_used_provider']
    }

# -------------------- HUB ENDPOINTS --------------------

@app.get("/api/hubs")
async def get_hubs(user: UserProfile = Depends(get_current_user)):
    """Get all hubs with user's alignment scores"""
    hub_data = []
    for hub in HUBS_DATA:
        alignment_score = user.hub_alignments.get(hub['id'], 0)
        hub_data.append({
            **hub,
            "alignment_score": alignment_score,
            "access": alignment_score >= 40 or user.is_superadmin
        })
    
    return {"hubs": hub_data}

@app.get("/api/hubs/{hub_id}/templates")
async def get_hub_templates(hub_id: str):
    """Get templates for specific hub"""
    hub = next((h for h in HUBS_DATA if h['id'] == hub_id), None)
    if not hub:
        raise HTTPException(status_code=404, detail="Hub not found")
    
    return {
        "hub": hub['name'],
        "templates": hub['templates']
    }

# -------------------- ANALYTICS ENDPOINTS --------------------

@app.get("/api/analytics/dna-enforcement")
async def get_dna_enforcement_stats(user: UserProfile = Depends(get_current_user)):
    """Get DNA enforcement statistics (SuperAdmin only)"""
    if not user.is_superadmin:
        raise HTTPException(status_code=403, detail="SuperAdmin access required")
    
    return {
        "total_users": len(USERS_DB),
        "dna_completed": sum(1 for u in USERS_DB.values() if u['dna_assessment_completed']),
        "pending_assessment": sum(1 for u in USERS_DB.values() if not u['dna_assessment_completed']),
        "access_denials_today": 12,
        "most_denied_hub": "TechHub",
        "average_alignment_scores": {
            "hrhub": 72,
            "finhub": 68,
            "techhub": 65,
            "saleshub": 81,
            "marketinghub": 76,
            "omnihub": 74
        },
        "content_generated_today": 145,
        "credits_consumed_today": 2875
    }

# -------------------- SUBSCRIPTION ENDPOINTS --------------------

@app.get("/api/subscription/plans")
async def get_subscription_plans():
    """Get available subscription plans"""
    return {"plans": SUBSCRIPTION_PLANS}

@app.post("/api/subscription/upgrade")
async def upgrade_subscription(
    plan: str,
    user: UserProfile = Depends(get_current_user)
):
    """Upgrade user subscription"""
    return {
        "success": True,
        "message": f"Upgraded to {plan} plan",
        "payment_required": True,
        "amount": "₹24,999" if plan == "professional" else "₹49,999"
    }

# -------------------- ERROR HANDLERS --------------------

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom error handler"""
    return {
        "error": True,
        "message": exc.detail,
        "status_code": exc.status_code
    }

# -------------------- STARTUP EVENTS --------------------

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    print("🚀 SmartDNA API Starting...")
    print(f"✅ Multi-LLM Engine initialized with {len(llm_engine.providers)} providers")
    print(f"✅ DNA Engine ready for assessments")
    print(f"✅ Access Control active with {dna_access_control.min_hub_score}% minimum hub score")
    print("🎯 API ready at http://localhost:8000")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)