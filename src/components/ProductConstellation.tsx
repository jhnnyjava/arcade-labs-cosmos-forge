import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Cpu, 
  Zap, 
  Radio, 
  Gauge, 
  Wifi, 
  Camera,
  ExternalLink,
  ShoppingCart,
  Clock
} from "lucide-react";

const ProductConstellation = () => {
  const products = [
    {
      id: 1,
      name: "Arduino Uno R3",
      category: "Microcontrollers",
      description: "The classic board for beginners and seasoned makers",
      price: "$25",
      status: "In Stock",
      icon: Cpu,
      features: ["ATmega328P", "14 Digital I/O", "6 Analog Inputs"],
      glow: "quantum-glow"
    },
    {
      id: 2,
      name: "ESP32 DevKit",
      category: "IoT Modules",
      description: "WiFi & Bluetooth enabled microcontroller",
      price: "$12",
      status: "Available",
      icon: Wifi,
      features: ["WiFi 802.11", "Bluetooth 4.2", "240MHz Dual Core"],
      glow: "copper-glow"
    },
    {
      id: 3,
      name: "Raspberry Pi 4",
      category: "Single Board Computers",
      description: "Complete computer in a compact form factor",
      price: "$75",
      status: "Limited",
      icon: Radio,
      features: ["4GB RAM", "Quad-core ARM", "4K HDMI Output"],
      glow: "quantum-glow"
    },
    {
      id: 4,
      name: "LiDAR Sensor",
      category: "Sensors",
      description: "High-precision distance measurement",
      price: "$45",
      status: "In Stock",
      icon: Gauge,
      features: ["360° Scanning", "12m Range", "2Hz Frequency"],
      glow: "copper-glow"
    },
    {
      id: 5,
      name: "Pi Camera v3",
      category: "Imaging",
      description: "High-quality camera module for projects",
      price: "$35",
      status: "Available",
      icon: Camera,
      features: ["12MP Sensor", "HDR Support", "Auto Focus"],
      glow: "quantum-glow"
    },
    {
      id: 6,
      name: "Power Supply Unit",
      category: "Power",
      description: "Regulated 5V/3.3V power for projects",
      price: "$18",
      status: "In Stock",
      icon: Zap,
      features: ["Dual Output", "Over-current Protection", "LED Indicators"],
      glow: "copper-glow"
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
            Product <span className="text-gradient-pcb">Constellation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Floating Arduino boards transform into rocket controllers on click. 
            Explore our cosmic collection of components and modules.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group"
            >
              <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                {/* Floating Icon */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <product.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center ${product.glow}`}>
                      <product.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      <div className="text-sm text-accent">{product.status}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-space text-xl font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">
                      {product.category}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="quantum" size="sm" className="flex-1">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="void" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Hover Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Rental Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-card/20 backdrop-blur-md border border-border/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-secondary mr-3" />
              <h3 className="font-space text-2xl font-bold">
                <span className="text-gradient-pcb">Rental Orbit</span> Tracker
              </h3>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Satellite-view component availability calendar with blockchain-tracked inventory. 
              Rent equipment by the hour, day, or project cycle.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="orbit">
                View Rental Fleet
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  <Gauge className="w-4 h-4" />
                </motion.div>
              </Button>
              <Button variant="cosmos">
                Check Availability
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductConstellation;