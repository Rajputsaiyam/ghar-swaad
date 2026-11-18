import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";
import { Logo } from "../../components/common/Logo";

export function AdminLogin() {
  const { login, admin, ready } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("saiyamrajput71@gmail.com");
  const [password, setPassword] = useState("gharswaad123");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && admin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [ready, admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ok = await login(email, password);
      if (ok) {
        toast.success("Welcome back to Kitchen Operations!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid admin email or password.");
      }
    } catch (err) {
      toast.error("Authentication error. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaf-bg grid min-h-screen place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft space-y-5"
      >
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-primary-deep">
            Kitchen Admin Portal
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Sign in to manage daily orders, menu and kitchen operations.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:bg-primary-deep disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </div>

        <div className="rounded-xl bg-muted p-3 text-center text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Demo Admin Credentials:</p>
          <p className="font-mono mt-0.5">saiyamrajput71@gmail.com / gharswaad123</p>
        </div>
      </form>
    </div>
  );
}
