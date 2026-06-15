"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { GoldButton } from "@/app/components/GoldButton";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[
        { size: 400, blur: "blur-[120px]", color: "bg-amber-500/10", anim: "animate-drift", top: "0%", left: "0%" },
        { size: 300, blur: "blur-[100px]", color: "bg-gold-400/10", anim: "animate-drift-reverse", top: "50%", right: "0%" },
        { size: 200, blur: "blur-[80px]", color: "bg-yellow-500/8", anim: "animate-float-slow", top: "20%", left: "60%" },
        { size: 250, blur: "blur-[90px]", color: "bg-orange-500/6", anim: "animate-drift", top: "70%", left: "30%" },
      ].map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.blur} ${orb.color} ${orb.anim}`}
          style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left, right: orb.right }}
        />
      ))}
    </div>
  );
}

function SparkleField() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-400/60 rounded-full blur-[1px]"
          style={{ left: `${(i * 12 + 7) % 100}%`, top: `${(i * 14 + 3) % 100}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeVideo, setActiveVideo] = useState(0);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const activeRef = useRef(0);
  const swapRef = useRef(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const handleNearEnd = useCallback((videoNum: number) => {
    if (swapRef.current) return;

    const video = videoNum === 0 ? video1Ref.current : video2Ref.current;
    if (!video || !video.duration) return;

    if (video.currentTime >= video.duration - 1.5 && activeRef.current === videoNum) {
      swapRef.current = true;
      const nextNum = videoNum === 0 ? 1 : 0;
      const nextVideo = nextNum === 0 ? video1Ref.current : video2Ref.current;

      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play();
        activeRef.current = nextNum;
        setActiveVideo(nextNum);

        setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          swapRef.current = false;
        }, 3000);
      }
    }
  }, []);

  const handleVideoPlay = useCallback(() => {
    setVideoStarted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 250]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-800"
    >
      {/* Video Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-obsidian-800" />

        {/* Static poster image — loads instantly, fades when video plays */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            className={`object-cover transition-opacity duration-1000 ${videoStarted ? "opacity-0" : "opacity-100"}`}
            sizes="100vw"
            onLoad={() => setPosterLoaded(true)}
          />
        </div>

        {/* Video 1 */}
        <motion.video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlay={handleVideoPlay}
          onTimeUpdate={() => handleNearEnd(0)}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeVideo === 0 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </motion.video>

        {/* Video 2 — only preload metadata until needed */}
        <motion.video
          ref={video2Ref}
          muted
          playsInline
          preload="metadata"
          onTimeUpdate={() => handleNearEnd(1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeVideo === 1 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </motion.video>

        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-800/70 via-obsidian-800/30 to-obsidian-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-800/80 via-transparent to-obsidian-800/60" />
        <div className="absolute inset-0 bg-hero-vignette" />
      </motion.div>

      {/* Ambient Effects */}
      <FloatingOrbs />
      <SparkleField />

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-gradient z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"
      >
        <motion.div style={{ y: textY }}>
          {/* Overline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-400/30 rounded-full text-xs text-gold-300 tracking-[0.25em] uppercase bg-obsidian-900/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Est. 2024 — Culinary Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-sm sm:text-display-md md:text-display-lg lg:text-display-xl text-obsidian-50 mb-6 text-balance"
          >
            THE CULINARY
            <br className="sm:hidden" />
            {" "}REVOLUTION
            <br />
            <span className="text-gold-gradient">HAS ARRIVED</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base sm:text-lg text-obsidian-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Where classic meets unparalleled indulgence. Wagyu beef, black truffles,
            <br className="hidden sm:block" />
            and aged cheeses — crafted for the discerning palate.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GoldButton size="lg" href="/menu">
              Order Your Masterpiece
            </GoldButton>
            <GoldButton variant="outline" size="lg" href="/menu">
              Explore the Menu
            </GoldButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "A5", label: "Wagyu Grade" },
              { value: "24h", label: "Aged Cheeses" },
              { value: "12min", label: "Prep Time" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl sm:text-4xl text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  {stat.value}
                </div>
                <div className="font-body text-[11px] text-obsidian-500 uppercase tracking-[0.2em] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] text-obsidian-500 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-gold-400/60" aria-hidden="true" />
        </motion.div>
      </motion.div>

    </section>
  );
}
