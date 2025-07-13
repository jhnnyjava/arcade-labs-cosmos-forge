import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Home, 
  Cpu, 
  Rocket, 
  Wrench, 
  Lightbulb, 
  Orbit,
  Newspaper,
  HelpCircle,
  Users,
  Phone
} from "lucide-react";

const Navigation = () => {
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/makershop", label: "MakerShop", icon: Cpu },
    { path: "/infinite-studio", label: "Infinite Studio", icon: Wrench },
    { path: "/skyforge", label: "SkyForge", icon: Rocket },
    { path: "/project-nebula", label: "Project Nebula", icon: Lightbulb },
    { path: "/rental-orbit", label: "Rental Orbit", icon: Orbit },
    { path: "/articles", label: "Articles", icon: Newspaper },
    { path: "/faq", label: "FAQ", icon: HelpCircle },
    { path: "/about", label: "About", icon: Users },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <img 
                src="/lovable-uploads/9ef821c3-6609-422d-a30b-438f7ca5c576.png" 
                alt="ArcadeLabs Logo" 
                className="w-full h-full object-contain quantum-glow"
              />
            </div>
            <span className="font-space text-xl font-bold text-gradient-nebula">
              ArcadeLabs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 5).map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="quantum" size="sm" asChild>
              <Link to="/pcb-planet">Launch PCB Studio</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;