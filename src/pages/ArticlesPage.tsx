import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const ArticlesPage = () => {
  // Placeholder articles data
  const articles = [
    {
      id: 1,
      title: "The Future of Arduino in IoT Development",
      excerpt: "Exploring how Arduino boards are revolutionizing Internet of Things applications...",
      author: "ArcadeLabs Team",
      date: "2024-01-15",
      category: "IoT",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "3D Printing Materials: A Comprehensive Guide",
      excerpt: "Understanding different filament types and their applications in rapid prototyping...",
      author: "Tech Writer",
      date: "2024-01-10",
      category: "3D Printing",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "PCB Design Best Practices for Beginners",
      excerpt: "Essential tips and tricks for designing your first printed circuit board...",
      author: "Hardware Expert",
      date: "2024-01-05",
      category: "PCB Design",
      readTime: "6 min"
    }
  ];

  const categories = ["All", "IoT", "3D Printing", "PCB Design", "Arduino", "Tutorials"];

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
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <Card key={article.id} className="group hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full group-hover:bg-primary/10 transition-colors">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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