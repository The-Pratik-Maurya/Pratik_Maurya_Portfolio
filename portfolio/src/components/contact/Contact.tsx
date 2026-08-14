"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Send, Mail, MapPin, FileText, CheckCircle2, Loader2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  
  // States for form submission micro-interaction
  const [buttonState, setButtonState] = useState<"idle" | "sending" | "sent">("idle");

  useGSAP(() => {
    // 1. SCROLL-TRIGGERED TYPEWRITER EFFECT FOR HEADING
    const heading = document.querySelector(".contact-heading");
    if (heading && !heading.querySelector(".char")) {
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-[15px]">${char === " " ? "&nbsp;" : char}</span>`)
        .join("") + `<span class="blink-cursor inline-block h-[30px] w-[3px] bg-[#00E5FF] ml-1 align-middle md:h-[45px]"></span>`;
      
      gsap.to(".blink-cursor", { opacity: 0, repeat: -1, duration: 0.6, ease: "steps(1)" });
    }

    gsap.to(".contact-heading .char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-header-wrap",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. HIGH-QUALITY STAGGERED FADE IN FOR FORM AND INFO ELEMENTS
    gsap.from(".contact-anim", {
      scrollTrigger: {
        trigger: ".contact-content-wrap",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.2)", // Gives a slight premium bounce
    });
  }, { scope: container });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonState !== "idle") return;

    setButtonState("sending");
    const form = e.target as HTMLFormElement;
    
    // Form se real data nikalna
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mobile: (form.elements.namedItem("mobile") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      // 🔥 YAHAN MAGIC HAI: Localhost aur Live Server dono ke liye Smart URL
      // Agar NEXT_PUBLIC_API_URL (Vercel) hai toh direct wahan bhejo, warna local proxy (/api/contact) use karo
      const API_URL = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact` 
        : "/api/contact";

      // Backend par Data bhejna
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setButtonState("sent");
        
        // Success animation ke baad reset karna
        setTimeout(() => {
          setButtonState("idle");
          form.reset();
        }, 3500);
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setButtonState("idle");
      alert("Failed to send message. Please make sure backend is running.");
    }
  };

  return (
    <section ref={container} id="contact" className="relative px-6 py-32 bg-transparent" style={{ perspective: "1200px" }}>
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute right-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#00E5FF]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="contact-header-wrap mb-16 md:mb-20 text-center md:text-left">
          <p className="mb-3 md:mb-4 text-[10px] md:text-xs font-bold tracking-widest text-[#00E5FF]">06 / CONTACT</p>
          <h2 className="contact-heading font-display text-4xl font-bold md:text-6xl text-white tracking-tight">
            Let s Build Together.
          </h2>
          <p className="contact-anim mt-4 md:mt-6 max-w-lg text-[13px] md:text-base text-white/50 md:ml-0 mx-auto">
            Have a project in mind, need a scalable AI solution, or just want to connect? Drop a message and I ll get back to you.
          </p>
        </div>

        <div className="contact-content-wrap flex flex-col gap-10 md:flex-row md:gap-20">
          
          {/* Left Side: Contact Info & Resume Button */}
          <div className="flex w-full flex-col justify-start gap-6 md:gap-8 md:w-1/3 mt-2">
            
            {/* Download Resume Button (Premium Neon Hover) */}
            <div className="contact-anim mb-2 md:mb-4">
              <a 
                href="/pratik resume.pdf" 
                download="pratik resume.pdf"
                className="group relative flex w-full md:w-max items-center justify-center gap-3 rounded-2xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-6 py-4 md:px-8 md:py-4 text-xs md:text-sm font-bold text-[#00E5FF] overflow-hidden transition-all hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
              >
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">Download Resume</span>
                <FileText className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              </a>
            </div>

            {/* Email Box */}
            <div className="contact-anim group flex items-center gap-4 md:gap-5 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 p-4 md:p-5 backdrop-blur-md transition-all duration-500 hover:border-[#00E5FF]/50 hover:bg-[#111111] hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)]">
              <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors group-hover:bg-[#00E5FF]/10 group-hover:text-[#00E5FF]">
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/40 uppercase mb-0.5 md:mb-1">Direct Line</p>
                <a href="mailto:hello@pratik.com" className="text-xs md:text-sm font-semibold text-white transition-colors hover:text-[#00E5FF] truncate block">
                  hello@pratik.com
                </a>
              </div>
            </div>
            
            {/* Location Box */}
            <div className="contact-anim group flex items-center gap-4 md:gap-5 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 p-4 md:p-5 backdrop-blur-md transition-all duration-500 hover:border-[#00E5FF]/50 hover:bg-[#111111] hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)]">
              <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors group-hover:bg-[#00E5FF]/10 group-hover:text-[#00E5FF]">
                <MapPin className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/40 uppercase mb-0.5 md:mb-1">Base</p>
                <p className="text-xs md:text-sm font-semibold text-white">
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 md:gap-5 md:w-2/3">
            
            <div className="grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-2">
              <div className="contact-anim flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="name" className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase pl-1">Name</label>
                <input required type="text" id="name" placeholder="John Doe" className="rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-4 py-3.5 md:px-5 md:py-4 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/20 focus:border-[#00E5FF]/50 focus:bg-[#111111] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]" />
              </div>
              <div className="contact-anim flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="email" className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase pl-1">Email</label>
                <input required type="email" id="email" placeholder="john@example.com" className="rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-4 py-3.5 md:px-5 md:py-4 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/20 focus:border-[#00E5FF]/50 focus:bg-[#111111] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]" />
              </div>
              <div className="contact-anim flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="mobile" className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase pl-1">Mobile No</label>
                <input required type="tel" id="mobile" placeholder="+91 9000000000" className="rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-4 py-3.5 md:px-5 md:py-4 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/20 focus:border-[#00E5FF]/50 focus:bg-[#111111] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]" />
              </div>
              <div className="contact-anim flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="subject" className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase pl-1">Subject</label>
                <input required type="text" id="subject" placeholder="Project Inquiry" className="rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-4 py-3.5 md:px-5 md:py-4 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/20 focus:border-[#00E5FF]/50 focus:bg-[#111111] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]" />
              </div>
            </div>

            <div className="contact-anim flex flex-col gap-1.5 md:gap-2">
              <label htmlFor="message" className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#00E5FF] uppercase pl-1">Message</label>
              <textarea required id="message" rows={4} placeholder="Tell me about your project..." className="resize-none rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/80 px-4 py-3.5 md:px-5 md:py-4 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/20 focus:border-[#00E5FF]/50 focus:bg-[#111111] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"></textarea>
            </div>

            {/* Premium Animated Submit Button */}
            <div className="contact-anim mt-2 md:mt-4">
              <button 
                disabled={buttonState !== "idle"} 
                type="submit" 
                className={`group relative flex h-[50px] md:h-[60px] w-full items-center justify-center overflow-hidden rounded-xl md:rounded-2xl font-bold transition-all duration-500 md:w-[220px]
                  ${buttonState === "idle" ? "bg-white text-black hover:scale-[1.03] hover:bg-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] cursor-pointer" : ""}
                  ${buttonState === "sending" ? "bg-[#111111] border border-[#00E5FF]/50 text-[#00E5FF] cursor-not-allowed shadow-[inset_0_0_20px_rgba(0,229,255,0.15)]" : ""}
                  ${buttonState === "sent" ? "bg-[#00B400]/10 border border-[#00B400]/50 text-[#00B400] cursor-default shadow-[0_0_20px_rgba(0,180,0,0.2)]" : ""}
                `}
              >
                <AnimatePresence mode="wait">
                  {/* IDLE STATE */}
                  {buttonState === "idle" && (
                    <motion.div 
                      key="idle"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="absolute flex items-center gap-2 md:gap-3 text-xs md:text-sm"
                    >
                      <span>Send Message</span>
                      <Send className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.div>
                  )}

                  {/* SENDING STATE (High Quality Flying Mail Animation) */}
                  {buttonState === "sending" && (
                    <motion.div 
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute flex h-full w-full items-center justify-center"
                    >
                      <motion.div 
                        className="absolute text-[#00E5FF]"
                        animate={{ 
                          x: [-60, 0, 60],
                          y: [20, 0, -20],
                          scale: [0.5, 1.2, 0.5],
                          opacity: [0, 1, 0],
                          rotate: [-15, 0, 15]
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                      >
                        <Send className="h-4 w-4 md:h-5 md:w-5 fill-[#00E5FF]/20" />
                      </motion.div>
                      <div className="flex items-center gap-2 mt-6 md:mt-8">
                        <Loader2 className="h-2.5 w-2.5 md:h-3 md:w-3 animate-spin text-[#00E5FF]" />
                        <span className="text-[8px] md:text-[10px] tracking-[0.2em] text-[#00E5FF]">TRANSMITTING</span>
                      </div>
                    </motion.div>
                  )}

                  {/* SENT SUCCESS STATE */}
                  {buttonState === "sent" && (
                    <motion.div 
                      key="sent"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute flex items-center gap-1.5 md:gap-2 text-xs md:text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Delivered!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}