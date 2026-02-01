import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/users";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  const save = async () => {
    await updateProfile(profile);
    alert("🏰 Base upgraded!");
  };

  return (
    <div className="page">
      <h1>🏰 Player Base</h1>

      <div className="troop-card">
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>

        <select
          value={profile.education_level}
          onChange={(e) =>
            setProfile({ ...profile, education_level: e.target.value })
          }
        >
          <option value="school">School</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        <select
          value={profile.preferred_content_type}
          onChange={(e) =>
            setProfile({ ...profile, preferred_content_type: e.target.value })
          }
        >
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="course">Course</option>
        </select>

        <select
          value={profile.preferred_duration}
          onChange={(e) =>
            setProfile({ ...profile, preferred_duration: e.target.value })
          }
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <input
          value={profile.weak_topics.join(", ")}
          onChange={(e) =>
            setProfile({
              ...profile,
              weak_topics: e.target.value.split(",").map((w) => w.trim()),
            })
          }
        />

        <button className="gold-btn" onClick={save}>
          🛡 Save Strategy
        </button>
      </div>
    </div>
  );
}
