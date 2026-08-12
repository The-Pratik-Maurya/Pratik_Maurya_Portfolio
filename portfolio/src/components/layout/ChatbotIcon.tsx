"use client";
// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMessageSquare, FiX, FiSend, FiCpu, FiMic, FiMicOff } from "react-icons/fi";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [scrollKey, setScrollKey] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Pratik's AI assistant. What would you like to know about his skills or projects?" }
  ]);

  // Refs for logic handling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>(""); 
  const isVoiceModeRef = useRef<boolean>(false); 
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null); 
  const botIsSpeakingRef = useRef<boolean>(false); 

  // 🔥 Voice Setup (Always On & True Barge-in)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true; 
        recognition.interimResults = true; 
        recognition.lang = 'hi-IN'; 

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          
          const cleanTranscript = currentTranscript.trim();
          
          if (cleanTranscript.length > 0) {
            if (window.speechSynthesis.speaking) {
              window.speechSynthesis.cancel();
              botIsSpeakingRef.current = false;
            }

            setInputText(currentTranscript);
            transcriptRef.current = currentTranscript; 

            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            
            debounceTimerRef.current = setTimeout(() => {
              if (transcriptRef.current.trim() !== "") {
                const textToSend = transcriptRef.current;
                transcriptRef.current = ""; 
                setInputText(""); 
                
                // 🔥 True pass kiya taaki system ko pata chale ki aawaz se sawal pucha gaya hai
                sendMessageToBackend(textToSend, true); 
              }
            }, 2000); 
          }
        };

        recognition.onend = () => {
          if (isVoiceModeRef.current) {
            try {
              recognition.start(); 
              setIsListening(true);
            } catch (e) {
              console.log("Mic auto-restarted.");
            }
          } else {
            setIsListening(false);
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 🔥 Text to Speech (Natural Indian Voice Setup)
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      botIsSpeakingRef.current = true;
      
      let cleanText = text.replace(/[*#_]/g, ''); 
      cleanText = cleanText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      const voices = window.speechSynthesis.getVoices();
      
      const preferredVoice = voices.find(v => v.name.includes('Neerja') && v.name.includes('Online')) || 
                             voices.find(v => v.name.includes('Prabhat') && v.name.includes('Online')) || 
                             voices.find(v => v.name === 'Google हिन्दी') || 
                             voices.find(v => v.name.includes('Google UK English Male')) || 
                             voices.find(v => v.lang === 'hi-IN' || v.lang === 'en-IN') || 
                             voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang;
      }
      
      utterance.rate = 0.95; 
      utterance.pitch = 1.0; 
      
      utterance.onend = () => {
        botIsSpeakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Mic Toggle Function
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }
    if (isListening) {
      isVoiceModeRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
      window.speechSynthesis.cancel();
      botIsSpeakingRef.current = false;
    } else {
      isVoiceModeRef.current = true;
      window.speechSynthesis.cancel(); 
      botIsSpeakingRef.current = false;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch(e) {}
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll Trigger Logic for Typewriter
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollKey(prev => prev + 1);
      }, 800); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // 🔥 API Call Logic (isVoiceInput parameter add kiya gaya hai)
  const sendMessageToBackend = async (textToSend: string, isVoiceInput: boolean = false) => {
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: textToSend }]);
    setMessages(prev => [...prev, { sender: "bot", text: "Thinking..." }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); 
        newMessages.push({ sender: "bot", text: data.reply });
        return newMessages;
      });

      // 🔥 Sirf tabhi bolega jab mic (voice) use kiya gaya ho
      if (isVoiceInput) {
        speakText(data.reply);
      }

    } catch (error) {
      const errorMsg = "Oops! My backend servers are currently offline. Please try again later.";
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push({ sender: "bot", text: errorMsg });
        return newMessages;
      });
      
      // 🔥 Error bhi sirf tabhi bolega jab aawaz se pucha ho
      if (isVoiceInput) {
        speakText(errorMsg);
      }
    }
  };

  // Manual Text Submit
  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    if (isListening) {
      isVoiceModeRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
      window.speechSynthesis.cancel();
      botIsSpeakingRef.current = false;
    }
    
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    
    const userMessage = inputText;
    transcriptRef.current = ""; 
    setInputText("");
    
    // 🔥 False pass kiya taaki system ko pata chale ki text type kiya gaya hai (Aawaz nahi aayegi)
    sendMessageToBackend(userMessage, false);
  };

  // Chat close handle
  const handleCloseChat = () => {
    setIsOpen(false);
    isVoiceModeRef.current = false;
    window.speechSynthesis.cancel(); 
    botIsSpeakingRef.current = false;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  // Typewriter Animation Variants
  const text = "ASK ABOUT PRATIK";
  const typewriterContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: scrollKey === 0 ? 2.5 : 0.2 } }
  };
  
  const typewriterChar = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
  };

  return (
    // 🔥 UPDATE 1: Yahan 'bottom-4' ko mobile ke liye 'bottom-24' (aur thoda safe side 'bottom-[90px]') kar diya hai
    // PC ke liye wahi 'md:bottom-8' rahega. Isse chat icon navbar ke upar tairta hua dikhega.
    <div className="fixed bottom-[95px] right-4 z-50 flex flex-col items-end md:bottom-8 md:right-8">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            // 🔥 UPDATE 2: Mobile par height max-h-[500px] tak limit kar di hai taaki screen ke top bar se na takraye
            className="mb-4 flex h-[60vh] min-h-[380px] max-h-[480px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#00E5FF]/30 bg-[#050505]/95 shadow-[0_0_40px_rgba(0,229,255,0.2)] backdrop-blur-xl sm:w-[400px] md:h-[65vh] md:max-h-[600px] md:w-[450px]"
          >
            <div className="flex items-center justify-between border-b border-[#00E5FF]/20 bg-[#00E5FF]/10 px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00E5FF]/20 text-[#00E5FF]">
                  <FiCpu className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-widest text-white">PRATIK.AI</h3>
                  <p className="text-[10px] text-[#00E5FF] tracking-wider animate-pulse">
                    {isListening ? "LISTENING..." : "ONLINE"}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCloseChat}
                className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain min-h-0 p-5 flex flex-col gap-4 scrollbar-hide"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user" 
                      ? "self-end bg-white text-black rounded-br-sm shadow-[0_5px_15px_rgba(255,255,255,0.1)]" 
                      : "self-start bg-[#111] border border-[#00E5FF]/20 text-white/80 rounded-bl-sm shadow-[0_5px_15px_rgba(0,229,255,0.05)]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="border-t border-white/10 bg-[#0a0a0a] p-4 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? "Speak anytime (Auto-send)..." : "Ask me anything..."}
                  className="w-full rounded-full border border-white/10 bg-black py-3.5 pl-5 pr-24 text-sm text-white outline-none transition-all focus:border-[#00E5FF]/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                />
                
                <button 
                  type="button"
                  onClick={toggleListening}
                  className={`absolute right-12 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    isListening 
                      ? "bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" 
                      : "text-[#00E5FF]/70 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
                  }`}
                >
                  {isListening ? <FiMicOff className="h-4 w-4" /> : <FiMic className="h-4 w-4" />}
                </button>

                <button 
                  type="submit"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#00E5FF] text-black transition-transform hover:scale-105"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 md:gap-4">
        {!isOpen && (
          <motion.div
            key={scrollKey}
            variants={typewriterContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-4 py-2.5 text-[11px] font-bold tracking-widest text-[#00E5FF] backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.2)] md:px-5 md:py-3 md:text-xs"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={typewriterChar}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: scrollKey === 0 ? 4.5 : 2, duration: 0.5 }}
              className="ml-2 animate-pulse text-white"
            >
              →
            </motion.span>
          </motion.div>
        )}

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 100 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#00E5FF] bg-black text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] active:scale-95 md:h-16 md:w-16"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX className="h-6 w-6 md:h-7 md:w-7" /> : <FiMessageSquare className="h-6 w-6 md:h-7 md:w-7" />}
        </motion.button>
      </div>
    </div>
  );
}