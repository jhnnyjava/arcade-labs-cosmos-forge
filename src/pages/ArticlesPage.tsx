import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

const ArticlesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Enhanced articles data with more content
  const articles = [
    {
      id: 1,
      title: "The Future of Arduino in IoT Development",
      excerpt: "Exploring how Arduino boards are revolutionizing Internet of Things applications with cutting-edge sensor integration and wireless connectivity solutions.",
      author: "ArcadeLabs Team",
      date: "2024-01-15",
      category: "IoT",
      readTime: "5 min",
      tags: ["Arduino", "IoT", "Sensors"]
    },
    {
      id: 2,
      title: "3D Printing Materials: A Comprehensive Guide",
      excerpt: "Understanding different filament types and their applications in rapid prototyping, from PLA basics to advanced composite materials.",
      author: "Tech Writer",
      date: "2024-01-10",
      category: "3D Printing",
      readTime: "8 min",
      tags: ["3D Printing", "Materials", "Guide"]
    },
    {
      id: 3,
      title: "PCB Design Best Practices for Beginners",
      excerpt: "Essential tips and tricks for designing your first printed circuit board, covering layout principles and common pitfalls to avoid.",
      author: "Hardware Expert",
      date: "2024-01-05",
      category: "PCB Design",
      readTime: "6 min",
      tags: ["PCB", "Design", "Tutorial"]
    },
    {
      id: 4,
      title: "Arduino Projects: From Beginner to Advanced",
      excerpt: "A step-by-step journey through Arduino programming, from blinking LEDs to complex automation systems and robotics projects.",
      author: "Code Master",
      date: "2024-01-12",
      category: "Arduino",
      readTime: "10 min",
      tags: ["Arduino", "Programming", "Projects"]
    },
    {
      id: 5,
      title: "Complete Tutorial: Building Your First Robot",
      excerpt: "Learn robotics fundamentals with this comprehensive tutorial covering mechanics, electronics, and programming for beginners.",
      author: "Robotics Pro",
      date: "2024-01-08",
      category: "Tutorials",
      readTime: "15 min",
      tags: ["Robotics", "Tutorial", "Beginner"]
    },
    {
      id: 6,
      title: "IoT Security: Protecting Your Connected Devices",
      excerpt: "Essential security practices for IoT development, including encryption, authentication, and secure communication protocols.",
      author: "Security Expert",
      date: "2024-01-20",
      category: "IoT",
      readTime: "7 min",
      tags: ["IoT", "Security", "Best Practices"]
    }
  ];

  const categories = ["All", "IoT", "3D Printing", "PCB Design", "Arduino", "Tutorials"];

  // Filter articles based on active filter
  const filteredArticles = activeFilter === "All" 
    ? articles 
    : articles.filter(article => article.category === activeFilter);

  const handleReadArticle = (articleTitle: string) => {
    alert(`Coming soon: ${articleTitle}`);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-nebula">Articles</span> & News
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest in technology, tutorials, and insights from the ArcadeLabs community
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "cosmos" : "outline"}
              size="sm"
              className="rounded-full hover:scale-105 transition-all duration-200"
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Articles Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            {activeFilter !== "All" && ` in ${activeFilter}`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="group hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer backdrop-blur-sm bg-card/95"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-lg leading-tight">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Author and Date */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Read Article Button */}
                <Button 
                  variant="quantum" 
                  size="sm"
                  className="w-full group-hover:shadow-md transition-all duration-200"
                  onClick={() => handleReadArticle(article.title)}
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Articles Message */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found in the {activeFilter} category.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter("All")}
              className="mt-4"
            >
              Show All Articles
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Stay in the Loop</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest articles and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticlesPage;