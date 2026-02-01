import { useState } from "react";
import { getRankedResources } from "../api/resources";
import ResourceCard from "../components/ResourceCard";

export default function Search() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("beginner");

  const attack = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await getRankedResources(topic,experienceLevel);
      setResults(res.data.results);
    } catch {
      alert("⚠️ Battle failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>⚔️ Prepare for Battle</h1>

      <div className="battle-box">
        <input
          placeholder="Enter topic to attack"
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className="gold-btn-search" onClick={attack}>
          🔥 Attack
        </button>
        {/* <select
              onChange={(e) =>
                setExperienceLevel( e.target.value )
              }
            >
              <option value="">Select Rank</option>
              <option value="beginner">Newbei</option>
              <option value="medium">Medium</option>
              <option value="advance">Veteran</option>
          </select> */}
      </div>

      {loading && <p>⚔️ Battling enemies...</p>}

      <div className="grid">
        {results.map((r) => (
          <ResourceCard key={r.url} resource={r} />
        ))}
      </div>
    </div>
  );
}
