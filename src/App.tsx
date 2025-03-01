
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Messages from "./pages/Messages";
import CalendarPage from "./pages/CalendarPage";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Company from "./pages/Company";
import Legal from "./pages/Legal";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  // Helper function to check if the current path is the homepage
  const isHomePage = (pathname: string) => {
    return pathname === "/" || 
           pathname === "/features" || 
           pathname === "/pricing" || 
           pathname === "/company" || 
           pathname === "/legal";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {({ location }) => (
            <div className="flex min-h-screen">
              {!isHomePage(location.pathname) && <Sidebar />}
              <div className="flex-grow overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/legal" element={<Legal />} />
                </Routes>
              </div>
            </div>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
