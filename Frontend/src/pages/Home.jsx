import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import Philosophy from "../components/home/Philosophy";
import Editorial from "../components/home/Editorial";
import Architecture from "../components/home/Architecture";

export default function Home() {
  return (
    // 🔧 FIX: bg-app ensures dark/light background is applied FIRST
    <div className="bg-app bg-noise min-h-screen">
      <div className="content-layer flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Philosophy />
        <Editorial />
        <Architecture />
        <Footer />
      </div>
    </div>
  );
}
