import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LandingVideoPlayer from "@/components/LandingVideoPlayer";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="features">
        <Work />
      </section>
      <LandingVideoPlayer src="/gallery/Drone.mp4" />
      <section id="work">
        <Features />
      </section>
      <section id="faq">
        <Footer />
      </section>
    </div>
  );
}