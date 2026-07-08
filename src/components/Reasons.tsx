import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "../utils/cn";

interface Reason {
  front: string;
  back: string;
}

const reasons: Reason[] = [
  {
    front: "Your Smile",
    back: "Your smile is the first thing I think of every morning and the last thing on my mind every night.",
  },
  {
    front: "Your Kind Heart",
    back: "The way you care for everyone around you makes me fall in love with you more every single day.",
  },
  {
    front: "Your Support",
    back: "You stand by me in my darkest moments and celebrate with me in my brightest. You are my strength.",
  },
  {
    front: "Your Loyalty",
    back: "Knowing you are mine, truly and completely, is the greatest gift I could ever ask for.",
  },
  {
    front: "Your Beautiful Soul",
    back: "You are beautiful inside and out, and your soul shines brighter than any star in the sky.",
  },
  {
    front: "Everything About You",
    back: "Every little thing about you is exactly what I never knew I always needed. I love all of you.",
  },
];

export function Reasons() {
  return (
    <section className="relative py-24 sm:py-32 px-6 overflow-hidden section-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-block text-[#FF6BAA] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">
            Endless Reasons
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text">
            Why I Love You
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Click each card to reveal what my heart whispers about you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((reason, index) => (
            <FlipCard key={reason.front} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ reason, index }: { reason: Reason; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flip-card h-56 sm:h-64 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      aria-label={`Reason: ${reason.front}. Click to reveal message.`}
    >
      <div className={cn("flip-card-inner", flipped && "flipped")}>
        {/* Front */}
        <div className="flip-card-front glass rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_0_40px_rgba(108,99,255,0.2)] transition-shadow duration-500">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6C63FF]/30 to-[#FF6BAA]/30 flex items-center justify-center mb-4"
          >
            <Heart className="w-7 h-7 text-[#FF6BAA] fill-[#FF6BAA]/30" />
          </motion.div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
            {reason.front}
          </h3>
          <p className="text-white/50 text-sm mt-3">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="flip-card-back rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#6C63FF]/80 to-[#FF6BAA]/80 border border-white/20 shadow-[0_0_40px_rgba(108,99,255,0.3)]">
          <Heart className="w-6 h-6 text-white/80 mb-4 fill-white/20" />
          <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
            {reason.back}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Reasons;
