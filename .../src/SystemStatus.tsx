"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Database, Cpu, Globe, CheckCircle2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatusItemProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    status: "online" | "warning" | "busy";
    latency: number;
}

const StatusItem = ({ icon: Icon, label, value, status, latency }: StatusItemProps) => (
    <div className="flex items-center justify-between group py-2">
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    status === "online"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : status === "warning"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-500/10 text-blue-400"
                )}
            >
                <Icon size={16} />
            </div>
            <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-slate-200">{value}</p>
            </div>
        </div>

        <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        "h-1.5 w-1.5 rounded-full animate-pulse",
                        status === "online"
                            ? "bg-emerald-500"
                            : status === "warning"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                    )}
                />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{status}</span>
            </div>
            <span className="text-[10px] text-slate-600 mt-1 font-mono tabular-nums">{latency}ms</span>
        </div>
    </div>
);

export default function SystemStatus() {
    const [metrics, setMetrics] = useState({
        compute: 42,
        extraction: 110,
        traffic: 4
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                compute: Math.max(38, Math.min(52, prev.compute + (Math.floor(Math.random() * 3) - 1))),
                extraction: Math.max(105, Math.min(125, prev.extraction + (Math.floor(Math.random() * 5) - 2))),
                traffic: Math.max(2, Math.min(8, prev.traffic + (Math.floor(Math.random() * 3) - 1)))
            }));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col justify-center"
        >
            <div className="relative bg-white/5 border border-white/10 p-4 rounded-xl shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-blue-400" />
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Live Metrics
                        </h2>
                    </div>

                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                        <CheckCircle2 size={8} className="text-emerald-500" />
                        <span className="text-[8px] font-bold text-emerald-500/80 uppercase">Stable</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <StatusItem icon={Cpu} label="Compute" value="Gemini 2.0 Flash" status="online" latency={metrics.compute} />
                    <StatusItem icon={Database} label="Extraction" value="Multimodal" status="online" latency={metrics.extraction} />
                    <StatusItem icon={Globe} label="Traffic" value="Ghost-Net" status="online" latency={metrics.traffic} />
                </div>
            </div>
        </motion.div>
    );
}
