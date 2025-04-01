
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Matches from "./pages/Matches";
import MatchActionPage from "./pages/matches/MatchActionPage";
import Tutorials from "./pages/Tutorials";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CalendarPage from "./pages/CalendarPage";
import Achievements from "./pages/Achievements";
import Activity from "./pages/Activity";
import Company from "./pages/Company";
import Features from "./pages/Features";
import Legal from "./pages/Legal";
import PaymentPage from "./pages/PaymentPage";
import PlanDetails from "./pages/PlanDetails";
import AddCourse from "./pages/AddCourse";
import ImportContent from "./pages/ImportContent";
import SchemaMarkup from "./components/SEO/SchemaMarkup";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster />
        <SchemaMarkup 
          type="website"
          data={{
            name: "Skill Nexus",
            description: "Connect with other learners, share skills, and grow together"
          }}
        />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/community" element={<Community />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:action" element={<MatchActionPage />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/company" element={<Company />} />
          <Route path="/features" element={<Features />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/plan-details" element={<PlanDetails />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/import-content" element={<ImportContent />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
