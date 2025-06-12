import type {Variants} from "motion/react";

const AUTH_CONTAINER_VARIANTS: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1
        }
    }
};

const AUTH_ITEM_VARIANTS: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.3}
    }
};

const AUTH_FORM_VARIANTS: Variants = {
    login: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    },
    register: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    }
};

const AUTH_IMAGE_CONTAINER_VARIANTS: Variants = {
    login: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    },
    register: {
        x: 0,
        transition: {duration: 0.6, ease: "easeInOut"}
    }
};

const AUTH_IMAGE_VARIANTS: Variants = {
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

const COACH_DASHBOARD_FIRST_GRID_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            staggerChildren: 0.1,
        },
    },
}

const COACH_DASHBOARD_SECOND_GRID_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            staggerChildren: 0.5
        },
    },
}

export {
    AUTH_CONTAINER_VARIANTS,
    AUTH_ITEM_VARIANTS,
    AUTH_FORM_VARIANTS,
    AUTH_IMAGE_CONTAINER_VARIANTS,
    AUTH_IMAGE_VARIANTS,
    COACH_DASHBOARD_FIRST_GRID_VARIANTS,
    COACH_DASHBOARD_SECOND_GRID_VARIANTS
}