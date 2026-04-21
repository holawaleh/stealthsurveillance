import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export default function LandingPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-center">
        
        {/* Glow effect */}
        <div className="absolute w-96 h-96 bg-blue-600 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse slow" />

        <div className="relative z-10 max-w-lg">
          
          {/* HEADLINE */}
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Smart Surveillance <br />
            <span className="text-blue-500">Reimagined</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-slate-300 mb-8 text-lg">
            Monitor your environment in real-time with intelligent alerts,
            edge-powered devices, and seamless cloud integration.
          </p>

          {/* FAKE LIVE SYSTEM */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 backdrop-blur">
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-400">Live Activity</span>
              <span className="text-green-400 text-xs">● Active</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-slate-700 p-2 rounded animate-pulse">
                Motion detected — Camera 1
              </div>
              <div className="bg-slate-700 p-2 rounded animate-pulse delay-100">
                Device online — Entrance
              </div>
              <div className="bg-slate-700 p-2 rounded animate-pulse delay-200">
                Snapshot captured
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center lg:justify-end bg-slate-950 p-6 lg:pr-16">
        
        <div className="w-full max-w-md bg-slate-800/80 backdrop-blur p-8 rounded-2xl shadow-2xl border border-slate-700 transition">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {showRegister ? "Create Account" : "Welcome Back"}
          </h2>

          {/* FORM */}
          <div className="space-y-4">
            {showRegister ? <Register /> : <Login />}
          </div>

          {/* TOGGLE */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="text-blue-400 hover:underline transition"
            >
              {showRegister
                ? "Already have an account? Login"
                : "No account? Register"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}