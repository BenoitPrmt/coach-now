import {motion} from "motion/react";

// Composant pour les orbes flottants (Peut être utilisé dans la page d'accueil ou ailleurs)
const FloatingOrbs = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 0.8, 1]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </div>
    );
};

export default FloatingOrbs;