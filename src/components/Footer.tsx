import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Resume for freshers</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Build professional resumes with AI-powered suggestions and ATS optimization. 
              Land your dream job faster.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start px-0 h-auto">
                  <a href="#" className="text-sm">Terms & Conditions</a>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start px-0 h-auto">
                  <a href="#" className="text-sm">Privacy Policy</a>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start px-0 h-auto">
                  <a href="#" className="text-sm">Refund Policy</a>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start px-0 h-auto">
                  <a href="#" className="text-sm">Contact Us</a>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start px-0 h-auto">
                  <a href="#" className="text-sm">About Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 <a href="https://fresheresume.com" className="hover:text-primary transition-colors">fresheresume.com</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;