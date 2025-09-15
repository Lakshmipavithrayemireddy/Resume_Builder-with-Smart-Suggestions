import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  FileText, 
  ClipboardList, 
  Wrench, 
  MoreHorizontal,
  Bot,
  Target,
  Zap,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const scrollToBuilder = () => {
    const builderSection = document.getElementById('resume-builder');
    builderSection?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Resume for freshers</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  onClick={scrollToBuilder}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  AI Resume Builder
                </NavigationMenuLink>
              </NavigationMenuItem>


              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Wrench className="w-4 h-4 mr-2" />
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-primary p-6 no-underline outline-none focus:shadow-md">
                          <Bot className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            AI Tools
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Enhance your resume with AI-powered suggestions and optimization.
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink>
                      <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                        <Target className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">ATS Optimization</div>
                          <div className="text-xs text-muted-foreground">Beat applicant tracking systems</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Content Generator</div>
                          <div className="text-xs text-muted-foreground">AI-powered resume content</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <NavigationMenuLink>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Templates</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Professional resume templates
                        </p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Support</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Help center and documentation
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth?mode=signin')}>
                  Log in
                </Button>
                <Button variant="default" size="sm" className="bg-gradient-hero hover:opacity-90" onClick={() => navigate('/auth?mode=signup')}>
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={scrollToBuilder}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  AI Resume Builder
                </Button>
                <Button variant="ghost" className="justify-start">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Job Application Tracker
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Wrench className="w-4 h-4 mr-2" />
                  Tools
                </Button>
                <Button variant="ghost" className="justify-start">
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  More
                </Button>
                
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {user ? (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground px-3">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </div>
                      <Button variant="ghost" size="sm" onClick={signOut}>
                        Sign out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/auth?mode=signin')}>
                        Log in
                      </Button>
                      <Button variant="default" size="sm" className="bg-gradient-hero hover:opacity-90" onClick={() => navigate('/auth?mode=signup')}>
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;