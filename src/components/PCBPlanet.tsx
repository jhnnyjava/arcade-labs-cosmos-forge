import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Zap, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// Component library data
const COMPONENTS = [
  { id: 'arduino-uno', name: 'Arduino Uno R3', price: 2500, category: 'Microcontrollers', color: '#00979D' },
  { id: 'esp32', name: 'ESP32 DevKit', price: 1800, category: 'Microcontrollers', color: '#FF6B35' },
  { id: 'servo-sg90', name: 'SG90 Servo Motor', price: 450, category: 'Motors', color: '#6A00FF' },
  { id: 'ultrasonic', name: 'HC-SR04 Ultrasonic', price: 350, category: 'Sensors', color: '#00FF9D' },
  { id: 'breadboard', name: '830 Point Breadboard', price: 280, category: 'Prototyping', color: '#FFD700' },
  { id: 'led-strip', name: 'RGB LED Strip (1m)', price: 650, category: 'Lighting', color: '#FF1493' },
];

// Floating component in 3D space
function FloatingComponent({ component, position, onSelect, isSelected }: {
  component: typeof COMPONENTS[0];
  position: [number, number, number];
  onSelect: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[0.8, 0.4, 0.1]}
        onClick={onSelect}
        onPointerOver={(e) => (e.object.scale.setScalar(1.1))}
        onPointerOut={(e) => (e.object.scale.setScalar(1))}
      >
        <meshStandardMaterial 
          color={component.color} 
          transparent 
          opacity={isSelected ? 0.9 : 0.7}
          emissive={component.color}
          emissiveIntensity={isSelected ? 0.3 : 0.1}
        />
      </Box>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {component.name}
      </Text>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.08}
        color="#FF6B35"
        anchorX="center"
        anchorY="middle"
      >
        KES {component.price}
      </Text>
    </group>
  );
}

// Component types
type ComponentItem = {
  component: typeof COMPONENTS[0];
  position: [number, number, number];
};

// 3D PCB Canvas
function PCBCanvas({ selectedComponents, onComponentDrop, onRemoveComponent }: {
  selectedComponents: ComponentItem[];
  onComponentDrop: (component: typeof COMPONENTS[0], position: [number, number, number]) => void;
  onRemoveComponent: (index: number) => void;
}) {

  return (
    <div 
      className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/30 relative overflow-hidden"
      onDrop={(e) => {
        e.preventDefault();
        const componentId = e.dataTransfer.getData('componentId');
        if (componentId) {
          const component = COMPONENTS.find(c => c.id === componentId);
          if (component) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const z = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
            onComponentDrop(component, [x, 0, z]);
          }
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
        <Canvas camera={{ position: [0, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#FF6B35" intensity={0.5} />
        
        {/* PCB Base */}
        <Box args={[8, 0.1, 5]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#0A0A18" />
        </Box>
        
        {/* Grid Lines */}
        <gridHelper args={[8, 20, '#6A00FF', '#6A00FF']} position={[0, -0.4, 0]} />
        
        {/* Placed Components */}
        {selectedComponents.map((item, index) => (
          <Box
            key={`${item.component.id}-${index}`}
            args={[0.6, 0.3, 0.2]}
            position={item.position}
            onClick={() => onRemoveComponent(index)}
          >
            <meshStandardMaterial 
              color={item.component.color}
              emissive={item.component.color}
              emissiveIntensity={0.2}
            />
          </Box>
        ))}
        
        <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </Suspense>
      
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        Drag components here to build your PCB
      </div>
    </div>
  );
}

// Mount Kenya Eruption Animation Component
function MountKenyaEruption({ isActive, onComplete }: {
  isActive: boolean;
  onComplete: () => void;
}) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500 via-red-500 to-purple-600 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-gradient-radial from-yellow-400 via-orange-500 to-red-600 rounded-full animate-ping" />
          <div className="absolute inset-8 bg-white rounded-full animate-bounce" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Fabrication Initiated!</h2>
        <p className="text-xl text-white/80 mb-8">Mount Kenya forge is firing up...</p>
        <Button 
          onClick={onComplete}
          className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
        >
          Continue to Queue
        </Button>
      </div>
    </div>
  );
}

export default function PCBPlanet() {
  const [selectedComponents, setSelectedComponents] = useState<ComponentItem[]>([]);
  const [showEruption, setShowEruption] = useState(false);
  const [vatEnabled, setVatEnabled] = useState(false);

  const totalPrice = selectedComponents.reduce((sum, item) => sum + item.component.price, 0);
  const vatAmount = vatEnabled ? totalPrice * 0.18 : 0;
  const finalPrice = totalPrice + vatAmount;

  const handleComponentSelect = (component: typeof COMPONENTS[0]) => {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 6,
      0,
      (Math.random() - 0.5) * 3
    ];
    setSelectedComponents(prev => [...prev, { component, position }]);
  };

  const handleRemoveComponent = (index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index));
  };

  const handleFabricate = () => {
    if (selectedComponents.length > 0) {
      setShowEruption(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Universe
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            PCB Planet Designer
          </h1>
          <p className="text-xl text-muted-foreground">
            Drag components from the cosmic library to your PCB canvas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Library */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Component Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-hidden">
                <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
                  <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} />
                  
                  {COMPONENTS.map((component, index) => (
                    <FloatingComponent
                      key={component.id}
                      component={component}
                      position={[
                        (index % 3 - 1) * 2,
                        Math.floor(index / 3) * 1.5 - 1,
                        0
                      ]}
                      onSelect={() => handleComponentSelect(component)}
                      isSelected={false}
                    />
                  ))}
                  
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
                  </Canvas>
                </Suspense>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Click components to add them to your PCB
              </div>
            </CardContent>
          </Card>

          {/* PCB Canvas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>3D PCB Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <PCBCanvas
                selectedComponents={selectedComponents}
                onComponentDrop={handleComponentSelect}
                onRemoveComponent={handleRemoveComponent}
              />
            </CardContent>
          </Card>
        </div>

        {/* Pricing & Controls */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Project Summary</span>
              <Badge variant="secondary">
                {selectedComponents.length} components
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Selected Components:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedComponents.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm">{item.component.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">KES {item.component.price}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveComponent(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Subtotal:</span>
                    <span className="font-medium">KES {totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vatEnabled}
                        onChange={(e) => setVatEnabled(e.target.checked)}
                        className="rounded border-primary"
                      />
                      <span className="text-sm">Include VAT (18%)</span>
                    </label>
                    <span className="text-sm">KES {vatAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-lg text-primary">
                      KES {finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleFabricate}
                  disabled={selectedComponents.length === 0}
                  className="w-full quantum-glow bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Fabricate PCB
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MountKenyaEruption
        isActive={showEruption}
        onComplete={() => setShowEruption(false)}
      />
    </div>
  );
}