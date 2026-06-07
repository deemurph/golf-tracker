import React, { useState, useEffect, useCallback } from "react";
import { useState, useEffect, useCallback } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const DAILY_EXERCISES = [
  {
    id: "hip9090",
    num: 1,
    name: "90/90 Hip Stretch",
    dose: "60s each side",
    tag: "Mobility",
    tagColor: "#e76f51",
    why: "Opens hip internal & external rotation — fixes pelvic rotation caution.",
    cue: "Sit tall, hinge forward over the front shin. Feel the stretch deep in the hip — not the knee.",
    image: "https://images.squarespace-cdn.com/content/v1/548a0757e4b09ef81f1770c5/1614887363698-KQXWTDUYIUA1AJSJ0GCJ/90-90+Hip+Stretch.jpg",
    video: "https://www.youtube.com/embed/XQTYYBdOqck",
    videoLabel: "90/90 Hip Stretch Tutorial",
  },
  {
    id: "hipHinge",
    num: 2,
    name: "Standing Hip Hinge (Dowel)",
    dose: "10 reps",
    tag: "Motor Control",
    tagColor: "#f4a261",
    why: "Teaches proper pelvic tilt and hip loading — addresses Toe Touch failure & S-Posture.",
    cue: "Club must stay in contact at head, upper back, and tailbone throughout. Push hips back, not down.",
    image: "https://www.stack.com/wp-content/uploads/2014/10/Hip-hinge.jpg",
    video: "https://www.youtube.com/embed/YWWBQHkSIrg",
    videoLabel: "Hip Hinge with Dowel",
  },
  {
    id: "deadBug",
    num: 3,
    name: "Dead Bug",
    dose: "8 reps each side",
    tag: "Stability",
    tagColor: "#e9c46a",
    why: "Builds the deep core control missing in the pelvic tilt pattern.",
    cue: "Press your lower back FLAT into the floor — this must not lift. Move slowly and breathe out on each rep.",
    image: "https://www.mensjournal.com/wp-content/uploads/mf/dead_bug_main.jpg",
    video: "https://www.youtube.com/embed/4XLEnwUr1d8",
    videoLabel: "Dead Bug Core Exercise",
  },
  {
    id: "thoracic",
    num: 4,
    name: "Seated Thoracic Rotation",
    dose: "10 reps each side",
    tag: "Mobility",
    tagColor: "#e76f51",
    why: "Maintains excellent torso rotation and reinforces upper/lower body separation.",
    cue: "Hips stay square and still. Only the chest and shoulders rotate. Hold 2 seconds at end range.",
    image: "https://cdn.shopify.com/s/files/1/0250/0362/2118/files/thoracic-rotation.jpg",
    video: "https://www.youtube.com/embed/p-BCeFt9C5E",
    videoLabel: "Seated Thoracic Rotation",
  },
  {
    id: "hamstring",
    num: 5,
    name: "Lying Hamstring Stretch",
    dose: "45s each side",
    tag: "Mobility",
    tagColor: "#e76f51",
    why: "Directly targets the hamstring restriction causing the Toe Touch failure.",
    cue: "Keep the down leg flat on the floor. A gentle sustained pull — no bouncing or forcing.",
    image: "https://www.acefitness.org/assets/acefit/exercise-library-images/large/supine-hamstring-stretch-with-strap_1.jpg",
    video: "https://www.youtube.com/embed/VNA6T9-tqm0",
    videoLabel: "Lying Hamstring Stretch",
  },
  {
    id: "sleeper",
    num: 6,
    name: "Sleeper Stretch",
    dose: "45s each side",
    tag: "Mobility",
    tagColor: "#e76f51",
    why: "Improves posterior shoulder capsule — addresses both shoulder 90/90 cautions.",
    cue: "Lie on your side. Use your top hand to gently push the bottom wrist toward the floor. Go slow.",
    image: "https://www.physio-pedia.com/images/thumb/5/5e/Sleeper_stretch.jpg/300px-Sleeper_stretch.jpg",
    video: "https://www.youtube.com/embed/RtmpJ7SXUPA",
    videoLabel: "Sleeper Stretch for Shoulder",
  },
];

const POWER_EXERCISES = [
  {
    id: "bandWalk",
    num: 1,
    name: "Lateral Band Walk",
    dose: "2 sets × 10 each way",
    tag: "Stability",
    tagColor: "#e9c46a",
    why: "Activates glute medius for better pelvic stability during the swing.",
    cue: "Stay low in your squat throughout. Don't let your knees cave in. Keep feet parallel.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/10/lateral-band-walk.jpg",
    video: "https://www.youtube.com/embed/Prla3gFUG8w",
    videoLabel: "Lateral Band Walk",
  },
  {
    id: "medBall",
    num: 2,
    name: "Med Ball Rotational Slam",
    dose: "2 × 8 each side",
    tag: "Power",
    tagColor: "#c77dff",
    why: "Trains the exact rotational power sequence of the golf swing.",
    cue: "Load the trail hip first. The throw comes from the hips rotating, not just the arms.",
    image: "https://www.stack.com/wp-content/uploads/2016/08/med-ball-rotational-throw.jpg",
    video: "https://www.youtube.com/embed/4MtTOsTmOPU",
    videoLabel: "Med Ball Rotational Throw",
  },
  {
    id: "slRDL",
    num: 3,
    name: "Single-Leg RDL",
    dose: "2 × 8 each side",
    tag: "Strength",
    tagColor: "#74c69d",
    why: "Strengthens hamstrings through full range, improving the hip hinge pattern.",
    cue: "Hinge at the hip, flat back, free leg straight behind you. Drive back up through your heel.",
    image: "https://www.nasm.org/wp-content/uploads/2019/09/single-leg-rdl.jpg",
    video: "https://www.youtube.com/embed/FIklN2e9ALg",
    videoLabel: "Single-Leg Romanian Deadlift",
  },
  {
    id: "chop",
    num: 4,
    name: "Half-Kneeling Band Chop",
    dose: "2 × 10 each side",
    tag: "Stability",
    tagColor: "#e9c46a",
    why: "Builds anti-rotation stability and reinforces pelvic-thoracic separation.",
    cue: "Kneeling knee is DOWN. Square your hips and shoulders before you start. Core tight throughout.",
    image: "https://www.acefitness.org/assets/acefit/exercise-library-images/large/half-kneeling-cable-chop_1.jpg",
    video: "https://www.youtube.com/embed/hA3_Ox8I2bM",
    videoLabel: "Half-Kneeling Chop",
  },
  {
    id: "jumpSquat",
    num: 5,
    name: "Jump Squat",
    dose: "3 × 5 max effort",
    tag: "Power",
    tagColor: "#c77dff",
    why: "Builds vertical ground force — the engine behind swing speed.",
    cue: "Quarter squat, then EXPLODE. Land softly through the hips. Reset fully before each rep.",
    image: "https://www.verywellfit.com/thmb/mnjTZa1ZU2K36ssFbkpTgQnG5fk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jump-squat-56a9261e3df78cf772a33fcb.jpg",
    video: "https://www.youtube.com/embed/CVaEhXotL7M",
    videoLabel: "Jump Squat Tutorial",
  },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function GolfTracker() {
  const [tab, setTab] = useState("today");
  const [logs, setLogs] = useState({});        // { "YYYY-MM-DD": { exId: {done, reps} } }
  const [calMonth, setCalMonth] = useState(() => { const d=new Date(); return {y:d.getFullYear(),m:d.getMonth()}; });
  const [openEx, setOpenEx] = useState(null);  // exercise id for modal
  const [savedMsg, setSavedMsg] = useState(false);
  const today = todayKey();

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("golf-logs");
        if (r) setLogs(JSON.parse(r.value));
      } catch(_) {}
    })();
  }, []);

  const save = useCallback(async (newLogs) => {
    setLogs(newLogs);
    try {
      await window.storage.set("golf-logs", JSON.stringify(newLogs));
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 1800);
    } catch(_) {}
  }, []);

  const toggleDone = (date, exId) => {
    const prev = logs[date]?.[exId] || {};
    const newLogs = {
      ...logs,
      [date]: { ...logs[date], [exId]: { ...prev, done: !prev.done } }
    };
    save(newLogs);
  };

  const setReps = (date, exId, val) => {
    const prev = logs[date]?.[exId] || {};
    const newLogs = {
      ...logs,
      [date]: { ...logs[date], [exId]: { ...prev, reps: val } }
    };
    save(newLogs);
  };

  const isPowerDay = (dateStr) => {
    const d = new Date(dateStr + "T12:00:00");
    const dow = d.getDay();
    return dow === 2 || dow === 5; // Tue/Fri
  };

  const getDayStatus = (dateStr) => {
    const dayLog = logs[dateStr] || {};
    const exercises = isPowerDay(dateStr)
      ? [...DAILY_EXERCISES, ...POWER_EXERCISES]
      : DAILY_EXERCISES;
    const done = exercises.filter(e => dayLog[e.id]?.done).length;
    if (done === 0) return "none";
    if (done === exercises.length) return "full";
    return "partial";
  };

  const todayExercises = isPowerDay(today)
    ? [...DAILY_EXERCISES, ...POWER_EXERCISES]
    : DAILY_EXERCISES;

  const todayDone = todayExercises.filter(e => logs[today]?.[e.id]?.done).length;
  const todayPct = Math.round((todayDone / todayExercises.length) * 100);

  // streak
  let streak = 0;
  for (let i=0; i<90; i++) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const s = getDayStatus(k);
    if (s === "full") streak++;
    else if (i > 0) break;
  }

  // calendar helpers
  const firstDay = new Date(calMonth.y, calMonth.m, 1).getDay();
  const daysInMonth = new Date(calMonth.y, calMonth.m+1, 0).getDate();

  const exModal = openEx
    ? [...DAILY_EXERCISES, ...POWER_EXERCISES].find(e => e.id === openEx)
    : null;

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div style={styles.root}>
      {/* BG */}
      <div style={styles.bg} />

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Golf Fitness Program</div>
          <h1 style={styles.h1}>SWING <span style={{color:"#e9c46a"}}>LAB</span></h1>
          <div style={styles.subhead}>Age 14 · 85 mph Driver · TPI Assessed</div>
        </div>
        <div style={styles.statsRow}>
          <Stat val={`${todayPct}%`} label="Today" color="#74c69d" />
          <Stat val={streak} label="Day Streak" color="#e9c46a" />
          <Stat val={Object.keys(logs).filter(k=>getDayStatus(k)==="full").length} label="Full Days" color="#c77dff" />
        </div>
      </header>

      {/* SAVE TOAST */}
      {savedMsg && (
        <div style={styles.toast}>✓ Progress saved</div>
      )}

      {/* TABS */}
      <div style={styles.tabs}>
        {[["today","Today"], ["exercises","Exercises"], ["calendar","Calendar"]].map(([k,l]) => (
          <button key={k} style={{...styles.tab, ...(tab===k?styles.tabActive:{})}} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>

      {/* ── TODAY TAB ── */}
      {tab === "today" && (
        <div style={styles.content}>
          <div style={styles.dayBanner}>
            <div>
              <div style={styles.dayLabel}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
              <div style={styles.dayType}>
                {isPowerDay(today)
                  ? "💪 Daily Mobility + Power Day (Tue/Fri)"
                  : "🏌️ Daily Mobility Routine"}
              </div>
            </div>
            <ProgressRing pct={todayPct} />
          </div>

          {isPowerDay(today) && (
            <SectionDivider label="Daily Mobility — 15 min" color="#74c69d" />
          )}

          {DAILY_EXERCISES.map(ex => (
            <ExerciseRow
              key={ex.id} ex={ex} date={today}
              log={logs[today]?.[ex.id] || {}}
              onToggle={()=>toggleDone(today, ex.id)}
              onReps={v=>setReps(today, ex.id, v)}
              onOpen={()=>setOpenEx(ex.id)}
            />
          ))}

          {isPowerDay(today) && <>
            <SectionDivider label="Power Session — +15 min" color="#c77dff" />
            {POWER_EXERCISES.map(ex => (
              <ExerciseRow
                key={ex.id} ex={ex} date={today}
                log={logs[today]?.[ex.id] || {}}
                onToggle={()=>toggleDone(today, ex.id)}
                onReps={v=>setReps(today, ex.id, v)}
                onOpen={()=>setOpenEx(ex.id)}
              />
            ))}
          </>}
        </div>
      )}

      {/* ── EXERCISES TAB ── */}
      {tab === "exercises" && (
        <div style={styles.content}>
          <SectionDivider label="Daily Mobility — Every Day" color="#74c69d" />
          {DAILY_EXERCISES.map(ex => (
            <ExerciseCard key={ex.id} ex={ex} onOpen={()=>setOpenEx(ex.id)} />
          ))}
          <SectionDivider label="Power Session — Tuesday & Friday" color="#c77dff" />
          {POWER_EXERCISES.map(ex => (
            <ExerciseCard key={ex.id} ex={ex} onOpen={()=>setOpenEx(ex.id)} />
          ))}
        </div>
      )}

      {/* ── CALENDAR TAB ── */}
      {tab === "calendar" && (
        <div style={styles.content}>
          <div style={styles.calHeader}>
            <button style={styles.calNav} onClick={()=>setCalMonth(p=>{
              const m=p.m-1<0?11:p.m-1; const y=p.m-1<0?p.y-1:p.y;
              return {y,m};
            })}>‹</button>
            <span style={styles.calTitle}>{MONTHS[calMonth.m]} {calMonth.y}</span>
            <button style={styles.calNav} onClick={()=>setCalMonth(p=>{
              const m=p.m+1>11?0:p.m+1; const y=p.m+1>11?p.y+1:p.y;
              return {y,m};
            })}>›</button>
          </div>

          <div style={styles.calLegend}>
            <span style={styles.legendItem}><span style={{...styles.dot,background:"#74c69d"}}/>Complete</span>
            <span style={styles.legendItem}><span style={{...styles.dot,background:"#e9c46a"}}/>Partial</span>
            <span style={styles.legendItem}><span style={{...styles.dot,background:"#444"}}/>None</span>
            <span style={styles.legendItem}><span style={{...styles.dot,background:"#c77dff"}}/>Power Day</span>
          </div>

          <div style={styles.calGrid}>
            {DAYS.map(d=><div key={d} style={styles.calDayHead}>{d}</div>)}
            {Array.from({length: firstDay}).map((_,i)=><div key={"e"+i}/>)}
            {Array.from({length: daysInMonth}).map((_,i)=>{
              const day = i+1;
              const k = `${calMonth.y}-${String(calMonth.m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
              const status = getDayStatus(k);
              const isPow = isPowerDay(k);
              const isToday = k === today;
              const isFuture = k > today;
              return (
                <div key={day} style={{
                  ...styles.calDay,
                  ...(isToday ? styles.calDayToday : {}),
                  ...(isFuture ? styles.calDayFuture : {}),
                  borderColor: isPow ? "rgba(199,125,255,0.35)" : "rgba(255,255,255,0.06)",
                }}>
                  <span style={styles.calDayNum}>{day}</span>
                  {isPow && <span style={styles.calPowBadge}>P</span>}
                  {!isFuture && status !== "none" && (
                    <div style={{
                      ...styles.calStatusDot,
                      background: status==="full"?"#74c69d":"#e9c46a"
                    }}/>
                  )}
                </div>
              );
            })}
          </div>

          {/* Weekly summary */}
          <WeeklySummary logs={logs} getDayStatus={getDayStatus} isPowerDay={isPowerDay} />
        </div>
      )}

      {/* ── MODAL ── */}
      {exModal && (
        <div style={styles.modalOverlay} onClick={()=>setOpenEx(null)}>
          <div style={styles.modal} onClick={e=>e.stopPropagation()}>
            <button style={styles.modalClose} onClick={()=>setOpenEx(null)}>✕</button>
            <div style={{...styles.modalTag, background: exModal.tagColor+"25", color: exModal.tagColor}}>{exModal.tag}</div>
            <h2 style={styles.modalTitle}>{exModal.name}</h2>
            <p style={styles.modalDose}>📋 {exModal.dose}</p>

            {/* Image */}
            <div style={styles.modalImgWrap}>
              <img
                src={exModal.image}
                alt={exModal.name}
                style={styles.modalImg}
                onError={e => { e.target.style.display="none"; }}
              />
            </div>

            {/* Video */}
            <div style={styles.videoWrap}>
              <iframe
                src={exModal.video}
                title={exModal.videoLabel}
                style={styles.video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Why this exercise?</div>
              <p style={styles.modalText}>{exModal.why}</p>
            </div>
            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Coaching cue</div>
              <p style={styles.modalText}>{exModal.cue}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function Stat({val, label, color}) {
  return (
    <div style={styles.stat}>
      <div style={{...styles.statVal, color}}>{val}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function ProgressRing({pct}) {
  const r = 28, c = 2*Math.PI*r;
  const dash = (pct/100)*c;
  return (
    <svg width={72} height={72} style={{flexShrink:0}}>
      <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5}/>
      <circle cx={36} cy={36} r={r} fill="none" stroke="#74c69d" strokeWidth={5}
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
        transform="rotate(-90 36 36)" style={{transition:"stroke-dasharray 0.5s"}}/>
      <text x={36} y={40} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="600">{pct}%</text>
    </svg>
  );
}

function SectionDivider({label, color}) {
  return (
    <div style={{...styles.sectionDiv, borderColor: color+"55"}}>
      <span style={{...styles.sectionDivLabel, color}}>{label}</span>
    </div>
  );
}

function ExerciseRow({ex, date, log, onToggle, onReps, onOpen}) {
  return (
    <div style={{...styles.exRow, ...(log.done ? styles.exRowDone : {})}}>
      <button style={{...styles.check, ...(log.done?styles.checkDone:{})}} onClick={onToggle}>
        {log.done ? "✓" : ""}
      </button>
      <div style={styles.exRowBody}>
        <div style={styles.exRowName} onClick={onOpen}>{ex.num}. {ex.name}</div>
        <div style={styles.exRowDose}>{ex.dose}</div>
        <div style={{...styles.exRowTag, background:ex.tagColor+"22", color:ex.tagColor}}>{ex.tag}</div>
      </div>
      <div style={styles.exRowRight}>
        <input
          type="number"
          placeholder="reps"
          value={log.reps || ""}
          onChange={e=>onReps(e.target.value)}
          style={styles.repsInput}
          min={0}
        />
        <button style={styles.infoBtn} onClick={onOpen} title="View exercise">▶</button>
      </div>
    </div>
  );
}

function ExerciseCard({ex, onOpen}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.exCard}>
      <div style={styles.exCardTop}>
        <div style={{...styles.exCardNum, color:ex.tagColor}}>{String(ex.num).padStart(2,"0")}</div>
        <div style={styles.exCardBody}>
          <div style={styles.exCardName}>{ex.name}</div>
          <div style={styles.exCardDose}>{ex.dose}</div>
          <div style={{...styles.exCardTag, background:ex.tagColor+"22", color:ex.tagColor}}>{ex.tag}</div>
          <div style={styles.exCardWhy}>{ex.why}</div>
        </div>
        <button style={{...styles.exCardBtn, borderColor:ex.tagColor+"55", color:ex.tagColor}}
          onClick={()=>{ setOpen(!open); }}>
          {open?"Hide":"Watch"}
        </button>
      </div>
      {open && (
        <div style={styles.exCardMedia}>
          <img src={ex.image} alt={ex.name} style={styles.exCardImg}
            onError={e=>{e.target.style.display="none";}} />
          <div style={styles.videoWrap}>
            <iframe src={ex.video} title={ex.videoLabel} style={styles.video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
          <div style={styles.exCardCue}><strong>Cue:</strong> {ex.cue}</div>
        </div>
      )}
    </div>
  );
}

function WeeklySummary({logs, getDayStatus, isPowerDay}) {
  const weeks = [];
  const now = new Date();
  for (let w=3; w>=0; w--) {
    const weekData = [];
    for (let d=0; d<7; d++) {
      const date = new Date(now);
      date.setDate(now.getDate() - now.getDay() - w*7 + d);
      const k = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
      weekData.push({ k, day: date.getDate(), status: getDayStatus(k), isPow: isPowerDay(k), future: k>todayKey() });
    }
    weeks.push(weekData);
  }

  return (
    <div style={styles.weekSummary}>
      <div style={styles.weekSummaryTitle}>Last 4 Weeks</div>
      {weeks.map((week,wi)=>(
        <div key={wi} style={styles.weekRow}>
          {week.map(({k,day,status,isPow,future})=>(
            <div key={k} style={{
              ...styles.weekCell,
              background: future?"transparent": status==="full"?"#74c69d": status==="partial"?"#e9c46a22":"rgba(255,255,255,0.04)",
              borderColor: isPow?"rgba(199,125,255,0.4)":"rgba(255,255,255,0.08)",
              opacity: future?0.3:1,
            }}>
              <span style={{fontSize:11, color: status==="full"?"#1a2e22": status==="partial"?"#e9c46a":"#666"}}>{day}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#111820",
    color: "#eef0f2",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    fontWeight: 300,
    position: "relative",
    overflowX: "hidden",
  },
  bg: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    background: "radial-gradient(ellipse at 10% 20%, rgba(45,106,79,0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(199,125,255,0.07) 0%, transparent 50%)",
  },
  header: {
    position: "relative", zIndex: 1,
    padding: "28px 20px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
    flexWrap: "wrap", gap: 16,
  },
  eyebrow: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#40916c", marginBottom: 4 },
  h1: { fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: -1 },
  subhead: { fontSize: 12, color: "#6c7a8a", marginTop: 4 },
  statsRow: { display: "flex", gap: 20 },
  stat: { textAlign: "right" },
  statVal: { fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, lineHeight: 1 },
  statLabel: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#6c7a8a", marginTop: 2 },
  toast: {
    position: "fixed", top: 12, right: 16, zIndex: 999,
    background: "#2d6a4f", color: "#d8f3dc", padding: "8px 16px",
    borderRadius: 8, fontSize: 13, fontWeight: 500,
  },
  tabs: {
    position: "relative", zIndex: 1,
    display: "flex", gap: 4, padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  tab: {
    padding: "8px 18px", borderRadius: 8, border: "none",
    background: "transparent", color: "#6c7a8a",
    fontSize: 13, fontWeight: 500, cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "rgba(64,145,108,0.15)", color: "#74c69d",
    border: "1px solid rgba(64,145,108,0.3)",
  },
  content: { position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "16px 16px 80px" },

  dayBanner: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14, padding: "18px 20px", marginBottom: 16,
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  dayLabel: { fontSize: 14, color: "#eef0f2", fontWeight: 500 },
  dayType: { fontSize: 12, color: "#6c7a8a", marginTop: 4 },

  sectionDiv: {
    borderLeft: "3px solid", borderRadius: "0 6px 6px 0",
    padding: "8px 12px", margin: "20px 0 10px",
    background: "rgba(255,255,255,0.02)",
  },
  sectionDivLabel: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 },

  exRow: {
    display: "flex", alignItems: "center", gap: 12,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10, padding: "12px 14px", marginBottom: 8,
    transition: "all 0.2s",
  },
  exRowDone: { background: "rgba(64,145,108,0.1)", borderColor: "rgba(64,145,108,0.3)" },
  check: {
    width: 28, height: 28, borderRadius: 8,
    border: "2px solid rgba(255,255,255,0.2)", background: "transparent",
    color: "#74c69d", fontSize: 14, fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "all 0.2s",
  },
  checkDone: { background: "#2d6a4f", borderColor: "#74c69d" },
  exRowBody: { flex: 1, minWidth: 0 },
  exRowName: { fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 2 },
  exRowDose: { fontSize: 11, color: "#6c7a8a" },
  exRowTag: { display: "inline-block", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
    padding: "2px 7px", borderRadius: 4, fontWeight: 600, marginTop: 4 },
  exRowRight: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
  repsInput: {
    width: 60, padding: "4px 8px", borderRadius: 6,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#eef0f2", fontSize: 12, textAlign: "center",
    outline: "none",
  },
  infoBtn: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    color: "#9da8b4", borderRadius: 6, padding: "4px 8px",
    fontSize: 11, cursor: "pointer",
  },

  exCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12, padding: "16px", marginBottom: 10, overflow: "hidden",
  },
  exCardTop: { display: "flex", gap: 14, alignItems: "flex-start" },
  exCardNum: { fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 900, lineHeight: 1, flexShrink: 0 },
  exCardBody: { flex: 1 },
  exCardName: { fontSize: 15, fontWeight: 600, marginBottom: 3 },
  exCardDose: { fontSize: 12, color: "#6c7a8a", marginBottom: 5 },
  exCardTag: { display: "inline-block", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
    padding: "2px 8px", borderRadius: 4, fontWeight: 600 },
  exCardWhy: { fontSize: 12, color: "#74c69d", marginTop: 6, fontStyle: "italic" },
  exCardBtn: {
    padding: "6px 14px", borderRadius: 8, border: "1px solid",
    background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 500,
    flexShrink: 0, transition: "all 0.2s",
  },
  exCardMedia: { marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16 },
  exCardImg: { width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 8, marginBottom: 12 },
  exCardCue: { fontSize: 12, color: "#9da8b4", marginTop: 12, lineHeight: 1.7,
    background: "rgba(233,196,106,0.07)", borderLeft: "3px solid #e9c46a55",
    padding: "8px 12px", borderRadius: "0 6px 6px 0" },

  videoWrap: { position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 8, overflow: "hidden" },
  video: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" },

  modalOverlay: {
    position: "fixed", inset: 0, zIndex: 100,
    background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 16,
  },
  modal: {
    background: "#1a2230", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16, padding: 24, maxWidth: 520, width: "100%",
    maxHeight: "90vh", overflowY: "auto", position: "relative",
  },
  modalClose: {
    position: "absolute", top: 14, right: 14,
    background: "rgba(255,255,255,0.08)", border: "none",
    color: "#eef0f2", borderRadius: 8, width: 30, height: 30,
    cursor: "pointer", fontSize: 14,
  },
  modalTag: { display: "inline-block", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
    padding: "3px 10px", borderRadius: 5, fontWeight: 600, marginBottom: 8 },
  modalTitle: { fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, marginBottom: 6 },
  modalDose: { fontSize: 13, color: "#9da8b4", marginBottom: 16 },
  modalImgWrap: { marginBottom: 14, borderRadius: 10, overflow: "hidden" },
  modalImg: { width: "100%", maxHeight: 200, objectFit: "cover" },
  modalSection: { marginTop: 14 },
  modalSectionTitle: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
    color: "#40916c", marginBottom: 6, fontWeight: 600 },
  modalText: { fontSize: 13, color: "#9da8b4", lineHeight: 1.8 },

  calHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  calTitle: { fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 },
  calNav: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#eef0f2", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 18 },
  calLegend: { display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 },
  legendItem: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6c7a8a" },
  dot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 24 },
  calDayHead: { fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#6c7a8a",
    textAlign: "center", padding: "4px 0" },
  calDay: {
    aspectRatio: "1", borderRadius: 8, border: "1px solid",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    position: "relative", background: "rgba(255,255,255,0.03)",
  },
  calDayToday: { boxShadow: "0 0 0 2px #74c69d", background: "rgba(64,145,108,0.12)" },
  calDayFuture: { opacity: 0.35 },
  calDayNum: { fontSize: 12 },
  calPowBadge: { fontSize: 8, color: "#c77dff", letterSpacing: 0.5, textTransform: "uppercase", marginTop: 1 },
  calStatusDot: { width: 6, height: 6, borderRadius: "50%", marginTop: 2 },

  weekSummary: { marginTop: 8 },
  weekSummaryTitle: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#6c7a8a", marginBottom: 10 },
  weekRow: { display: "flex", gap: 4, marginBottom: 4 },
  weekCell: {
    flex: 1, height: 32, borderRadius: 6, border: "1px solid",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};
