import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  Rocket, 
  Cog, 
  Lightbulb, 
  ShoppingCart, 
  GraduationCap,
  Wrench,
  Brain 
} from "lucide-react";

const QuantumNavigation = () => {
  const navigationItems = [
    {
      id: "makershop",
      title: "MakerShop",
      subtitle: "Arduino/PCB Galaxies",
      icon: Cpu,
      description: "Explore our cosmic collection of development boards, sensors, and components",
      gradient: "gradient-nebula",
      delay: 0
    },
    {
      id: "skyforge",
      title: "SkyForge",
      subtitle: "Aerospace eLearning",
      icon: Rocket,
      description: "Interactive orbital mechanics and aerospace engineering simulations",
      gradient: "gradient-pcb",
      delay: 0.1
    },
    {
      id: "infinite-studio",
      title: "Infinite Studio",
      subtitle: "Service Portals",
      icon: Wrench,
      description: "Custom fabrication, 3D printing, and prototype development services",
      gradient: "gradient-void",
      delay: 0.2
    },
    {
      id: "idea-nebula",
      title: "Idea Nebula",
      subtitle: "Project Incubator",
      icon: Lightbulb,
      description: "Collaborative space for innovation and project development",
      gradient: "gradient-nebula",
      delay: 0.3
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
            <span className="text-gradient-nebula">Neurospark</span> Navigation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover-triggered quantum animations reveal infinite possibilities across our universe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item, index) => (
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
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <Button variant="cosmos" className="group">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Rental Fleet
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              <Cog className="w-4 h-4" />
            </motion.div>
          </Button>
          
          <Button variant="orbit">
            <GraduationCap className="w-4 h-4 mr-2" />
            Learning Orbits
          </Button>
          
          <Button variant="quantum">
            <Brain className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantumNavigation;