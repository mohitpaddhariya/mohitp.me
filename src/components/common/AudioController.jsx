import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';

const AudioController = () => {
    const [isMuted, setIsMuted] = useState(true);

    const audio = useMemo(() => {
        const newAudio = new Audio('/ash.mp3');
        newAudio.loop = true;
        newAudio.volume = 0.2;
        return newAudio;
    }, []);

    useEffect(() => {
        audio.muted = isMuted;

        if (!isMuted) {
            audio.play().catch(() => setIsMuted(true));
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio, isMuted]);

    const handleToggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.button
                onClick={handleToggleMute}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ opacity: 0, rotate: 360 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black flex items-center justify-center"
                        >
                            <VolumeX className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="vinyl"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{
                                opacity: 1,
                                rotate: 360,
                                transition: {
                                    rotate: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                },
                            }}
                            exit={{ opacity: 0, rotate: 0 }}
                            className="w-full h-full relative"
                        >
                            {/* Vinyl record design */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full">
                                {/* Grooves */}
                                {[2, 3, 4].map((inset) => (
                                    <div
                                        key={inset}
                                        className={`absolute inset-${inset} rounded-full border border-gray-600 opacity-50`}
                                    />
                                ))}
                                {/* Center hole */}
                                <div className="absolute inset-5 rounded-full bg-white/90">
                                    <div className="absolute inset-[30%] rounded-full bg-black" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

export default AudioController;