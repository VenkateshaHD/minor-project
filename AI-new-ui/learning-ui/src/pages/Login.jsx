import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    // const res = await loginUser({ email, password });
    // localStorage.setItem("token", res.data.access_token);
    window.location.href = "/onboarding";
  };

  return (
    <div className="center-box">
      <h1>🏰 Enter the Arena</h1>

      <input placeholder="Player Email"
        onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Secret Key"
        onChange={e => setPassword(e.target.value)} />

      <button className="gold-btn" onClick={submit}>
        ⚔️ Start Battle
      </button>
    </div>
  );
}
