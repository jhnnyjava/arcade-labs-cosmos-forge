import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float, Sphere, Box, Cylinder, Environment, Effects } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useMemo } from "react";
import { Wrench, Printer, Cpu, Zap, Settings, Play } from "lucide-react";
import * as THREE from "three";

// Floating Service Portal Component
const ServicePortal = ({ position, service, onSelect, isSelected }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={() => onSelect(service)}
          onPointerOver={(e) => {
            e.stopPropagation();
            if (meshRef.current) {
              meshRef.current.scale.setScalar(isSelected ? 1.3 : 1.2);
            }
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            if (meshRef.current) {
              meshRef.current.scale.setScalar(isSelected ? 1.2 : 1);
            }
          }}
        >
          <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
          <meshStandardMaterial 
            color={service.color}
            emissive={service.color}
            emissiveIntensity={isSelected ? 0.4 : 0.2}
            transparent
            opacity={0.9}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Floating particles around portal */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Float key={i} speed={3 + i} rotationIntensity={1}>
            <mesh position={[
              Math.cos(i * Math.PI / 3) * 1.5,
              Math.sin(i * Math.PI / 3) * 0.3,
              Math.sin(i * Math.PI / 3) * 1.5
            ]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial 
                color={service.color}
                emissive={service.color}
                emissiveIntensity={0.8}
              />
            </mesh>
          </Float>
        ))}
        
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.15}
          color={service.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/space-mono.woff"
        >
          {service.name}
        </Text>
      </group>
    </Float>
  );
};

// 3D Printing Visualization
const PrintingVisualization = ({ isActive }: { isActive: boolean }) => {
  const layerCount = 12;
  const layers = useMemo(() => 
    Array.from({ length: layerCount }, (_, i) => ({
      y: (i - layerCount / 2) * 0.1,
      opacity: isActive ? Math.min(1, (i + 1) / layerCount) : 0.3,
      scale: isActive ? 1 - (i * 0.02) : 0.8
    })), [isActive, layerCount]
  );

  return (
    <Float speed={1} rotationIntensity={0.2}>
      <group position={[0, 0, 0]}>
        {layers.map((layer, i) => (
          <mesh key={i} position={[0, layer.y, 0]} scale={[layer.scale, 0.05, layer.scale]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color="#FF6B35"
              emissive="#FF6B35"
              emissiveIntensity={layer.opacity * 0.3}
              transparent
              opacity={layer.opacity}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Fabrication Assembly Line
const AssemblyLine = ({ isActive }: { isActive: boolean }) => {
  const componentsRef = useRef<THREE.Group>(null);
  
  const components = [
    { pos: [-2, 0, 0], color: "#6A00FF", size: [0.3, 0.2, 0.1] },
    { pos: [-1, 0, 0], color: "#FF6B35", size: [0.4, 0.3, 0.2] },
    { pos: [0, 0, 0], color: "#00D4FF", size: [0.5, 0.4, 0.3] },
    { pos: [1, 0, 0], color: "#39FF14", size: [0.4, 0.3, 0.2] },
    { pos: [2, 0, 0], color: "#FF1493", size: [0.3, 0.2, 0.1] },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.3}>
      <group ref={componentsRef} position={[0, 0, 2]}>
        {/* Conveyor Belt */}
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[5, 0.1, 0.8]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Moving Components */}
        {components.map((comp, i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={isActive ? 1 : 0.2}>
            <mesh position={comp.pos as [number, number, number]}>
              <boxGeometry args={comp.size as [number, number, number]} />
              <meshStandardMaterial 
                color={comp.color}
                emissive={comp.color}
                emissiveIntensity={isActive ? 0.3 : 0.1}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
};

const InfiniteStudio = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const services = [
    {
      id: "3d-printing",
      name: "3D Printing",
      color: "#FF6B35",
      description: "Rapid prototyping and custom manufacturing with multi-material capabilities",
      position: [-3, 1, 0]
    },
    {
      id: "pcb-fabrication",
      name: "PCB Fabrication",
      color: "#6A00FF",
      description: "Professional circuit board design and manufacturing services",
      position: [3, 1, 0]
    },
    {
      id: "assembly",
      name: "Assembly Services",
      color: "#00D4FF",
      description: "Complete product assembly from components to finished devices",
      position: [0, 2, -2]
    },
    {
      id: "prototyping",
      name: "Rapid Prototyping",
      color: "#39FF14",
      description: "From concept to functional prototype in record time",
      position: [0, 0, 3]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 particle-bg opacity-30" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-24 pb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center quantum-glow"
          >
            <Wrench className="w-6 h-6 text-primary" />
          </motion.div>
          <h1 className="font-space text-4xl md:text-6xl font-bold">
            <span className="text-gradient-pcb">Infinite</span> Studio
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced fabrication services with real-time 3D visualization and AI-powered optimization
        </p>
      </motion.div>

      {/* 3D Scene */}
      <div className="h-[600px] relative">
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <Environment preset="studio" />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6A00FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FF6B35" />
          <spotLight position={[0, 10, 0]} intensity={2} color="#00D4FF" angle={0.3} penumbra={1} />

          {/* Service Portals */}
          {services.map((service) => (
            <ServicePortal
              key={service.id}
              position={service.position}
              service={service}
              onSelect={setSelectedService}
              isSelected={selectedService?.id === service.id}
            />
          ))}

          {/* Active Demonstrations */}
          {activeDemo === "3d-printing" && <PrintingVisualization isActive={true} />}
          {activeDemo === "assembly" && <AssemblyLine isActive={true} />}

          {/* Central Hub */}
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial 
                  color="#6A00FF"
                  emissive="#6A00FF"
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.8}
                  wireframe={true}
                />
              </mesh>
              
              {/* Orbiting Core */}
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial 
                  color="#FF6B35"
                  emissive="#FF6B35"
                  emissiveIntensity={0.8}
                />
              </mesh>
            </group>
          </Float>

          <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Service Info Panel */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 w-80 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-6 z-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedService.color }}
            />
            <h3 className="font-space text-xl font-semibold">{selectedService.name}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {selectedService.description}
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="quantum" 
              className="w-full"
              onClick={() => setActiveDemo(selectedService.id)}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
            
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure Service
            </Button>
          </div>
          
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20"
      >
        <Button variant="quantum" className="group">
          <Printer className="w-4 h-4 mr-2" />
          Request Quote
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="ml-2"
          >
            <Zap className="w-4 h-4" />
          </motion.div>
        </Button>
        
        <Button variant="cosmos">
          <Cpu className="w-4 h-4 mr-2" />
          Upload Design
        </Button>
      </motion.div>
    </div>
  );
};

export default InfiniteStudio;