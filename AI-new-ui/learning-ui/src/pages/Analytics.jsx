import { useEffect, useState } from "react";
import { getAnalyticsSummary, getUserHistory } from "../api/analytics";

export default function Analytics() {
  const [summary, setSummary] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getAnalyticsSummary().then((res) => setSummary(res.data.top_topics));
    getUserHistory().then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="page">
      <h1>📊 War Statistics</h1>

      <h2>🔥 Most Battled Topics</h2>
      <div className="grid">
        {summary.map((t) => (
          <div key={t._id} className="troop-card">
            🏹 {t._id} <br />
            Battles: {t.count}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 30 }}>📜 Battle History</h2>
      {history.map((h, i) => (
        <div key={i} className="troop-card">
          ⚔️ {h.topic} <br />
          🧠 Score: {h.top_result_score.toFixed(2)} <br />
          ⏱ {new Date(h.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
