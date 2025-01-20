const AnimatedBackground = () => {
    // Gradient layers configuration
    const gradients = [
        {
            className: "absolute inset-0",
            style: {
                background: "radial-gradient(circle 1000px at 50% 300px, #e9d5ff10, transparent)",
            },
        },
        {
            className: "absolute top-40 left-0 w-full h-1/2 blur-3xl",
            style: {
                background: "linear-gradient(to right, #8b5cf610, #7c3aed10)",
            },
        },
        {
            className: "absolute top-60 right-0 w-2/3 h-1/3 blur-2xl",
            style: {
                background: "linear-gradient(to left, #c4b5fd05, #8b5cf605)",
            },
        },
        {
            className: "absolute bottom-0 left-0 w-full h-1/2 blur-xl",
            style: {
                background: "linear-gradient(to bottom, transparent, #f5f3ff05)",
            },
        },
    ];

    return (
        <>
            {gradients.map((gradient, index) => (
                <div key={index} className={gradient.className} style={gradient.style} />
            ))}
        </>
    );
};

export default AnimatedBackground;