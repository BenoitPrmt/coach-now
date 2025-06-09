import React from 'react';
import {footer as footerConstant} from "~/constants";
import {motion} from "motion/react";
import {Sparkles, Heart} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const {footer} = footerConstant;

    return (
        <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            {/* Effet de grille futuriste */}
            <div className="absolute inset-0 opacity-20">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Orbes lumineux */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12">
                    <motion.div 
                        className="mb-8 md:mb-0 max-w-md"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative">
                                <img
                                    src={footer.iconUrl}
                                    className="h-12 w-12 relative z-10"
                                    alt={footer.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-50" />
                            </div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                {footer.title}
                            </span>
                            <motion.div
                                animate={{rotate: [0, 10, -10, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                            >
                                <Sparkles className="w-6 h-6 text-indigo-400" />
                            </motion.div>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            {footer.description}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        {footer.links
                            .filter((item, index, self) =>
                                (item.isAvailable ?? true) &&
                                index === self.findIndex((i) => i.label === item.label)
                            )
                            .map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center group transition-all duration-300 p-3 rounded-xl hover:bg-slate-800/50 backdrop-blur-sm"
                                    target={item.external ? "_blank" : "_self"}
                                    whileHover={{scale: 1.02, x: 5}}
                                    transition={{duration: 0.2}}
                                >
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 group-hover:from-indigo-600/30 group-hover:to-purple-600/30 group-hover:border-indigo-400/30 mr-4 transition-all duration-300">
                                        <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <span className="text-slate-300 group-hover:text-white font-medium transition-colors duration-300">
                                        {item.label}
                                    </span>
                                </motion.a>
                            ))}
                    </motion.div>
                </div>

                <motion.div
                    className="pt-8 border-t border-slate-800/50"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.6, delay: 0.4}}
                    viewport={{once: true}}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-slate-500 mb-4 md:mb-0 flex items-center gap-2">
                            © {currentYear} {footer.companyName}. Tous droits réservés.
                            <motion.span
                                animate={{scale: [1, 1.2, 1]}}
                                transition={{duration: 1.5, repeat: Infinity}}
                            >
                                <Heart className="w-4 h-4 text-red-400 fill-current" />
                            </motion.span>
                        </p>
                        
                        {footer.socialNetworksLinks
                            .filter((social, index, self) =>
                                social.isAvailable &&
                                index === self.findIndex((s) => s.type === social.type)
                            ).length > 0 && (
                            <div className="flex space-x-6">
                                {footer.socialNetworksLinks
                                    .filter((social, index, self) =>
                                        social.isAvailable &&
                                        index === self.findIndex((s) => s.type === social.type)
                                    )
                                    .map((social, index) => (
                                        <motion.a
                                            key={social.type}
                                            href={social.url}
                                            className="text-slate-500 hover:text-indigo-400 transition-colors duration-300"
                                            whileHover={{scale: 1.1, y: -2}}
                                            transition={{duration: 0.2}}
                                        >
                                            {social.type}
                                        </motion.a>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;