import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./Landing/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <Dashboard />;
}