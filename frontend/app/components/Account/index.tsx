import React, {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {useUser} from "~/hooks/useUser";
import Loader from "~/components/Loader";
import type {User, Booking, Coach} from "~/types";
import {motion, AnimatePresence} from "motion/react";
import {Info, Calendar, Star, ArrowRight} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs"
import {Link} from "react-router";
import RatingCards from "~/components/Rating/RatingCards";
import {isOfTypeCoach} from "~/validation/typesValidations";
import { getPublicEnv } from 'env.common';
import ProfileEditModal from "~/components/Account/profile/edit-modal";
import BookingCard from "~/components/Booking/card";
import UserInfo from "~/components/Account/user/user-info";

const AccountComponent = () => {
    const {user, userToken, isLoading} = useUser();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userProfileLoading, setUserProfileLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("bookings");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchKey = useMemo(() => {
        if (!user?.id || !user?.role || !userToken) return null;
        return `${user.role}-${user.id}`;
    }, [user?.id, user?.role, userToken]);

    // Ref pour éviter les fetch multiples
    const fetchInProgress = useRef(false);
    const currentFetchKey = useRef<string | null>(null);

    const fetchUserProfile = useCallback(async () => {
        if (!fetchKey || fetchInProgress.current || currentFetchKey.current === fetchKey) {
            return;
        }
        fetchInProgress.current = true;
        currentFetchKey.current = fetchKey;
        setUserProfileLoading(true);

        try {
            const res = await fetch(
                `${getPublicEnv(import.meta.env).VITE_API_URL}/user/${user!.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    }
                }
            );

            if (!res.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await res.json();
            console.log(`Fetch successful for ${fetchKey}:`, data);
            setUserProfile(data);

        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
        } finally {
            setUserProfileLoading(false);
            fetchInProgress.current = false;
        }
    }, [fetchKey, user]);

    useEffect(() => {
        if (fetchKey && !isLoading) {
            fetchUserProfile();
        }
    }, [fetchKey, isLoading, fetchUserProfile]);

    const bookingCategories = useMemo(() => {
        if (!userProfile?.bookings) {
            return {
                futureBookings: [],
                ongoingBookings: [],
                pastBookings: [],
                cancelledBookings: []
            };
        }

        const now = new Date();
        const future: Booking[] = [];
        const ongoing: Booking[] = [];
        const past: Booking[] = [];
        const cancelled: Booking[] = [];

        userProfile.bookings.forEach((booking) => {
            if (!booking.isActive) {
                cancelled.push(booking);
                return;
            }

            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);

            if (startDate > now) {
                future.push(booking);
            } else if (startDate <= now && endDate >= now) {
                ongoing.push(booking);
            } else {
                past.push(booking);
            }
        });

        return {
            futureBookings: future,
            ongoingBookings: ongoing,
            pastBookings: past,
            cancelledBookings: cancelled
        };
    }, [userProfile?.bookings]);

    const handleProfileUpdate = useCallback((updatedUser: User | Coach) => {
        if (!isOfTypeCoach(updatedUser)) {
            setUserProfile(updatedUser);
        }
        console.log(`Profile updated:`, updatedUser);
    }, []);

    if (isLoading) return <Loader/>;
    if (!user) return <Loader/>;
    if (userProfileLoading) return <Loader/>;

    if (!userProfile) {
        return (
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Mon compte</h1>
                <div className="flex items-center space-x-2 text-red-600">
                    <Info className="w-5 h-5"/>
                    <p>Votre profil n'est pas disponible.</p>
                </div>
            </motion.div>
        );
    }

    const {futureBookings, ongoingBookings, pastBookings, cancelledBookings} = bookingCategories;

    if (isLoading) return <Loader/>
    if (userProfileLoading) return <Loader/>

    if (!userProfileLoading && !userProfile) {
        return (
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Mon compte</h1>
                <div className="flex items-center space-x-2 text-red-600">
                    <Info className="w-5 h-5"/>
                    <p>Votre profil n'est pas disponible.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8}}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary via-accent bg-clip-text text-transparent mb-2">
                        Mon Compte
                    </h1>
                    <p className="text-gray-600">Gérez votre profil et consultez votre activité</p>
                </motion.div>

                <div className="flex flex-col w-full gap-8">
                    <motion.div
                        className="lg:col-span-1"
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <div
                            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 sticky top-8">
                            {userProfile && (
                                <UserInfo
                                    user={userProfile}
                                    userRole={user?.role}
                                    onEditClick={() => setIsEditModalOpen(true)}
                                />
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        className="lg:col-span-2"
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.4}}
                    >
                        <div
                            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div
                                        className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-white"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Informations supplémentaires
                                    </h3>
                                </div>
                                {
                                    user?.role === 'USER' ? (
                                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                            <TabsList
                                                className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                                                <TabsTrigger
                                                    value="bookings"
                                                    className="cursor-pointer rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
                                                >
                                                    <Calendar className="w-4 h-4 mr-2"/>
                                                    Réservations
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="ratings"
                                                    className="cursor-pointer rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
                                                >
                                                    <Star className="w-4 h-4 mr-2"/>
                                                    Avis
                                                </TabsTrigger>
                                            </TabsList>

                                            <AnimatePresence>
                                                <TabsContent value="bookings">
                                                    <motion.div
                                                        key="bookings"
                                                        initial={{opacity: 0, y: 20}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -20}}
                                                        transition={{duration: 0.3}}
                                                        className="space-y-8 max-h-[60vh] overflow-y-auto pr-2"
                                                    >
                                                        {/* À venir */}
                                                        {futureBookings && futureBookings.length > 0 && (
                                                            <div>
                                                                <h4 className="text-lg font-semibold mb-2">À venir</h4>
                                                                <div className="space-y-4">
                                                                    {futureBookings.map((booking, index) => (
                                                                        <BookingCard key={booking.id} booking={booking}
                                                                                     index={index}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* En cours */}
                                                        {ongoingBookings && ongoingBookings.length > 0 && (
                                                            <div>
                                                                <h4 className="text-lg font-semibold mt-6 mb-2">En
                                                                    cours</h4>
                                                                <div className="space-y-4">
                                                                    {ongoingBookings.map((booking, index) => (
                                                                        <BookingCard key={booking.id} booking={booking}
                                                                                     index={index}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Terminées */}
                                                        {pastBookings && pastBookings.length > 0 && (
                                                            <div>
                                                                <h4 className="text-lg font-semibold mt-6 mb-2">Terminées</h4>
                                                                <div className="space-y-4">
                                                                    {pastBookings.map((booking, index) => (
                                                                        <BookingCard key={booking.id} booking={booking}
                                                                                     index={index}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Annulées */}
                                                        {cancelledBookings && cancelledBookings.length > 0 && (
                                                            <div>
                                                                <h4 className="text-lg font-semibold mt-6 mb-2 text-red-600">Annulées</h4>
                                                                <div className="space-y-4">
                                                                    {cancelledBookings.map((booking, index) => (
                                                                        <BookingCard key={booking.id} booking={booking}
                                                                                     index={index}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Aucune réservation */}
                                                        {!futureBookings?.length &&
                                                            !ongoingBookings?.length &&
                                                            !pastBookings?.length &&
                                                            !cancelledBookings?.length && (
                                                                <p className="text-gray-500 text-sm">Aucune réservation
                                                                    trouvée.</p>
                                                            )}
                                                    </motion.div>
                                                </TabsContent>

                                                <TabsContent value="ratings">
                                                    <motion.div
                                                        key="ratings"
                                                        initial={{opacity: 0, y: 20}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -20}}
                                                        transition={{duration: 0.3}}
                                                        className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
                                                    >
                                                        <RatingCards
                                                            ratings={userProfile?.ratings}
                                                            delay={0}
                                                        />
                                                    </motion.div>
                                                </TabsContent>
                                            </AnimatePresence>
                                        </Tabs>
                                    ) : (
                                        <div className="flex flex-col justify-center text-gray-500 gap-2">
                                            <p>
                                                Pour accéder à vos réservations et avis reçus, veuillez aller sur le
                                                dashboard dédié.
                                            </p>
                                            <Link
                                                to="/dashboard"
                                                className="text-blue-600 hover:underline group flex items-center justify-center text-sm font-medium transition-colors duration-200 rounded-lg px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800"
                                            >
                                                Accéder au dashboard
                                                <ArrowRight
                                                    className="inline-block ml-1 w-4 h-4 group-hover:underline group-hover:translate-x-0.5 duration-200"/>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Modal de modification du profil */}
                {userProfile && (
                    <ProfileEditModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        user={userProfile}
                        userRole={user?.role}
                        onProfileUpdate={handleProfileUpdate}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default AccountComponent;