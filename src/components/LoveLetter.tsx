import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

export function LoveLetter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const letterText = `Dear My Love,

Today is special because it is the birthday of the person who makes my world brighter every single day.

Your smile brings peace to my heart.
Your presence brings happiness to my life.

Thank you for being you.

Thank you for being part of my journey.

I cannot wait to celebrate many more birthdays together.

Happy Birthday, My Future Wife ❤️`;

  const { displayedText, isComplete } = useTypewriter({
    texts: isInView ? [letterText] : [""],
    typingSpeed: 35,
    loop: false,
  });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-block text-[#FF6BAA] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">
            From My Heart
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text">
            A Letter For You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative seal */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6BAA] flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(108,99,255,0.5)]"
            >
              💌
            </motion.div>
          </div>

          <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6BAA]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed whitespace-pre-line min-h-[300px]">
                {displayedText}
                {!isComplete && (
                  <span className="inline-block w-[3px] h-[1em] bg-[#FF6BAA] ml-1 animate-pulse align-middle" />
                )}
              </div>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6BAA] flex items-center justify-center text-xl">
                    K
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Forever Yours,</p>
                    <p className="text-white font-semibold">Your Future Husband</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LoveLetter;
