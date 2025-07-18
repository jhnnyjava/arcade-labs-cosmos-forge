import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PCBPlanet from "./components/PCBPlanet";
import InfiniteStudioPage from "./pages/InfiniteStudioPage";
import AdminPage from "./pages/AdminPage";
import ArticlesPage from "./pages/ArticlesPage";
import RentalOrbitPage from "./pages/RentalOrbitPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pcb-planet" element={<PCBPlanet />} />
            <Route path="/infinite-studio" element={<InfiniteStudioPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/rental-orbit" element={<RentalOrbitPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
