import { useState } from "react";
import { updateProfile } from "../api/users";
import "../styles/onboarding.css";

export default function Onboarding() {

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    education_level: "",
    preferred_format: "",
    preferred_duration: "",
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const finish = async () => {
    const userId = localStorage.getItem("token");
    await updateProfile(data,userId);
    window.location.href = "/search";
  };

  return (
    <div className="stage-wrapper">

      {/* PROGRESS BAR */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${step * 25}%` }} />
      </div>

      <div className="stage-card">

        <h1 className="stage-title">
          🛡 Warrior Training — Stage {step}
        </h1>

        {/* =======================
            STAGE 1 — EDUCATION
        =========================*/}
        {step === 1 && (
          <div className="stage-content fade">

            <h2>🎓 Choose Your Knowledge Rank</h2>

            <select
              onChange={(e) =>
                setData({ ...data, education_level: e.target.value })
              }
            >
              <option value="">Select Rank</option>
              <option value="school">Apprentice (School)</option>
              <option value="UG">Knight (Undergraduate)</option>
              <option value="PG">War Chief (Post Graduate)</option>
            </select>

            <button
              disabled={!data.education_level}
              className="gold-btn"
              onClick={next}
            >
              Continue ➜
            </button>

          </div>
        )}

        {/* =======================
            STAGE 2 — CONTENT TYPE
        =========================*/}
        {step === 2 && (
          <div className="stage-content fade">

            <h2>📚 Choose Battle Style</h2>

            <select
              onChange={(e) =>
                setData({ ...data, preferred_format: e.target.value })
              }
            >
              <option value="">Select Format</option>
              <option value="video">🎥 Video Lessons</option>
              <option value="article">📜 Articles</option>
              <option value="course">🏰 Full Courses</option>
              <option value="all">👾 All types</option>
            </select>

            <div className="nav-btns">
              <button className="back-btn" onClick={back}>⬅ Back</button>
              <button
                disabled={!data.preferred_format}
                className="gold-btn"
                onClick={next}
              >
                Continue ➜
              </button>
            </div>
          </div>
        )}

        {/* =======================
            STAGE 3 — DURATION
        =========================*/}
        {step === 3 && (
          <div className="stage-content fade">

            <h2>⏳ Training Session Length</h2>

            <select
              onChange={(e) =>
                setData({ ...data, preferred_duration: e.target.value })
              }
            >
              <option value="">Select Duration</option>
              <option value="short">⚡ Short — Quick Battles</option>
              <option value="medium">⚔ Balanced Training</option>
              <option value="long">🛡 Long Strategic Learning</option>
            </select>

            <div className="nav-btns">
              <button className="back-btn" onClick={back}>⬅ Back</button>
              <button
                disabled={!data.preferred_duration}
                className="gold-btn"
                onClick={next}
              >
                Continue ➜
              </button>
            </div>
          </div>
        )}

        {/* =======================
            STAGE 4 — WEAK TOPICS
        =========================*/}
        {/* {step === 4 && (
          <div className="stage-content fade">

            <h2>⚠ Select Areas Needing Reinforcement</h2>

            <input
              placeholder="Example: DSA, OS, DBMS"
              onChange={(e) =>
                setData({
                  ...data,
                  weak_topics: e.target.value.split(",").map(w => w.trim())
                })
              }
            />

            <div className="nav-btns">
              <button className="back-btn" onClick={back}>⬅ Back</button>
              <button className="gold-btn" onClick={next}>
                Continue ➜
              </button>
            </div>
          </div>
        )} */}

        {/* =======================
            FINAL STAGE — SUMMARY
        =========================*/}
        {step === 4 && (
          <div className="stage-content fade">

            <h2>🏆 Training Summary</h2>

            <div className="summary-box">
              <p>🎓 Rank — {data.education_level}</p>
              <p>📚 Content — {data.preferred_format}</p>
              <p>⏱ Duration — {data.preferred_duration}</p>
              {/* <p>⚠ Weak Topics — {data.weak_topics.join(", ")}</p> */}
            </div>

            <div className="nav-btns">
              <button className="back-btn" onClick={back}>⬅ Back</button>
              <button className="gold-btn" onClick={finish}>
                🚀 Begin Your Learning Journey
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
