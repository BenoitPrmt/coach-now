const authContainerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1
        }
    }
};

const authItemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.3}
    }
};

const authFormVariants = {
    login: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    },
    register: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    }
};

const authImageContainerVariants = {
    login: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    },
    register: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    }
};

const authImageVariants = {
        initial: {
            scale: 1.05,
            opacity: 0,
            filter: "blur(4px)"
        },
        loaded: {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut",
                scale: {duration: 0.8},
                filter: {duration: 0.4}
            }
        },
        exit: {
            scale: 0.95,
            opacity: 0,
            filter: "blur(2px)",
            transition: {duration: 0.3}
        }
    };

export {
    authContainerVariants,
    authItemVariants,
    authFormVariants,
    authImageContainerVariants,
    authImageVariants
}