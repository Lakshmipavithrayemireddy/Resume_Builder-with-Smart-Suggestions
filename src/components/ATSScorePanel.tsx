import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  FileCheck,
  Search,
  Target
} from "lucide-react";

interface ATSScorePanelProps {
  personalInfo: any;
  experiences: any[];
  education: any[];
  skills: string[];
}

const ATSScorePanel = ({ personalInfo, experiences, education, skills }: ATSScorePanelProps) => {
  // Calculate ATS score based on resume content
  const calculateATSScore = () => {
    let score = 0;
    let maxScore = 100;
    
    // Contact Information (20 points)
    if (personalInfo.fullName) score += 5;
    if (personalInfo.email) score += 5;
    if (personalInfo.phone) score += 5;
    if (personalInfo.location) score += 5;
    
    // Professional Summary (15 points)
    if (personalInfo.summary && personalInfo.summary.length > 50) score += 15;
    
    // Experience (25 points)
    const validExperiences = experiences.filter(exp => exp.company && exp.position);
    score += Math.min(validExperiences.length * 5, 25);
    
    // Education (15 points)
    const validEducation = education.filter(edu => edu.institution && edu.degree);
    score += Math.min(validEducation.length * 7.5, 15);
    
    // Skills (15 points)
    score += Math.min(skills.length * 1.5, 15);
    
    // Format & Keywords (10 points)
    if (skills.length > 5) score += 5;
    if (personalInfo.summary && personalInfo.summary.length > 100) score += 5;
    
    return Math.round(score);
  };

  const atsScore = calculateATSScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", icon: CheckCircle, color: "text-green-600" };
    if (score >= 60) return { text: "Good", icon: AlertTriangle, color: "text-yellow-600" };
    return { text: "Needs Work", icon: XCircle, color: "text-red-600" };
  };

  const status = getScoreStatus(atsScore);
  const StatusIcon = status.icon;

  // Analysis checks
  const checks = [
    {
      label: "Contact Information Complete",
      passed: personalInfo.fullName && personalInfo.email && personalInfo.phone,
      critical: true
    },
    {
      label: "Professional Summary Present",
      passed: personalInfo.summary && personalInfo.summary.length > 50,
      critical: true
    },
    {
      label: "Work Experience Detailed",
      passed: experiences.some(exp => exp.company && exp.position && exp.description),
      critical: true
    },
    {
      label: "Education Information",
      passed: education.some(edu => edu.institution && edu.degree),
      critical: false
    },
    {
      label: "Relevant Skills Listed",
      passed: skills.length >= 5,
      critical: false
    },
    {
      label: "Quantified Achievements",
      passed: experiences.some(exp => exp.description && /\d+/.test(exp.description)),
      critical: false
    },
    {
      label: "Appropriate Resume Length",
      passed: personalInfo.summary && personalInfo.summary.length >= 100,
      critical: false
    }
  ];

  const passedChecks = checks.filter(check => check.passed).length;
  const criticalIssues = checks.filter(check => !check.passed && check.critical).length;

  return (
    <div className="space-y-4">
      {/* ATS Score Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            ATS Compatibility Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`text-3xl font-bold ${getScoreColor(atsScore)}`}>
                {atsScore}%
              </div>
              <div className="flex items-center gap-1">
                <StatusIcon className={`w-5 h-5 ${status.color}`} />
                <span className={`font-medium ${status.color}`}>{status.text}</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <Progress value={atsScore} className="h-3" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Checks Passed:</span>
              <span className="font-medium">{passedChecks}/{checks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Critical Issues:</span>
              <span className={`font-medium ${criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {criticalIssues}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center gap-3">
                {check.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span className="text-sm font-medium">{check.label}</span>
                {check.critical && (
                  <Badge variant="destructive">Critical</Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {check.passed ? "✓ Passed" : "✗ Failed"}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!personalInfo.summary && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Add a Professional Summary</p>
              <p className="text-xs text-yellow-700">Include a 2-3 sentence summary highlighting your key qualifications.</p>
            </div>
          )}
          
          {skills.length < 5 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Add More Skills</p>
              <p className="text-xs text-blue-700">Include at least 5-10 relevant skills to improve keyword matching.</p>
            </div>
          )}
          
          {!experiences.some(exp => exp.description && /\d+/.test(exp.description)) && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Quantify Your Achievements</p>
              <p className="text-xs text-purple-700">Add numbers, percentages, or metrics to your work experience.</p>
            </div>
          )}

          <Button variant="hero" size="sm" className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Get Personalized Tips
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSScorePanel;