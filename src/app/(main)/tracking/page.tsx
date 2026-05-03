"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Package,
  CheckCircle2,
  Radio,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
 
const STATUSES = [
  { key: "ORDER_PLACED",   label: "ORDER PLACED",      desc: "Your booking is confirmed" },
  { key: "DRONE_ASSIGNED", label: "DRONE ASSIGNED",    desc: "Unit CD-7 dispatched" },
  { key: "PICKED_UP",      label: "PACKAGE PICKED UP", desc: "En route to destination" },
  { key: "IN_TRANSIT",     label: "IN TRANSIT",        desc: "ETA ~12 minutes" },
  { key: "DELIVERED",      label: "DELIVERED",         desc: "Package left at door" },
];
 
const DRONE_PATH = [
  { lat: 28.671, lng: 77.450 },
  { lat: 28.673, lng: 77.453 },
  { lat: 28.676, lng: 77.458 },
  { lat: 28.679, lng: 77.461 },
  { lat: 28.682, lng: 77.465 },
];
 
function DroneMap({ progress }: { progress: number }) {
  const droneIndex = Math.min(Math.floor(progress / 25), DRONE_PATH.length - 1);
  const dronePos = DRONE_PATH[droneIndex];
 
  const toSvg = (lat: number, lng: number) => ({
    x: ((lng - 77.449) / 0.017) * 420 + 30,
    y: 200 - ((lat - 28.670) / 0.013) * 160,
  });
 
  const pathPoints = DRONE_PATH.map((p) => toSvg(p.lat, p.lng));
  const droneXY = toSvg(dronePos.lat, dronePos.lng);
  const pathD = pathPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const donePath = pathPoints
    .slice(0, droneIndex + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
 
  return (
    <div className="relative w-full aspect-[5/3] bg-[#1a1f26] rounded-2xl overflow-hidden border border-secondary">
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 480 200" preserveAspectRatio="none">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={200} stroke="#0092CA" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40} x2={480} y2={i * 40} stroke="#0092CA" strokeWidth="0.5" />
        ))}
      </svg>
 
      {/* Route & drone */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        {/* Dim full path */}
        <path d={pathD} fill="none" stroke="#0092CA" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.25" />
        {/* Completed segment */}
        <path d={donePath} fill="none" stroke="#0092CA" strokeWidth="2" opacity="0.9" />
 
        {/* Origin */}
        <circle cx={pathPoints[0].x} cy={pathPoints[0].y} r="5" fill="#393E46" stroke="#0092CA" strokeWidth="2" />
        <text x={pathPoints[0].x + 8} y={pathPoints[0].y + 4} fill="#EEEEEE" fontSize="8" fontFamily="monospace" opacity="0.6">PICKUP</text>
 
        {/* Destination */}
        <circle cx={pathPoints[4].x} cy={pathPoints[4].y} r="5" fill="#393E46" stroke="#0092CA" strokeWidth="2" />
        <text x={pathPoints[4].x - 52} y={pathPoints[4].y + 4} fill="#EEEEEE" fontSize="8" fontFamily="monospace" opacity="0.6">DROP-OFF</text>
 
        {/* Drone pulse */}
        <circle cx={droneXY.x} cy={droneXY.y} r="14" fill="#0092CA" opacity="0.12" />
        <circle cx={droneXY.x} cy={droneXY.y} r="7" fill="#0092CA" opacity="0.35" />
        <text x={droneXY.x} y={droneXY.y + 4} textAnchor="middle" fontSize="10" fill="#EEEEEE">✦</text>
      </svg>
 
      {/* LIVE badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-primary/80 px-3 py-1.5 rounded-lg border border-secondary">
        <Radio className="w-3 h-3 text-high1 animate-pulse" />
        <span className="font-mono text-high2/70 text-xs">LIVE</span>
      </div>
 
      {/* Speed */}
      <div className="absolute bottom-3 right-3 bg-primary/80 px-3 py-1.5 rounded-lg border border-secondary font-mono text-xs text-high1">
        {Math.round(progress * 0.3 + 20)} km/h
      </div>
    </div>
  );
}
 
export default function TrackingPage() {
  const router = useRouter();
  const [trackingInput, setTrackingInput] = useState("");
  const [tracked, setTracked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
 
  useEffect(() => {
    if (!tracked) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 0.4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [tracked]);
 
  useEffect(() => {
    if (progress < 5) setCurrentStep(0);
    else if (progress < 20) setCurrentStep(1);
    else if (progress < 40) setCurrentStep(2);
    else if (progress < 80) setCurrentStep(3);
    else setCurrentStep(4);
  }, [progress]);
 
  const handleTrack = () => { if (trackingInput.length >= 4) setTracked(true); };
  const eta = Math.max(0, Math.round((1 - progress / 100) * 18));
 
  return (
    <div className="min-h-screen px-4 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">
 
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-high2/40 font-mono text-xs hover:text-high1 transition-colors mb-5"
          >
            <ArrowLeft className="w-3 h-3" /> BACK TO DASHBOARD
          </button>
          <p className="text-high1 font-mono text-xs tracking-[0.3em] mb-2">
            CLOUD DROP / TRACKING
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-high2 font-mono tracking-tight">
            TRACK YOUR <span className="text-high1">DRONE</span>
          </h1>
        </div>
 
        {/* ── INPUT SCREEN ── */}
        {!tracked ? (
          <div className="max-w-md">
            <label className="text-high2/50 font-mono text-xs tracking-widest mb-3 block">
              ENTER TRACKING ID
            </label>
            <div className="flex gap-3">
              <input
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
                placeholder="CD-XXXXXX"
                className="flex-1 min-w-0 bg-primary/80 border border-secondary rounded-xl py-3 px-4 font-mono text-sm text-high2 placeholder-high2/20 focus:outline-none focus:border-high1 transition-colors tracking-widest"
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={trackingInput.length < 4}
                className="px-5 sm:px-6 py-3 bg-high1 text-primary font-mono font-bold rounded-xl hover:bg-high1/90 active:bg-high1/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed tracking-wider flex-shrink-0"
              >
                TRACK
              </button>
            </div>
            <p className="text-high2/25 font-mono text-xs mt-3">
              Find your tracking ID in the order confirmation screen
            </p>
            <button
              onClick={() => { setTrackingInput("CD-DEMO1"); setTimeout(() => setTracked(true), 100); }}
              className="mt-6 text-high1/60 font-mono text-xs hover:text-high1 transition-colors underline underline-offset-4"
            >
              Try a demo tracking →
            </button>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6">
 
            {/* Stats bar — 2×2 on mobile, 4 cols on md */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: "TRACKING ID", value: trackingInput || "CD-DEMO1", icon: Package },
                { label: "STATUS",      value: STATUSES[currentStep]?.label.split(" ")[0] + "...", icon: Radio },
                { label: "ETA",         value: progress >= 100 ? "DELIVERED" : `~${eta} MIN`, icon: Clock },
                { label: "PROGRESS",    value: `${Math.round(progress)}%`, icon: ChevronRight },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-primary/60 border border-secondary rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3 h-3 text-high1 flex-shrink-0" />
                      <p className="text-high2/40 font-mono text-xs truncate">{stat.label}</p>
                    </div>
                    <p className="text-high2 font-mono font-bold text-sm tracking-wider truncate">{stat.value}</p>
                  </div>
                );
              })}
            </div>
 
            {/* Map */}
            <DroneMap progress={progress} />
 
            {/* Progress bar */}
            <div>
              <div className="flex justify-between font-mono text-xs text-high2/40 mb-2">
                <span>PICKUP</span>
                <span>DROP-OFF</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-high1 to-high1/60 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
 
            {/* Timeline */}
            <div className="border border-secondary bg-primary/60 rounded-2xl overflow-hidden">
              <div className="bg-high1/10 px-5 sm:px-6 py-4 border-b border-secondary">
                <p className="text-high2/50 font-mono text-xs tracking-widest">DELIVERY TIMELINE</p>
              </div>
              <div className="p-5 sm:p-6">
                {STATUSES.map((status, i) => {
                  const done   = i < currentStep;
                  const active = i === currentStep;
                  const pending = i > currentStep;
                  return (
                    <div key={status.key} className="flex gap-3 sm:gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            done    ? "border-high1 bg-high1"
                            : active ? "border-high1 bg-transparent"
                            :          "border-secondary bg-transparent"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                          ) : active ? (
                            <div className="w-2 h-2 rounded-full bg-high1 animate-pulse" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                          )}
                        </div>
                        {i < STATUSES.length - 1 && (
                          <div className={`w-px flex-1 my-1 min-h-5 ${done ? "bg-high1/40" : "bg-secondary"}`} />
                        )}
                      </div>
                      <div className="pb-5">
                        <p className={`font-mono font-bold text-sm tracking-wider ${
                          pending ? "text-high2/25" : active ? "text-high1" : "text-high2"
                        }`}>
                          {status.label}
                        </p>
                        <p className={`font-mono text-xs mt-0.5 ${pending ? "text-high2/15" : "text-high2/40"}`}>
                          {status.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
 
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setTracked(false); setTrackingInput(""); setProgress(0); setCurrentStep(0); }}
                className="px-6 py-3 border border-secondary text-high2/50 font-mono text-sm rounded-xl hover:border-high2/30 transition-all tracking-wider text-center"
              >
                TRACK ANOTHER
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-high1 text-high2 font-mono text-sm rounded-xl hover:bg-high1 hover:text-primary transition-all tracking-wider font-bold"
              >
                BOOK NEW DELIVERY <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 