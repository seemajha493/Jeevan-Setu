import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Report from "./pages/Report";
import HelpDashboard from "./pages/HelpDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Opportunities from "./pages/Opportunities";
import Directory from "./pages/Directory";
import AddOrganization from "./pages/AddOrganization";
import AdminVerification from "./pages/AdminVerification";
import AdminDonations from "./pages/AdminDonations";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Auth from "./pages/Auth";
import SuccessStories from "./pages/SuccessStories";
import SkillProfiling from "./pages/SkillProfiling";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/help-dashboard" element={<HelpDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/directory/add" element={<AddOrganization />} />
          <Route path="/admin/verification" element={<AdminVerification />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/skill-profiling" element={<SkillProfiling />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
