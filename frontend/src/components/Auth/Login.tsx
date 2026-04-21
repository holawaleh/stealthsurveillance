import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <div className="bg-red-500/20 text-red-400 p-2 rounded text-sm">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-slate-700"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded bg-slate-700"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}