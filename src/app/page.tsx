import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LandingVideoPlayer from "@/components/LandingVideoPlayer";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div>
        <Hero />
        <Work />
        <LandingVideoPlayer src="/gallery/Drone.mp4" />
        <Features />
        <Footer />
    </div>
  );
}
