import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/users";
import { toast } from "react-toastify";
import "../styles/theme.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      setProfile(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      toast.error("⚠️ Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!profile) return;

    // Validation
    if (!profile.education_level || !profile.preferred_content_type || !profile.preferred_duration) {
      toast.warning("⚠️ Please fill all fields");
      return;
    }

    try {
      setSaving(true);
      await updateProfile(profile);
      toast.success("🏰 Base upgraded successfully!");
    } catch (err) {
      toast.error("⚠️ Failed to update profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="center-loading">
          <h2>⏳ Loading your base...</h2>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="page">
        <div className="troop-card">
          <h2>⚠️ {error}</h2>
          <button className="gold-btn" onClick={loadProfile}>
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>🏰 Player Base</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Configure your learning preferences and strengthen your arsenal
      </p>

      <div className="profile-container">
        <div className="troop-card">
          <h3 style={{ color: "#facc15", marginBottom: "20px" }}>
            👤 Warrior Profile
          </h3>

          <div className="form-group">
            <label>📛 Name</label>
            <p className="read-only-field">{profile.name || "Warrior"}</p>
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <p className="read-only-field">{profile.email}</p>
          </div>

          <div className="form-group">
            <label>🎓 Education Level</label>
            <select
              value={profile.education_level}
              onChange={(e) =>
                setProfile({ ...profile, education_level: e.target.value })
              }
            >
              <option value="school">School</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
            </select>
          </div>

          <div className="form-group">
            <label>📺 Preferred Content Type</label>
            <select
              value={profile.preferred_content_type}
              onChange={(e) =>
                setProfile({ ...profile, preferred_content_type: e.target.value })
              }
            >
              <option value="video">🎥 Video</option>
              <option value="article">📄 Article</option>
              <option value="course">📚 Course</option>
            </select>
          </div>

          <div className="form-group">
            <label>⏱️ Preferred Duration</label>
            <select
              value={profile.preferred_duration}
              onChange={(e) =>
                setProfile({ ...profile, preferred_duration: e.target.value })
              }
            >
              <option value="short">⚡ Short (&lt; 10 min)</option>
              <option value="medium">🎯 Medium (10 - 30 min)</option>
              <option value="long">📖 Long (&gt; 30 min)</option>
            </select>
          </div>

          <div className="form-group">
            <label>🎯 Weak Topics (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., Algorithms, Data Structures, Python"
              value={profile.weak_topics?.join(", ") || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  weak_topics: e.target.value
                    .split(",")
                    .map((w) => w.trim())
                    .filter((w) => w),
                })
              }
            />
          </div>

          <button
            className="gold-btn"
            onClick={save}
            disabled={saving}
            style={{ marginTop: "20px" }}
          >
            {saving ? "⏳ Saving..." : "🛡 Save Strategy"}
          </button>
        </div>
      </div>
    </div>
  );
}
