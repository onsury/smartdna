from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from database import Database

# Create the app
app = FastAPI(title="SmartDNA API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class UserCreate(BaseModel):
    email: str
    name: str
    company: str = "Default Company"

class AssessmentSubmit(BaseModel):
    user_id: str
    answers: List[int]

# Your endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to SmartDNA API!"}

@app.post("/api/users")
def create_user(user: UserCreate):
    """Create a new user"""
    new_user = Database.create_user(user.email, user.name, user.company)
    return {"status": "success", "user": new_user}

@app.post("/api/assessment")
def submit_assessment(assessment: AssessmentSubmit):
    """Submit assessment answers and get DNA profile"""
    result = Database.save_assessment(assessment.user_id, assessment.answers)
    return {"status": "success", "result": result}

@app.get("/api/results/{user_id}")
def get_results(user_id: str):
    """Get user's DNA profile results"""
    results = Database.get_user_results(user_id)
    if not results:
        raise HTTPException(status_code=404, detail="No results found")
    return {"status": "success", "results": results}

@app.get("/api/test")
def test_endpoint():
    return {
        "status": "API is working!",
        "hubs": [
            "StartHub - Entrepreneurial Spirit",
            "ProfitHub - Business Acumen", 
            "TalentHub - People Skills",
            "GrowthHub - Learning Ability",
            "ValueHub - Ethics & Culture",
            "TechHub - Digital Aptitude"
        ]
    }