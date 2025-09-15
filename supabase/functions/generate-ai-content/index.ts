import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if OpenAI API key is configured
  if (!openAIApiKey) {
    console.error('OpenAI API key not configured');
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'AI service not configured. Please contact support.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, data } = await req.json();
    console.log('Request received:', { type, data });

    let prompt = '';
    let systemMessage = '';

    switch (type) {
      case 'analyze_job':
        systemMessage = 'You are an expert resume analyst. Analyze job descriptions and provide structured suggestions for resume optimization.';
        prompt = `Analyze this job description and provide specific suggestions for:
1. Professional summary (3 different options)
2. Key skills to highlight (7-10 skills)
3. Achievement examples (3-4 examples with metrics)
4. Important keywords for ATS optimization

Job Description:
${data.jobDescription}

Current Role: ${data.currentRole || 'Not specified'}
Current Company: ${data.currentCompany || 'Not specified'}

Please respond in JSON format with the following structure:
{
  "summary": ["option1", "option2", "option3"],
  "skills": ["skill1", "skill2", ...],
  "achievements": ["achievement1", "achievement2", ...],
  "keywords": ["keyword1", "keyword2", ...]
}`;
        break;

      case 'generate_summary':
        systemMessage = 'You are an expert resume writer specializing in professional summaries.';
        prompt = `Generate 3 professional summary options for a resume. Make them compelling, results-focused, and tailored to modern job markets.
        
Current Role: ${data.currentRole || 'Professional'}
Current Company: ${data.currentCompany || 'Current employer'}
Experience Level: ${data.experienceLevel || 'Mid-level'}

Return as JSON array: ["summary1", "summary2", "summary3"]`;
        break;

      case 'generate_achievements':
        systemMessage = 'You are an expert at crafting impactful resume achievements with metrics and results.';
        prompt = `Generate 4 achievement examples that could be used in a resume. Make them specific, measurable, and impressive.
        
Industry: ${data.industry || 'General business'}
Role Type: ${data.currentRole || 'Professional role'}

Return as JSON array: ["achievement1", "achievement2", "achievement3", "achievement4"]`;
        break;

      case 'generate_cover_letter':
        systemMessage = 'You are a professional career advisor and expert cover letter writer.';
        prompt = `Generate a compelling cover letter for ${data.fullName} applying for a ${data.targetRole} position at ${data.targetCompany}.

Experience: ${data.experiences.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
Skills: ${data.skills.join(', ')}

Make it personalized, professional, and compelling. Include:
- Professional greeting
- Strong opening paragraph showing interest
- 2-3 body paragraphs highlighting relevant experience and skills
- Closing paragraph with call to action
- Professional sign-off

Return as a single formatted cover letter string.`;
        break;

      default:
        throw new Error('Invalid request type');
    }

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, response.statusText, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const aiResponse = await response.json();
    console.log('OpenAI response received');
    
    const generatedContent = aiResponse.choices[0].message.content;
    
    // Try to parse as JSON, fallback to plain text
    let result;
    try {
      result = JSON.parse(generatedContent);
    } catch {
      // If not JSON, structure it based on type
      if (type === 'generate_summary' || type === 'generate_achievements') {
        result = [generatedContent];
      } else if (type === 'generate_cover_letter') {
        result = [generatedContent]; // Return as array for consistency
      } else {
        result = { content: generatedContent };
      }
    }

    console.log('Returning result:', result);
    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'An error occurred while generating content'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});