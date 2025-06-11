import React, {useEffect, useState} from 'react';
import {getPublicEnv} from "../../env.common";
import Loader from "~/components/Loader";
import type {Coach, Gender} from "~/types";
import {motion} from "motion/react";
import {MarsIcon, VenusIcon, XIcon} from "lucide-react";
import {formatGender} from "~/lib/formatting";
import {useMemo} from "react";
import {Description} from "app/components/Coach/CoachCard";
import {useUser} from "~/hooks/useUser";
import {Speech} from "lucide-react";
import CoachImage from "~/components/Coach/CoachImage";
import RatingStar from "~/components/Rating/RatingCards/RatingCard/RatingStar";
import RatingCards from "~/components/Rating/RatingCards";

import {Booking} from "~/components/Booking/booking";
import { calculateAverageRating } from '~/lib/calculations';
import CoachGender from "~/components/Coach/CoachGender";

type Props = {
    coachId: string;
}

const UserInfo = ({
                      profilePictureUrl,
                      firstName,
                      lastName,
                      birthdate,
                      gender,
                  }: {
    profilePictureUrl: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: Gender;
}) => {
    const age = useMemo(() => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }, [birthdate]);

    const renderGenderSpan = useMemo(() => {
        return <CoachGender gender={gender} />
    }, [gender]);

    return (
        <div className="flex flex-col items-center gap-3">
            <CoachImage
                src={profilePictureUrl}
                alt={`${firstName} ${lastName}`}
                animateOnHover
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex flex-col items-center">
                <motion.h2
                    className="font-semibold text-neutral-900 dark:text-neutral-200 text-2xl pt-2"
                >
                    {`${firstName} ${lastName}`}
                </motion.h2>
                <motion.p
                    className="inline-flex text-neutral-500 dark:text-neutral-400 items-center gap-1 text-sm"
                >
                    {age} ans | {renderGenderSpan}
                </motion.p>
            </div>
        </div>
    );
};

const CoachProfile = ({coachId}: Props) => {
    const [coach, setCoach] = useState<Coach | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {userToken} = useUser();

    useEffect(() => {
        const fetchCoachProfile = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${getPublicEnv(import.meta.env).VITE_API_URL}/coach/${coachId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch coach profile');
                }
                const data = await response.json();
                setCoach(data);
            } catch (error) {
                console.error('Error fetching coach profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoachProfile();
    }, [coachId]);

    useEffect(() => {
        if (coach) {
            setAverageRating(calculateAverageRating(coach.ratings));
        }
    }, [coach]);

    if (isLoading) {
        return <Loader/>;
    }

    if (!isLoading && !coach) {
        return <div className="text-center text-red-500">Coach not found</div>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Profile Card */}
                <motion.div
                    className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="flex flex-col justify-between items-center mb-6 h-full">
                        <div className="flex flex-col items-center w-full">
                            {coach && (
                                <>
                                    <UserInfo
                                        profilePictureUrl={coach.profilePictureUrl}
                                        firstName={coach.user.firstName}
                                        lastName={coach.user.lastName}
                                        birthdate={coach.birthdate}
                                        gender={coach.gender}
                                    />

                                    {
                                        (coach.levels.length > 0 || coach.sports.length > 0) && (
                                            <motion.div
                                                className="mt-6 w-full bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-6"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.5, delay: 0.1}}
                                            >
                                                <Description
                                                    levels={coach.levels}
                                                    sports={coach.sports}
                                                    isModal={true}
                                                />
                                            </motion.div>
                                        )
                                    }
                                    <motion.div
                                        className="mt-6 flex flex-col items-center gap-4"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.5, delay: 0.2}}
                                    >
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">
                                            Note moyenne
                                        </h3>
                                        {averageRating !== null ? (
                                            <RatingStar value={averageRating} className="text-3xl"/>
                                        ) : (
                                            <p className="text-neutral-500">Aucune note disponible</p>
                                        )}
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {coach.ratings.length} avis
                                        </p>
                                    </motion.div>
                                </>
                            )}
                        </div>
                        <motion.div
                            className="flex-shrink-0"
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.1}}
                        >
                            {coach && <Booking coach={coach}/>}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Additional Information */}
                <motion.div
                    className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl h-[65vh] overflow-y-auto"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    <div
                        className="sticky top-0 right-0 left-0 bg-neutral-100 dark:bg-neutral-800 z-10 py-10 px-8 mb-4 w-full">
                        <h3 className="flex items-center text-xl font-semibold mb-4 gap-2">
                            <Speech/>
                            Avis
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                            Voici les avis laissés par les utilisateurs pour ce coach.
                        </p>
                    </div>
                    {/* Ratings */}
                    <RatingCards ratings={coach?.ratings}/>
                </motion.div>
            </div>
        </div>
    );
};

export default CoachProfile;
