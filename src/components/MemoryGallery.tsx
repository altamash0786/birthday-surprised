import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

interface Memory {
  src: string;
  caption: string;
  subtitle: string;
}

const memories: Memory[] = [
  {
    src: "/images/meeting.jpg",
    caption: "The Day We Met",
    subtitle: "When my world changed forever",
  },
  {
    src: "/images/close.jpg",
    caption: "Closer Every Day",
    subtitle: "Laughter that felt like home",
  },
  {
    src: "/images/realization.jpg",
    caption: "Realizing My Love",
    subtitle: "Under the stars, I knew it was you",
  },
  {
    src: "/images/future.jpg",
    caption: "Dreaming Forever",
    subtitle: "A future I cannot wait to build with you",
  },
  {
    src: "/images/birthday-moment.jpg",
    caption: "Celebrating You",
    subtitle: "The most beautiful birthday soul",
  },
];

export function MemoryGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

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
            Precious Moments
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text">
            Our Memory Gallery
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Every picture holds a piece of my heart.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] max-h-[60vh] rounded-3xl overflow-hidden glass p-2 sm:p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(currentIndex)}
              >
                <img
                  src={memories[currentIndex].src}
                  alt={memories[currentIndex].caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-6 sm:p-10"
                >
                  <div className="flex items-center gap-2 text-[#FF6BAA] mb-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Memory {currentIndex + 1} of {memories.length}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                    {memories[currentIndex].caption}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mt-1">
                    {memories[currentIndex].subtitle}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA]"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {memories.map((memory, index) => (
              <button
                key={memory.caption}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA] ${
                  index === currentIndex
                    ? "ring-2 ring-[#FF6BAA] ring-offset-2 ring-offset-[#0a0a12] scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`View ${memory.caption}`}
              >
                <img
                  src={memory.src}
                  alt={memory.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA]"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={memories[currentIndex].src}
                alt={memories[currentIndex].caption}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  {memories[currentIndex].caption}
                </h3>
                <p className="text-white/80 mt-1">
                  {memories[currentIndex].subtitle}
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6BAA]"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MemoryGallery;
