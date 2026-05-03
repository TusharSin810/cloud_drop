"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Package,
  ChevronRight,
  Clock,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const DELIVERY_TYPES = [
  {
    id: "standard",
    label: "STANDARD",
    eta: "45–60 min",
    price: "₹249",
    icon: Package,
    desc: "Reliable delivery for everyday packages",
  },
  {
    id: "express",
    label: "EXPRESS",
    eta: "15–20 min",
    price: "₹499",
    icon: Zap,
    desc: "Priority routing for time-sensitive cargo",
  },
  {
    id: "secure",
    label: "SECURE",
    eta: "30–45 min",
    price: "₹749",
    icon: Shield,
    desc: "Encrypted manifest & tamper-proof lock",
  },
];

const PACKAGE_SIZES = ["SMALL (< 1 kg)", "MEDIUM (1–5 kg)", "LARGE (5–15 kg)"];

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("express");
  const [packageSize, setPackageSize] = useState(PACKAGE_SIZES[0]);
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    name: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId] = useState(
    "CD-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => setSubmitted(true);
  const chosenType = DELIVERY_TYPES.find((t) => t.id === selectedType)!;

  /* ── ORDER CONFIRMED ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="border border-high1/30 bg-primary/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-high1 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-high1" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-high1/20 animate-ping" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-high2 mb-2 font-mono tracking-widest">
            ORDER CONFIRMED
          </h2>
          <p className="text-high2/50 font-mono text-sm mb-6">
            Your drone is being dispatched
          </p>
          <div className="bg-secondary/50 rounded-xl p-4 mb-8 border border-high1/20">
            <p className="text-high2/50 font-mono text-xs mb-1">TRACKING ID</p>
            <p className="text-high1 font-mono text-xl sm:text-2xl font-bold tracking-widest break-all">
              {trackingId}
            </p>
          </div>
          <button
            onClick={() => router.push("/tracking")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-high1 text-high2 font-mono rounded-xl hover:bg-high1 hover:text-primary transition-all duration-200 font-bold tracking-wider"
          >
            TRACK YOUR DRONE <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm({ pickup: "", dropoff: "", name: "", phone: "", notes: "" });
            }}
            className="mt-3 w-full px-6 py-3 text-high2/40 font-mono text-sm hover:text-high2 transition-colors"
          >
            Book another delivery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-high1 font-mono text-xs tracking-[0.3em] mb-2">
            DASHBOARD
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-high2 font-mono tracking-tight">
            BOOK A <span className="text-high1">DELIVERY</span>
          </h1>
          {session?.user && (
            <p className="text-high2/60 font-mono text-sm mt-2">
              Welcome back,{" "}
              <span className="text-high1 font-bold">{session.user.name}</span>
            </p>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8 sm:mb-10 font-mono text-xs overflow-x-auto pb-1 gap-0">
          {["DELIVERY TYPE", "ADDRESSES", "CONFIRM"].map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={label} className="flex items-center shrink-0">
                <div
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-all ${
                    active
                      ? "bg-high1 text-primary font-bold"
                      : done
                      ? "text-high1"
                      : "text-high2/30"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      active
                        ? "border-primary bg-primary text-high1"
                        : done
                        ? "border-high1 bg-high1 text-primary"
                        : "border-high2/20"
                    }`}
                  >
                    {done ? "✓" : num}
                  </span>
                  {/* Abbreviated on mobile */}
                  <span className="sm:hidden">{label.split(" ")[0]}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && (
                  <ChevronRight className="w-4 h-4 text-high2/20 mx-0.5 sm:mx-1 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {DELIVERY_TYPES.map((type) => {
                const Icon = type.icon;
                const active = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-5 cursor-pointer sm:p-6 rounded-2xl border transition-all duration-200 w-full ${
                      active
                        ? "border-high1 bg-high1/10"
                        : "border-secondary bg-primary/50 hover:border-high1/50 active:border-high1/50"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 sm:mb-4 ${
                        active ? "text-high1" : "text-high2/40"
                      }`}
                    />
                    <div className="font-mono font-bold text-high2 tracking-widest mb-1 text-sm sm:text-base">
                      {type.label}
                    </div>
                    <div className="text-high2/70 text-xs font-mono mb-4">
                      {type.desc}
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-1 text-high2/60 font-mono text-xs">
                        <Clock className="w-3 h-3" />
                        {type.eta}
                      </div>
                      <div className="text-high1 font-mono font-bold text-lg">
                        {type.price}
                      </div>
                    </div>
                    {active && (
                      <div className="mt-3 h-0.5 bg-linear-to-r from-high1 to-transparent rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mb-8">
              <label className="text-high2 font-bold font-mono text-xs tracking-widest mb-3 block">
                PACKAGE SIZE
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {PACKAGE_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setPackageSize(size)}
                    className={`px-4 sm:px-5 py-2 rounded-xl cursor-pointer border font-mono text-xs sm:text-sm transition-all ${
                      packageSize === size
                        ? "border-high1 bg-high1/10 text-high2 font-semibold"
                        : "border-secondary text-high2/40 hover:border-high1/40 active:border-high1/40 bg-secondary/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="flex items-center cursor-pointer justify-center gap-2 px-6 sm:px-8 py-3 bg-high1 text-primary font-mono font-bold rounded-xl hover:bg-high1/90 active:bg-high1/80 transition-all tracking-wider w-full sm:w-auto"
            >
              NEXT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="w-full max-w-xl">
            <div className="space-y-5 mb-8">
              {[
                { name: "pickup", label: "PICKUP ADDRESS", placeholder: "Enter pickup location", icon: MapPin },
                { name: "dropoff", label: "DROP-OFF ADDRESS", placeholder: "Enter destination", icon: MapPin },
                { name: "name", label: "RECIPIENT NAME", placeholder: "Full name", icon: null },
                { name: "phone", label: "RECIPIENT PHONE", placeholder: "+91 XXXXX XXXXX", icon: null },
              ].map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name}>
                    <label className="text-high2/50 font-mono text-xs tracking-widest mb-2 block">
                      {field.label}
                    </label>
                    <div className="relative">
                      {Icon && (
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-high1/60 pointer-events-none" />
                      )}
                      <input
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full bg-primary/80 border border-secondary rounded-xl py-3 pr-4 font-mono text-sm text-high2 placeholder-high2/20 focus:outline-none focus:border-high1 transition-colors ${
                          Icon ? "pl-11" : "pl-4"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              <div>
                <label className="text-high2/50 font-mono text-xs tracking-widest mb-2 block">
                  DELIVERY NOTES <span className="text-high2/25">(OPTIONAL)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Leave at door, ring bell, etc."
                  className="w-full bg-primary/80 border border-secondary rounded-xl py-3 px-4 font-mono text-sm text-high2 placeholder-high2/20 focus:outline-none focus:border-high1 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 sm:px-6 py-3 border border-secondary text-high2/60 font-mono rounded-xl hover:border-high2/30 transition-all tracking-wider"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.pickup || !form.dropoff || !form.name}
                className="flex-1 flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-high1 text-primary font-mono font-bold rounded-xl hover:bg-high1/90 active:bg-high1/80 transition-all tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              >
                REVIEW <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="w-full max-w-xl">
            <div className="border border-high1/30 bg-primary/60 backdrop-blur-sm rounded-2xl overflow-hidden mb-6">
              <div className="bg-high1/10 px-5 sm:px-6 py-4 border-b border-high1/20">
                <p className="text-high2/50 font-mono text-xs tracking-widest">ORDER SUMMARY</p>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-high2/40 font-mono text-xs">DELIVERY TYPE</p>
                    <p className="text-high2 font-mono font-bold">{chosenType.label}</p>
                    <p className="text-high2/40 font-mono text-xs">ETA: {chosenType.eta}</p>
                  </div>
                  <p className="text-high1 font-mono font-bold text-xl">{chosenType.price}</p>
                </div>
                <div className="h-px bg-secondary" />
                <div>
                  <p className="text-high2/40 font-mono text-xs mb-1">PACKAGE</p>
                  <p className="text-high2 font-mono text-sm">{packageSize}</p>
                </div>
                <div className="h-px bg-secondary" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-high2/40 font-mono text-xs mb-1">FROM</p>
                    <p className="text-high2 font-mono text-sm wrap-break-word">{form.pickup}</p>
                  </div>
                  <div>
                    <p className="text-high2/40 font-mono text-xs mb-1">TO</p>
                    <p className="text-high2 font-mono text-sm wrap-break-word">{form.dropoff}</p>
                  </div>
                </div>
                <div className="h-px bg-secondary" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-high2/40 font-mono text-xs mb-1">RECIPIENT</p>
                    <p className="text-high2 font-mono text-sm">{form.name}</p>
                  </div>
                  {form.phone && (
                    <div>
                      <p className="text-high2/40 font-mono text-xs mb-1">PHONE</p>
                      <p className="text-high2 font-mono text-sm">{form.phone}</p>
                    </div>
                  )}
                </div>
                {form.notes && (
                  <>
                    <div className="h-px bg-secondary" />
                    <div>
                      <p className="text-high2/40 font-mono text-xs mb-1">NOTES</p>
                      <p className="text-high2 font-mono text-sm">{form.notes}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-5 sm:px-6 py-3 border border-secondary text-high2/60 font-mono rounded-xl hover:border-high2/30 transition-all tracking-wider"
              >
                BACK
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-8 py-3 bg-high1 text-primary font-mono font-bold rounded-xl hover:bg-high1/90 active:bg-high1/80 transition-all tracking-wider text-sm sm:text-base"
              >
                CONFIRM & LAUNCH ↗
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}