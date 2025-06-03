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

const authImageVariants = {
    login: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    },
    register: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    }
};

export {
    authContainerVariants,
    authItemVariants,
    authFormVariants,
    authImageVariants
}