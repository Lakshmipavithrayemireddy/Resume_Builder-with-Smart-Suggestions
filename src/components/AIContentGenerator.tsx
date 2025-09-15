import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Target, 
  FileText, 
  Brain,
  Wand2,
  CheckCircle
} from "lucide-react";

interface AIContentGeneratorProps {
  onSuggestionApply: (content: string, section: string) => void;
  currentRole?: string;
  currentCompany?: string;
}

const AIContentGenerator = ({ onSuggestionApply, currentRole, currentCompany }: AIContentGeneratorProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    summary: string[];
    skills: string[];
    achievements: string[];
    keywords: string[];
  }>({
    summary: [],
    skills: [],
    achievements: [],
    keywords: []
  });

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('https://umbkmykhuatbpzckcchq.functions.supabase.co/functions/v1/generate-ai-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'analyze_job',
          data: {
            jobDescription,
            currentRole,
            currentCompany
          }
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuggestions(result.data);
      } else {
        console.error('AI analysis failed:', result.error);
        // Fallback to default suggestions
        setSuggestions({
          summary: ["Unable to analyze job description. Please try again."],
          skills: [],
          achievements: [],
          keywords: []
        });
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      setSuggestions({
        summary: ["Error analyzing job description. Please check your connection and try again."],
        skills: [],
        achievements: [],
        keywords: []
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateContent = async (type: string) => {
    try {
      const response = await fetch('https://umbkmykhuatbpzckcchq.functions.supabase.co/functions/v1/generate-ai-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type === 'summary' ? 'generate_summary' : 'generate_achievements',
          data: {
            currentRole,
            currentCompany,
            experienceLevel: 'Mid-level'
          }
        }),
      });

      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        console.error('AI generation failed:', result.error);
        return [];
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Description Analyzer */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Job-Tailored Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobDesc">Paste Job Description</Label>
            <Textarea
              id="jobDesc"
              placeholder="Paste the job description here to get personalized suggestions..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
            />
          </div>
          <Button 
            onClick={analyzeJobDescription}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze & Generate Suggestions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {(suggestions.summary.length > 0) && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              AI-Generated Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Professional Summary Suggestions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Professional Summary Options</h4>
              {suggestions.summary.map((suggestion, index) => (
                <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                  <p className="text-sm mb-2">{suggestion}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSuggestionApply(suggestion, 'summary')}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Apply
                  </Button>
                </div>
              ))}
            </div>

            {/* Skills Suggestions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Recommended Skills</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => onSuggestionApply(skill, 'skill')}
                  >
                    {skill} +
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievement Suggestions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Achievement Examples</h4>
              {suggestions.achievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                  <p className="text-sm mb-2">• {achievement}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSuggestionApply(achievement, 'achievement')}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Content Generators */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quick AI Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={async () => {
                const summaries = await generateContent('summary');
                if (summaries.length > 0) {
                  summaries.forEach((summary: string) => onSuggestionApply(summary, 'summary'));
                }
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={async () => {
                const achievements = await generateContent('achievement');
                if (achievements.length > 0) {
                  achievements.forEach((achievement: string) => onSuggestionApply(achievement, 'achievement'));
                }
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              Achievement Ideas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerator;