import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CountdownRevealProps {
  onComplete: () => void;
}

export function CountdownReveal({ onComplete }: CountdownRevealProps) {
  const [count, setCount] = useState(3);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#6C63FF", "#FF6BAA", "#B76E79", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst in center
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6, x: 0.5 },
      colors,
      disableForReducedMotion: true,
      scalar: 1.2,
    });
  }, []);

  const startCountdown = useCallback(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started || finished) return;

    if (count === 0) {
      setFinished(true);
      triggerConfetti();
      setTimeout(onComplete, 2500);
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1100);

    return () => clearTimeout(timer);
  }, [started, count, finished, onComplete, triggerConfetti]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#6C63FF]/20 via-[#0a0a12] to-[#FF6BAA]/20 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl sm:text-7xl mb-8"
            >
              🎁
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready for the big reveal?
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-10 max-w-md mx-auto">
              Take a deep breath... your final birthday surprise is about to unfold.
            </p>
            <button
              ref={buttonRef}
              onClick={startCountdown}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6BAA] text-white font-semibold text-lg glow-button hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA] focus:ring-offset-2 focus:ring-offset-[#0a0a12]"
            >
              Reveal My Surprise ✨
            </button>
          </motion.div>
        ) : !finished ? (
          <motion.div
            key="countdown"
            className="relative z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-[120px] sm:text-[180px] md:text-[240px] font-bold gradient-text glow-text text-center leading-none"
              >
                {count === 0 ? "" : count}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl sm:text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text glow-text">
              Happy Birthday!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CountdownReveal;
