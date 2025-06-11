import {useRef} from "react";
import {motion, useInView} from "motion/react";
import {Calendar, Heart, Shield, Target, Zap} from "lucide-react";
import {Badge} from "~/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

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

export default FeaturesSection;