import {useRef} from "react";
import {motion, useInView} from "motion/react";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {Sparkles} from "lucide-react";

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    return (
        <section ref={ref}
                 className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={isInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8}}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                        Votre transformation commence maintenant
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
                        Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur vie avec CoachNow
                    </p>

                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={isInView ? {opacity: 1, scale: 1} : {}}
                        transition={{duration: 0.8, delay: 0.3}}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Button
                                size="lg"
                                className="bg-primary text-white dark:bg-primary dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl dark:shadow-slate-900/50"
                                asChild
                            >
                                <Link to="/register">
                                    <Sparkles className="w-6 h-6 mr-2"/>
                                    Commencer gratuitement
                                </Link>
                            </Button>
                        </motion.div>

                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-white dark:bg-slate-800 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl dark:shadow-slate-900/50 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg transition-colors duration-300 hover:text-slate-800 dark:hover:text-white"
                            asChild
                        >
                            <Link to="/coachs">
                                Voir les coachs
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;