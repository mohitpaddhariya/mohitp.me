import { motion } from "framer-motion";

const HeaderLogo = ({ isLoading }) => {
    const logoAnimation = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { delay: isLoading ? 0.3 : 0 },
        },
    };

    return (
        <motion.div
            className="flex items-center gap-2 group"
            {...logoAnimation}
        >
            <img
                className="w-14 h-14 transition-all duration-300"
                src="/logo.svg"
                alt="Logo"
            />
        </motion.div>
    );
};

export default HeaderLogo;