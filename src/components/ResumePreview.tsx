import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, Github, Linkedin } from "lucide-react";

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

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  internships: Internship[];
  achievements: Achievement[];
  interests: string[];
  projects: Project[];
  publications: Publication[];
  selectedTemplate?: string;
}

const ResumePreview = ({ 
  personalInfo, 
  experiences, 
  education, 
  skills,
  internships,
  achievements,
  interests,
  projects,
  publications,
  selectedTemplate = 'vertical-modern'
}: ResumePreviewProps) => {
  
  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'vertical-modern':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden",
          header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8",
          content: "p-8 space-y-6",
          sectionTitle: "text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-2"
        };
      case 'vertical-elegant':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden",
          header: "bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8",
          content: "p-8 space-y-6",
          sectionTitle: "text-xl font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2"
        };
      case 'vertical-creative':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden",
          header: "bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8",
          content: "p-8 space-y-6",
          sectionTitle: "text-xl font-semibold text-teal-600 mb-3 border-b border-teal-200 pb-2"
        };
      case 'horizontal-classic':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden border-l-4 border-blue-600",
          header: "bg-gray-50 text-gray-900 p-8 border-b border-gray-200",
          content: "flex gap-8 p-8",
          sectionTitle: "text-lg font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-2"
        };
      case 'horizontal-modern':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden border-l-4 border-green-600",
          header: "bg-gradient-to-r from-gray-50 to-white text-gray-900 p-8 border-b border-gray-200",
          content: "flex gap-8 p-8",
          sectionTitle: "text-lg font-semibold text-green-600 mb-3 border-b border-green-200 pb-2"
        };
      case 'horizontal-minimal':
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden border border-gray-200",
          header: "bg-white text-gray-900 p-8 border-b border-gray-200",
          content: "flex gap-8 p-8",
          sectionTitle: "text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2"
        };
      default:
        return {
          container: "shadow-elegant min-h-[800px] overflow-hidden",
          header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8",
          content: "p-8 space-y-6",
          sectionTitle: "text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-2"
        };
    }
  };

  const styles = getTemplateStyles();
  const isHorizontal = selectedTemplate?.includes('horizontal');

  return (
    <Card id="resume-preview" className={styles.container}>
      <CardContent className="p-0">
        {/* Resume Header */}
        <div className={`${styles.header} flex items-start gap-6`}>
          {personalInfo.profileImage && (
            <img 
              src={personalInfo.profileImage} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm opacity-90 mb-3">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </div>
              )}
            </div>
            
            {(personalInfo.linkedinUrl || personalInfo.githubUrl) && (
              <div className="flex flex-wrap gap-4 text-sm">
                {personalInfo.linkedinUrl && (
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>
          {isHorizontal ? (
            <>
              {/* Left Column */}
              <div className="w-1/3 space-y-6">
                {/* Skills */}
                {skills.length > 0 && (
                  <section>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {education.some(edu => edu.institution || edu.degree) && (
                  <section>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    <div className="space-y-3">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-1">
                          {edu.degree && (
                            <h3 className="font-semibold text-foreground text-sm">{edu.degree}</h3>
                          )}
                          {edu.institution && (
                            <div className="text-sm">
                              <p className="text-primary font-medium">{edu.institution}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {edu.graduationDate && (
                                  <span>{edu.graduationDate}</span>
                                )}
                                {edu.cgpaOrPercentage && (
                                  <span>
                                    {edu.cgpaType === 'percentage' ? `${edu.cgpaOrPercentage}%` : `CGPA: ${edu.cgpaOrPercentage}`}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Interests */}
                {interests.length > 0 && (
                  <section>
                    <h2 className={styles.sectionTitle}>Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-muted-foreground text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column */}
              <div className="w-2/3 space-y-6">
                {/* Professional Summary */}
                {personalInfo.summary && (
                  <section>
                    <h2 className={styles.sectionTitle}>Professional Summary</h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {personalInfo.summary}
                    </p>
                  </section>
                )}

                {/* Experience */}
                {experiences.some(exp => exp.company || exp.position) && (
                  <section>
                    <h2 className={styles.sectionTitle}>Professional Experience</h2>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="space-y-2">
                          {exp.position && (
                            <h3 className="font-semibold text-foreground text-sm">
                              {exp.position}
                            </h3>
                          )}
                          {exp.company && (
                            <div className="flex items-center justify-between">
                              <p className="text-primary font-medium text-sm">{exp.company}</p>
                              {(exp.startDate || exp.endDate) && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {exp.startDate} - {exp.endDate || "Present"}
                                </div>
                              )}
                            </div>
                          )}
                          {exp.description && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects */}
                {projects.some(proj => proj.title || proj.description) && (
                  <section>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          {proj.title && (
                            <h3 className="font-semibold text-foreground text-sm">{proj.title}</h3>
                          )}
                          {proj.technologies && (
                            <p className="text-primary font-medium text-xs">Technologies: {proj.technologies}</p>
                          )}
                          {proj.description && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {proj.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Publications */}
                {publications.some(pub => pub.title || pub.authors) && (
                  <section>
                    <h2 className={styles.sectionTitle}>Publications</h2>
                    <div className="space-y-3">
                      {publications.map((pub) => (
                        <div key={pub.id} className="space-y-1">
                          {pub.title && (
                            <h3 className="font-medium text-foreground text-sm">{pub.title}</h3>
                          )}
                          {pub.authors && (
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Authors: </span>{pub.authors}
                            </p>
                          )}
                          {pub.journal && pub.year && (
                            <p className="text-xs text-muted-foreground">
                              {pub.journal} ({pub.year})
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Vertical Layout */}
              {/* Professional Summary */}
              {personalInfo.summary && (
                <section>
                  <h2 className={styles.sectionTitle}>Professional Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <h2 className={styles.sectionTitle}>Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience */}
              {experiences.some(exp => exp.company || exp.position) && (
                <section>
                  <h2 className={styles.sectionTitle}>Professional Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    {exp.position && (
                      <h3 className="font-semibold text-foreground">
                        {exp.position}
                      </h3>
                    )}
                    {exp.company && (
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-medium">{exp.company}</p>
                        {(exp.startDate || exp.endDate) && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {exp.startDate} - {exp.endDate || "Present"}
                          </div>
                        )}
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Education */}
              {education.some(edu => edu.institution || edu.degree) && (
                <section>
                  <h2 className={styles.sectionTitle}>Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    {edu.degree && (
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    )}
                    {edu.institution && (
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-medium">{edu.institution}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {edu.graduationDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {edu.graduationDate}
                            </div>
                          )}
                          {edu.cgpaOrPercentage && (
                            <span>
                              {edu.cgpaType === 'percentage' ? `${edu.cgpaOrPercentage}%` : `CGPA: ${edu.cgpaOrPercentage}`}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Internships */}
              {internships.some(intern => intern.company || intern.role) && (
                <section>
                  <h2 className={styles.sectionTitle}>Internships</h2>
              <div className="space-y-4">
                {internships.map((intern) => (
                  <div key={intern.id} className="space-y-2">
                    {intern.role && (
                      <h3 className="font-semibold text-foreground">
                        {intern.role}
                      </h3>
                    )}
                    {intern.company && (
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-medium">{intern.company}</p>
                        {(intern.startDate || intern.endDate) && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {intern.startDate} - {intern.endDate || "Present"}
                          </div>
                        )}
                      </div>
                    )}
                    {intern.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {intern.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Projects */}
              {projects.some(proj => proj.title || proj.description) && (
                <section>
                  <h2 className={styles.sectionTitle}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-2">
                    {proj.title && (
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{proj.title}</h3>
                        {(proj.startDate || proj.endDate) && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {proj.startDate} - {proj.endDate || "Present"}
                          </div>
                        )}
                      </div>
                    )}
                    {proj.technologies && (
                      <p className="text-primary font-medium text-sm">Technologies: {proj.technologies}</p>
                    )}
                    {proj.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                    {proj.projectUrl && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">URL: </span>
                        <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {proj.projectUrl}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Publications */}
              {publications.some(pub => pub.title || pub.authors) && (
                <section>
                  <h2 className={styles.sectionTitle}>Publications</h2>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="space-y-2">
                    {pub.title && (
                      <h3 className="font-medium text-foreground">{pub.title}</h3>
                    )}
                    {pub.authors && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Authors: </span>{pub.authors}
                      </p>
                    )}
                    {pub.journal && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Published in: </span>{pub.journal}
                      </p>
                    )}
                    {pub.year && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Year: </span>{pub.year}
                      </p>
                    )}
                    {pub.doi && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">DOI: </span>
                        <span className="text-primary">{pub.doi}</span>
                      </p>
                    )}
                    {pub.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pub.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Achievements */}
              {achievements.some(ach => ach.title || ach.description) && (
                <section>
                  <h2 className={styles.sectionTitle}>Achievements</h2>
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div key={ach.id} className="space-y-1">
                    {ach.title && (
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{ach.title}</h3>
                        {ach.date && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {ach.date}
                          </div>
                        )}
                      </div>
                    )}
                    {ach.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
                </section>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <section>
                  <h2 className={styles.sectionTitle}>Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="text-muted-foreground">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;