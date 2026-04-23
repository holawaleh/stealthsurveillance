import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    tenant_name: "",
    phone_number: "",
    area: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(form);

      setSuccess(
        "Account created successfully. You can now login."
      );

      setForm({
        email: "",
        password: "",
        tenant_name: "",
        phone_number: "",
        area: "",
      });

    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-400 p-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        className="w-full p-3 rounded-lg bg-slate-700 outline-none border border-slate-600 focus:border-blue-500"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        className="w-full p-3 rounded-lg bg-slate-700 outline-none border border-slate-600 focus:border-blue-500"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      {/* OWNER NAME */}
      <input
        type="text"
        placeholder="Owner Name"
        value={form.tenant_name}
        className="w-full p-3 rounded-lg bg-slate-700 outline-none border border-slate-600 focus:border-blue-500"
        onChange={(e) =>
          setForm({
            ...form,
            tenant_name:
              e.target.value,
          })
        }
      />

      {/* PHONE */}
      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone_number}
        className="w-full p-3 rounded-lg bg-slate-700 outline-none border border-slate-600 focus:border-blue-500"
        onChange={(e) =>
          setForm({
            ...form,
            phone_number:
              e.target.value,
          })
        }
      />

      {/* AREA */}
      <input
        type="text"
        placeholder="Area"
        value={form.area}
        className="w-full p-3 rounded-lg bg-slate-700 outline-none border border-slate-600 focus:border-blue-500"
        onChange={(e) =>
          setForm({
            ...form,
            area: e.target.value,
          })
        }
      />

      {/* BUTTON */}
      <button
        disabled={loading}
        className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 transition active:scale-95 disabled:opacity-50"
      >
        {loading
          ? "Creating..."
          : "Register"}
      </button>

    </form>
  );
}