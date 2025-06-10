import {motion, useScroll, useTransform} from "motion/react";
import {Badge} from "~/components/ui/badge";
import {ArrowRight, Sparkles, Star, Trophy, Users} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import FloatingOrbs from "~/components/Homepage/FloatingOrbs";
import FuturisticGrid from "~/components/Homepage/FuturisticGrid";

const HeroSection = () => {
    const {scrollY} = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            className="relative py-20 flex items-center justify-center overflow-hidden">
            <FuturisticGrid/>
            <FloatingOrbs/>

            <motion.div
                style={{y, opacity}}
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
            >
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="mb-6"
                >
                    <Badge variant="outline"
                           className="border-primary/50 text-primary/90 bg-white/80 backdrop-blur-sm shadow-sm">
                        <Sparkles className="w-4 h-4 mr-2"/>
                        Plateforme de coaching nouvelle génération
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent"
                >
                    Transformez votre
                    <motion.span
                        className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        potentiel sportif
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                    Connectez-vous avec des coachs d'élite et atteignez vos objectifs grâce à
                    une technologie de pointe et un accompagnement personnalisé.
                </motion.p>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.8}}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        size="lg"
                        className="bg-primary text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-indigo-200 border border-indigo-200 backdrop-blur-sm group"
                        asChild
                    >
                        <Link to="/coachs">
                            Découvrir nos coachs
                            <motion.div
                                className="ml-2"
                                animate={{x: [0, 5, 0]}}
                                transition={{duration: 1.5, repeat: Infinity}}
                            >
                                <ArrowRight className="w-5 h-5"/>
                            </motion.div>
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-white text-slate-800 hover:text-slate-900 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-slate-200 border border-slate-300 hover:bg-slate-50 transition-colors duration-300"
                    >
                        Commencer gratuitement
                    </Button>
                </motion.div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 1.2}}
                    className="mt-16 flex justify-center items-center gap-8 text-slate-500"
                >
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current"/>
                        <span>4.9/5 étoiles</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-500"/>
                        <span>+10k utilisateurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-500"/>
                        <span>Certifié qualité</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;