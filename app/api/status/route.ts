import { NextResponse } from "next/server";
import { apiManager } from "@/lib/secure-api-manager";

export async function GET() {
  // Mask Supabase keys
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const maskedUrl = supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "Missing";
  
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const maskedServiceKey = serviceKey ? `eyJ...${serviceKey.slice(-8)}` : "Missing";
  
  const status = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apis: {
      claude: {
        configured: !!process.env.ANTHROPIC_API_KEY,
        masked: apiManager.getMaskedKey("ANTHROPIC")
      },
      gemini: {
        configured: !!process.env.GEMINI_API_KEY,
        masked: apiManager.getMaskedKey("GEMINI")
      },
      perplexity: {
        configured: !!process.env.PERPLEXITY_API_KEY,
        masked: apiManager.getMaskedKey("PERPLEXITY")
      },
      groq: {
        configured: !!process.env.GROQ_API_KEY,
        masked: apiManager.getMaskedKey("GROQ")
      },
      vapi: {
        configured: !!process.env.VAPI_API_KEY,
        masked: apiManager.getMaskedKey("VAPI")
      }
    },
    database: {
      supabase: {
        configured: !!supabaseUrl && !!serviceKey,
        url: maskedUrl,
        serviceKey: maskedServiceKey
      }
    }
  };
  
  return NextResponse.json(status);
}
