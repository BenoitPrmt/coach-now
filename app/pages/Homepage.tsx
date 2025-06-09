import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { 
  Zap, 
  Target, 
  Users, 
  Calendar, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Trophy,
  Heart,
  Shield
} from "lucide-react";
import { Link } from "react-router";

// Composant pour l'animation de grille futuriste
const FuturisticGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-purple-900/10 to-indigo-900/20" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      {/* Particules flottantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [null, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
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
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
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
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
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

// Section Hero
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <FuturisticGrid />
      <FloatingOrbs />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Badge variant="outline" className="border-indigo-400/50 text-indigo-300 bg-indigo-950/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Plateforme de coaching nouvelle génération
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          Transformez votre
          <motion.span
            className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Connectez-vous avec des coachs d'élite et atteignez vos objectifs grâce à 
          une technologie de pointe et un accompagnement personnalisé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/coachs">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-indigo-500/25 border border-indigo-400/20 backdrop-blur-sm group"
            >
              Découvrir nos coachs
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </Link>
          
          <Link to="/register">
            <Button 
              variant="outline" 
              size="lg"
              className="border-indigo-400/50 text-indigo-300 hover:bg-indigo-950/50 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              Commencer gratuitement
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex justify-center items-center gap-8 text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span>4.9/5 étoiles</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>+10k utilisateurs</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            <span>Certifié qualité</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Section des fonctionnalités
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      description: "Système de réservation avancé avec IA pour optimiser vos créneaux et maximiser vos résultats.",
      gradient: "from-purple-500 to-pink-500"
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-purple-400/50 text-purple-300 bg-purple-950/50 backdrop-blur-sm mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Fonctionnalités avancées
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Une expérience de coaching révolutionnaire
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Découvrez comment notre technologie de pointe transforme votre parcours fitness
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full">
                <CardHeader className="text-center">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-center leading-relaxed">
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

// Section de contact
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-indigo-400/50 text-indigo-300 bg-indigo-950/50 backdrop-blur-sm mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Contactez-nous
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Prêt à commencer votre transformation ?
            </h2>
            <p className="text-xl text-slate-400">
              Nos experts sont là pour vous accompagner dans votre parcours
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nom complet
                    </label>
                    <Input 
                      placeholder="Votre nom"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <Input 
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Objectif principal
                    </label>
                    <select className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-md text-white focus:border-indigo-400 focus:outline-none">
                      <option>Perte de poids</option>
                      <option>Prise de muscle</option>
                      <option>Remise en forme</option>
                      <option>Performance sportive</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Parlez-nous de vos objectifs..."
                      rows={6}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-400 resize-none"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-indigo-500/25"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Section CTA finale
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))",
              "linear-gradient(225deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))",
              "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Votre transformation commence maintenant
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur vie avec CoachNow
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-900 hover:bg-slate-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Commencer gratuitement
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/coachs">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm"
              >
                Voir les coachs
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Homepage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
      <CTASection />
    </div>
  );
};

export default Homepage;