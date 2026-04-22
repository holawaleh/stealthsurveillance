import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    Owner_name: "",
    phone_number: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(form);
      setSuccess("Account created successfully. You can now login.");
    } catch (err: any) {
      setError("Registration failed");
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

      {success && (
        <div className="bg-green-500/20 text-green-400 p-2 rounded text-sm">
          {success}
        </div>
      )}

      {Object.keys(form).map((key) => (
        <input
          key={key}
          type={key === "password" ? "password" : "text"}
          placeholder={key.replace("_", " ")}
          className="w-full p-3 rounded bg-slate-700"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button
        disabled={loading}
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition active:scale-95 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Register"}
      </button>
    </form>
  );
}