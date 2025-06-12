"use client";

import {AnimatePresence, motion} from "motion/react";
import {useState, useEffect, Fragment} from "react";
import {NAVIGATION} from "~/constants";
import {LogOutIcon, Menu, X} from "lucide-react";
import {cn} from "~/lib/utils";
import {Link, useNavigate, useLocation} from "react-router";
import {useUser} from "~/hooks/useUser";
import {ModeToggle} from "~/components/mode-toggle";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    // Didn't remove the user import because it might be used in the future for Header info
    const {user, isCoach, isAdmin, signOut, isAuthenticated} = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const {NAVIGATION: headerElements} = NAVIGATION;
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
                    if (headerElement.isAdmin) {
                        return isAdmin;
                    }

                    if (headerElement.isCoach) {
                        return isCoach;
                    }

                    if (headerElement.isUser) {
                        return !isAdmin && !isCoach;
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
                                    "text-sm font-medium transition-colors text-center cursor-pointer",
                                    isParentActive ? "text-primary font-semibold" : "hover:text-primary"
                                )}
                                whileHover={{scale: 1.05}}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{...transitionBase, delay: index * 0.1}}
                            >
                                {headerElement.page}
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
                                                isSubActive ? "text-primary font-semibold" : "hover:text-primary"
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
                    <div className="flex items-center gap-4 mx-auto">

                        <motion.button
                            onClick={signOut}
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                            whileHover={{scale: 1.05}}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{...transitionBase, delay: headerElements.length * 0.1}}
                        >
                            <LogOutIcon className="size-4"/>
                        </motion.button>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{...transitionBase, delay: (headerElements.length + 1) * 0.1}}
                        >
                            <ModeToggle/>
                        </motion.div>
                    </div>
                )}
                {/*  Light / Dark Mode Toggle  */}
                <motion.div
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{...transitionBase, delay: (headerElements.length + 1) * 0.1}}
                    className={cn(isAuthenticated && "hidden")}
                >
                    <ModeToggle/>
                </motion.div>
            </>
        );
    };

    return (
        <motion.header
            transition={{duration: 0.5, ease: "easeOut"}}
            className={cn(
                "sticky top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm py-4"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <motion.div whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 300}}>
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="/icon.png"
                            className="h-10 w-10 text-primary"
                            alt="CoachNow Logo"
                        />
                        <span className="text-xl font-bold">CoachNow</span>
                    </Link>
                </motion.div>

                <button
                    className="md:hidden p-2"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                </button>

                <nav className="hidden md:flex items-center gap-6">
                    {renderNavButtons()}
                </nav>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{scaleY: 0, opacity: 0}}
                        animate={{scaleY: 1, opacity: 1}}
                        exit={{scaleY: 0, opacity: 0}}
                        transition={{duration: 0.2, ease: "easeOut"}}
                        className="md:hidden absolute w-full bg-background border-b py-4 px-4 shadow-lg origin-top"
                    >
                        <nav className="flex flex-col gap-4 text-center">{renderNavButtons()}</nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
