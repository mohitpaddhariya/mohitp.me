import { useState, useEffect } from "react";

const useLoadingState = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const loadImages = () => {
        const images = Array.from(document.querySelectorAll("img"));

        return Promise.allSettled(
            images.map((img) => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve, reject) => {
                    const handleLoad = () => resolve();
                    const handleError = () => reject(new Error(`Failed to load ${img.src}`));

                    img.addEventListener("load", handleLoad, { once: true });
                    img.addEventListener("error", handleError, { once: true });
                });
            })
        );
    };

    useEffect(() => {
        let isMounted = true;

        const handleLoad = async () => {
            try {
                // Load all images
                await loadImages();

                // Introduce artificial delay for better UX (e.g., loading animations)
                await new Promise((resolve) => setTimeout(resolve, 1500));

                if (isMounted) {
                    setIsLoading(false);
                    setTimeout(() => setIsPageLoaded(true), 100);
                }
            } catch (error) {
                console.error("Error loading images:", error);
                if (isMounted) {
                    setIsLoading(false);
                    setTimeout(() => setIsPageLoaded(true), 100);
                }
            }
        };

        handleLoad();

        return () => {
            isMounted = false;
        };
    }, []);

    return { isLoading, isPageLoaded };
};

export default useLoadingState;