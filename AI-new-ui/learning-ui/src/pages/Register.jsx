import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    // await registerUser(form);
    alert("🏰 Player created! Enter the arena.");
    window.location.href = "/";
  };

  return (
    <div className="center-box">
      <h1>🏰 Create Your Player</h1>

      <input
        placeholder="Player Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Secret Key"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button className="gold-btn" onClick={submit}>
        ⚔️ Join the Clan
      </button>
    </div>
  );
}
