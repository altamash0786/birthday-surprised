import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";
import { cn } from "../utils/cn";

interface WelcomeScreenProps {
  onOpen: () => void;
}

export function WelcomeScreen({ onOpen }: WelcomeScreenProps) {
  const { displayedText, isComplete } = useTypewriter({
    texts: [
      "Hey My Love ❤️",
      "Today is not just another day...",
      "It is the day the most beautiful soul came into this world.",
    ],
    typingSpeed: 55,
    deletingSpeed: 25,
    pauseDuration: 1800,
    loop: false,
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-pink-200 mb-8">
            <Sparkles className="w-4 h-4 text-[#FF6BAA]" />
            <span>A special surprise for Khushboo</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight min-h-[1.2em]">
            <span className="gradient-text glow-text">
              {displayedText}
            </span>
            <span className="inline-block w-[3px] h-[1em] bg-[#FF6BAA] ml-1 animate-pulse align-middle" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={onOpen}
            className={cn(
              "group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full",
              "bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#FF6BAA]",
              "text-white font-semibold text-base sm:text-lg",
              "transition-all duration-500 ease-out",
              "hover:scale-105 hover:shadow-[0_0_50px_rgba(108,99,255,0.6)]",
              "focus:outline-none focus:ring-2 focus:ring-[#FF6BAA] focus:ring-offset-2 focus:ring-offset-[#0a0a12]",
              "animate-pulse-glow"
            )}
          >
            <span className="relative z-10">Open Your Birthday Surprise</span>
            <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6BAA] via-[#8B5CF6] to-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#6C63FF]/10 to-transparent pointer-events-none" />
    </section>
  );
}

export default WelcomeScreen;
