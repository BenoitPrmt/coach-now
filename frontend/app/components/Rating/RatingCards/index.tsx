import type {Rating} from "~/types";
import {motion} from "motion/react";
import React from "react";
import RatingCard from "~/components/Rating/RatingCards/RatingCard";

type Props = {
    ratings?: Rating[];
    delay?: number;
};

const RatingCards = ({ratings, delay = 0.4}: Props) => {
    return (
        <motion.div
            className="flex flex-col gap-4 px-6 pb-6"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: delay, staggerChildren: 0.1}}
        >
            {ratings && ratings.length > 0 ? (
                ratings.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                ).map((rating, index) => (
                    <motion.div
                        key={rating?.id || index}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}
                        whileHover={{scale: 1.02}}>
                        <RatingCard
                            key={index}
                            rating={rating}
                        />
                    </motion.div>
                ))
            ) : (
                <p className="text-neutral-500">Aucun avis pour ce coach.</p>
            )}
        </motion.div>
    );
};

export default RatingCards;
