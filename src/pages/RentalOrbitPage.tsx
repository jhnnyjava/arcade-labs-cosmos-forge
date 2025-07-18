import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, CircuitBoard, Clock, CreditCard, Package, Star, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

interface RentalItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  available: boolean;
  image: string;
}

interface Rental {
  id: string;
  itemId: string;
  itemName: string;
  userName: string;
  userEmail: string;
  period: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'returned' | 'overdue';
}

const mockItems: RentalItem[] = [
  {
    id: "1",
    name: "Arduino Uno R3",
    description: "Popular microcontroller board perfect for beginners",
    price: 15,
    category: "Arduino",
    rating: 4.8,
    available: true,
    image: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Raspberry Pi 4B",
    description: "Single-board computer with wireless networking",
    price: 25,
    category: "SBC",
    rating: 4.9,
    available: true,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "ESP32 DevKit",
    description: "Wi-Fi and Bluetooth microcontroller development board",
    price: 12,
    category: "IoT",
    rating: 4.7,
    available: false,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Sensor Kit Pro",
    description: "37-in-1 sensor modules kit for various projects",
    price: 30,
    category: "Sensors",
    rating: 4.6,
    available: true,
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "3D Printer Filament PLA",
    description: "High-quality PLA filament in various colors",
    price: 8,
    category: "3D Printing",
    rating: 4.5,
    available: true,
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Logic Analyzer",
    description: "8-channel USB logic analyzer for debugging",
    price: 20,
    category: "Tools",
    rating: 4.4,
    available: true,
    image: "/placeholder.svg"
  }
];

const RentalOrbitPage = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [rentalData, setRentalData] = useState({
    period: "",
    userName: "",
    userEmail: "",
    paymentMethod: ""
  });
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ["All", "Arduino", "SBC", "IoT", "Sensors", "3D Printing", "Tools"];

  const filteredItems = selectedCategory === "All" 
    ? mockItems 
    : mockItems.filter(item => item.category === selectedCategory);

  const handleRental = () => {
    if (!selectedItem || !rentalData.period || !rentalData.userName || !rentalData.userEmail || !rentalData.paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    const days = parseInt(rentalData.period);
    endDate.setDate(startDate.getDate() + days);

    const newRental: Rental = {
      id: Math.random().toString(36).substr(2, 9),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      userName: rentalData.userName,
      userEmail: rentalData.userEmail,
      period: rentalData.period,
      paymentMethod: rentalData.paymentMethod,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'active'
    };

    setRentals(prev => [...prev, newRental]);
    
    // Store in localStorage for admin access
    localStorage.setItem('arcadeLabs_rentals', JSON.stringify([...rentals, newRental]));

    toast({
      title: "Rental Confirmed!",
      description: `${selectedItem.name} rented for ${rentalData.period} days. Confirmation sent to ${rentalData.userEmail}`,
    });

    setIsDialogOpen(false);
    setRentalData({ period: "", userName: "", userEmail: "", paymentMethod: "" });
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-nebula">Rental</span> Orbit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rent high-quality electronics and components for your projects. From Arduino boards to sensors, we've got you covered.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "quantum" : "void"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                        <CardDescription className="text-sm">{item.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={item.available ? "default" : "destructive"}
                        className="ml-2"
                      >
                        {item.available ? "Available" : "Rented"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${item.price}<span className="text-sm text-muted-foreground">/week</span>
                      </span>
                      
                      <Dialog open={isDialogOpen && selectedItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="quantum"
                            size="sm"
                            disabled={!item.available}
                            onClick={() => setSelectedItem(item)}
                            className="transition-all duration-300"
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Rent Now
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Rent {item.name}</DialogTitle>
                            <DialogDescription>
                              Fill out the details to complete your rental
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="period">Rental Period</Label>
                              <Select value={rentalData.period} onValueChange={(value) => setRentalData(prev => ({ ...prev, period: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="3">3 days - ${(item.price * 0.6).toFixed(0)}</SelectItem>
                                  <SelectItem value="7">1 week - ${item.price}</SelectItem>
                                  <SelectItem value="14">2 weeks - ${(item.price * 1.8).toFixed(0)}</SelectItem>
                                  <SelectItem value="30">1 month - ${(item.price * 3.5).toFixed(0)}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="userName">Full Name</Label>
                              <Input
                                id="userName"
                                value={rentalData.userName}
                                onChange={(e) => setRentalData(prev => ({ ...prev, userName: e.target.value }))}
                                placeholder="Enter your full name"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="userEmail">Email</Label>
                              <Input
                                id="userEmail"
                                type="email"
                                value={rentalData.userEmail}
                                onChange={(e) => setRentalData(prev => ({ ...prev, userEmail: e.target.value }))}
                                placeholder="Enter your email"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="payment">Payment Method</Label>
                              <Select value={rentalData.paymentMethod} onValueChange={(value) => setRentalData(prev => ({ ...prev, paymentMethod: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                                  <SelectItem value="paypal">PayPal</SelectItem>
                                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                  <SelectItem value="bank">Bank Transfer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex space-x-2 pt-4">
                              <Button
                                variant="void"
                                className="flex-1"
                                onClick={() => setIsDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="quantum"
                                className="flex-1"
                                onClick={handleRental}
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Confirm Rental
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="text-center p-6 bg-card/30 backdrop-blur-md border-border/50">
              <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{mockItems.length}</h3>
              <p className="text-sm text-muted-foreground">Available Items</p>
            </Card>
            
            <Card className="text-center p-6 bg-card/30 backdrop-blur-md border-border/50">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm text-muted-foreground">Happy Makers</p>
            </Card>
            
            <Card className="text-center p-6 bg-card/30 backdrop-blur-md border-border/50">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-sm text-muted-foreground">Availability</p>
            </Card>
            
            <Card className="text-center p-6 bg-card/30 backdrop-blur-md border-border/50">
              <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">4.8/5</h3>
              <p className="text-sm text-muted-foreground">Rating</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RentalOrbitPage;