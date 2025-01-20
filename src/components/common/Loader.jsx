import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const Loader = () => {
    const headerLogoSize = 56; // w-14 (14 * 4 = 56px)
    const initialLoaderSize = 128; // w-32 h-32 (32 * 4 = 128px)
    const containerPadding = 24; // px-6 (6 * 4 = 24px)
    const halfLogoSize = headerLogoSize / 2;

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Efficient resize handler with throttling
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const throttleResize = () => {
            clearTimeout(handleResize.timer);
            handleResize.timer = setTimeout(handleResize, 100);
        };

        window.addEventListener("resize", throttleResize);
        return () => window.removeEventListener("resize", throttleResize);
    }, []);

    // Calculate positions and scale using memoization
    const finalPosition = useMemo(() => {
        const { width, height } = dimensions;

        // Vertical position
        const verticalPosition = -(height / 2) + containerPadding + halfLogoSize;

        // Horizontal position
        const getHorizontalPosition = () => {
            if (width < 768) {
                return -(width / 2) + containerPadding + halfLogoSize;
            }

            const maxWidth = width >= 1536
                ? 1536
                : width >= 1280
                ? 1280
                : width >= 1024
                ? 1024
                : 768;

            const leftOffset = Math.max(
                containerPadding,
                (width - maxWidth) / 2 + containerPadding
            );

            return -(width / 2) + leftOffset + halfLogoSize;
        };

        // Scale
        const baseScale = headerLogoSize / initialLoaderSize;
        const scale = Math.max(0.35, baseScale);

        return {
            x: getHorizontalPosition(),
            y: verticalPosition,
            scale,
        };
    }, [dimensions]);

    const { x, y, scale } = finalPosition;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-violet-50 to-blue-50 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.3 } }}
        >
            <motion.div
                initial={{ scale: 1, y: 0 }}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                exit={{
                    y,
                    x,
                    scale,
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        scale: { duration: 0.4 },
                    },
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <img
                    src="/animated-logo.svg"
                    alt="Loading Animation"
                    className="w-32 h-32"
                />
            </motion.div>
        </motion.div>
    );
};

export default Loader;