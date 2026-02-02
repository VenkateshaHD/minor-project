import { useEffect, useState } from "react";
import { getAnalyticsSummary, getUserHistory } from "../api/analytics";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import "../styles/theme.css";

export default function Analytics() {
  const [summary, setSummary] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load analytics summary
    try {
      setLoadingSummary(true);
      const res = await getAnalyticsSummary();
      setSummary(res.data.top_topics || []);
    } catch (err) {
      console.error("Failed to load analytics summary:", err);
      toast.error("⚠️ Failed to load analytics");
      setError("Failed to load analytics data");
    } finally {
      setLoadingSummary(false);
    }

    // Load user history
    try {
      setLoadingHistory(true);
      const res = await getUserHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
      toast.error("⚠️ Failed to load battle history");
    } finally {
      setLoadingHistory(false);
    }
  };

  // Calculate statistics
  const totalSearches = history.length;
  const uniqueTopics = [...new Set(history.map(h => h.topic))].length;

  // Prepare data for bar chart
  const chartData = summary.slice(0, 8).map((t) => ({
    topic: t._id.length > 15 ? t._id.substring(0, 15) + "..." : t._id,
    fullTopic: t._id,
    battles: t.count
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "linear-gradient(#1e293b, #020617)",
            border: "2px solid #facc15",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
          }}
        >
          <p style={{ color: "#facc15", margin: 0, fontWeight: "bold" }}>
            {payload[0].payload.fullTopic}
          </p>
          <p style={{ color: "#94a3b8", margin: "4px 0 0 0" }}>
            ⚔️ {payload[0].value} battles
          </p>
        </div>
      );
    }
    return null;
  };

  // Color array for bars
  const barColors = [
    "#facc15",
    "#fbbf24",
    "#f59e0b",
    "#f97316",
    "#ef4444",
    "#ec4899",
    "#a855f7",
    "#8b5cf6"
  ];

  return (
    <div className="page">
      <h1>📊 War Statistics</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Track your battles and conquer new territories of knowledge
      </p>

      {/* Statistics Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalSearches}</div>
          <div className="stat-label">⚔️ Total Battles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{uniqueTopics}</div>
          <div className="stat-label">🎯 Topics Explored</div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <h2 style={{ marginTop: "40px" }}>🔥 Most Battled Topics</h2>

      {loadingSummary ? (
        <p>⏳ Loading statistics...</p>
      ) : summary.length === 0 ? (
        <div className="troop-card" style={{ textAlign: "center", padding: "30px" }}>
          <p style={{ color: "#94a3b8" }}>
            🗺️ No battles yet! Head to the Battle page to start your conquest.
          </p>
        </div>
      ) : (
        <>
          {/* Beautiful Bar Chart */}
          <div
            className="chart-container"
            style={{
              background: "linear-gradient(#1e293b, #020617)",
              border: "3px solid #facc15",
              borderRadius: "14px",
              padding: "30px 20px",
              marginTop: "20px",
              boxShadow: "0 4px 20px rgba(250, 204, 21, 0.2)"
            }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="topic"
                  angle={-45}
                  textAnchor="end"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  stroke="#475569"
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  stroke="#475569"
                  label={{
                    value: "Number of Battles",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#facc15",
                    fontSize: 14
                  }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(250, 204, 21, 0.1)" }} />
                <Bar
                  dataKey="battles"
                  radius={[8, 8, 0, 0]}
                  label={{ position: "top", fill: "#facc15", fontSize: 12 }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid" style={{ marginTop: "30px" }}>
            {summary.map((t, index) => (
              <div key={t._id || index} className="troop-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ color: "#facc15", margin: 0 }}>🏹 {t._id}</h3>
                  <span
                    style={{
                      background: "linear-gradient(#facc15, #ca8a04)",
                      color: "#000",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    {t.count} battles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Battle History */}
      <h2 style={{ marginTop: "40px" }}>📜 Battle History</h2>

      {loadingHistory ? (
        <p>⏳ Loading battle records...</p>
      ) : history.length === 0 ? (
        <div className="troop-card" style={{ textAlign: "center", padding: "30px" }}>
          <p style={{ color: "#94a3b8" }}>
            📚 Your battle history is empty. Fight your first battle to see records here!
          </p>
        </div>
      ) : (
        <div className="history-list">
          {history.slice(0, 20).map((h, i) => (
            <div key={h._id || i} className="history-item troop-card">
              <div className="history-header">
                <h3 style={{ color: "#facc15", margin: 0 }}>⚔️ {h.topic}</h3>
                <span className="history-time">
                  {new Date(h.timestamp).toLocaleDateString()}{" "}
                  {new Date(h.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="history-details">
                {h.search_count && (
                  <span className="score-badge">
                    🔍 {h.search_count} resources found
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
