import {useEffect, useState} from 'react';
import CoachCard from "app/components/Coach/CoachCard";
import {motion, type Variants} from "motion/react";
import {getPublicEnv} from "../../env.common";
import type {Coach} from "~/types";
import {useUser} from "~/hooks/useUser";
import {calculateAgeFromBirthdate} from "~/lib/calculations";
import Loader from "~/components/Loader";

const titleTransition: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

const gridTransition: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.15,
            ease: "easeOut",
        },
    },
}

const gridElementTransition: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
}

const CoachesPage = () => {
    const [coaches, setCoaches] = useState<Coach[] | undefined>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {userToken} = useUser();

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await fetch(getPublicEnv(import.meta.env).VITE_API_URL + '/coachs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${userToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch coaches');
                }
                const data = await response.json();
                setCoaches(data);
            } catch (error) {
                console.error('Error fetching coaches:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoaches().catch(console.error);
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={titleTransition}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    Nos Coachs
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Découvrez nos coachs professionnels prêts à vous accompagner dans votre parcours sportif.
                </p>
            </motion.div>

            {
                isLoading && (
                    <Loader/>
                )
            }
            {
                !isLoading && coaches && coaches.length === 0 && (
                    <div className="text-center text-gray-500">
                        Aucun coach disponible pour le moment.
                    </div>
                )
            }

            {
                !isLoading && coaches && coaches.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={gridTransition}
                    >
                        {coaches.map((coach) => (
                            <motion.div
                                key={coach.id}
                                variants={gridElementTransition}
                                className="flex"
                            >
                                <CoachCard coach={
                                    {
                                        id: coach.id,
                                        profilePictureUrl: coach.profilePictureUrl,
                                        name: coach.user.firstName + ' ' + coach.user.lastName,
                                        age: calculateAgeFromBirthdate(coach.birthdate),
                                        gender: coach.gender,
                                        sports: coach.sports,
                                        levels: coach.levels,
                                    }
                                }/>
                            </motion.div>
                        ))}
                    </motion.div>
                )
            }
        </div>
    );
};

export default CoachesPage;
