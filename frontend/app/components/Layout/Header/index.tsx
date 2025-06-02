"use client";

import {AnimatePresence, motion} from "motion/react";
import {useState, useEffect, Fragment} from "react";
import {navigation} from "~/constants";
import {Menu, X} from "lucide-react";
import {cn} from "~/lib/utils";
import {Link, useLocation, useNavigate} from "react-router";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // TODO: Conditional rendering for admin header must be done here
    // if (adminHeader) {
    //     return (
    //         <motion.header
    //             transition={{duration: 0.5, ease: "easeOut"}}
    //             className={cn(
    //                 "sticky top-0 z-50 transition-all duration-300",
    //                 scrolled
    //                     ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm py-4"
    //                     : "bg-transparent py-4"
    //             )}
    //         >
    //             <div className="container mx-auto px-4 flex justify-between items-center">
    //                 <motion.div
    //                     whileHover={{scale: 1.05}}
    //                     transition={{type: "spring", stiffness: 300}}
    //                     className="flex items-center gap-2"
    //                 >
    //                     <Link to="/" className="flex items-center gap-2">
    //                         <img
    //                             src="/icon.png"
    //                             className="h-10 w-10 text-primary"
    //                             width="42"
    //                             height="42"
    //                             alt="CoachNow Logo"
    //                         />
    //                         <span className="text-xl font-bold">CoachNow</span>
    //                     </Link>
    //                 </motion.div>
    //
    //                 <div className="flex items-center gap-4">
    //                     <motion.button
    //                         onClick={handleSignOut}
    //                         className="text-sm font-medium hover:text-primary transition-colors"
    //                         whileHover={{scale: 1.05}}
    //                     >
    //                         Déconnexion
    //                     </motion.button>
    //                     <SidebarTrigger/>
    //                 </div>
    //             </div>
    //         </motion.header>
    //     );
    // }

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
                {
                    headerElements.map((headerElement, index) => (
                        <Fragment key={index}>
                            <motion.button
                                onClick={() => handleNavigation(headerElement.url)}
                                className="text-sm font-medium hover:text-primary transition-colors text-center"
                                whileHover={{scale: 1.05}}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{...transitionBase, delay: index * 0.1}}
                            >
                                {headerElement.page}
                            </motion.button>
                            {headerElement.links.map((item, index) => (
                                <motion.button
                                    key={item.link}
                                    onClick={() => handleNavigation(item.link)}
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    whileHover={{scale: 1.05}}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{...transitionBase, delay: index * 0.1}}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </Fragment>
                    ))
                }
                {/* Condition if logged */}
                {/*{currentUsername ? (*/}
                {/*    <>*/}
                {/*        <motion.button*/}
                {/*            onClick={() => {*/}
                {/*                setIsMenuOpen(false);*/}
                {/*                navigate("/profile/", {replace: true});*/}
                {/*            }}*/}
                {/*            className="text-sm font-medium hover:text-primary transition-colors text-center"*/}
                {/*            whileHover={{scale: 1.05}}*/}
                {/*            initial={{opacity: 0, x: -20}}*/}
                {/*            animate={{opacity: 1, x: 0}}*/}
                {/*            transition={{...transitionBase, delay: links.length * 0.1}}*/}
                {/*        >*/}
                {/*            Mon profil*/}
                {/*        </motion.button>*/}
                {/*        /!* Verification if admin to implement *!/*/}
                {/*        /!*{*!/*/}
                {/*        /!*    (currentUser?.role && currentUser?.role === "ADMIN") && (*!/*/}
                {/*        /!*        <motion.button*!/*/}
                {/*        /!*            onClick={() => {*!/*/}
                {/*        /!*                setIsMenuOpen(false);*!/*/}
                {/*        /!*                navigate.push("/admin");*!/*/}
                {/*        /!*            }}*!/*/}
                {/*        /!*            className="text-sm font-medium hover:text-primary transition-colors text-center"*!/*/}
                {/*        /!*            whileHover={{scale: 1.05}}*!/*/}
                {/*        /!*            initial={{opacity: 0, x: -20}}*!/*/}
                {/*        /!*            animate={{opacity: 1, x: 0}}*!/*/}
                {/*        /!*            transition={{...transitionBase, delay: links.length * 0.1}}*!/*/}
                {/*        /!*        >*!/*/}
                {/*        /!*            Admin*!/*/}
                {/*        /!*        </motion.button>*!/*/}
                {/*        /!*    )*!/*/}
                {/*        /!*}*!/*/}
                {/*        <motion.button*/}
                {/*            onClick={handleSignOut}*/}
                {/*            className="text-sm font-medium hover:text-primary transition-colors"*/}
                {/*            whileHover={{scale: 1.05}}*/}
                {/*            initial={{opacity: 0, x: -20}}*/}
                {/*            animate={{opacity: 1, x: 0}}*/}
                {/*            transition={{...transitionBase, delay: links.length * 0.1}}*/}
                {/*        >*/}
                {/*            Déconnexion*/}
                {/*        </motion.button>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <motion.a*/}
                {/*        href="/login"*/}
                {/*        className="text-sm font-medium hover:text-primary transition-colors"*/}
                {/*        whileHover={{scale: 1.05}}*/}
                {/*        initial={{opacity: 0, x: -20}}*/}
                {/*        animate={{opacity: 1, x: 0}}*/}
                {/*        transition={{...transitionBase, delay: links.length * 0.1}}*/}
                {/*    >*/}
                {/*        Se connecter*/}
                {/*    </motion.a>*/}
                {/*)}*/}
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
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/icon.png"
                            className="h-10 w-10 text-primary"
                            width="42"
                            height="42"
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