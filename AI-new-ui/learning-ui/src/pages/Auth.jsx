import { useState,useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";
import "../styles/auth.css";
import { toast } from 'react-toastify';

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/search";
    }
  }, []);

  // localStorage.removeItem("token")

  const submit = async () => {
    try {
      setLoading(true);

      if (mode === "login") {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.access_token);
        window.location.href = "/onboarding";
      } else {
        await registerUser(form);
  
        toast.success("🏰 Player created! Now login.");
        setMode("login");
      }
    } catch (e) {
      toast.error(e.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-panel">
        <h1 className="game-title">⚔️ LearnCraft Arena</h1>
        <p className="subtitle">
          {mode === "login"
            ? "Enter the battlefield of knowledge"
            : "Create your warrior"}
        </p>

        {mode === "register" && (
          <input
            placeholder="Player Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Secret Key"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="gold-btn" onClick={submit} disabled={loading}>
          {loading 
            ? "Preparing troops..."
            : mode === "login"
            ? "⚔️ Enter Arena"
            : "🏰 Join the Clan"}
        </button>

        <p className="switch-text">
          {mode === "login" ? (
            <>
              New warrior?{" "}
              <span onClick={() => setMode("register")}>
                Create account
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span onClick={() => setMode("login")}>
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
