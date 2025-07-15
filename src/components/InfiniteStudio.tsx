import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Sphere, Box, Cylinder, Html, Line } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useMemo, useEffect } from "react";
import { Wrench, Printer, Cpu, Zap, Settings, Play, Brain, Target, Activity, TrendingUp, Clock, CheckCircle } from "lucide-react";
import * as THREE from "three";

// AI Optimization Visualization
const AIOptimization = ({ isActive }: { isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [optimization, setOptimization] = useState(0);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setOptimization(prev => Math.min(100, prev + Math.random() * 5));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group position={[0, 3, 0]}>
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial 
            color="#39FF14"
            emissive="#39FF14"
            emissiveIntensity={isActive ? 0.6 : 0.2}
            transparent
            opacity={0.8}
            wireframe={true}
          />
        </mesh>
        
        {/* Data Flow Lines */}
        {isActive && Array.from({ length: 8 }).map((_, i) => (
          <Line
            key={i}
            points={[
              [0, 0, 0],
              [
                Math.cos(i * Math.PI / 4) * 2,
                Math.sin(i * Math.PI / 4) * 0.5,
                Math.sin(i * Math.PI / 4) * 2
              ]
            ]}
            color="#39FF14"
            lineWidth={2}
            transparent
            opacity={0.6}
          />
        ))}
        
        <Html position={[0, -1.5, 0]} center>
          <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-3 text-center min-w-[200px]">
            <div className="text-sm font-semibold text-primary mb-2">AI Optimization</div>
            <Progress value={optimization} className="w-full mb-2" />
            <div className="text-xs text-muted-foreground">{optimization.toFixed(1)}% Efficiency</div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Real-time Fabrication Monitor
const FabricationMonitor = ({ service, isActive }: { service: any, isActive: boolean }) => {
  const [metrics, setMetrics] = useState({
    progress: 0,
    speed: 0,
    temperature: 0,
    quality: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          progress: Math.min(100, prev.progress + Math.random() * 2),
          speed: 150 + Math.random() * 50,
          temperature: 220 + Math.random() * 20,
          quality: 95 + Math.random() * 5
        }));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Html position={[0, -2, 3]} center>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 min-w-[300px]"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Real-time Monitoring</h3>
          <Badge variant="outline" className="ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="text-primary">{metrics.progress.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.progress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quality</span>
              <span className="text-green-500">{metrics.quality.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.quality} className="h-2" />
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-orange-500">{metrics.speed.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">mm/min</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-red-500">{metrics.temperature.toFixed(0)}°C</div>
            <div className="text-xs text-muted-foreground">Temp</div>
          </div>
        </div>
      </motion.div>
    </Html>
  );
};

// Enhanced Service Portal Component
const ServicePortal = ({ position, service, onSelect, isSelected, isActive }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isSelected ? 0.02 : 0.005;
      if (isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    
    if (particlesRef.current && isSelected) {
      particlesRef.current.rotation.y += 0.01;
    }
  });
  
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
        
        {/* Enhanced particle system */}
        <group ref={particlesRef}>
          {Array.from({ length: isSelected ? 12 : 6 }).map((_, i) => (
            <Float key={i} speed={3 + i} rotationIntensity={1}>
              <mesh position={[
                Math.cos(i * Math.PI / (isSelected ? 6 : 3)) * (isSelected ? 2 : 1.5),
                Math.sin(i * Math.PI / (isSelected ? 6 : 3)) * 0.3,
                Math.sin(i * Math.PI / (isSelected ? 6 : 3)) * (isSelected ? 2 : 1.5)
              ]}>
                <sphereGeometry args={[isSelected ? 0.08 : 0.05]} />
                <meshStandardMaterial 
                  color={service.color}
                  emissive={service.color}
                  emissiveIntensity={0.8}
                />
              </mesh>
            </Float>
          ))}
        </group>
        
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
        
        {/* Service status indicator */}
        <Html position={[1.2, 0.5, 0]} center>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-xs text-muted-foreground">{isActive ? 'Active' : 'Ready'}</span>
          </div>
        </Html>
        
        {/* Real-time monitoring for active service */}
        <FabricationMonitor service={service} isActive={isActive} />
      </group>
    </Float>
  );
};

// Enhanced 3D Printing Visualization
const PrintingVisualization = ({ isActive }: { isActive: boolean }) => {
  const layerCount = 15;
  const [currentLayer, setCurrentLayer] = useState(0);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentLayer(prev => (prev + 1) % layerCount);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isActive, layerCount]);

  const layers = useMemo(() => 
    Array.from({ length: layerCount }, (_, i) => ({
      y: (i - layerCount / 2) * 0.08,
      opacity: isActive ? (i <= currentLayer ? 1 : 0.2) : 0.3,
      scale: isActive ? 1 - (i * 0.015) : 0.8,
      color: i <= currentLayer ? "#FF6B35" : "#666"
    })), [isActive, layerCount, currentLayer]
  );

  return (
    <Float speed={1} rotationIntensity={0.2}>
      <group position={[-3, 1, 0]}>
        {/* Print bed */}
        <mesh position={[0, -1.2, 0]}>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Printing layers */}
        {layers.map((layer, i) => (
          <mesh key={i} position={[0, layer.y, 0]} scale={[layer.scale, 0.04, layer.scale]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={layer.opacity * 0.3}
              transparent
              opacity={layer.opacity}
            />
          </mesh>
        ))}
        
        {/* Print nozzle */}
        {isActive && (
          <mesh position={[0, currentLayer * 0.08 - layerCount * 0.04 + 0.5, 0]}>
            <coneGeometry args={[0.1, 0.3, 8]} />
            <meshStandardMaterial 
              color="#FF6B35"
              emissive="#FF6B35"
              emissiveIntensity={0.6}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

// Enhanced Assembly Line
const AssemblyLine = ({ isActive }: { isActive: boolean }) => {
  const componentsRef = useRef<THREE.Group>(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  
  useFrame((state) => {
    if (componentsRef.current && isActive) {
      componentsRef.current.rotation.y += 0.005;
    }
  });
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setAssemblyProgress(prev => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const components = [
    { pos: [-2, 0, 0], color: "#6A00FF", size: [0.3, 0.2, 0.1], assembled: assemblyProgress > 20 },
    { pos: [-1, 0, 0], color: "#FF6B35", size: [0.4, 0.3, 0.2], assembled: assemblyProgress > 40 },
    { pos: [0, 0, 0], color: "#00D4FF", size: [0.5, 0.4, 0.3], assembled: assemblyProgress > 60 },
    { pos: [1, 0, 0], color: "#39FF14", size: [0.4, 0.3, 0.2], assembled: assemblyProgress > 80 },
    { pos: [2, 0, 0], color: "#FF1493", size: [0.3, 0.2, 0.1], assembled: assemblyProgress > 95 },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.3}>
      <group ref={componentsRef} position={[3, 1, 0]}>
        {/* Conveyor Belt */}
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[5, 0.1, 0.8]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Moving Components */}
        {components.map((comp, i) => (
          <Float key={i} speed={comp.assembled ? 0.5 : 2 + i * 0.5} rotationIntensity={isActive ? 1 : 0.2}>
            <mesh 
              position={comp.pos as [number, number, number]}
              scale={comp.assembled ? [1.1, 1.1, 1.1] : [1, 1, 1]}
            >
              <boxGeometry args={comp.size as [number, number, number]} />
              <meshStandardMaterial 
                color={comp.color}
                emissive={comp.color}
                emissiveIntensity={comp.assembled ? 0.5 : (isActive ? 0.3 : 0.1)}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
        
        {/* Assembly progress indicator */}
        <Html position={[0, 1, 0]} center>
          <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-2">
            <div className="text-xs font-semibold mb-1">Assembly Progress</div>
            <Progress value={assemblyProgress} className="w-24 h-2" />
          </div>
        </Html>
      </group>
    </Float>
  );
};

const InfiniteStudio = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [optimizationLevel, setOptimizationLevel] = useState(0);
  const [systemMetrics, setSystemMetrics] = useState({
    activeMachines: 0,
    totalJobs: 0,
    completedToday: 0,
    efficiency: 0,
    uptime: 0
  });
  const [liveData, setLiveData] = useState({
    powerConsumption: 0,
    materialUsage: 0,
    qualityScore: 0,
    throughput: 0
  });

  const services = [
    {
      id: "3d-printing",
      name: "3D Printing",
      color: "#FF6B35",
      description: "Rapid prototyping and custom manufacturing with multi-material capabilities",
      position: [-3, 1, 0],
      features: ["Multi-material support", "0.1mm precision", "24/7 monitoring", "AI quality control"],
      estimatedTime: "2-8 hours",
      accuracy: "±0.1mm"
    },
    {
      id: "pcb-fabrication",
      name: "PCB Fabrication",
      color: "#6A00FF",
      description: "Professional circuit board design and manufacturing services",
      position: [3, 1, 0],
      features: ["Multi-layer boards", "HDI technology", "Flex-rigid PCBs", "DFM analysis"],
      estimatedTime: "3-5 days",
      accuracy: "Class 6/6"
    },
    {
      id: "assembly",
      name: "Assembly Services",
      color: "#00D4FF",
      description: "Complete product assembly from components to finished devices",
      position: [0, 2, -2],
      features: ["SMT assembly", "Through-hole", "Testing & QA", "Packaging"],
      estimatedTime: "1-3 days",
      accuracy: "99.8% yield"
    },
    {
      id: "prototyping",
      name: "Rapid Prototyping",
      color: "#39FF14",
      description: "From concept to functional prototype in record time",
      position: [0, 0, 3],
      features: ["CAD optimization", "Material selection", "Iterative design", "Cost analysis"],
      estimatedTime: "1-2 weeks",
      accuracy: "Functional prototype"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationLevel(prev => Math.min(100, prev + Math.random() * 2));
      setSystemMetrics(prev => ({
        activeMachines: Math.floor(Math.random() * 8) + 12,
        totalJobs: Math.floor(Math.random() * 50) + 150,
        completedToday: Math.floor(Math.random() * 30) + 45,
        efficiency: 85 + Math.random() * 15,
        uptime: 95 + Math.random() * 5
      }));
      setLiveData(prev => ({
        powerConsumption: 2500 + Math.random() * 1000,
        materialUsage: Math.random() * 100,
        qualityScore: 96 + Math.random() * 4,
        throughput: 80 + Math.random() * 40
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Advanced fabrication services with real-time 3D visualization and AI-powered optimization
        </p>
        
        {/* Global optimization indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-md mx-auto"
        >
          <Card className="bg-card/50 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-semibold">Global AI Optimization</span>
                <Badge variant="outline" className="ml-auto">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {optimizationLevel.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={optimizationLevel} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* 3D Scene */}
      <div className="h-[600px] relative">
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} color="#4A90E2" />
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
              isActive={activeDemo === service.id}
            />
          ))}

          {/* Active Demonstrations */}
          {activeDemo === "3d-printing" && <PrintingVisualization isActive={true} />}
          {activeDemo === "assembly" && <AssemblyLine isActive={true} />}
          
          {/* AI Optimization Visualization */}
          <AIOptimization isActive={!!activeDemo} />

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

      {/* Live Metrics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-6 left-6 z-30"
      >
        <Card className="bg-card/90 backdrop-blur-md border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Live Metrics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{systemMetrics.activeMachines}</div>
                <div className="text-xs text-muted-foreground">Active Machines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{systemMetrics.completedToday}</div>
                <div className="text-xs text-muted-foreground">Completed Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{liveData.powerConsumption.toFixed(0)}W</div>
                <div className="text-xs text-muted-foreground">Power Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{liveData.qualityScore.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Quality Score</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Efficiency</span>
                <span className="text-primary">{systemMetrics.efficiency.toFixed(1)}%</span>
              </div>
              <Progress value={systemMetrics.efficiency} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uptime</span>
                <span className="text-green-500">{systemMetrics.uptime.toFixed(1)}%</span>
              </div>
              <Progress value={systemMetrics.uptime} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <Card className="bg-card/90 backdrop-blur-md border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Studio Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full" 
              variant={activeDemo ? "destructive" : "default"}
              onClick={() => setActiveDemo(activeDemo ? null : "global")}
            >
              {activeDemo ? "Stop All Demos" : "Start Global Demo"}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <Button
                  key={service.id}
                  variant={activeDemo === service.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveDemo(activeDemo === service.id ? null : service.id)}
                  className="text-xs"
                >
                  {service.name.split(' ')[0]}
                </Button>
              ))}
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Jobs in Queue</span>
                <Badge variant="secondary">{systemMetrics.totalJobs}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Details Panel */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-96 h-full bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: selectedService.color }}
                  />
                  <h2 className="text-2xl font-bold">{selectedService.name}</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedService(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">{selectedService.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">Est. Time</div>
                            <div className="font-semibold">{selectedService.estimatedTime}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                            <div className="font-semibold">{selectedService.accuracy}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Features & Capabilities</h3>
                  <div className="space-y-2">
                    {selectedService.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full"
                    onClick={() => setActiveDemo(selectedService.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Live Demo
                  </Button>
                  
                  {activeDemo === selectedService.id && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-semibold text-green-600">Demo Active</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Real-time fabrication simulation running with live metrics and AI optimization.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveDemo(null)}
                        >
                          Stop Demo
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Real-time service metrics */}
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Live Service Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Throughput</span>
                      <span className="font-semibold">{liveData.throughput.toFixed(0)} units/hr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Material Usage</span>
                      <span className="font-semibold">{liveData.materialUsage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <Badge variant={activeDemo === selectedService.id ? "default" : "secondary"}>
                        {activeDemo === selectedService.id ? "Running" : "Standby"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteStudio;