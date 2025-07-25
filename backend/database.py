# Simple in-memory database for now (no Docker needed!)
from typing import Dict, List
from datetime import datetime
import json

# Mock database storage
users_db = {}
assessments_db = {}
results_db = {}

class Database:
    """Simple database without needing PostgreSQL"""
    
    @staticmethod
    def create_user(email: str, name: str, company: str = "Default") -> dict:
        user_id = f"user_{len(users_db) + 1}"
        user = {
            "id": user_id,
            "email": email,
            "name": name,
            "company": company,
            "created_at": datetime.now().isoformat()
        }
        users_db[user_id] = user
        return user
    
    @staticmethod
    def save_assessment(user_id: str, answers: List[int]) -> dict:
        assessment_id = f"assessment_{len(assessments_db) + 1}"
        
        # Calculate DNA scores
        dna_scores = {
            "StartHub": answers[0] * 20,  # Convert 1-5 to 0-100
            "ProfitHub": answers[1] * 20,
            "TalentHub": answers[2] * 20,
            "TechHub": answers[3] * 20,
            "ValueHub": answers[4] * 20,
            "GrowthHub": answers[5] * 20,
        }
        
        assessment = {
            "id": assessment_id,
            "user_id": user_id,
            "answers": answers,
            "dna_scores": dna_scores,
            "created_at": datetime.now().isoformat()
        }
        
        assessments_db[assessment_id] = assessment
        return assessment
    
    @staticmethod
    def get_user_results(user_id: str) -> dict:
        # Find user's latest assessment
        user_assessments = [a for a in assessments_db.values() if a["user_id"] == user_id]
        if not user_assessments:
            return None
        
        latest = sorted(user_assessments, key=lambda x: x["created_at"])[-1]
        return latest

# Test data
Database.create_user("test@example.com", "Test User", "Test Company")