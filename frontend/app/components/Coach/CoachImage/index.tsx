import {motion} from "motion/react";
import {cn} from "~/lib/utils";

type CoachImageProps = {
    src: string,
    alt: string,
    animateOnHover?: boolean,
    className?: string
}

const CoachImage = (
    {
        src,
        alt,
        animateOnHover = false,
        className
    }: CoachImageProps) => {
    return (
        <motion.img
            src={src}
            alt={alt}
            whileHover={animateOnHover ? {
                rotateZ: -5,
                scale: 1.05,
                transition: {ease: "easeInOut"}
            } : undefined}
            className={cn("w-24 h-24 rounded-2xl object-cover shadow-lg", className)}
        />
    )
}

export default CoachImage;