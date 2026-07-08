import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  icon: string;
  title: string;
  date: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    icon: "❤️",
    title: "The Day We Met",
    date: "Where it all began",
    description: "From the very first moment, my world changed. Your smile lit up everything around me.",
  },
  {
    icon: "💕",
    title: "The Day We Became Close",
    date: "Our hearts connected",
    description: "Every conversation, every laugh, every moment brought us closer than I ever imagined.",
  },
  {
    icon: "🥰",
    title: "The Day I Realized I Love You",
    date: "The truth in my heart",
    description: "I knew then that you were not just someone I loved—you were the one I was meant to love forever.",
  },
  {
    icon: "💍",
    title: "The Day I Dreamed Of Our Future Together",
    date: "Forever with you",
    description: "I started seeing you in every dream, every plan, every tomorrow I could imagine.",
  },
  {
    icon: "🎂",
    title: "Today – Your Birthday",
    date: "The most special day",
    description: "Celebrating the beautiful soul who makes my life magical. Happy Birthday, Khushboo.",
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="inline-block text-[#FF6BAA] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">
            Our Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text">
            Our Love Story
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Every chapter of us is my favorite story.
          </p>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-1/2" />
          <motion.div
            className="absolute left-6 sm:left-1/2 top-0 w-px bg-gradient-to-b from-[#6C63FF] via-[#FF6BAA] to-[#B76E79] sm:-translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 sm:space-y-20">
            {timelineEvents.map((event, index) => (
              <TimelineCard
                key={event.title}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className={`relative flex items-start sm:items-center ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      {/* Icon on the line */}
      <div className="absolute left-6 sm:left-1/2 z-10 sm:-translate-x-1/2">
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(108,99,255,0.3)]"
        >
          {event.icon}
        </motion.div>
      </div>

      {/* Content card */}
      <div
        className={`ml-20 sm:ml-0 sm:w-[calc(50%-60px)] ${
          isLeft ? "sm:pr-12" : "sm:pl-12"
        }`}
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:shadow-[0_0_40px_rgba(108,99,255,0.2)] transition-shadow duration-500"
        >
          <span className="text-[#B76E79] text-xs sm:text-sm font-medium tracking-wide">
            {event.date}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-semibold mt-2 mb-3 text-white">
            {event.title}
          </h3>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            {event.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Timeline;
