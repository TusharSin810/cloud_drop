"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    category: "DELIVERY",
    items: [
      {
        q: "How does CloudDrop drone delivery work?",
        a: "Once you place an order on our dashboard, we assign a drone from the nearest hub. The drone picks up your package, navigates autonomously to your drop-off location, and delivers it directly. You can track the drone in real-time throughout the entire journey.",
      },
      {
        q: "What is the maximum delivery range?",
        a: "Our drones currently operate within a 15 km radius of our hubs. We're actively expanding our hub network across Noida and Delhi NCR, so coverage is growing every month.",
      },
      {
        q: "How long does a delivery take?",
        a: "Delivery times depend on the plan you choose — Standard is 45–60 min, Express is 15–20 min, and Secure is 30–45 min. These estimates factor in distance, weather, and current fleet availability.",
      },
      {
        q: "Can I schedule a delivery in advance?",
        a: "Scheduled deliveries are currently in beta for our Secure plan users. We're rolling out advance scheduling for all plans soon. Stay tuned for updates.",
      },
    ],
  },
  {
    category: "PACKAGES",
    items: [
      {
        q: "What package sizes and weights are supported?",
        a: "We support three sizes: Small (under 1 kg), Medium (1–5 kg), and Large (5–15 kg). Packages must also fit within 40×40×30 cm. Oversized or overweight items cannot currently be transported.",
      },
      {
        q: "What items are prohibited from drone delivery?",
        a: "We do not transport hazardous materials, flammable liquids, pressurised containers, live animals, perishable food (without special packaging), or any items prohibited by Indian aviation regulations.",
      },
      {
        q: "Is my package insured during delivery?",
        a: "Yes. All deliveries are covered up to ₹5,000 by default. Our Secure plan includes enhanced coverage up to ₹25,000 with a tamper-evident lock and encrypted delivery manifest.",
      },
    ],
  },
  {
    category: "PRICING & PAYMENT",
    items: [
      {
        q: "How is delivery pricing calculated?",
        a: "Base pricing depends on your chosen plan (Standard ₹49, Express ₹99, Secure ₹149). Distance surcharges may apply beyond 10 km. There are no hidden fees — the final price is shown before you confirm.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI, all major credit/debit cards, and net banking through our secure payment gateway. Cash on delivery is not supported for drone deliveries.",
      },
      {
        q: "Do you offer refunds if a delivery fails?",
        a: "Absolutely. If a delivery fails due to a drone malfunction, weather abort, or any fault on our end, you receive a full refund within 24 hours. If you provided an incorrect address, a re-delivery fee may apply.",
      },
    ],
  },
  {
    category: "SAFETY & TECHNOLOGY",
    items: [
      {
        q: "Is drone delivery safe for people and property?",
        a: "Safety is our top priority. Our drones use multi-sensor collision avoidance, fly at regulated altitudes (typically 100–150 m), and have automatic return-to-base protocols on low battery or signal loss. All operations comply with DGCA regulations.",
      },
      {
        q: "What happens if the drone encounters bad weather?",
        a: "Our drones are rated for light rain and moderate wind (up to 40 km/h). In conditions beyond safe thresholds — heavy rain, storms, or high winds — deliveries are automatically paused and rescheduled. You'll be notified immediately.",
      },
      {
        q: "How accurate is real-time tracking?",
        a: "Tracking updates every 2–3 seconds using GPS with a positional accuracy of under 1 metre. You can see altitude, speed, and estimated arrival time live on your tracking page.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-high1/50 bg-high1/5" : "border-secondary bg-transparent hover:border-high1/25"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className={`font-mono text-sm sm:text-base font-medium leading-snug transition-colors ${
            open ? "text-high2" : "text-high2/80"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
            open ? "border-high1 bg-high1 text-primary" : "border-secondary text-high2/40"
          }`}
        >
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-high1/20 mb-4" />
          <p className="text-high2/60 font-mono text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("DELIVERY");
  const categories = FAQS.map((f) => f.category);
  const activeItems = FAQS.find((f) => f.category === activeCategory)?.items ?? [];

  return (
    <section id="faq" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p className="text-high1 font-mono text-xs tracking-[0.3em] mb-3">
            CLOUD DROP / FAQ
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-high2 font-mono tracking-tight mb-4">
            FREQUENTLY ASKED{" "}
            <span className="text-high1">QUESTIONS</span>
          </h2>
          <p className="text-high2/40 font-mono text-sm max-w-xl">
            Everything you need to know about drone delivery with CloudDrop.
            Can't find an answer?{" "}
            <a href="mailto:support@clouddrop.in" className="text-high1 hover:underline underline-offset-4">
              Contact support.
            </a>
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl border font-mono text-xs tracking-widest transition-all ${
                activeCategory === cat
                  ? "border-high1 bg-high1 text-primary font-bold"
                  : "border-secondary text-high2/50 hover:border-high1/40 hover:text-high2"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {activeItems.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 border border-high1/20 bg-high1/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-high2 font-mono font-bold text-base sm:text-lg tracking-wider mb-1">
              STILL HAVE QUESTIONS?
            </p>
            <p className="text-high2/40 font-mono text-sm">
              Our support team responds within 2 hours.
            </p>
          </div>
          <a
            href="mailto:support@clouddrop.in"
            className="flex-shrink-0 px-6 py-3 border border-high1 text-high2 font-mono font-bold text-sm rounded-xl hover:bg-high1 hover:text-primary transition-all tracking-wider"
          >
            GET IN TOUCH ↗
          </a>
        </div>
      </div>
    </section>
  );
}