"""
CorePersonaDNA Assessment Engine
Analyzes founder video interviews to create organizational DNA profile
Maps personality traits to 6 functional hubs
"""

import json
import numpy as np
from typing import Dict, List, Optional, Tuple
from datetime import datetime
from dataclasses import dataclass
from enum import Enum

class LeadershipStyle(Enum):
    VISIONARY_INNOVATOR = "Visionary Innovator"
    ANALYTICAL_STRATEGIST = "Analytical Strategist"
    COLLABORATIVE_BUILDER = "Collaborative Builder"
    RESULTS_DRIVER = "Results Driver"
    TRANSFORMATIONAL_LEADER = "Transformational Leader"
    SERVANT_LEADER = "Servant Leader"

class CommunicationTone(Enum):
    INSPIRING_FORWARD = "Inspiring and Forward-thinking"
    DATA_DRIVEN_PRECISE = "Data-driven and Precise"
    WARM_INCLUSIVE = "Warm and Inclusive"
    DIRECT_ACTION = "Direct and Action-oriented"
    VISIONARY_PASSIONATE = "Visionary and Passionate"
    SUPPORTIVE_EMPOWERING = "Supportive and Empowering"

@dataclass
class DNAProfile:
    """Complete CorePersonaDNA profile of a founder"""
    user_id: str
    company_name: str
    assessment_date: datetime
    
    # Core personality traits
    leadership_style: LeadershipStyle
    communication_tone: CommunicationTone
    decision_making: str
    core_values: List[str]
    cultural_emphasis: str
    
    # Assessment scores from 5 rounds
    vision_score: float
    problem_solving_score: float
    team_culture_score: float
    innovation_score: float
    impact_score: float
    
    # Hub alignment scores (0-100)
    hub_alignments: Dict[str, float]
    
    # Raw traits for detailed analysis
    personality_traits: Dict[str, float]

class DNAEngine:
    """
    Analyzes video assessment responses to create CorePersonaDNA
    Maps founder traits to 6 functional hubs
    """
    
    def __init__(self):
        self.trait_mappings = self._initialize_trait_mappings()
        self.hub_weights = self._initialize_hub_weights()
        
    def _initialize_trait_mappings(self) -> Dict[str, Dict[str, float]]:
        """Define how personality traits map to each hub"""
        return {
            'hrhub': {
                'empathy': 0.25,
                'communication': 0.20,
                'team_building': 0.20,
                'fairness': 0.15,
                'mentoring': 0.10,
                'conflict_resolution': 0.10
            },
            'finhub': {
                'analytical': 0.30,
                'detail_oriented': 0.25,
                'risk_management': 0.20,
                'strategic_planning': 0.15,
                'decision_making': 0.10
            },
            'techhub': {
                'innovation': 0.25,
                'technical_aptitude': 0.20,
                'problem_solving': 0.20,
                'systematic_thinking': 0.15,
                'quality_focus': 0.10,
                'continuous_learning': 0.10
            },
            'saleshub': {
                'persuasion': 0.25,
                'relationship_building': 0.20,
                'goal_orientation': 0.20,
                'resilience': 0.15,
                'competitive_spirit': 0.10,
                'negotiation': 0.10
            },
            'marketinghub': {
                'creativity': 0.25,
                'communication': 0.20,
                'market_awareness': 0.15,
                'brand_thinking': 0.15,
                'storytelling': 0.15,
                'data_interpretation': 0.10
            },
            'omnihub': {
                'strategic_vision': 0.20,
                'adaptability': 0.20,
                'cross_functional': 0.20,
                'leadership': 0.20,
                'systems_thinking': 0.10,
                'change_management': 0.10
            }
        }
    
    def _initialize_hub_weights(self) -> Dict[str, Dict[str, float]]:
        """Define how each assessment round contributes to hub scores"""
        return {
            'hrhub': {
                'vision': 0.15,
                'problem_solving': 0.10,
                'team_culture': 0.40,
                'innovation': 0.15,
                'impact': 0.20
            },
            'finhub': {
                'vision': 0.20,
                'problem_solving': 0.35,
                'team_culture': 0.10,
                'innovation': 0.20,
                'impact': 0.15
            },
            'techhub': {
                'vision': 0.15,
                'problem_solving': 0.30,
                'team_culture': 0.10,
                'innovation': 0.35,
                'impact': 0.10
            },
            'saleshub': {
                'vision': 0.25,
                'problem_solving': 0.20,
                'team_culture': 0.20,
                'innovation': 0.15,
                'impact': 0.20
            },
            'marketinghub': {
                'vision': 0.30,
                'problem_solving': 0.15,
                'team_culture': 0.15,
                'innovation': 0.25,
                'impact': 0.15
            },
            'omnihub': {
                'vision': 0.25,
                'problem_solving': 0.20,
                'team_culture': 0.20,
                'innovation': 0.20,
                'impact': 0.15
            }
        }
    
    async def analyze_assessment(self, 
                               user_id: str,
                               company_name: str,
                               video_transcripts: List[Dict[str, str]]) -> DNAProfile:
        """
        Analyze 5 rounds of video interviews to create CorePersonaDNA
        
        Args:
            user_id: Unique identifier for the user
            company_name: Name of the company
            video_transcripts: List of 5 dictionaries with round info and transcripts
            
        Returns:
            Complete DNAProfile with hub alignments
        """
        # Extract traits from each round
        round_analyses = []
        for i, transcript in enumerate(video_transcripts):
            analysis = await self._analyze_round(i + 1, transcript['content'])
            round_analyses.append(analysis)
        
        # Aggregate personality traits
        personality_traits = self._aggregate_traits(round_analyses)
        
        # Determine leadership style and other core attributes
        leadership_style = self._determine_leadership_style(personality_traits)
        communication_tone = self._determine_communication_tone(personality_traits)
        core_values = self._extract_core_values(round_analyses)
        
        # Calculate round scores
        vision_score = round_analyses[0]['score']
        problem_solving_score = round_analyses[1]['score']
        team_culture_score = round_analyses[2]['score']
        innovation_score = round_analyses[3]['score']
        impact_score = round_analyses[4]['score']
        
        # Calculate hub alignments
        hub_alignments = self._calculate_hub_alignments(
            personality_traits,
            {
                'vision': vision_score,
                'problem_solving': problem_solving_score,
                'team_culture': team_culture_score,
                'innovation': innovation_score,
                'impact': impact_score
            }
        )
        
        # Create DNA profile
        dna_profile = DNAProfile(
            user_id=user_id,
            company_name=company_name,
            assessment_date=datetime.now(),
            leadership_style=leadership_style,
            communication_tone=communication_tone,
            decision_making=self._determine_decision_style(personality_traits),
            core_values=core_values,
            cultural_emphasis=self._determine_cultural_emphasis(personality_traits),
            vision_score=vision_score,
            problem_solving_score=problem_solving_score,
            team_culture_score=team_culture_score,
            innovation_score=innovation_score,
            impact_score=impact_score,
            hub_alignments=hub_alignments,
            personality_traits=personality_traits
        )
        
        return dna_profile
    
    async def _analyze_round(self, round_num: int, transcript: str) -> Dict[str, any]:
        """Analyze a single round of video interview"""
        # In production, this would use NLP/AI to analyze transcript
        # For now, simulate analysis based on keywords and patterns
        
        traits = {}
        
        # Round 1: Leadership Vision
        if round_num == 1:
            traits['visionary'] = self._count_keywords(transcript, ['vision', 'future', 'transform', 'revolutionary'])
            traits['strategic'] = self._count_keywords(transcript, ['strategy', 'plan', 'goal', 'objective'])
            traits['inspiring'] = self._count_keywords(transcript, ['inspire', 'motivate', 'passion', 'believe'])
            
        # Round 2: Problem-Solving
        elif round_num == 2:
            traits['analytical'] = self._count_keywords(transcript, ['analyze', 'data', 'metrics', 'measure'])
            traits['creative'] = self._count_keywords(transcript, ['innovative', 'creative', 'unique', 'different'])
            traits['systematic'] = self._count_keywords(transcript, ['process', 'system', 'framework', 'method'])
            
        # Round 3: Team & Culture
        elif round_num == 3:
            traits['collaborative'] = self._count_keywords(transcript, ['team', 'together', 'collaborate', 'we'])
            traits['empathetic'] = self._count_keywords(transcript, ['understand', 'support', 'care', 'wellbeing'])
            traits['inclusive'] = self._count_keywords(transcript, ['diverse', 'inclusive', 'everyone', 'belong'])
            
        # Round 4: Innovation & Growth
        elif round_num == 4:
            traits['innovative'] = self._count_keywords(transcript, ['innovate', 'disrupt', 'new', 'cutting-edge'])
            traits['growth_oriented'] = self._count_keywords(transcript, ['grow', 'scale', 'expand', 'increase'])
            traits['risk_taking'] = self._count_keywords(transcript, ['risk', 'bold', 'experiment', 'try'])
            
        # Round 5: Impact & Legacy
        elif round_num == 5:
            traits['impact_driven'] = self._count_keywords(transcript, ['impact', 'difference', 'change', 'matter'])
            traits['purpose_oriented'] = self._count_keywords(transcript, ['purpose', 'meaning', 'why', 'mission'])
            traits['legacy_focused'] = self._count_keywords(transcript, ['legacy', 'lasting', 'future', 'generation'])
        
        # Calculate overall score for this round (0-100)
        score = min(sum(traits.values()) * 10, 100)
        
        return {
            'round': round_num,
            'traits': traits,
            'score': score,
            'transcript_length': len(transcript.split())
        }
    
    def _count_keywords(self, text: str, keywords: List[str]) -> float:
        """Count keyword occurrences (normalized)"""
        text_lower = text.lower()
        count = sum(1 for keyword in keywords if keyword in text_lower)
        return min(count / len(keywords) * 2, 1.0)  # Normalize to 0-1
    
    def _aggregate_traits(self, round_analyses: List[Dict]) -> Dict[str, float]:
        """Aggregate traits from all rounds into overall personality profile"""
        all_traits = {}
        
        for analysis in round_analyses:
            for trait, value in analysis['traits'].items():
                if trait in all_traits:
                    all_traits[trait] = (all_traits[trait] + value) / 2
                else:
                    all_traits[trait] = value
        
        # Add derived traits
        all_traits['leadership'] = (all_traits.get('visionary', 0) + all_traits.get('strategic', 0)) / 2
        all_traits['communication'] = (all_traits.get('inspiring', 0) + all_traits.get('empathetic', 0)) / 2
        all_traits['innovation'] = (all_traits.get('innovative', 0) + all_traits.get('creative', 0)) / 2
        all_traits['team_building'] = (all_traits.get('collaborative', 0) + all_traits.get('inclusive', 0)) / 2
        
        return all_traits
    
    def _determine_leadership_style(self, traits: Dict[str, float]) -> LeadershipStyle:
        """Determine primary leadership style based on traits"""
        scores = {
            LeadershipStyle.VISIONARY_INNOVATOR: traits.get('visionary', 0) + traits.get('innovative', 0),
            LeadershipStyle.ANALYTICAL_STRATEGIST: traits.get('analytical', 0) + traits.get('strategic', 0),
            LeadershipStyle.COLLABORATIVE_BUILDER: traits.get('collaborative', 0) + traits.get('team_building', 0),
            LeadershipStyle.RESULTS_DRIVER: traits.get('growth_oriented', 0) + traits.get('impact_driven', 0),
            LeadershipStyle.TRANSFORMATIONAL_LEADER: traits.get('inspiring', 0) + traits.get('visionary', 0),
            LeadershipStyle.SERVANT_LEADER: traits.get('empathetic', 0) + traits.get('purpose_oriented', 0)
        }
        
        return max(scores.items(), key=lambda x: x[1])[0]
    
    def _determine_communication_tone(self, traits: Dict[str, float]) -> CommunicationTone:
        """Determine communication tone based on traits"""
        if traits.get('inspiring', 0) > 0.7:
            return CommunicationTone.INSPIRING_FORWARD
        elif traits.get('analytical', 0) > 0.7:
            return CommunicationTone.DATA_DRIVEN_PRECISE
        elif traits.get('empathetic', 0) > 0.7:
            return CommunicationTone.WARM_INCLUSIVE
        elif traits.get('impact_driven', 0) > 0.7:
            return CommunicationTone.DIRECT_ACTION
        elif traits.get('visionary', 0) > 0.7:
            return CommunicationTone.VISIONARY_PASSIONATE
        else:
            return CommunicationTone.SUPPORTIVE_EMPOWERING
    
    def _determine_decision_style(self, traits: Dict[str, float]) -> str:
        """Determine decision-making style"""
        if traits.get('analytical', 0) > 0.7:
            return "Data-driven with systematic analysis"
        elif traits.get('collaborative', 0) > 0.7:
            return "Consensus-building with team input"
        elif traits.get('visionary', 0) > 0.7:
            return "Intuitive with long-term vision"
        else:
            return "Balanced approach with stakeholder consideration"
    
    def _determine_cultural_emphasis(self, traits: Dict[str, float]) -> str:
        """Determine organizational cultural emphasis"""
        emphases = []
        
        if traits.get('innovative', 0) > 0.6:
            emphases.append("Innovation-driven")
        if traits.get('collaborative', 0) > 0.6:
            emphases.append("Team-oriented")
        if traits.get('growth_oriented', 0) > 0.6:
            emphases.append("Growth-focused")
        if traits.get('empathetic', 0) > 0.6:
            emphases.append("People-first")
        if traits.get('impact_driven', 0) > 0.6:
            emphases.append("Purpose-driven")
            
        return " and ".join(emphases) if emphases else "Balanced and adaptive"
    
    def _extract_core_values(self, round_analyses: List[Dict]) -> List[str]:
        """Extract top 4-5 core values from assessment"""
        value_scores = {
            'Innovation': 0,
            'Excellence': 0,
            'Integrity': 0,
            'Collaboration': 0,
            'Growth': 0,
            'Impact': 0,
            'Empathy': 0,
            'Transparency': 0,
            'Agility': 0,
            'Sustainability': 0
        }
        
        # Score values based on traits
        for analysis in round_analyses:
            traits = analysis['traits']
            value_scores['Innovation'] += traits.get('innovative', 0) + traits.get('creative', 0)
            value_scores['Excellence'] += traits.get('systematic', 0) + traits.get('analytical', 0)
            value_scores['Collaboration'] += traits.get('collaborative', 0) + traits.get('inclusive', 0)
            value_scores['Growth'] += traits.get('growth_oriented', 0) + traits.get('visionary', 0)
            value_scores['Impact'] += traits.get('impact_driven', 0) + traits.get('purpose_oriented', 0)
            value_scores['Empathy'] += traits.get('empathetic', 0)
        
        # Return top 4 values
        sorted_values = sorted(value_scores.items(), key=lambda x: x[1], reverse=True)
        return [value[0] for value in sorted_values[:4]]
    
    def _calculate_hub_alignments(self, 
                                 personality_traits: Dict[str, float],
                                 round_scores: Dict[str, float]) -> Dict[str, float]:
        """Calculate alignment scores for each hub (0-100)"""
        hub_alignments = {}
        
        for hub, trait_weights in self.trait_mappings.items():
            # Calculate trait-based score
            trait_score = 0
            for trait, weight in trait_weights.items():
                trait_score += personality_traits.get(trait, 0.5) * weight * 100
            
            # Calculate round-based score
            round_score = 0
            hub_round_weights = self.hub_weights[hub]
            for round_type, weight in hub_round_weights.items():
                round_score += round_scores[round_type] * weight
            
            # Combine scores (60% traits, 40% rounds)
            final_score = (trait_score * 0.6) + (round_score * 0.4)
            
            # Add some randomness for realism (±5%)
            import random
            final_score += random.uniform(-5, 5)
            
            # Ensure score is between 30-99
            hub_alignments[hub] = max(30, min(99, final_score))
        
        return hub_alignments
    
    def generate_dna_report(self, dna_profile: DNAProfile) -> Dict[str, any]:
        """Generate a comprehensive DNA report"""
        return {
            'executive_summary': f"{dna_profile.company_name} is led by a {dna_profile.leadership_style.value} "
                               f"with {dna_profile.communication_tone.value} communication style.",
            'leadership_profile': {
                'style': dna_profile.leadership_style.value,
                'communication': dna_profile.communication_tone.value,
                'decision_making': dna_profile.decision_making,
                'cultural_emphasis': dna_profile.cultural_emphasis
            },
            'core_values': dna_profile.core_values,
            'assessment_scores': {
                'Vision & Strategy': dna_profile.vision_score,
                'Problem Solving': dna_profile.problem_solving_score,
                'Team & Culture': dna_profile.team_culture_score,
                'Innovation': dna_profile.innovation_score,
                'Impact & Purpose': dna_profile.impact_score
            },
            'hub_recommendations': self._generate_hub_recommendations(dna_profile.hub_alignments),
            'content_generation_tips': self._generate_content_tips(dna_profile),
            'assessment_date': dna_profile.assessment_date.isoformat()
        }
    
    def _generate_hub_recommendations(self, hub_alignments: Dict[str, float]) -> List[Dict]:
        """Generate recommendations for hub usage based on alignment"""
        sorted_hubs = sorted(hub_alignments.items(), key=lambda x: x[1], reverse=True)
        
        recommendations = []
        for hub, score in sorted_hubs:
            if score >= 80:
                status = "Excellent Match"
                recommendation = "Primary focus area - leverage heavily"
            elif score >= 60:
                status = "Good Match"
                recommendation = "Regular usage recommended"
            elif score >= 40:
                status = "Moderate Match"
                recommendation = "Use with guidance"
            else:
                status = "Low Match"
                recommendation = "Consider delegating or minimal use"
                
            recommendations.append({
                'hub': hub,
                'score': score,
                'status': status,
                'recommendation': recommendation
            })
            
        return recommendations
    
    def _generate_content_tips(self, dna_profile: DNAProfile) -> List[str]:
        """Generate content generation tips based on DNA"""
        tips = []
        
        # Based on leadership style
        if dna_profile.leadership_style == LeadershipStyle.VISIONARY_INNOVATOR:
            tips.append("Focus on future-oriented content with bold visions")
        elif dna_profile.leadership_style == LeadershipStyle.ANALYTICAL_STRATEGIST:
            tips.append("Include data, metrics, and logical frameworks")
        elif dna_profile.leadership_style == LeadershipStyle.COLLABORATIVE_BUILDER:
            tips.append("Emphasize teamwork, inclusion, and collective success")
            
        # Based on communication tone
        if "Inspiring" in dna_profile.communication_tone.value:
            tips.append("Use motivational language and aspirational themes")
        elif "Data-driven" in dna_profile.communication_tone.value:
            tips.append("Support claims with facts and evidence")
            
        # Based on values
        for value in dna_profile.core_values[:2]:
            tips.append(f"Regularly reinforce your commitment to {value}")
            
        return tips

# Global instance
dna_engine = DNAEngine()