import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import Lesson from "./pages/Lesson";
import Glossary from "./pages/Glossary";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { SignIn, SignUp } from "@clerk/clerk-react";
import type { ReactElement } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { Zap } from "lucide-react";

const clerkAppearance = {
  variables: {
    colorPrimary: "hsl(217, 91%, 60%)",
    colorBackground: "hsl(222, 18%, 7%)",
    colorText: "hsl(215, 24%, 91%)",
    colorTextSecondary: "hsl(215, 12%, 50%)",
    colorInputBackground: "hsl(222, 10%, 13%)",
    colorInputText: "hsl(215, 24%, 91%)",
    colorNeutral: "hsl(222, 10%, 15%)",
    borderRadius: "0.75rem",
    fontSize: "15px",
    spacingUnit: "1rem",
  },
};

const AuthPage = ({ children }: { children: ReactElement }) => (
  <div
    className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10"
    style={{ paddingTop: "max(2.5rem, env(safe-area-inset-top, 0px) + 1.5rem)" }}
  >
    {/* Branding */}
    <div className="mb-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
        <Zap className="w-6 h-6 text-primary" />
      </div>
      <h1 className="font-heading font-semibold text-lg text-foreground tracking-tight">
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

// Redirects already-authenticated users away from landing/auth pages
const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isLoaded, isSignedIn } = useClerkUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  // QueryClient must live inside the component so it's properly scoped
  // to this React tree (important for tests and concurrent rendering).
  const [queryClient] = useState(() => new QueryClient());

  return (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page — shows for unauthenticated, redirects to dashboard if signed in */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              }
            />

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
                    fallbackRedirectUrl="/dashboard"
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
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;

