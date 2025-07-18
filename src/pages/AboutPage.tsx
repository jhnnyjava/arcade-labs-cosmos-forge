import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, MapPin, Users, Rocket, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Passionate about democratizing access to electronics and fostering innovation in the maker community. 10+ years in hardware design.",
    image: "/placeholder.svg",
    specialties: ["Leadership", "Hardware Design", "IoT"],
    social: {
      github: "alexchen",
      linkedin: "alex-chen-ceo",
      email: "alex@arcadelabs.com"
    }
  },
  {
    id: "2",
    name: "Sarah Rodriguez",
    role: "Head of Engineering",
    bio: "Former SpaceX engineer specializing in embedded systems and PCB design. Loves teaching complex concepts through hands-on projects.",
    image: "/placeholder.svg",
    specialties: ["Embedded Systems", "PCB Design", "Aerospace"],
    social: {
      github: "sarah-pcb",
      linkedin: "sarah-rodriguez-eng",
      twitter: "sarah_pcb_queen"
    }
  },
  {
    id: "3",
    name: "Marcus Thompson",
    role: "Creative Director",
    bio: "3D printing expert and maker space veteran. Believes in the power of rapid prototyping to bring ideas to life faster than ever.",
    image: "/placeholder.svg",
    specialties: ["3D Printing", "Product Design", "Prototyping"],
    social: {
      github: "marcus3d",
      linkedin: "marcus-thompson-design",
      email: "marcus@arcadelabs.com"
    }
  },
  {
    id: "4",
    name: "Dr. Emily Zhang",
    role: "Research Lead",
    bio: "PhD in Electrical Engineering with focus on next-gen sensor technologies. Published researcher in IEEE journals on IoT innovations.",
    image: "/placeholder.svg",
    specialties: ["Research", "Sensors", "AI/ML"],
    social: {
      linkedin: "dr-emily-zhang",
      twitter: "emily_research"
    }
  }
];

const AboutPage = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        {/* Hero Section with Video Background */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center max-w-4xl mx-auto px-6"
          >
            <h1 className="font-space text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient-nebula">About</span> ArcadeLabs
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Empowering the next generation of makers, innovators, and dreamers through 
              accessible technology and hands-on learning experiences.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Founded 2021
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Maker-First
              </div>
            </div>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-space text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient-pcb">Mission</span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  At ArcadeLabs, we believe that everyone should have access to the tools, knowledge, 
                  and community needed to bring their ideas to life. We're breaking down barriers 
                  between concept and creation by providing affordable access to cutting-edge technology, 
                  comprehensive educational resources, and a supportive community of fellow makers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                  >
                    <Rocket className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Innovation</h3>
                    <p className="text-sm text-muted-foreground">
                      Pushing the boundaries of what's possible in maker education and accessibility.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                  >
                    <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Building a global network of makers supporting each other's growth and success.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                  >
                    <Heart className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Making advanced technology and education available to everyone, everywhere.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-card/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">
                Meet Our <span className="text-gradient-nebula">Team</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The brilliant minds behind ArcadeLabs, united by a passion for innovation and education.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMember(member.id === selectedMember ? null : member.id)}
                >
                  <Card className="h-full bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      {/* Avatar placeholder with animated background */}
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 6, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-space text-lg font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: selectedMember === member.id ? "auto" : 0, 
                          opacity: selectedMember === member.id ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {member.bio}
                        </p>
                        
                        <div className="flex space-x-2">
                          {member.social.github && (
                            <Button variant="ghost" size="sm" className="p-2">
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                          {member.social.linkedin && (
                            <Button variant="ghost" size="sm" className="p-2">
                              <Linkedin className="w-4 h-4" />
                            </Button>
                          )}
                          {member.social.twitter && (
                            <Button variant="ghost" size="sm" className="p-2">
                              <Twitter className="w-4 h-4" />
                            </Button>
                          )}
                          {member.social.email && (
                            <Button variant="ghost" size="sm" className="p-2">
                              <Mail className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-bold text-primary mb-2"
                >
                  10K+
                </motion.div>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl font-bold text-primary mb-2"
                >
                  500+
                </motion.div>
                <p className="text-sm text-muted-foreground">Projects Built</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl font-bold text-primary mb-2"
                >
                  50+
                </motion.div>
                <p className="text-sm text-muted-foreground">Countries Reached</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl font-bold text-primary mb-2"
                >
                  98%
                </motion.div>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;