
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import "./styles/SkillExchangeTheme.css";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import MobileNavBar from "./components/MobileNavBar";
import MobileNavigationMenu from "./components/MobileNavigationMenu";

// Import the Index page directly since it's the first page users see
import Index from "./pages/Index";

// Auth pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Lazy load all other pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Community = lazy(() => import("./pages/Community"));
const Messages = lazy(() => import("./pages/Messages"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Matches = lazy(() => import("./pages/Matches"));
const MatchActionPage = lazy(() => import("./pages/matches/MatchActionPage"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetail = lazy(() => import("./pages/ProfileDetail"));
const Settings = lazy(() => import("./pages/Settings"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Activity = lazy(() => import("./pages/Activity"));
const Company = lazy(() => import("./pages/Company"));
const Features = lazy(() => import("./pages/Features"));
const Legal = lazy(() => import("./pages/Legal"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PlanDetails = lazy(() => import("./pages/PlanDetails"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const ImportContent = lazy(() => import("./pages/ImportContent"));

// Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary-purple rounded-full border-t-transparent animate-spin"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="skill-exchange-theme">
            <Toaster />
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Auth routes */}
                <Route path="/auth/sign-in" element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
                
                {/* Main routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/community" element={<Community />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/matches/:action" element={<MatchActionPage />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<ProfileDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/appearance" element={<Settings />} />
                <Route path="/settings/accessibility" element={<Settings />} />
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
            </Suspense>
            <MobileNavigationMenu />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
