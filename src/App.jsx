import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLoadingState from "./hooks/useLoadingState"
import AudioController from "./components/common/AudioController"
import Loader from "./components/common/Loader"
import AnimatedBackground from "./components/common/AnimatedBackground";
import Navigation from "./components/layout/header/Navigation";
import HeroSection from "./components/sections/hero/HeroSection";
import WorkSection from "./components/sections/work/WorkSection";

const App = () => {
  const { isLoading, isPageLoaded } = useLoadingState();
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isPageLoaded) {
      const timer = setTimeout(() => {
        setStartHeroAnimation(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isPageLoaded]);

  return (
    <>
      {/* // <AudioController /> is commented out because it's not required right now */}
      {/* <AudioController /> */}

      <AnimatePresence mode="wait">
        {!isPageLoaded && <Loader />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen relative bg-gradient-to-br from-white via-violet-50 to-blue-50 selection:bg-violet-200 overflow-hidden"
      >
        <AnimatedBackground />

        <Navigation 
          isLoading={isLoading} 
          isPageLoaded={isPageLoaded} 
          isScrolled={isScrolled} 
        />

        <motion.main
          className="pt-32 pb-16 px-6 md:pt-40 md:pb-24 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isPageLoaded ? 1 : 0, y: isPageLoaded ? 0 : 20 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {startHeroAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <HeroSection />
              </motion.div>
            )}
          </AnimatePresence>

          <WorkSection />
        </motion.main>
      </motion.div>
    </>
  );
};

export default App;