import {motion, useScroll, useTransform, useInView} from "motion/react";
import {useRef, useEffect, useState} from "react";
import {Button} from "~/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";import {
    Zap,
    Target,
    Users,
    Calendar,
    Star,
    ArrowRight,
    Sparkles,
    Trophy,
    Heart,
    Shield
} from "lucide-react";
import {Link} from "react-router";

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

// Composant pour les orbes flottants
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

const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const features = [
        {
            icon: Target,
            title: "Coaching Personnalisé",
            description: "Des programmes sur mesure adaptés à vos objectifs et votre niveau, créés par des experts certifiés.",
            gradient: "from-indigo-500 to-blue-500"
        },
        {
            icon: Calendar,
            title: "Réservation Intelligente",
            description: "Système de réservation avancé pour optimiser vos créneaux et maximiser vos résultats.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Suivi en Temps Réel",
            description: "Analysez vos performances avec des métriques avancées et des insights personnalisés.",
            gradient: "from-green-500 to-teal-500"
        },
        {
            icon: Shield,
            title: "Sécurité Garantie",
            description: "Tous nos coachs sont vérifiés et certifiés. Vos données sont protégées par un chiffrement de niveau bancaire.",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={isInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8}}
                    className="text-center mb-16"
                >
                    <Badge variant="outline"
                           className="border-primary/50 text-primary/90 bg-white/80 backdrop-blur-sm mb-4 shadow-sm">
                        <Heart className="w-4 h-4 mr-2"/>
                        Fonctionnalités avancées
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Une expérience de coaching révolutionnaire
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Découvrez comment notre technologie de pointe transforme votre parcours fitness
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 50}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.8, delay: index * 0.2}}
                        >
                            <Card
                                className="bg-white/80 border-slate-200 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group h-full">
                                <CardHeader className="text-center">
                                    <motion.div
                                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        whileHover={{rotate: 360}}
                                        transition={{duration: 0.6}}
                                    >
                                        <feature.icon className="w-full h-full text-white"/>
                                    </motion.div>
                                    <CardTitle className="text-xl font-bold text-slate-800 mb-2">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-slate-600 text-center leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

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
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Votre transformation commence maintenant
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-600">
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
                                className="px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl"
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
                            className="px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl border-slate-300 text-slate-700 hover:bg-slate-50 hover:shadow-lg transition-colors duration-300 hover:text-slate-800"
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

const Homepage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection/>
            <FeaturesSection/>
            <CTASection/>
        </div>
    );
};

export default Homepage;