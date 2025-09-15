import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award,
  Download,
  Eye,
  Sparkles,
  FileCheck,
  Palette,
  Plus,
  Trash2,
  Bot,
  X
} from "lucide-react";
import ResumePreview from "./ResumePreview";
import AIContentGenerator from "./AIContentGenerator";
import ATSScorePanel from "./ATSScorePanel";
import ResumeTemplateSelector from "./ResumeTemplateSelector";
import html2pdf from "html2pdf.js";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  cgpaOrPercentage?: string;
  cgpaType?: 'cgpa' | 'percentage';
}

interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  projectUrl?: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  description?: string;
}

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    profileImage: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: '',
      degree: '',
      graduationDate: '',
      cgpaOrPercentage: '',
      cgpaType: 'cgpa'
    }
  ]);

  const [internships, setInternships] = useState<Internship[]>([
    {
      id: '1',
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '',
      description: '',
      date: ''
    }
  ]);

  const [interests, setInterests] = useState<string[]>([]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      projectUrl: ''
    }
  ]);

  const [publications, setPublications] = useState<Publication[]>([
    {
      id: '1',
      title: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
      description: ''
    }
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentInterest, setCurrentInterest] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      graduationDate: '',
      cgpaOrPercentage: '',
      cgpaType: 'cgpa'
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  // Internship functions
  const addInternship = () => {
    const newInternship: Internship = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setInternships([...internships, newInternship]);
  };

  const removeInternship = (id: string) => {
    setInternships(internships.filter(intern => intern.id !== id));
  };

  const updateInternship = (id: string, field: keyof Internship, value: string) => {
    setInternships(internships.map(intern => 
      intern.id === id ? { ...intern, [field]: value } : intern
    ));
  };

  // Achievement functions
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: ''
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter(ach => ach.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setAchievements(achievements.map(ach => 
      ach.id === id ? { ...ach, [field]: value } : ach
    ));
  };

  // Interest functions
  const addInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  // Image upload function
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPersonalInfo({...personalInfo, profileImage: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAISuggestion = (content: string, section: string) => {
    if (section === 'summary') {
      setPersonalInfo({...personalInfo, summary: content});
    } else if (section === 'skill') {
      if (!skills.includes(content)) {
        setSkills([...skills, content]);
      }
    }
  };

  const downloadPDF = async () => {
    // Check if there's any content to download
    if (!personalInfo.fullName && !personalInfo.email && experiences.every(exp => !exp.company && !exp.position)) {
      alert('Please fill in your resume information before downloading.');
      return;
    }

    try {
      // Get the resume preview element
      const element = document.getElementById('resume-preview');
      if (!element) {
        alert('Resume preview not found. Please try again.');
        return;
      }

      const opt = {
        margin: 0.5,
        filename: `${personalInfo.fullName || 'resume'}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 1.0,
          crossOrigin: 'anonymous'
        },
        html2canvas: { 
          scale: 3,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          letterRendering: true,
          dpi: 300,
          width: element.scrollWidth,
          height: element.scrollHeight
        },
        jsPDF: { 
          unit: 'pt', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Projects functions
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      projectUrl: ''
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  // Publications functions
  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
      description: ''
    };
    setPublications([...publications, newPublication]);
  };

  const removePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    setPublications(publications.map(pub => 
      pub.id === id ? { ...pub, [field]: value } : pub
    ));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'publications', label: 'Publications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'interests', label: 'Interests', icon: User },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'ats-score', label: 'ATS Score', icon: FileCheck }
  ];

  return (
    <section id="resume-builder" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Build Your <span className="text-gradient-primary">Resume</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill in your information and watch your professional resume come to life with real-time preview
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>
                <Separator />
              </CardContent>
            </Card>

            {/* Personal Information */}
            {activeTab === 'personal' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={personalInfo.fullName}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                          setPersonalInfo({...personalInfo, fullName: value});
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={personalInfo.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9+\-\(\)\s]/g, '');
                          setPersonalInfo({...personalInfo, phone: value});
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="New York, NY"
                        value={personalInfo.location}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z\s,.-]/g, '');
                          setPersonalInfo({...personalInfo, location: value});
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <Input
                        id="linkedinUrl"
                        placeholder="https://linkedin.com/in/johndoe"
                        value={personalInfo.linkedinUrl || ''}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedinUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <Input
                        id="githubUrl"
                        placeholder="https://github.com/johndoe"
                        value={personalInfo.githubUrl || ''}
                        onChange={(e) => setPersonalInfo({...personalInfo, githubUrl: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {personalInfo.profileImage && (
                      <div className="mt-2">
                        <img 
                          src={personalInfo.profileImage} 
                          alt="Profile preview" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-border"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Write a compelling summary of your professional background..."
                      rows={4}
                      value={personalInfo.summary}
                      onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      disabled={isGenerating}
                      onClick={async () => {
                        if (isGenerating) return;
                        setIsGenerating(true);
                        try {
                          const response = await fetch('https://umbkmykhuatbpzckcchq.functions.supabase.co/functions/v1/generate-ai-content', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              type: 'generate_summary',
                              data: {
                                currentRole: experiences[0]?.position || 'Professional',
                                currentCompany: experiences[0]?.company || '',
                                experienceLevel: 'Mid-level'
                              }
                            }),
                          });
                          const result = await response.json();
                          if (result.success && result.data.length > 0) {
                            setPersonalInfo({...personalInfo, summary: result.data[0]});
                          } else {
                            console.error('AI generation failed:', result.error);
                            alert('Failed to generate content. Please try again.');
                          }
                        } catch (error) {
                          console.error('Error generating summary:', error);
                          alert('Error connecting to AI service. Please try again.');
                        } finally {
                          setIsGenerating(false);
                        }
                      }}
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-1" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {activeTab === 'skills' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {activeTab === 'experience' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Work Experience
                    </CardTitle>
                    <Button onClick={addExperience} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Experience {experiences.indexOf(exp) + 1}</h4>
                        {experiences.length > 1 && (
                          <Button 
                            onClick={() => removeExperience(exp.id)}
                            size="sm" 
                            variant="ghost"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            placeholder="MM/YYYY"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            placeholder="MM/YYYY or Present"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea
                          placeholder="Describe your key responsibilities and achievements..."
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={async () => {
                            try {
                              const response = await fetch('https://umbkmykhuatbpzckcchq.functions.supabase.co/functions/v1/generate-ai-content', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  type: 'generate_achievements',
                                  data: {
                                    currentRole: exp.position || 'Professional role',
                                    currentCompany: exp.company || '',
                                    industry: 'General business'
                                  }
                                }),
                              });
                              const result = await response.json();
                              if (result.success && result.data.length > 0) {
                                const enhancedDescription = result.data.join('\n• ');
                                updateExperience(exp.id, 'description', `• ${enhancedDescription}`);
                              }
                            } catch (error) {
                              console.error('Error enhancing description:', error);
                            }
                          }}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          AI Enhance
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {activeTab === 'education' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education
                    </CardTitle>
                    <Button onClick={addEducation} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Education {education.indexOf(edu) + 1}</h4>
                        {education.length > 1 && (
                          <Button 
                            onClick={() => removeEducation(edu.id)}
                            size="sm" 
                            variant="ghost"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                       <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label>Institution</Label>
                           <Input
                             placeholder="University/School Name"
                             value={edu.institution}
                             onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Degree</Label>
                           <Input
                             placeholder="Degree & Major"
                             value={edu.degree}
                             onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                           />
                         </div>
                       </div>
                       
                       <div className="grid md:grid-cols-3 gap-4">
                         <div className="space-y-2">
                           <Label>Graduation Date</Label>
                           <Input
                             placeholder="MM/YYYY"
                             value={edu.graduationDate}
                             onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>CGPA/Percentage</Label>
                           <Input
                             placeholder="8.5 or 85%"
                             value={edu.cgpaOrPercentage || ''}
                             onChange={(e) => updateEducation(edu.id, 'cgpaOrPercentage', e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Type</Label>
                           <select
                             className="w-full p-2 border rounded-md bg-background"
                             value={edu.cgpaType || 'cgpa'}
                             onChange={(e) => updateEducation(edu.id, 'cgpaType', e.target.value)}
                           >
                             <option value="cgpa">CGPA</option>
                             <option value="percentage">Percentage</option>
                           </select>
                         </div>
                       </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Internships Section */}
            {activeTab === 'internships' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Internships
                    </CardTitle>
                    <Button onClick={addInternship} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Internship
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {internships.map((intern) => (
                    <div key={intern.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Internship {internships.indexOf(intern) + 1}</h4>
                        {internships.length > 1 && (
                          <Button 
                            onClick={() => removeInternship(intern.id)}
                            size="sm" 
                            variant="ghost"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            placeholder="Company Name"
                            value={intern.company}
                            onChange={(e) => updateInternship(intern.id, 'company', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input
                            placeholder="Intern Role"
                            value={intern.role}
                            onChange={(e) => updateInternship(intern.id, 'role', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            placeholder="MM/YYYY"
                            value={intern.startDate}
                            onChange={(e) => updateInternship(intern.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            placeholder="MM/YYYY or Present"
                            value={intern.endDate}
                            onChange={(e) => updateInternship(intern.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                          value={intern.description}
                          onChange={(e) => updateInternship(intern.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Achievements Section */}
            {activeTab === 'achievements' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Achievements
                    </CardTitle>
                    <Button onClick={addAchievement} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Achievement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Achievement {achievements.indexOf(achievement) + 1}</h4>
                        {achievements.length > 1 && (
                          <Button 
                            onClick={() => removeAchievement(achievement.id)}
                            size="sm" 
                            variant="ghost"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label>Title</Label>
                          <Input
                            placeholder="Achievement Title"
                            value={achievement.title}
                            onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            placeholder="MM/YYYY"
                            value={achievement.date || ''}
                            onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe your achievement..."
                          rows={3}
                          value={achievement.description}
                          onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Publications Section */}
            {activeTab === 'publications' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Publications
                    </CardTitle>
                    <Button onClick={addPublication} size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Publication
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {publications.map((publication, index) => (
                    <div key={publication.id} className="space-y-4 p-4 border rounded-lg relative">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Publication {index + 1}</h4>
                        <Button 
                          onClick={() => removePublication(publication.id)} 
                          size="sm" 
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Publication Title</Label>
                        <Input
                          placeholder="Research on Artificial Intelligence Applications"
                          value={publication.title}
                          onChange={(e) => updatePublication(publication.id, 'title', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Authors</Label>
                          <Input
                            placeholder="John Doe, Jane Smith"
                            value={publication.authors}
                            onChange={(e) => updatePublication(publication.id, 'authors', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Journal/Conference</Label>
                          <Input
                            placeholder="IEEE Computer Society"
                            value={publication.journal}
                            onChange={(e) => updatePublication(publication.id, 'journal', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Publication Year</Label>
                          <Input
                            placeholder="2023"
                            value={publication.year}
                            onChange={(e) => updatePublication(publication.id, 'year', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>DOI (Optional)</Label>
                          <Input
                            placeholder="10.1109/EXAMPLE.2023.123456"
                            value={publication.doi || ''}
                            onChange={(e) => updatePublication(publication.id, 'doi', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description (Optional)</Label>
                        <Textarea
                          placeholder="Brief description of the publication and its significance..."
                          rows={3}
                          value={publication.description || ''}
                          onChange={(e) => updatePublication(publication.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            {activeTab === 'projects' && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Projects
                    </CardTitle>
                    <Button onClick={addProject} size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={project.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        {projects.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Project Title</Label>
                          <Input
                            placeholder="E-commerce Website"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Technologies Used</Label>
                          <Input
                            placeholder="React, Node.js, MongoDB"
                            value={project.technologies}
                            onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={project.endDate}
                            onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Project URL (Optional)</Label>
                          <Input
                            placeholder="https://github.com/user/project"
                            value={project.projectUrl || ''}
                            onChange={(e) => updateProject(project.id, 'projectUrl', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe the project, your role, and key achievements..."
                          rows={3}
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Interests Section */}
            {activeTab === 'interests' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest..."
                      value={currentInterest}
                      onChange={(e) => setCurrentInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button onClick={addInterest}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeInterest(interest)}
                      >
                        {interest} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Templates Section */}
            {activeTab === 'templates' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Resume Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumeTemplateSelector 
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                  />
                </CardContent>
              </Card>
            )}

            {/* AI Assistant Section */}
            {activeTab === 'ai-assistant' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    AI Writing Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AIContentGenerator 
                    onSuggestionApply={handleAISuggestion}
                    currentRole={experiences[0]?.position}
                    currentCompany={experiences[0]?.company}
                  />
                </CardContent>
              </Card>
            )}

            {/* ATS Score Section */}
            {activeTab === 'ats-score' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    ATS Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ATSScorePanel 
                    personalInfo={personalInfo}
                    experiences={experiences}
                    education={education}
                    skills={skills}
                  />
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="hero" size="lg" onClick={downloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowFullPreview(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
            </div>
          </div>

          {/* Resume Preview & ATS Score */}
          <div className="space-y-6">
            <div className="resume-preview-content">
            <ResumePreview 
              personalInfo={personalInfo}
              experiences={experiences}
              education={education}
              skills={skills}
              internships={internships}
              achievements={achievements}
              interests={interests}
              projects={projects}
              publications={publications}
            />
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <Dialog open={showFullPreview} onOpenChange={setShowFullPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="resume-preview-description">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>
          <div id="resume-preview-description" className="sr-only">
            Full screen preview of your resume with all sections visible
          </div>
          <div className="mt-4">
            <ResumePreview 
              personalInfo={personalInfo}
              experiences={experiences}
              education={education}
              skills={skills}
              internships={internships}
              achievements={achievements}
              interests={interests}
              projects={projects}
              publications={publications}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ResumeBuilder;