import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Rocket, 
  Cog, 
  Lightbulb, 
  ShoppingCart, 
  GraduationCap,
  Wrench,
  Brain,
  Newspaper,
  HelpCircle,
  Users,
  Phone,
  Orbit
} from "lucide-react";

const QuantumNavigation = () => {
  const primaryPlanets = [
    {
      id: "makershop",
      title: "MakerShop",
      subtitle: "Arduino/PCB Galaxies",
      icon: Cpu,
      description: "3D rotatable Arduino boards, sensors, IoT kits with animated particle bursts",
      gradient: "gradient-nebula",
      delay: 0
    },
    {
      id: "infinite-studio",
      title: "Infinite Studio",
      subtitle: "Service Portals",
      icon: Wrench,
      description: "Custom fabrication, 3D printing, and prototype development services",
      gradient: "gradient-pcb",
      delay: 0.1
    },
    {
      id: "skyforge",
      title: "SkyForge",
      subtitle: "Aerospace eLearning",
      icon: Rocket,
      description: "Orbital mechanics simulator, rocket builder, MATLAB & SolidWorks courses",
      gradient: "gradient-void",
      delay: 0.2
    },
    {
      id: "project-nebula",
      title: "Project Nebula",
      subtitle: "Funded Ideas",
      icon: Lightbulb,
      description: "AI-assisted quotes, prototype tracking, and fundraising dashboard",
      gradient: "gradient-nebula",
      delay: 0.3
    }
  ];

  const secondaryPlanets = [
    {
      id: "rental-orbit",
      title: "Rental Orbit",
      subtitle: "Component Rental",
      icon: Orbit,
      description: "Live IoT inventory, satellite view availability, blockchain transparency"
    },
    {
      id: "articles-news",
      title: "Articles & News",
      subtitle: "Tech Updates",
      icon: Newspaper,
      description: "Admin-controlled articles, category filtering, newsletter signup"
    },
    {
      id: "faq-help",
      title: "FAQ & Help Station",
      subtitle: "Support Hub",
      icon: HelpCircle,
      description: "Smart Q&A suggestions, video explanations, user-submitted questions"
    },
    {
      id: "about-us",
      title: "About / Who We Are",
      subtitle: "Our Mission",
      icon: Users,
      description: "Founders & mission, team bios, office culture with video backgrounds"
    },
    {
      id: "contact-hq",
      title: "Contact HQ",
      subtitle: "Reach Out",
      icon: Phone,
      description: "Contact form, GPS maps, WhatsApp integration, office hours"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-space text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-nebula">ArcadeLabs</span> Navigation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our cosmic collection of components and modules across the universe
          </p>
        </motion.div>

        {/* Primary Planets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {primaryPlanets.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: item.delay }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden bg-card/20 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center quantum-glow"
                    >
                      <item.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    
                    <div>
                      <h3 className="font-space text-xl font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-accent font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    {item.id === "makershop" ? (
                      <Link to="/pcb-planet">
                        <Button 
                          variant="void" 
                          className="w-full group-hover:border-primary/60 transition-colors duration-300"
                        >
                          Explore
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            →
                          </motion.div>
                        </Button>
                      </Link>
                    ) : item.id === "infinite-studio" ? (
                      <Link to="/infinite-studio">
                        <Button 
                          variant="void" 
                          className="w-full group-hover:border-primary/60 transition-colors duration-300"
                        >
                          Explore
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            →
                          </motion.div>
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant="void" 
                        className="w-full group-hover:border-primary/60 transition-colors duration-300"
                      >
                        Explore
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          →
                        </motion.div>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Navigation Satellites */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <h3 className="font-space text-2xl font-semibold text-center mb-8">
            <span className="text-gradient-pcb">Orbital</span> Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {secondaryPlanets.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                {item.id === "articles-news" ? (
                  <Link to="/articles" className="block">
                    <div className="relative p-4 rounded-xl bg-card/30 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300">
                      <div className="text-center space-y-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-12 h-12 mx-auto rounded-xl bg-primary/20 flex items-center justify-center quantum-glow"
                        >
                          <item.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        
                        <div>
                          <h4 className="font-space text-sm font-semibold mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-accent font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </div>
                  </Link>
                ) : (
                  <Link to={`/${item.id.replace('-', '-')}`} className="block">
                    <div className="relative p-4 rounded-xl bg-card/30 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300">
                      <div className="text-center space-y-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-12 h-12 mx-auto rounded-xl bg-primary/20 flex items-center justify-center quantum-glow"
                        >
                          <item.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        
                        <div>
                          <h4 className="font-space text-sm font-semibold mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-accent font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Button variant="quantum" className="group">
            <Brain className="w-4 h-4 mr-2" />
            AI Assistant
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              <Cog className="w-4 h-4" />
            </motion.div>
          </Button>
          
          <Link to="/admin">
            <Button variant="cosmos">
              <GraduationCap className="w-4 h-4 mr-2" />
              Admin Portal
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantumNavigation;