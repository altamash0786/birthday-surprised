import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundEffects from "./components/BackgroundEffects";
import WelcomeScreen from "./components/WelcomeScreen";
import Timeline from "./components/Timeline";
// import MemoryGallery from "./components/MemoryGallery";
import LoveLetter from "./components/LoveLetter";
// import Reasons from "./components/Reasons";
import CountdownReveal from "./components/CountdownReveal";
import FinalSurprise from "./components/FinalSurprise";

function App() {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (journeyStarted && timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [journeyStarted]);

  const handleStartJourney = () => {
    setJourneyStarted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a12] text-white overflow-x-hidden">
      <main className="relative z-10">
        <BackgroundEffects showHearts={true} />

        <WelcomeScreen onOpen={handleStartJourney} />

        <AnimatePresence>
          {journeyStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div ref={timelineRef}>
                <Timeline />
              </div>
              {/* <MemoryGallery /> */}
              <LoveLetter />
              {/* <Reasons /> */}
              <CountdownReveal
                onComplete={() => {
                  const finalSection = document.getElementById("final-surprise");
                  finalSection?.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <div id="final-surprise">
                <FinalSurprise />
              </div>

              {/* Footer */}
              <footer className="relative py-10 px-6 text-center border-t border-white/5">
                <p className="text-white/40 text-sm">
                  Made with endless love for Khushboo ❤️
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
