export default function ResourceCard({ resource }) {
  return (
    <div className="troop-card">
      <h3>{resource.title}</h3>

      <p className="desc">
        {resource.description?.slice(0, 120)}...
      </p>

      <div className="stats">
        {/* 🧠 Quality: {resource.quality_score}/10 <br /> */}
        ⚡ Power: {(resource.semantic_score * 100).toFixed(1)}
      </div>

      <a href={resource.url} target="_blank" rel="noreferrer">
        <button className="attack-btn">⚔️ Learn</button>
      </a>
    </div>
  );
}
