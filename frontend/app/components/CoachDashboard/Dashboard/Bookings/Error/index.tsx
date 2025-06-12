import React from 'react';
import {motion} from "framer-motion";
import {BanIcon} from "lucide-react";
import {ANIMATIONS} from "~/constants";

const {BOOKINGS_ITEMS_VARIANTS} = ANIMATIONS;

const BookingsError = () => {
    return (
        <motion.div
            className="col-span-1 md:col-span-2 p-8 border border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-slate-50"
            variants={BOOKINGS_ITEMS_VARIANTS}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.5}}
            >
                <div
                    className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <BanIcon
                        className="w-8 h-8 text-red-500"
                        aria-hidden="true"
                    />
                </div>
                <p className="text-gray-500 text-lg">
                    Aucune réservation trouvée pour cette période.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default BookingsError;
