import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/professional-hero-image.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleStartBuilding = () => {
    if (user) {
      const builderSection = document.getElementById('resume-builder');
      builderSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/auth?mode=signup');
    }
  };

  const handleViewTemplates = () => {
    navigate('/templates');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left animate-fade-in">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full border bg-muted/50 text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              AI-Powered Resume Builder
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Create Your 
              <span className="block text-gradient-hero">Perfect Resume</span>
              in Minutes
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
              Build professional resumes with AI-powered suggestions, ATS optimization, 
              and real-time feedback. Stand out from the crowd with our intelligent resume builder.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleStartBuilding}
                className="group"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="xl" onClick={handleViewTemplates}>
                <FileText className="w-5 h-5" />
                View Templates
              </Button>
            </div>
            
            {/* Features list */}
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                'AI Content Suggestions',
                'ATS Optimization',
                'Multiple Templates'
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Professional Resume Builder Interface"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-2 rounded-lg shadow-card animate-glow">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">ATS Optimized</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-2 rounded-lg shadow-card animate-glow">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;