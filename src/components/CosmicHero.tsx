import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Rocket, Cpu, Orbit, Zap } from "lucide-react";
import heroImage from "@/assets/hero-cosmos.jpg";

const CosmicHero = () => {
  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-primary opacity-20"
      >
        <Cpu size={48} />
      </motion.div>
      
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-32 right-16 text-secondary opacity-25"
      >
        <Rocket size={36} />
      </motion.div>
      
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute bottom-32 left-20 text-accent opacity-20"
      >
        <Orbit size={42} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-md border border-primary/30 text-sm font-medium">
            <Zap className="w-4 h-4 text-primary" />
            Quantum Tech Forge
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-32 h-32 mb-6 relative">
            <img 
              src="/lovable-uploads/9ef821c3-6609-422d-a30b-438f7ca5c576.png" 
              alt="ArcadeLabs Logo" 
              className="w-full h-full object-contain quantum-glow"
            />
          </div>
          
          <h1 className="font-space text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-center">
            <span className="text-gradient-nebula">ArcadeLabs</span>
            <br />
            <span className="text-foreground">Universe</span>
          </h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-gradient-pcb font-semibold">Human-Level Intelligence</span> meets quantum fabrication. 
          Navigate orbital stations, design in 3D space, and launch your innovations from Nairobi to the cosmos.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button variant="quantum" size="hero" className="group">
            Enter the Cosmos
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-5 h-5 ml-2 group-hover:animate-pulse" />
            </motion.div>
          </Button>
          
          <Button variant="cosmos" size="hero">
            Explore Labs
            <Cpu className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-nebula">∞</div>
            <div className="text-sm text-muted-foreground">Projects Forged</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-pcb">24/7</div>
            <div className="text-sm text-muted-foreground">Lab Access</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">AI</div>
            <div className="text-sm text-muted-foreground">Assisted Design</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">3D</div>
            <div className="text-sm text-muted-foreground">Printing</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default CosmicHero;