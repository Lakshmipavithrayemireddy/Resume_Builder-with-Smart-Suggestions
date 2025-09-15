import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette,
  Crown,
  Briefcase,
  Zap,
  Star,
  CheckCircle
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  isPopular: boolean;
  description: string;
  preview: string;
  features: string[];
}

interface ResumeTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const ResumeTemplateSelector = ({ selectedTemplate, onTemplateSelect }: ResumeTemplateSelectorProps) => {
  const templates: Template[] = [
    {
      id: 'vertical-modern',
      name: 'Vertical Modern',
      category: 'Vertical',
      isPremium: false,
      isPopular: true,
      description: 'Clean vertical layout with blue accent header',
      preview: 'bg-gradient-to-b from-blue-600 to-blue-700 text-white',
      features: ['ATS-Friendly', 'Vertical Layout', 'Professional Header']
    },
    {
      id: 'vertical-elegant',
      name: 'Vertical Elegant',
      category: 'Vertical',
      isPremium: true,
      isPopular: false,
      description: 'Sophisticated vertical design with dark theme',
      preview: 'bg-gradient-to-b from-slate-800 to-slate-900 text-white',
      features: ['Dark Theme', 'Elegant Typography', 'Executive Style']
    },
    {
      id: 'vertical-creative',
      name: 'Vertical Creative',
      category: 'Vertical',
      isPremium: false,
      isPopular: false,
      description: 'Creative vertical layout with teal accents',
      preview: 'bg-gradient-to-b from-teal-600 to-teal-700 text-white',
      features: ['Creative Design', 'Teal Accent', 'Portfolio Friendly']
    },
    {
      id: 'horizontal-classic',
      name: 'Horizontal Classic',
      category: 'Horizontal',
      isPremium: false,
      isPopular: true,
      description: 'Traditional horizontal layout with clean typography',
      preview: 'bg-white border-l-4 border-blue-600',
      features: ['Classic Layout', 'Horizontal Format', 'Traditional Style']
    },
    {
      id: 'horizontal-modern',
      name: 'Horizontal Modern',
      category: 'Horizontal',
      isPremium: true,
      isPopular: false,
      description: 'Modern horizontal design with sidebar accent',
      preview: 'bg-gradient-to-r from-gray-50 to-white border-l-4 border-green-600',
      features: ['Modern Design', 'Sidebar Accent', 'Professional Layout']
    },
    {
      id: 'horizontal-minimal',
      name: 'Horizontal Minimal',
      category: 'Horizontal',
      isPremium: false,
      isPopular: false,
      description: 'Ultra-clean horizontal layout focusing on content',
      preview: 'bg-white border border-gray-200',
      features: ['Minimal Design', 'Content Focus', 'Clean Typography']
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Your Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a professional template that matches your industry and style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-card'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardContent className="p-4">
              {/* Template Preview */}
              <div className={`h-40 rounded-lg mb-3 ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                {template.category === 'Vertical' ? (
                  <div className="w-full h-full p-3 text-xs">
                    {/* Vertical Layout Preview */}
                    <div className="bg-white/20 h-4 rounded mb-2"></div>
                    <div className="bg-white/15 h-2 rounded mb-1 w-3/4"></div>
                    <div className="bg-white/15 h-2 rounded mb-3 w-2/3"></div>
                    
                    <div className="bg-white/10 h-1 rounded mb-1"></div>
                    <div className="bg-white/10 h-1 rounded mb-1 w-5/6"></div>
                    <div className="bg-white/10 h-1 rounded mb-2 w-4/5"></div>
                    
                    <div className="bg-white/10 h-1 rounded mb-1"></div>
                    <div className="bg-white/10 h-1 rounded mb-1 w-3/4"></div>
                    <div className="bg-white/10 h-1 rounded w-2/3"></div>
                  </div>
                ) : (
                  <div className="w-full h-full p-3 text-xs flex">
                    {/* Horizontal Layout Preview */}
                    <div className="w-1/3 pr-2">
                      <div className="bg-current/15 h-3 rounded mb-2"></div>
                      <div className="bg-current/10 h-1 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded mb-1 w-3/4"></div>
                      <div className="bg-current/10 h-1 rounded mb-2 w-2/3"></div>
                      
                      <div className="bg-current/10 h-1 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded w-5/6"></div>
                    </div>
                    <div className="w-2/3 pl-2">
                      <div className="bg-current/15 h-2 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded mb-2 w-4/5"></div>
                      
                      <div className="bg-current/10 h-1 rounded mb-1"></div>
                      <div className="bg-current/10 h-1 rounded mb-1 w-3/4"></div>
                      <div className="bg-current/10 h-1 rounded w-5/6"></div>
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {template.isPopular && (
                    <Badge variant="default" className="bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {template.isPremium && (
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>

                {/* Selected Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute bottom-2 right-2">
                    <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{template.name}</h4>
                  <Badge variant="secondary">
                    {template.category}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 justify-center">
        <Button variant="outline" size="sm">
          <Palette className="w-4 h-4 mr-2" />
          Customize Colors
        </Button>
        <Button variant="outline" size="sm">
          <Briefcase className="w-4 h-4 mr-2" />
          Industry Specific
        </Button>
        <Button variant="hero" size="sm">
          <Zap className="w-4 h-4 mr-2" />
          Unlock All Templates
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplateSelector;