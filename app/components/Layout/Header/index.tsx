"use client";

import {AnimatePresence, motion} from "motion/react";
import {useState, useEffect, Fragment} from "react";
import {navigation} from "~/constants";
import {Menu, X, Sparkles} from "lucide-react";
import {cn} from "~/lib/utils";
import {Link, useNavigate, useLocation} from "react-router";
import {useUser} from "~/hooks/useUser";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {user, isCoach, isAdmin, signOut, isAuthenticated} = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const {navigation: headerElements} = navigation;
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavigation = (link: string) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            navigate(link, {replace: true});
        }, 100);
    };

    const renderNavButtons = () => {
        const transitionBase = {duration: 0.3};

        return (
            <>
                {headerElements.filter((headerElement) => {
                    if (headerElement.adminOnly) {
                        return isAdmin;
                    }

                    if (headerElement.hiddenWhenAuth) {
                        return !isAuthenticated;
                    }

                    if (headerElement.needsAuth) {
                        return isAuthenticated;
                    }

                    return true;
                }).map((headerElement, index) => {
                    const isParentActive =
                        pathname === headerElement.url || pathname.startsWith(headerElement.url + "/");

                    return (
                        <Fragment key={index}>
                            <motion.button
                                layout
                                onClick={() => handleNavigation(headerElement.url)}
                                className={cn(
                                    "text-sm font-medium transition-all duration-300 text-center cursor-pointer relative group",
                                    isParentActive 
                                        ? "text-indigo-400 font-semibold" 
                                        : "text-slate-300 hover:text-white"
                                )}
                                whileHover={{scale: 1.05}}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{...transitionBase, delay: index * 0.1}}
                            >
                                {headerElement.page}
                                {isParentActive && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                        layoutId="activeTab"
                                        initial={{scaleX: 0}}
                                        animate={{scaleX: 1}}
                                        transition={{duration: 0.3}}
                                    />
                                )}
                                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </motion.button>

                            {isParentActive &&
                                headerElement.links.map((item, subIndex) => {
                                    const isSubActive = pathname === item.link;

                                    return (
                                        <motion.button
                                            layout
                                            key={item.link}
                                            onClick={() => handleNavigation(item.link)}
                                            className={cn(
                                                "text-sm font-medium transition-colors cursor-pointer ml-4",
                                                isSubActive ? "text-indigo-400 font-semibold" : "text-slate-400 hover:text-white"
                                            )}
                                            whileHover={{scale: 1.05}}
                                            initial={{opacity: 0, x: -20}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{...transitionBase, delay: subIndex * 0.1}}
                                        >
                                            {item.label}
                                        </motion.button>
                                    );
                                })}
                        </Fragment>
                    );
                })}
                {isAuthenticated && (
                    <>
                        <motion.button
                            onClick={signOut}
                            className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                            whileHover={{scale: 1.05}}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{...transitionBase, delay: headerElements.length * 0.1}}
                        >
                            Déconnexion
                        </motion.button>
                    </>
                )}
            </>
        );
    };

    return (
        <motion.header
            transition={{duration: 0.5, ease: "easeOut"}}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                scrolled
                    ? "bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl shadow-indigo-500/10 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <motion.div 
                    whileHover={{scale: 1.05}} 
                    transition={{type: "spring", stiffness: 300}}
                    className="relative"
                >
                    <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <motion.img
                                src="/icon.png"
                                className="h-10 w-10 relative z-10"
                                alt="CoachNow Logo"
                                whileHover={{rotate: 360}}
                                transition={{duration: 0.6}}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            CoachNow
                        </span>
                        <motion.div
                            animate={{rotate: [0, 10, -10, 0]}}
                            transition={{duration: 2, repeat: Infinity}}
                        >
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </motion.div>
                    </Link>
                </motion.div>

                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    <motion.div
                        animate={{rotate: isMenuOpen ? 180 : 0}}
                        transition={{duration: 0.3}}
                    >
                        {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                    </motion.div>
                </button>

                <nav className="hidden md:flex items-center gap-8">
                    {renderNavButtons()}
                </nav>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className="md:hidden absolute w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl"
                    >
                        <nav className="flex flex-col gap-4 p-6 text-center">
                            {renderNavButtons()}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}