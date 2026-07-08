import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export function useTypewriter({
  texts,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1500,
  loop = false,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const typeNext = useCallback(() => {
    const fullText = texts[currentIndex];
    if (!fullText) return;

    if (isTyping) {
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      } else {
        if (currentIndex === texts.length - 1 && !loop) {
          setIsComplete(true);
          onComplete?.();
          return;
        }
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          if (loop || currentIndex < texts.length - 1) {
            setIsTyping(false);
          }
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsTyping(true);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, currentIndex, isTyping, texts, loop, pauseDuration, onComplete]);

  useEffect(() => {
    if (isPaused || isComplete) return;

    const timeout = setTimeout(
      typeNext,
      isTyping ? typingSpeed : deletingSpeed
    );

    return () => clearTimeout(timeout);
  }, [typeNext, isTyping, isPaused, isComplete, typingSpeed, deletingSpeed]);

  const reset = useCallback(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(true);
    setIsPaused(false);
    setIsComplete(false);
  }, []);

  return { displayedText, isTyping, isComplete, currentIndex, reset };
}

export default useTypewriter;
