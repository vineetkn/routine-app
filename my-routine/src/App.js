import { useState } from "react";

const blocks = [
  {
    time: "7:00 AM",
    duration: "Wake Up",
    title: "RISE",
    subtitle: "No snooze. Feet on floor. Hydrate immediately.",
    icon: "☀️",
    category: "physical",
    color: "#F97316",
  },
  {
    time: "7:00 – 7:30 AM",
    duration: "30 min",
    title: "MORNING RITUAL",
    subtitle: "Gratitude journal + set 3 intentions for the day. No phone.",
    icon: "📓",
    category: "mental",
    color: "#8B5CF6",
  },
  {
    time: "7:30 – 7:45 AM",
    duration: "15 min",
    title: "MEDITATION",
    subtitle: "Breathwork or guided meditation. Calm the mind before the grind.",
    icon: "🧘",
    category: "mental",
    color: "#6366F1",
  },
  {
    time: "7:45 – 8:45 AM",
    duration: "60 min",
    title: "GYM",
    subtitle: "Strength or conditioning. Train like your future depends on it — it does.",
    icon: "🏋️",
    category: "physical",
    color: "#EF4444",
  },
  {
    time: "8:45 – 9:30 AM",
    duration: "45 min",
    title: "COLD SHOWER + RECOVERY",
    subtitle: "End with 2–3 min cold. Eat a high-protein breakfast. Recharge.",
    icon: "🚿",
    category: "physical",
    color: "#06B6D4",
  },
  {
    time: "9:30 – 10:30 AM",
    duration: "60 min",
    title: "TRANSITION BLOCK",
    subtitle: "Review goals, clear inbox, plan deep work sessions. No distractions.",
    icon: "🎯",
    category: "career",
    color: "#10B981",
  },
  {
    time: "10:30 AM – 7:30 PM",
    duration: "9 hrs",
    title: "DEEP WORK",
    subtitle: "Your most important work. Pomodoros (90 min on / 15 min off). Phone away.",
    icon: "💻",
    category: "career",
    color: "#F59E0B",
    big: true,
  },
  {
    time: "7:30 – 8:00 PM",
    duration: "30 min",
    title: "EVENING WALK",
    subtitle: "Decompress. No podcasts — let your mind wander and reset.",
    icon: "🚶",
    category: "physical",
    color: "#84CC16",
  },
  {
    time: "8:00 – 9:00 PM",
    duration: "60 min",
    title: "DINNER + WIND DOWN",
    subtitle: "Eat light. No screens during dinner. Connect or rest.",
    icon: "🍽️",
    category: "mental",
    color: "#EC4899",
  },
  {
    time: "9:00 – 11:00 PM",
    duration: "2 hrs",
    title: "CAREER GROWTH",
    subtitle: "Study for career skills (1hr) + apply to jobs, network, build portfolio (1hr).",
    icon: "📈",
    category: "learning",
    color: "#3B82F6",
  },
  {
    time: "11:00 – 11:30 PM",
    duration: "30 min",
    title: "NIGHT RITUAL",
    subtitle: "Reflect on wins. Read 10 pages. Plan tomorrow. Gratitude. Lights out.",
    icon: "🌙",
    category: "mental",
    color: "#7C3AED",
  },
  {
    time: "11:30 PM",
    duration: "Sleep",
    title: "SLEEP",
    subtitle: "7.5 hrs of recovery. No compromise. Your growth happens here.",
    icon: "😴",
    category: "physical",
    color: "#1E40AF",
  },
];

const categoryColors = {
  physical: "#EF4444",
  mental: "#8B5CF6",
  career: "#F59E0B",
  learning: "#3B82F6",
};

const categoryLabels = {
  physical: "Physical",
  mental: "Mental",
  career: "Career",
  learning: "Learning",
};

export default function App() {
  const [completed, setCompleted] = useState({});
  const [filter, setFilter] = useState("all");

  const toggle = (i) => setCompleted((prev) => ({ ...prev, [i]: !prev[i] }));
  const doneCount = Object.values(completed).filter(Boolean).length;
  const percent = Math.round((doneCount / blocks.length) * 100);

  const filtered = filter === "all" ? blocks : blocks.filter((b) => b.category === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080B10",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: "0 0 60px",
      color: "#E2E8F0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .block-card {
          border: 1px solid #1E293B;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          background: #0D1117;
        }
        .block-card:hover { transform: translateX(4px); border-color: #334155; }
        .block-card.done { opacity: 0.5; }
        .block-card.big-block { padding: 28px 24px; }
        .check-circle {
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 2px solid #334155;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .check-circle.checked { background: #22C55E; border-color: #22C55E; color: #000; }
        .filter-btn {
          border: 1px solid #1E293B;
          background: transparent;
          color: #64748B;
          padding: 6px 14px;
          border-radius: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.05em;
        }
        .filter-btn.active { color: #E2E8F0; border-color: #475569; background: #1E293B; }
        .progress-fill {
          height: 4px;
          background: linear-gradient(90deg, #22C55E, #3B82F6);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .category-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .stripe { position: absolute; top: 0; left: 0; width: 4px; height: 100%; border-radius: 12px 0 0 12px; }
        .rule-card {
          background: #0D1117;
          border: 1px solid #1E293B;
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 12px;
          color: #64748B;
          letter-spacing: 0.03em;
        }
        .rule-card span { color: #94A3B8; font-weight: 500; }
      `}</style>

      <div style={{
        background: "linear-gradient(180deg, #0D1117 0%, #080B10 100%)",
        borderBottom: "1px solid #1E293B",
        padding: "48px 24px 32px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#475569", marginBottom: 12, textTransform: "uppercase" }}>
          Daily Discipline System
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(64px, 12vw, 100px)",
          letterSpacing: "0.05em",
          lineHeight: 0.9,
          background: "linear-gradient(135deg, #F8FAFC 30%, #475569)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 8,
        }}>
          BUILD THE<br />BEST YOU
        </h1>
        <p style={{ color: "#475569", fontSize: 13, marginTop: 16 }}>
          7:00 AM — 11:30 PM · Every. Single. Day.
        </p>

        <div style={{ maxWidth: 400, margin: "28px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11, color: "#475569" }}>
            <span>TODAY'S PROGRESS</span>
            <span style={{ color: percent === 100 ? "#22C55E" : "#E2E8F0" }}>{doneCount}/{blocks.length} · {percent}%</span>
          </div>
          <div style={{ background: "#1E293B", borderRadius: 2, height: 4 }}>
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "24px 0 20px" }}>
          {["all", "physical", "mental", "career", "learning"].map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "ALL" : (
                <><span className="category-dot" style={{ background: categoryColors[f] }} />{categoryLabels[f].toUpperCase()}</>
              )}
            </button>
          ))}
        </div>

        {filtered.map((block, i) => {
          const idx = blocks.indexOf(block);
          return (
            <div key={idx} className={`block-card ${block.big ? "big-block" : ""} ${completed[idx] ? "done" : ""}`} onClick={() => toggle(idx)}>
              <div className="stripe" style={{ background: block.color }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ fontSize: block.big ? 28 : 22, lineHeight: 1, paddingTop: 2 }}>{block.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.15em", marginBottom: 4 }}>
                        {block.time} · <span style={{ color: block.color }}>{block.duration}</span>
                      </div>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: block.big ? 26 : 20,
                        letterSpacing: "0.08em",
                        color: completed[idx] ? "#475569" : "#F1F5F9",
                        lineHeight: 1,
                        marginBottom: 8,
                      }}>
                        {block.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>{block.subtitle}</div>
                    </div>
                    <div className={`check-circle ${completed[idx] ? "checked" : ""}`}>{completed[idx] && "✓"}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: 32, marginBottom: 8, fontSize: 10, letterSpacing: "0.15em", color: "#475569" }}>
          NON-NEGOTIABLE RULES
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {[
            ["📵 No phone", "First 30 min & last 30 min of day. Protect your mind."],
            ["🔁 Consistency > Intensity", "Show up every day. Even 70% effort beats skipping."],
            ["💧 Hydration", "3L of water daily. Your brain is 75% water."],
            ["🎯 One goal per week", "Pick the #1 career action and do it. No scattered effort."],
            ["📵 No alcohol or late nights", "Sleep is your superpower. Guard it."],
          ].map(([title, desc]) => (
            <div key={title} className="rule-card"><span>{title} </span>— {desc}</div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: "#2D3748", letterSpacing: "0.1em" }}>
          DISCIPLINE IS CHOOSING YOUR FUTURE SELF OVER YOUR PRESENT COMFORT
        </div>
      </div>
    </div>
  );
}
