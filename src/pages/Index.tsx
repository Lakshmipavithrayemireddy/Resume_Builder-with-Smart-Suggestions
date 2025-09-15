import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ResumeBuilder from "@/components/ResumeBuilder";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const templateId = searchParams.get('template');

  useEffect(() => {
    if (templateId && user) {
      // Scroll to resume builder when coming from templates with a selected template
      setTimeout(() => {
        const builderSection = document.getElementById('resume-builder');
        builderSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [templateId, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {user && <ResumeBuilder />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
