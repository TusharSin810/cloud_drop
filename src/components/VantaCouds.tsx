"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

export default function VantaClouds({
  enabled = true,
  mobileDisabled = true,
  options = {},
}: {
  enabled?: boolean;
  mobileDisabled?: boolean;
  options?: Record<string, any>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;
    if (mobileDisabled && typeof window !== "undefined" && window.innerWidth < 10) return;

    let cancelled = false;

    async function init() {
      const waitFor = (name: string, timeout = 5000) =>
        new Promise<void>((resolve, reject) => {
          const start = Date.now();
          (function check() {
            // @ts-ignore
            if ((window as any)[name]) return resolve();
            if (Date.now() - start > timeout) return reject(new Error(`${name} not found`));
            setTimeout(check, 50);
          })();
        });

      try {
        await waitFor("THREE");
        await waitFor("VANTA");

        if (cancelled) return;
        if (!containerRef.current) return;

        // @ts-ignore
        const v = (window as any).VANTA?.CLOUDS2?.({
          el: containerRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 0,
          minWidth: 0,
          scale: 1.5,
          scaleMobile: 2.0,
          backgroundColor: 0x000000,
          speed: .8,
          ...options,
        });

        vantaRef.current = v;
      } catch (err) {
        console.warn("Vanta failed to initialize:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (vantaRef.current && typeof vantaRef.current.destroy === "function") {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, [enabled, mobileDisabled, JSON.stringify(options)]);

  return (
    <>
      <Script
        id="three-cdn"
        strategy="afterInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
      />
      <Script
        id="vanta-cdn"
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds2.min.js"
      />
      <div
        ref={containerRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "screen",
          pointerEvents: "none", 
        }}
      />
    </>
  );
}