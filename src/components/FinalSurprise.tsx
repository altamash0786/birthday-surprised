import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";

interface Balloon {
  id: number;
  color: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export function FinalSurprise() {
  const [showSecret, setShowSecret] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors = ["#6C63FF", "#FF6BAA", "#B76E79", "#8B5CF6", "#EC4899"];
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: Math.random() * 100,
      size: Math.random() * 40 + 40,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 12,
    }));
    setBalloons(generated);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${balloon.left}%`,
            width: balloon.size,
            height: balloon.size * 1.2,
            background: `radial-gradient(circle at 30% 30%, ${balloon.color}, ${balloon.color}88)`,
            boxShadow: `0 0 20px ${balloon.color}44`,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-30vh",
            opacity: [0, 1, 1, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-px h-16 bg-white/30"
          />
        </motion.div>
      ))}

      {/* Glowing heart background */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-[200px] sm:text-[300px] md:text-[400px] opacity-20 glow-heart select-none">
          ❤️
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-block text-[#FF6BAA] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">
            The Moment Has Arrived
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text glow-text mb-6 leading-tight"
        >
          HAPPY BIRTHDAY
          <br />
          MY FUTURE WIFE ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto"
        >
          You are my today, my tomorrow, and my forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/images/cake.jpg"
                alt="Birthday Cake"
                className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-[0_0_60px_rgba(108,99,255,0.4)] border-2 border-white/10"
              />
            </motion.div>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#6C63FF]/30 to-[#FF6BAA]/30 blur-2xl -z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => setShowSecret(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong text-white font-semibold text-base sm:text-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA] focus:ring-offset-2 focus:ring-offset-[#0a0a12]"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Open Secret Message
          </button>
        </motion.div>
      </div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              <button
                onClick={() => setShowSecret(false)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA] z-10"
                aria-label="Close secret message"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="glass-strong rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C63FF] via-[#FF6BAA] to-[#B76E79]" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6BAA]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6C63FF]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-5xl mb-6"
                  >
                    💌
                  </motion.div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold gradient-text mb-6">
                    My Promise to You
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light">
                    {`No matter what happens in life,
I promise to stand beside you,
support you,
respect you,
and love you endlessly.

You are the most precious part of my life.

Happy Birthday My Love ❤️`}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[#FF6BAA] font-medium">Forever & Always</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default FinalSurprise;
