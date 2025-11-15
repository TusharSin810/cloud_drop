'use client'
import React, { useRef, useState, useEffect } from "react";

type Props = {
  src: string;
  poster?: string;
  loop?: boolean;
};

export default function LandingVideoPlayer({ src, poster, loop = true }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = loop;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [loop]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      await v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
   <section className="bg-primary text-high2 py-16">
            <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-12">
                HOW WE WORK
            </h2>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-secondary)] mx-auto" style={{ width: "750px", height: "420px" }}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover rounded-2xl"
          playsInline
          muted
        />

        {/* Transparent Center Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center text-[var(--color-high2)] text-4xl bg-transparent hover:bg-black/10 transition"
        >
          {playing ? "" : ""}
        </button>
      </div>
      </div>
    </section>
  );
}