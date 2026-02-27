import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import Lesson from "./pages/Lesson";
import Glossary from "./pages/Glossary";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import { SignIn, SignUp } from "@clerk/clerk-react";
import type { ReactElement } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { Zap } from "lucide-react";

const queryClient = new QueryClient();

const clerkAppearance = {
  variables: {
    colorPrimary: "hsl(262, 55%, 55%)",
    colorBackground: "hsl(260, 30%, 9%)",
    colorText: "hsl(214, 32%, 91%)",
    colorTextSecondary: "hsl(215, 17%, 55%)",
    colorInputBackground: "hsl(260, 22%, 14%)",
    colorInputText: "hsl(214, 32%, 91%)",
    colorNeutral: "hsl(260, 22%, 14%)",
    borderRadius: "0.875rem",
    fontSize: "15px",
    spacingUnit: "1rem",
  },
};

const AuthPage = ({ children }: { children: ReactElement }) => (
  <div
    className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 py-10"
    style={{ paddingTop: "max(2.5rem, env(safe-area-inset-top, 0px) + 1.5rem)" }}
  >
    {/* Branding */}
    <div className="mb-8 text-center">
      <div
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4"
        style={{ boxShadow: "0 0 28px hsl(262 55% 50% / 0.45)" }}
      >
        <Zap className="w-7 h-7 text-white" />
      </div>
      <h1 className="font-heading font-bold text-xl text-foreground tracking-tight">
        FlowMaster
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        Master automation. No code required.
      </p>
    </div>

    {/* Clerk renders its own native dark card */}
    {children}
  </div>
);

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isLoaded, isSignedIn } = useClerkUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            {/* Clerk uses sub-paths like /sign-in/factor-one and /sign-in/sso-callback,
                so we need /* to catch all of them */}
            <Route
              path="/sign-in/*"
              element={
                <AuthPage>
                  <SignIn
                    routing="path"
                    path="/sign-in"
                    fallbackRedirectUrl="/onboarding"
                    signUpUrl="/sign-up"
                    appearance={clerkAppearance}
                  />
                </AuthPage>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <AuthPage>
                  <SignUp
                    routing="path"
                    path="/sign-up"
                    fallbackRedirectUrl="/onboarding"
                    signInUrl="/sign-in"
                    appearance={clerkAppearance}
                  />
                </AuthPage>
              }
            />

            {/* Root now goes directly to onboarding for a mobile-app feel */}
            <Route path="/" element={<Navigate to="/onboarding" replace />} />

            {/* Protected application routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning-path"
              element={
                <ProtectedRoute>
                  <LearningPath />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lesson/:id"
              element={
                <ProtectedRoute>
                  <Lesson />
                </ProtectedRoute>
              }
            />
            <Route
              path="/glossary"
              element={
                <ProtectedRoute>
                  <Glossary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
