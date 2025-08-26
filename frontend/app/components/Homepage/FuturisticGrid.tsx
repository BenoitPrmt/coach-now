import {useEffect, useState} from "react";
import {motion} from "motion/react";

type Particle = {
    x: number
    y: number
    duration: number
    delay: number
}
const FuturisticGrid = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const newParticles = Array.from({ length: 20 }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
            }));
            setParticles(newParticles);
        }
    }, []);

    if (particles.length === 0) return null; // évite le rendu serveur

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-secondary rounded-full"
                    initial={{
                        x: p.x,
                        y: p.y,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, -100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
};

export default FuturisticGrid;