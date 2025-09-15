import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Crown, CheckCircle, Palette, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const templates: Template[] = [
    // Horizontal Templates
    {
      id: 'horizontal-modern',
      name: 'Horizontal Modern',
      category: 'Horizontal',
      isPremium: false,
      isPopular: true,
      description: 'Wide layout with side panel for contact and skills',
      preview: 'bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200',
      features: ['Wide Layout', 'Side Panel', 'Contact Focus']
    },
    {
      id: 'horizontal-executive',
      name: 'Horizontal Executive',
      category: 'Horizontal',
      isPremium: true,
      isPopular: false,
      description: 'Executive horizontal layout with professional styling',
      preview: 'bg-gradient-to-r from-slate-800 to-slate-600 text-white',
      features: ['Executive Style', 'Horizontal Flow', 'Premium Design']
    },
    {
      id: 'horizontal-creative',
      name: 'Horizontal Creative',
      category: 'Horizontal',
      isPremium: false,
      isPopular: false,
      description: 'Creative horizontal template with visual elements',
      preview: 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200',
      features: ['Creative Layout', 'Visual Elements', 'Color Accents']
    },
    
    // Vertical Templates
    {
      id: 'vertical-classic',
      name: 'Vertical Classic',
      category: 'Vertical',
      isPremium: false,
      isPopular: true,
      description: 'Traditional vertical resume layout, clean and professional',
      preview: 'bg-white border-2 border-gray-300',
      features: ['Traditional Layout', 'Clean Design', 'Professional']
    },
    {
      id: 'vertical-modern',
      name: 'Vertical Modern',
      category: 'Vertical',
      isPremium: true,
      isPopular: true,
      description: 'Modern vertical design with contemporary styling',
      preview: 'bg-gradient-to-b from-indigo-50 to-white border-2 border-indigo-200',
      features: ['Modern Style', 'Contemporary', 'Vertical Flow']
    },
    {
      id: 'vertical-minimal',
      name: 'Vertical Minimal',
      category: 'Vertical',
      isPremium: false,
      isPopular: false,
      description: 'Minimalist vertical template focusing on content',
      preview: 'bg-gray-50 border-2 border-gray-200',
      features: ['Minimal Design', 'Content Focus', 'Simple Layout']
    }
  ];

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (templateId: string) => {
    navigate(`/?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Builder
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Resume Templates</h1>
              <p className="text-muted-foreground">Choose from our professionally designed templates</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-lg group"
            >
              <CardContent className="p-6">
                {/* Template Preview */}
                <div className={`h-48 rounded-lg mb-4 ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                  {template.category === 'Horizontal' ? (
                    // Horizontal Layout Preview
                    <div className="flex w-full h-full p-3 gap-2">
                      <div className="w-1/3 space-y-2">
                        <div className="w-full h-4 bg-black/20 rounded"></div>
                        <div className="w-2/3 h-2 bg-black/15 rounded"></div>
                        <div className="space-y-1 mt-3">
                          <div className="w-full h-1 bg-black/10 rounded"></div>
                          <div className="w-3/4 h-1 bg-black/10 rounded"></div>
                          <div className="w-2/3 h-1 bg-black/10 rounded"></div>
                        </div>
                      </div>
                      <div className="w-2/3 space-y-2 pl-2">
                        <div className="w-3/4 h-3 bg-black/20 rounded"></div>
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-black/15 rounded"></div>
                          <div className="w-5/6 h-1 bg-black/15 rounded"></div>
                          <div className="w-4/5 h-1 bg-black/15 rounded"></div>
                        </div>
                        <div className="w-2/3 h-2 bg-black/20 rounded mt-3"></div>
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-black/10 rounded"></div>
                          <div className="w-3/4 h-1 bg-black/10 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Vertical Layout Preview
                    <div className="text-center p-4 w-full">
                      <div className="w-full h-3 bg-black/30 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-black/30 rounded mb-2 mx-auto"></div>
                      <div className="w-full h-2 bg-black/20 rounded mb-3"></div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="h-2 bg-black/20 rounded"></div>
                        <div className="h-2 bg-black/20 rounded"></div>
                      </div>
                      <div className="w-full h-1 bg-black/15 rounded mb-1"></div>
                      <div className="w-2/3 h-1 bg-black/15 rounded mx-auto"></div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
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
                </div>

                {/* Template Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-hero rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-2">Need a Custom Template?</h2>
          <p className="mb-4">Our AI can create a personalized template based on your industry and preferences</p>
          <Button variant="secondary" size="lg">
            <Palette className="w-5 h-5 mr-2" />
            Create Custom Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;