"""
SmartDNA Multi-LLM Engine
The backbone of the platform - intelligently routes requests to optimal AI providers
Manages costs while maintaining quality
"""

import os
import json
import asyncio
import httpx
from typing import Dict, List, Optional, Any
from datetime import datetime
from dataclasses import dataclass
from enum import Enum

class LLMProvider(Enum):
    DEEPINFRA = "deepinfra"
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    GROQ = "groq"
    GEMINI = "gemini"

class TaskType(Enum):
    SIMPLE_GENERATION = "simple"
    CREATIVE_CONTENT = "creative"
    TECHNICAL_CONTENT = "technical"
    ANALYSIS = "analysis"
    TRANSLATION = "translation"
    IMAGE_GENERATION = "image"

@dataclass
class LLMConfig:
    provider: LLMProvider
    model: str
    api_key: str
    base_url: str
    cost_per_1k_input: float
    cost_per_1k_output: float
    max_tokens: int
    supports_images: bool = False

class MultiLLMEngine:
    """
    Intelligent Multi-LLM routing engine
    Routes requests to the most cost-effective provider based on task type
    """
    
    def __init__(self):
        self.providers = self._initialize_providers()
        self.usage_stats = {
            "total_requests": 0,
            "total_cost": 0.0,
            "provider_usage": {p.value: 0 for p in LLMProvider}
        }
        
    def _initialize_providers(self) -> Dict[LLMProvider, LLMConfig]:
        """Initialize all LLM providers with their configurations"""
        return {
            LLMProvider.DEEPINFRA: LLMConfig(
                provider=LLMProvider.DEEPINFRA,
                model="meta-llama/Llama-2-70b-chat-hf",
                api_key=os.getenv("DEEPINFRA_API_KEY", ""),
                base_url="https://api.deepinfra.com/v1/openai",
                cost_per_1k_input=0.0001,  # $0.10 per 1M tokens
                cost_per_1k_output=0.0001,
                max_tokens=4096
            ),
            LLMProvider.OPENAI: LLMConfig(
                provider=LLMProvider.OPENAI,
                model="gpt-4o-mini",
                api_key=os.getenv("OPENAI_API_KEY", ""),
                base_url="https://api.openai.com/v1",
                cost_per_1k_input=0.00015,
                cost_per_1k_output=0.0006,
                max_tokens=16384,
                supports_images=True
            ),
            LLMProvider.ANTHROPIC: LLMConfig(
                provider=LLMProvider.ANTHROPIC,
                model="claude-3-5-haiku-20241022",
                api_key=os.getenv("ANTHROPIC_API_KEY", ""),
                base_url="https://api.anthropic.com/v1",
                cost_per_1k_input=0.00025,
                cost_per_1k_output=0.00125,
                max_tokens=8192
            ),
            LLMProvider.GROQ: LLMConfig(
                provider=LLMProvider.GROQ,
                model="llama-3.1-70b-versatile",
                api_key=os.getenv("GROQ_API_KEY", ""),
                base_url="https://api.groq.com/openai/v1",
                cost_per_1k_input=0.0,  # Free tier
                cost_per_1k_output=0.0,
                max_tokens=8192
            ),
            LLMProvider.GEMINI: LLMConfig(
                provider=LLMProvider.GEMINI,
                model="gemini-1.5-flash",
                api_key=os.getenv("GEMINI_API_KEY", ""),
                base_url="https://generativelanguage.googleapis.com/v1beta",
                cost_per_1k_input=0.0,  # Free tier
                cost_per_1k_output=0.0,
                max_tokens=8192
            )
        }
    
    def select_provider(self, task_type: TaskType, 
                       content_length: int = 1000,
                       require_image: bool = False) -> LLMProvider:
        """
        Intelligently select the best provider based on task type and requirements
        """
        # Image generation always uses OpenAI
        if require_image or task_type == TaskType.IMAGE_GENERATION:
            return LLMProvider.OPENAI
            
        # Technical content prefers Claude for accuracy
        if task_type == TaskType.TECHNICAL_CONTENT:
            if self.providers[LLMProvider.ANTHROPIC].api_key:
                return LLMProvider.ANTHROPIC
            return LLMProvider.DEEPINFRA
            
        # Creative content uses GPT-4 for quality
        if task_type == TaskType.CREATIVE_CONTENT:
            if self.providers[LLMProvider.OPENAI].api_key:
                return LLMProvider.OPENAI
            return LLMProvider.DEEPINFRA
            
        # Simple generation uses free/cheap providers
        if task_type == TaskType.SIMPLE_GENERATION:
            # Try free providers first
            if self.providers[LLMProvider.GROQ].api_key:
                return LLMProvider.GROQ
            if self.providers[LLMProvider.GEMINI].api_key:
                return LLMProvider.GEMINI
            return LLMProvider.DEEPINFRA
            
        # Default to most cost-effective
        return LLMProvider.DEEPINFRA
    
    async def generate(self, 
                      prompt: str,
                      task_type: TaskType,
                      dna_context: Dict[str, Any],
                      hub_context: str,
                      max_tokens: int = 2000,
                      temperature: float = 0.7) -> Dict[str, Any]:
        """
        Generate content using the selected LLM provider
        Incorporates DNA context for personalized output
        """
        # Select optimal provider
        provider = self.select_provider(task_type, len(prompt))
        config = self.providers[provider]
        
        # Build DNA-enhanced prompt
        enhanced_prompt = self._build_dna_prompt(prompt, dna_context, hub_context)
        
        # Generate content
        try:
            result = await self._call_llm(config, enhanced_prompt, max_tokens, temperature)
            
            # Track usage
            self._track_usage(provider, len(prompt), len(result.get('content', '')))
            
            return {
                "content": result.get('content', ''),
                "provider": provider.value,
                "model": config.model,
                "tokens_used": result.get('tokens_used', 0),
                "cost": result.get('cost', 0),
                "dna_alignment_score": self._calculate_dna_alignment(result.get('content', ''), dna_context)
            }
            
        except Exception as e:
            # Fallback to another provider
            return await self._fallback_generate(prompt, task_type, dna_context, hub_context, max_tokens, temperature, failed_provider=provider)
    
    def _build_dna_prompt(self, prompt: str, dna_context: Dict[str, Any], hub_context: str) -> str:
        """Build prompt with DNA context for personalized generation"""
        dna_prompt = f"""
You are generating content for an organization with the following CorePersonaDNA™:

Leadership Style: {dna_context.get('leadership_style', 'Visionary')}
Communication Tone: {dna_context.get('communication_tone', 'Professional')}
Core Values: {', '.join(dna_context.get('core_values', ['Excellence', 'Innovation']))}
Decision Making: {dna_context.get('decision_making', 'Data-driven')}
Cultural Emphasis: {dna_context.get('cultural_emphasis', 'Collaborative')}

Generate content for the {hub_context} that:
1. Reflects the leader's authentic voice and style
2. Aligns with the organizational values
3. Maintains consistency with the cultural emphasis
4. Uses the appropriate communication tone

User Request: {prompt}

Generate content that is DNA-aligned and authentic to this organization's unique identity.
"""
        return dna_prompt
    
    async def _call_llm(self, config: LLMConfig, prompt: str, 
                       max_tokens: int, temperature: float) -> Dict[str, Any]:
        """Make actual API call to LLM provider"""
        async with httpx.AsyncClient() as client:
            if config.provider == LLMProvider.DEEPINFRA:
                response = await client.post(
                    f"{config.base_url}/chat/completions",
                    headers={"Authorization": f"Bearer {config.api_key}"},
                    json={
                        "model": config.model,
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": max_tokens,
                        "temperature": temperature
                    }
                )
                
            elif config.provider == LLMProvider.OPENAI:
                response = await client.post(
                    f"{config.base_url}/chat/completions",
                    headers={"Authorization": f"Bearer {config.api_key}"},
                    json={
                        "model": config.model,
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": max_tokens,
                        "temperature": temperature
                    }
                )
                
            # Add other providers...
            
            if response.status_code == 200:
                data = response.json()
                content = data['choices'][0]['message']['content']
                tokens = data.get('usage', {}).get('total_tokens', 0)
                
                # Calculate cost
                input_tokens = data.get('usage', {}).get('prompt_tokens', 0)
                output_tokens = data.get('usage', {}).get('completion_tokens', 0)
                cost = (input_tokens * config.cost_per_1k_input / 1000) + \
                       (output_tokens * config.cost_per_1k_output / 1000)
                
                return {
                    "content": content,
                    "tokens_used": tokens,
                    "cost": cost
                }
            else:
                raise Exception(f"API call failed: {response.status_code}")
    
    async def _fallback_generate(self, prompt: str, task_type: TaskType,
                                dna_context: Dict[str, Any], hub_context: str,
                                max_tokens: int, temperature: float,
                                failed_provider: LLMProvider) -> Dict[str, Any]:
        """Fallback to another provider if primary fails"""
        # Try providers in order of cost-effectiveness
        fallback_order = [
            LLMProvider.DEEPINFRA,
            LLMProvider.GROQ,
            LLMProvider.GEMINI,
            LLMProvider.OPENAI,
            LLMProvider.ANTHROPIC
        ]
        
        for provider in fallback_order:
            if provider != failed_provider and self.providers[provider].api_key:
                try:
                    config = self.providers[provider]
                    enhanced_prompt = self._build_dna_prompt(prompt, dna_context, hub_context)
                    result = await self._call_llm(config, enhanced_prompt, max_tokens, temperature)
                    
                    self._track_usage(provider, len(prompt), len(result.get('content', '')))
                    
                    return {
                        "content": result.get('content', ''),
                        "provider": f"{provider.value} (fallback)",
                        "model": config.model,
                        "tokens_used": result.get('tokens_used', 0),
                        "cost": result.get('cost', 0),
                        "dna_alignment_score": self._calculate_dna_alignment(result.get('content', ''), dna_context)
                    }
                except:
                    continue
                    
        return {
            "content": "Service temporarily unavailable. Please try again.",
            "provider": "none",
            "error": True
        }
    
    def _calculate_dna_alignment(self, content: str, dna_context: Dict[str, Any]) -> float:
        """Calculate how well the generated content aligns with DNA profile"""
        # Simplified alignment calculation
        score = 85.0  # Base score
        
        # Check for value alignment
        for value in dna_context.get('core_values', []):
            if value.lower() in content.lower():
                score += 2.5
                
        # Check tone alignment (simplified)
        tone = dna_context.get('communication_tone', '').lower()
        if 'professional' in tone and len(content.split()) > 100:
            score += 2.5
        if 'innovative' in tone and any(word in content.lower() for word in ['innovative', 'cutting-edge', 'revolutionary']):
            score += 2.5
            
        return min(score, 99.0)
    
    def _track_usage(self, provider: LLMProvider, input_length: int, output_length: int):
        """Track usage statistics for monitoring and optimization"""
        self.usage_stats["total_requests"] += 1
        self.usage_stats["provider_usage"][provider.value] += 1
        
        # Calculate approximate cost
        config = self.providers[provider]
        input_tokens = input_length / 4  # Rough estimate
        output_tokens = output_length / 4
        cost = (input_tokens * config.cost_per_1k_input / 1000) + \
               (output_tokens * config.cost_per_1k_output / 1000)
        self.usage_stats["total_cost"] += cost
    
    def get_usage_stats(self) -> Dict[str, Any]:
        """Get current usage statistics"""
        return {
            **self.usage_stats,
            "average_cost_per_request": self.usage_stats["total_cost"] / max(self.usage_stats["total_requests"], 1),
            "most_used_provider": max(self.usage_stats["provider_usage"].items(), key=lambda x: x[1])[0] if self.usage_stats["total_requests"] > 0 else "none"
        }
    
    async def generate_image(self, prompt: str, dna_context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate images using DALL-E 3"""
        if not self.providers[LLMProvider.OPENAI].api_key:
            return {"error": "Image generation requires OpenAI API key"}
            
        enhanced_prompt = f"{prompt}. Style should reflect: {dna_context.get('leadership_style', 'professional')} leadership with {', '.join(dna_context.get('core_values', ['innovation']))} values"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/images/generations",
                headers={"Authorization": f"Bearer {self.providers[LLMProvider.OPENAI].api_key}"},
                json={
                    "model": "dall-e-3",
                    "prompt": enhanced_prompt,
                    "n": 1,
                    "size": "1024x1024"
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "image_url": data['data'][0]['url'],
                    "revised_prompt": data['data'][0].get('revised_prompt', enhanced_prompt),
                    "cost": 0.04  # DALL-E 3 cost
                }
            else:
                return {"error": f"Image generation failed: {response.status_code}"}

# Global instance
multi_llm_engine = MultiLLMEngine()