"use client"; 

import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Navbar from "../src/components/layout/Navbar";
import SocialLinks from "../src/components/layout/SocialLinks";
import ChatbotIcon from "../src/components/layout/ChatbotIcon";
import LoadingScreen from "../src/components/loading/LoadingScreen";
import Hero from "../src/components/hero/Hero";
import About from "../src/components/about/About";
import Experience from "../src/components/experience/Experience";
import Work from "../src/components/work/Work";
import TechStack from "../src/components/stack/TechStack";
import Services from "../src/components/services/Services";
import Contact from "../src/components/contact/Contact";
import Footer from "../src/components/layout/Footer";
import CustomCursor from "../src/components/effects/CustomCursor";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-black overflow-x-hidden text-white">
      <CustomCursor />
      <LoadingScreen />
      
      {/* --- GLOBAL 3D BACKGROUND (Poori Website ke peeche chalega) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Continuous 3D Stars/Dots */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1.5} />
          </Canvas>
        </div>

        {/* Top Left Ambient Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] -top-[10%] h-[40vw] w-[40vw] rounded-full bg-[#00E5FF] blur-[120px] md:h-[30vw] md:w-[30vw]"
        />
        
        {/* Bottom Right Ambient Glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-[10%] top-[60%] h-[50vw] w-[50vw] rounded-full bg-[#00E5FF] blur-[150px] md:h-[40vw] md:w-[40vw]"
        />
      </div>
      {/* ------------------------------------------------------------- */}

      <Navbar />
      <SocialLinks />
      <ChatbotIcon />
      
      {/* Saare sections ko z-10 me rakha hai taaki background peeche rahe */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Experience />
        <Work />
        <TechStack />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}