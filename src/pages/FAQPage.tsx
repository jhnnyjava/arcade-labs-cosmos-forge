import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Send, HelpCircle, MessageSquare, Clock, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface UserQuestion {
  id: string;
  question: string;
  email: string;
  category: string;
  status: 'pending' | 'answered' | 'resolved';
  submittedAt: string;
  answer?: string;
}

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I get started with Arduino programming?",
    answer: "Start with the Arduino IDE, connect your board, and try the basic 'Blink' example. Our tutorials cover everything from setup to advanced projects.",
    category: "Arduino",
    helpful: 45
  },
  {
    id: "2",
    question: "What's included in the rental packages?",
    answer: "All rental packages include the main component, necessary cables, basic documentation, and access to our online tutorials. Some packages also include breadboards and jumper wires.",
    category: "Rental",
    helpful: 32
  },
  {
    id: "3",
    question: "How long does 3D printing take?",
    answer: "Print times vary based on size and complexity. Small parts take 1-2 hours, while larger projects can take 8-24 hours. We provide time estimates before starting.",
    category: "3D Printing",
    helpful: 28
  },
  {
    id: "4",
    question: "Can I modify PCB designs after ordering?",
    answer: "Minor modifications are possible within 24 hours of ordering. Major changes require a new order. Contact our team immediately if changes are needed.",
    category: "PCB Design",
    helpful: 19
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, bank transfers, and select cryptocurrencies. Payment is processed securely through our payment partners.",
    category: "Payment",
    helpful: 41
  }
];

const FAQPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userQuestion, setUserQuestion] = useState({
    question: "",
    email: "",
    category: "General"
  });
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);

  const categories = ["All", "Arduino", "Rental", "3D Printing", "PCB Design", "Payment", "General"];

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuestionSubmit = () => {
    if (!userQuestion.question.trim() || !userQuestion.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your question and email address.",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: UserQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      question: userQuestion.question,
      email: userQuestion.email,
      category: userQuestion.category,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setUserQuestions(prev => [...prev, newQuestion]);
    
    // Store in localStorage for admin access
    const existingQuestions = JSON.parse(localStorage.getItem('arcadeLabs_questions') || '[]');
    localStorage.setItem('arcadeLabs_questions', JSON.stringify([...existingQuestions, newQuestion]));

    toast({
      title: "Question Submitted!",
      description: "Thank you for your question. Our team will respond within 24 hours.",
    });

    setUserQuestion({ question: "", email: "", category: "General" });
  };

  const handleHelpful = (faqId: string) => {
    toast({
      title: "Thank you!",
      description: "Your feedback helps us improve our documentation.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-nebula">FAQ &</span> Help Station
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or submit your own. Our community-driven support system is here to help.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "quantum" : "void"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-space text-2xl font-semibold mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-primary" />
              Frequently Asked Questions
            </h2>
            
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem 
                      value={faq.id}
                      className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <div className="flex items-start justify-between w-full pr-4">
                          <span className="font-medium">{faq.question}</span>
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            {faq.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-border/30">
                            <span className="text-sm text-muted-foreground">
                              {faq.helpful} people found this helpful
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleHelpful(faq.id)}
                              className="text-primary hover:text-primary/80"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            ) : (
              <Card className="p-8 text-center bg-card/30 backdrop-blur-sm">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No matching questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter, or submit a new question below.
                </p>
              </Card>
            )}
          </motion.div>

          {/* Submit Question */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Submit a Question
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Ask our expert team directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userQuestion.email}
                    onChange={(e) => setUserQuestion(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    value={userQuestion.category}
                    onChange={(e) => setUserQuestion(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 rounded-md bg-background/50 border border-border/50 focus:border-primary/50 outline-none"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Describe your question in detail..."
                    value={userQuestion.question}
                    onChange={(e) => setUserQuestion(prev => ({ ...prev, question: e.target.value }))}
                    className="min-h-[120px] bg-background/50"
                  />
                </div>
                
                <Button 
                  onClick={handleQuestionSubmit}
                  className="w-full"
                  variant="quantum"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Question
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="text-center p-6 bg-card/20 backdrop-blur-sm border-border/50">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{mockFAQs.length}</h3>
              <p className="text-sm text-muted-foreground">FAQ Articles</p>
            </Card>
            
            <Card className="text-center p-6 bg-card/20 backdrop-blur-sm border-border/50">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">24h</h3>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </Card>
            
            <Card className="text-center p-6 bg-card/20 backdrop-blur-sm border-border/50">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;