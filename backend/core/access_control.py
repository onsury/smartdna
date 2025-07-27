"""
DNA Access Control System
Enforces CorePersonaDNA requirements for all content generation
Only SuperAdmin can bypass for demos
"""

import os
from typing import Dict, Optional, List
from datetime import datetime, timedelta
from functools import wraps
import jwt
from fastapi import HTTPException, status

class DNAAccessControl:
    """
    Enforces DNA-based access control across the platform
    Ensures users complete assessment before accessing content generation
    """
    
    def __init__(self):
        self.superadmin_key = os.getenv("SUPERADMIN_KEY", "starthub-media-ai-master-2024")
        self.min_hub_score = int(os.getenv("MIN_HUB_SCORE", "40"))
        self.dna_validity_days = int(os.getenv("DNA_VALIDITY_DAYS", "365"))
        
    def check_dna_access(self, user_data: Dict, requested_hub: Optional[str] = None) -> Dict[str, any]:
        """
        Check if user has valid DNA profile and access to requested hub
        
        Returns:
            Dict with access status and details
        """
        # SuperAdmin bypass
        if user_data.get('is_superadmin'):
            return {
                'access': True,
                'reason': 'SuperAdmin access',
                'hub_scores': {hub: 99 for hub in ['hrhub', 'finhub', 'techhub', 'saleshub', 'marketinghub', 'omnihub']}
            }
        
        # Check if DNA assessment completed
        if not user_data.get('dna_assessment_completed'):
            return {
                'access': False,
                'reason': 'DNA_ASSESSMENT_REQUIRED',
                'message': 'Complete CorePersonaDNA assessment to unlock content generation',
                'action': '/assessment/start'
            }
        
        # Check DNA validity
        assessment_date = user_data.get('assessment_completed_at')
        if assessment_date:
            days_since = (datetime.now() - assessment_date).days
            if days_since > self.dna_validity_days:
                return {
                    'access': False,
                    'reason': 'DNA_EXPIRED',
                    'message': f'Your DNA profile is {days_since} days old. Please refresh your assessment.',
                    'action': '/assessment/refresh'
                }
        
        # Get hub scores
        hub_scores = user_data.get('hub_alignments', {})
        
        # Check specific hub access if requested
        if requested_hub:
            hub_score = hub_scores.get(requested_hub, 0)
            if hub_score < self.min_hub_score:
                return {
                    'access': False,
                    'reason': 'LOW_HUB_ALIGNMENT',
                    'message': f'Your DNA alignment with {requested_hub} is {hub_score}%. Minimum {self.min_hub_score}% required.',
                    'hub_score': hub_score,
                    'recommended_hubs': self._get_recommended_hubs(hub_scores)
                }
        
        return {
            'access': True,
            'reason': 'DNA_VALID',
            'hub_scores': hub_scores,
            'days_remaining': self.dna_validity_days - days_since if assessment_date else self.dna_validity_days
        }
    
    def _get_recommended_hubs(self, hub_scores: Dict[str, float]) -> List[str]:
        """Get list of hubs with sufficient alignment"""
        return [hub for hub, score in hub_scores.items() if score >= self.min_hub_score]
    
    def create_superadmin_token(self, key: str) -> Optional[str]:
        """Create JWT token for SuperAdmin access"""
        if key != self.superadmin_key:
            return None
            
        payload = {
            'user_id': 'superadmin',
            'is_superadmin': True,
            'exp': datetime.utcnow() + timedelta(hours=24),
            'iat': datetime.utcnow()
        }
        
        return jwt.encode(payload, os.getenv('JWT_SECRET', 'your-secret-key'), algorithm='HS256')
    
    def verify_superadmin(self, token: str) -> bool:
        """Verify SuperAdmin token"""
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET', 'your-secret-key'), algorithms=['HS256'])
            return payload.get('is_superadmin', False)
        except:
            return False
    
    def log_access_attempt(self, user_id: str, hub: str, granted: bool, reason: str):
        """Log access attempts for monitoring"""
        # In production, this would write to database
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id,
            'hub_requested': hub,
            'access_granted': granted,
            'denial_reason': reason if not granted else None
        }
        print(f"DNA Access Log: {log_entry}")
    
    def calculate_content_credits(self, user_data: Dict, hub: str, content_type: str) -> int:
        """Calculate credits required based on DNA alignment"""
        base_credits = {
            'text': 5,
            'email': 7,
            'social': 10,
            'presentation': 15,
            'document': 20,
            'image': 25
        }
        
        # Get base cost
        credits = base_credits.get(content_type, 10)
        
        # Apply DNA alignment discount
        if not user_data.get('is_superadmin'):
            hub_score = user_data.get('hub_alignments', {}).get(hub, 50)
            if hub_score >= 90:
                credits = int(credits * 0.8)  # 20% discount
            elif hub_score >= 75:
                credits = int(credits * 0.9)  # 10% discount
            elif hub_score < 50:
                credits = int(credits * 1.2)  # 20% premium
        
        return credits

# Decorator for protecting routes
def require_dna(hub: Optional[str] = None):
    """Decorator to enforce DNA requirements on routes"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user data from request (simplified)
            # In production, this would get from JWT token
            user_data = kwargs.get('user_data', {})
            
            access_control = DNAAccessControl()
            access_result = access_control.check_dna_access(user_data, hub)
            
            if not access_result['access']:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=access_result
                )
            
            # Add access info to kwargs
            kwargs['dna_access'] = access_result
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Demo personas for SuperAdmin
DEMO_PERSONAS = {
    'visionary': {
        'leadership_style': 'Visionary Innovator',
        'communication_tone': 'Inspiring and Forward-thinking',
        'core_values': ['Innovation', 'Excellence', 'Growth', 'Impact'],
        'decision_making': 'Intuitive with long-term vision',
        'cultural_emphasis': 'Innovation-driven and Growth-focused',
        'hub_alignments': {
            'hrhub': 75,
            'finhub': 68,
            'techhub': 92,
            'saleshub': 85,
            'marketinghub': 88,
            'omnihub': 82
        }
    },
    'analytical': {
        'leadership_style': 'Analytical Strategist',
        'communication_tone': 'Data-driven and Precise',
        'core_values': ['Excellence', 'Integrity', 'Efficiency', 'Transparency'],
        'decision_making': 'Data-driven with systematic analysis',
        'cultural_emphasis': 'Performance-driven and Process-oriented',
        'hub_alignments': {
            'hrhub': 65,
            'finhub': 95,
            'techhub': 88,
            'saleshub': 70,
            'marketinghub': 72,
            'omnihub': 78
        }
    },
    'collaborative': {
        'leadership_style': 'Collaborative Builder',
        'communication_tone': 'Warm and Inclusive',
        'core_values': ['Collaboration', 'Empathy', 'Integrity', 'Growth'],
        'decision_making': 'Consensus-building with team input',
        'cultural_emphasis': 'Team-oriented and People-first',
        'hub_alignments': {
            'hrhub': 95,
            'finhub': 70,
            'techhub': 72,
            'saleshub': 78,
            'marketinghub': 82,
            'omnihub': 85
        }
    }
}

# Global instance
dna_access_control = DNAAccessControl()