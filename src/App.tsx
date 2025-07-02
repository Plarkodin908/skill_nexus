
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Tutorials from "./pages/Tutorials";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Achievements from "./pages/Achievements";
import Activity from "./pages/Activity";
import CalendarPage from "./pages/CalendarPage";
import Community from "./pages/Community";
import Matches from "./pages/Matches";
import MatchActionPage from "./pages/matches/MatchActionPage";
import Features from "./pages/Features";
import Legal from "./pages/Legal";
import Company from "./pages/Company";
import AddCourse from "./pages/AddCourse";
import ImportContent from "./pages/ImportContent";
import PaymentPage from "./pages/PaymentPage";
import PlanDetails from "./pages/PlanDetails";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:action" element={<MatchActionPage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/company" element={<Company />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/import" element={<ImportContent />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/plan/:planId" element={<PlanDetails />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
