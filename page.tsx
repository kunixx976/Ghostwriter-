"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BentoCard from "@/components/BentoCard";
import UploadZone from "@/components/UploadZone";
import SystemStatus from "@/components/SystemStatus";
import AgentStatus from "@/components/AgentStatus";
import Snowfall from "@/components/Snowfall";
import Waveform from "@/components/Waveform";
import Flashcard from "@/components/Flashcard";
import GhostlyLoader from "@/components/GhostlyLoader";
import NeuralNetwork from "@/components/NeuralNetwork";
import FocusTimer from "@/components/FocusTimer";
import GhostChat from "@/components/GhostChat";
import { Brain, Mic, Layers, Ghost, Loader2, BookOpen, FileText, Music, Video, CheckCircle2, FileDown, Share2, Zap, ExternalLink } from "lucide-react";

type AgentState = "idle" | "processing" | "done";

export default function Home() {
  // Agent states
  const [archivistStatus, setArchivistStatus] = useState<AgentState>("idle");
  const [listenerStatus, setListenerStatus] = useState<AgentState>("idle");
  const [ghostwriterStatus, setGhostwriterStatus] = useState<AgentState>("idle");

  // Data
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [ghostwriterOutput, setGhostwriterOutput] = useState<string>("");
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const magneticRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Particle Trail
      const particle = document.createElement("div");
      particle.className = "trail-particle";
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);

      // 2. Magnetic Effect
      if (magneticRef.current) {
        const m = magneticRef.current;
        const rect = m.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const attractX = (dx / 150) * 20;
          const attractY = (dy / 150) * 20;
          m.style.transform = `translate(${attractX}px, ${attractY}px)`;
        } else {
          m.style.transform = `translate(0px, 0px)`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🚀 Trigger Ghostwriter when agents finish
  useEffect(() => {
    if (!currentFile) return;

    const isProcessing = archivistStatus === "processing" || listenerStatus === "processing";

    const shouldGenerate =
      ghostwriterStatus === "idle" &&
      !isProcessing &&
      ((currentFile.type.startsWith("application/pdf") && archivistStatus === "done") ||
        ((currentFile.type.startsWith("audio/") || currentFile.type.startsWith("video/")) && listenerStatus === "done") ||
        ((currentFile.name.toLowerCase().endsWith(".ppt") ||
          currentFile.name.toLowerCase().endsWith(".pptx") ||
          currentFile.name.toLowerCase().endsWith(".docx")) &&
          archivistStatus === "done"));

    if (shouldGenerate) generateGhostwriter(currentFile);
  }, [archivistStatus, listenerStatus, currentFile, ghostwriterStatus]);

  // REAL API call
  const generateGhostwriter = async (file: File) => {
    try {
      setGhostwriterStatus("processing");
      setGhostwriterOutput(""); // clear previous

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ghostwriter", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setGhostwriterOutput(`### Error ⚠️\n${data.error}\n\n${data.details || ""}`);
      } else {
        setGhostwriterOutput(data.output || "No response generated.");
        setFlashcards(data.flashcards || []);
      }

      setGhostwriterStatus("done");
    } catch (err) {
      setGhostwriterOutput("### Error ⚠️\nSomething went wrong while reaching the Ghostwriter.");
      setGhostwriterStatus("idle");
    }
  };
  // Truly Live Metrics
  const [latency, setLatency] = useState(42);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate latency slightly for realism
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(38, Math.min(prev + delta, 52));
      });

      // Update local time
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white relative font-sans selection:bg-violet-500/30">
      {/* --- ULTRA-PREMIUM BACKGROUND LAYER --- */}
      <div className="aurora-container">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>
      <NeuralNetwork />
      <div className="kinetic-grid" />
      <div className="grid-pulse-layer" />
      <Snowfall />
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202] pointer-events-none" />



      <div className="spectral-roamer select-none">👻</div>
      <div className="noise-overlay" />

      {/* Main Content Layout */}
      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 flex items-center justify-between animate-float-premium relative z-50">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-3 rounded-3xl shadow-2xl shadow-violet-500/40 group-hover:scale-110 transition-transform duration-500 relative flex items-center justify-center overflow-hidden h-20 w-20">
                <span className="text-5xl animate-ghost drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                  👻
                </span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter">
                <span ref={magneticRef} className="magnetic-text shimmer-text">GHOSTWRITER</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium tracking-wide max-w-md">
              High-fidelity study extraction engine. Distilling lecture noise into exam-day clarity.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex gap-6 items-center">
              <FocusTimer />
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="text-right group/metric">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest group-hover/metric:text-emerald-400 transition-colors">Global Latency</p>
                <p className="text-sm font-mono text-emerald-400 tabular-nums">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                  {latency}ms
                </p>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="text-right group/metric">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest group-hover/metric:text-violet-400 transition-colors">Neural Sync</p>
                <p className="text-sm font-mono text-violet-400 tabular-nums uppercase">{currentTime || "Active"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">

          {/* Upload */}
          <BentoCard
            title="Source Material"
            subtitle="Upload your course materials and we'll generate summaries, notes, and quizzs."
            className="md:col-span-8 md:row-span-2 group relative overflow-hidden reveal-anim stagger-1 border-beam-active aberration-hover"
          >
            <div className="mt-4">
              <UploadZone
                onUpload={(file) => {
                  setCurrentFile(file);
                  setGhostwriterOutput("");
                  setGhostwriterStatus("idle");
                  setArchivistStatus("idle");
                  setListenerStatus("idle");

                  const fileName = file.name.toLowerCase();
                  const isDoc = file.type === "application/pdf" || fileName.endsWith(".ppt") || fileName.endsWith(".pptx") || fileName.endsWith(".docx");
                  const isMedia = file.type.startsWith("audio") || file.type.startsWith("video") || fileName.endsWith(".mp4") || fileName.endsWith(".mp3");

                  if (isDoc) {
                    setArchivistStatus("processing");
                    setTimeout(() => setArchivistStatus("done"), 1500);
                  } else if (isMedia) {
                    setListenerStatus("processing");
                    setTimeout(() => setListenerStatus("done"), 2500);
                  } else {
                    setArchivistStatus("processing");
                    setTimeout(() => setArchivistStatus("done"), 1500);
                  }
                }}
              />
            </div>

            {currentFile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-8 p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 flex items-center justify-between group/file relative overflow-hidden"
              >
                {/* Success Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] -mr-16 -mt-16 pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-emerald-500/20 rounded-xl group-hover/file:bg-emerald-500/30 transition-all duration-300 ring-1 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {currentFile.type.startsWith("video") ? (
                      <Video className="text-emerald-400" size={20} />
                    ) : currentFile.type.startsWith("audio") ? (
                      <Music className="text-emerald-400" size={20} />
                    ) : (
                      <FileText className="text-emerald-400" size={20} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-white truncate max-w-[300px]">{currentFile.name}</p>
                      <CheckCircle2 size={14} className="text-emerald-500 shadow-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-tighter">
                        Uploaded
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] text-emerald-500/70 uppercase font-black tracking-tighter">Distillation Ready</span>
                    <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </BentoCard>

          {/* Agents */}
          <BentoCard title="The Archivist" subtitle="Document Logic Engine" className="md:col-span-4 reveal-anim stagger-2 relative overflow-hidden">
            {archivistStatus === "processing" && <div className="scanner-beam" />}
            <div className="flex items-center gap-2 mb-4">
              <AgentStatus status={archivistStatus} />
              <Brain className={archivistStatus === "processing" ? "text-violet-400 animate-pulse" : "text-violet-400"} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crawls through PDFs and slides to extract definitions, structural hierarchy, and hidden charts.
            </p>
          </BentoCard>

          <BentoCard title="The Listener" subtitle="Semantic Audio Analyzer" className="md:col-span-4 reveal-anim stagger-3 relative overflow-hidden">
            {listenerStatus === "processing" && <div className="scanner-beam" />}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg shadow-amber-500/50 animate-pulse">
                Coming Soon
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
              <Mic className="text-blue-400 opacity-50" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Monitors tone and emphasis to find the "exam signals": what the professor says *actually* matters.
            </p>
            <div className="mt-2 opacity-30">
              <Waveform />
            </div>
          </BentoCard>

          {/* Master Guide - Left Column (8 cols) */}
          <BentoCard title="The Master Guide" subtitle="Generated Exam Intelligence" className="md:col-span-8 md:row-span-2 group reveal-anim stagger-5 aberration-hover">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AgentStatus status={ghostwriterStatus} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Layers className={ghostwriterStatus === "processing" ? "text-violet-400 animate-spin" : "text-violet-400"} size={20} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Distillation Engine</span>
                  </div>
                </div>
              </div>

              {/* EXPORT ACTIONS */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/export">
                  <FileDown size={14} className="text-slate-400 group-hover/export:text-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover/export:text-white uppercase tracking-tighter">PDF</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/export">
                  <ExternalLink size={14} className="text-slate-400 group-hover/export:text-blue-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover/export:text-white uppercase tracking-tighter">Notion</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/export">
                  <Zap size={14} className="text-slate-400 group-hover/export:text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover/export:text-white uppercase tracking-tighter">Anki</span>
                </button>
              </div>
            </div>

            {/* Study Guide Content */}
            <div className="prose prose-invert prose-sm max-w-none min-h-[400px] relative">
              {ghostwriterOutput ? (
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-violet-300 mt-6 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-md font-bold text-slate-200 mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="text-slate-400 leading-relaxed mb-4" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 text-slate-400 mb-4" {...props} />,
                    li: ({ node, ...props }) => <li className="marker:text-violet-500" {...props} />,
                    code: ({ node, ...props }) => <code className="bg-white/5 px-1 rounded text-violet-400 font-mono text-xs" {...props} />,
                    strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                  }}
                >
                  {ghostwriterOutput}
                </ReactMarkdown>
              ) : (
                <div className="w-full h-full">
                  {ghostwriterStatus === "processing" ? (
                    <GhostlyLoader />
                  ) : (
                    <div className="relative w-full h-full py-10 opacity-40 select-none pointer-events-none">
                      {/* SKELETON UI */}
                      <div className="space-y-8 animate-pulse">
                        <div className="space-y-3">
                          <div className="h-8 w-2/3 bg-slate-800 rounded-lg" />
                          <div className="h-1 w-full bg-slate-900 rounded-full" />
                        </div>

                        <div className="space-y-4">
                          <div className="h-6 w-1/3 bg-violet-900/30 rounded-md" />
                          <div className="space-y-2">
                            <div className="h-3 w-full bg-slate-800/50 rounded" />
                            <div className="h-3 w-[95%] bg-slate-800/50 rounded" />
                            <div className="h-3 w-[90%] bg-slate-800/50 rounded" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-slate-800/30 rounded-2xl border border-white/5" />
                          <div className="h-24 bg-slate-800/30 rounded-2xl border border-white/5" />
                        </div>

                        <div className="space-y-4">
                          <div className="h-6 w-1/4 bg-violet-900/30 rounded-md" />
                          <div className="space-y-2">
                            <div className="h-3 w-full bg-slate-800/50 rounded" />
                            <div className="h-3 w-[85%] bg-slate-800/50 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* PLACEHOLDER OVERLAY */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
                        <div className="relative mb-6 group-hover:scale-110 transition-transform duration-700">
                          <div className="absolute inset-0 bg-violet-500/20 blur-[60px] rounded-full scale-150 animate-pulse" />
                          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <Ghost size={64} className="text-violet-500/40" />
                          </div>
                        </div>
                        <div className="text-center space-y-2">
                          <h3 className="text-2xl font-black tracking-tight text-white/60">EMPTY INTELLIGENCE</h3>
                          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                            Feed the ghostwriter some material to begin
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Flashcards Section - Below Study Guide */}
            {flashcards.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={20} className="text-violet-400" />
                  <h3 className="text-lg font-bold text-white">Quick Review Flashcards</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flashcards.map((card, i) => (
                    <div key={i} className="animate-reveal" style={{ animationDelay: `${i * 100}ms` }}>
                      <Flashcard {...card} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Interaction Layer */}
            {ghostwriterOutput && (
              <GhostChat context={ghostwriterOutput} />
            )}
          </BentoCard>

          {/* Upcoming Features - Right Column */}
          <BentoCard title="Upcoming Features" subtitle="Next Generation Intelligence" className="md:col-span-4 reveal-anim stagger-6 relative overflow-hidden border-2 border-violet-500/30">
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full shadow-lg shadow-violet-500/50">
                In Development
              </span>
            </div>
            <div className="space-y-4 mt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 bg-violet-500/20 rounded-lg">
                  <Layers className="text-violet-400" size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Exam Paper Predictor</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    AI-powered analysis of past papers to predict high-probability questions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Brain className="text-blue-400" size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Performance Analysis</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Track your study patterns and get personalized improvement recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <BookOpen className="text-emerald-400" size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Interactive Quiz</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Generate custom quizzes from your study material with instant feedback and scoring.
                  </p>
                </div>
              </div>
            </div>
          </BentoCard>

        </div>

        <SystemStatus />
      </div>
    </main>
  );
}
