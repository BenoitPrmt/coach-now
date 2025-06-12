import React, {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {useUser} from "~/hooks/useUser";
import Loader from "~/components/Loader";
import type {User, Booking, Coach, Rating} from "~/types";
import {motion, AnimatePresence} from "motion/react";
import {Info, Calendar, Star, ArrowRight} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs"
import {Link} from "react-router";
import RatingCards from "~/components/Rating/RatingCards";
import {isOfTypeCoach} from "~/validation/typesValidations";
import ProfileEditModal from "~/components/Account/profile/EditModal";
import BookingCard from "~/components/Booking/card";
import UserInfo from "~/components/Account/user/UserInfo";
import {Badge} from "~/components/ui/badge";
import {cn} from "~/lib/utils";
import {useRating} from "~/store/ratingStore";
import CoachRatingModal from "~/components/Coach/CoachModal/CoachRatingModal";
import {API_URL} from "~/constants/api";

const AccountComponent = () => {
    const {user, userToken, isLoading} = useUser();
    const {
        openRatingModal,
        isModalOpen,
        closeRatingModal,
        selectedBooking
    } = useRating();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userProfileLoading, setUserProfileLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("bookings");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenRatingModal = useCallback((booking: Booking) => {
        if (!booking || !booking.id) {
            console.error('Invalid booking data:', booking);
            return;
        }
        openRatingModal(booking);
    }, [openRatingModal]);

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
                `${API_URL}/user/${user!.id}`,
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
    }, [fetchKey, isLoading]);

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

    const handleRatingSubmit = useCallback((newRating: Rating) => {
        setUserProfile((prevProfile) => {
            if (!prevProfile) return null;

            const updatedRatings = [...(prevProfile.ratings || []), newRating];

            return {
                ...prevProfile,
                ratings: updatedRatings
            };
        });
    }, []);

    if (isLoading) return <Loader/>;
    if (!user) return <Loader/>;
    if (userProfileLoading) return <Loader/>;

    if (!userProfile) {
        return (
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mon compte</h1>
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
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
                className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mon compte</h1>
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <Info className="w-5 h-5"/>
                    <p>Votre profil n'est pas disponible.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
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
                        Mon compte
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">Gérez votre profil et consultez votre activité</p>
                </motion.div>

                <div className="flex flex-col w-full gap-8">
                    <motion.div
                        className="lg:col-span-1"
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 sticky top-8">
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
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div
                                        className="w-10 h-10 bg-primary dark:bg-primary/80 rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-white"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Informations supplémentaires
                                    </h3>
                                </div>
                                {
                                    user?.role === 'USER' ? (
                                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                            <TabsList
                                                className="grid w-full grid-cols-2 mb-8 p-1 bg-gray-100 dark:bg-gray-700">
                                                <TabsTrigger
                                                    value="bookings"
                                                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                >
                                                    <Calendar className="w-4 h-4 mr-2"/>
                                                    Réservations
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="ratings"
                                                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                >
                                                    <Star className="w-4 h-4 mr-2"/>
                                                    Avis
                                                </TabsTrigger>
                                            </TabsList>

                                            <AnimatePresence>
                                                <TabsContent value="bookings">
                                                    <Tabs defaultValue="future">
                                                        <TabsList className="grid grid-cols-4 mb-8 p-1 bg-gray-100 dark:bg-gray-700">
                                                            <TabsTrigger
                                                                value="future"
                                                                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                            >
                                                                <span className={cn(
                                                                    "flex items-center gap-1",
                                                                    futureBookings.length > 0 ? "text-slate-800 dark:text-slate-200" : "text-gray-500 dark:text-gray-400"
                                                                )}>
                                                                    <span>À venir</span>
                                                                    {futureBookings.length > 0 && (
                                                                        <Badge
                                                                            className="h-4 min-w-4 rounded-full px-1 tabular-nums bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                                                            variant="light">
                                                                            {futureBookings.length}
                                                                        </Badge>
                                                                    )}
                                                                </span>
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="ongoing"
                                                                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                            >
                                                                <span className={cn(
                                                                    "flex items-center gap-1",
                                                                    ongoingBookings.length > 0 ? "text-slate-800 dark:text-slate-200" : "text-gray-500 dark:text-gray-400"
                                                                )}>
                                                                    <span>En cours</span>
                                                                    {ongoingBookings.length > 0 && (
                                                                        <Badge
                                                                            className="h-4 min-w-4 rounded-full px-1 tabular-nums bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                                                            variant="light">
                                                                            {ongoingBookings.length}
                                                                        </Badge>
                                                                    )}
                                                                </span>
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="past"
                                                                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                            >
                                                                <span className={cn(
                                                                    "flex items-center gap-1",
                                                                    pastBookings.length > 0 ? "text-slate-800 dark:text-slate-200" : "text-gray-500 dark:text-gray-400"
                                                                )}>
                                                                    <span>Terminées</span>
                                                                    {pastBookings.length > 0 && (
                                                                        <Badge
                                                                            className="h-4 min-w-4 rounded-full px-1 tabular-nums bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                                                                            variant="light">
                                                                            {pastBookings.length}
                                                                        </Badge>
                                                                    )}
                                                                </span>
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="cancelled"
                                                                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-300"
                                                            >
                                                            <span className={cn(
                                                                "flex items-center gap-1",
                                                                cancelledBookings.length > 0 ? "text-slate-800 dark:text-slate-200" : "text-gray-500 dark:text-gray-400"
                                                            )}>
                                                                <span>Annulées</span>
                                                                {cancelledBookings.length > 0 && (
                                                                    <Badge
                                                                        className="h-4 min-w-4 rounded-full px-1 tabular-nums bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                                                        variant="light">
                                                                        {cancelledBookings.length}
                                                                    </Badge>
                                                                )}
                                                            </span>
                                                            </TabsTrigger>
                                                        </TabsList>
                                                        <TabsContent value="future">
                                                            {futureBookings && futureBookings.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                                                        À venir
                                                                    </h4>
                                                                    <div className="space-y-4">
                                                                        {futureBookings.map((booking, index) => (
                                                                            <BookingCard key={booking.id}
                                                                                         booking={booking}
                                                                                         index={index}/>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {!futureBookings || futureBookings.length === 0 && (
                                                                <p className="text-gray-500 dark:text-gray-400 mt-4">Aucune réservation à
                                                                    venir.</p>
                                                            )}
                                                        </TabsContent>
                                                        <TabsContent value="ongoing">
                                                            {ongoingBookings && ongoingBookings.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-white">En
                                                                        cours</h4>
                                                                    <div className="space-y-4">
                                                                        {ongoingBookings.map((booking, index) => (
                                                                            <BookingCard key={booking.id}
                                                                                         booking={booking}
                                                                                         index={index}/>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {!ongoingBookings || ongoingBookings.length === 0 && (
                                                                <p className="text-gray-500 dark:text-gray-400 mt-4">Aucune réservation en
                                                                    cours.</p>
                                                            )}
                                                        </TabsContent>
                                                        <TabsContent value="past">
                                                            {pastBookings && pastBookings.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-white">Terminées</h4>
                                                                    <div className="space-y-4">
                                                                        {pastBookings.map((booking, index) => (
                                                                            <BookingCard key={booking.id}
                                                                                         booking={booking}
                                                                                         index={index}
                                                                                         userProfile={userProfile}
                                                                                         onRate={handleOpenRatingModal}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {!pastBookings || pastBookings.length === 0 && (
                                                                <p className="text-gray-500 dark:text-gray-400 mt-4">Aucune réservation
                                                                    terminée.</p>
                                                            )}
                                                        </TabsContent>
                                                        <TabsContent value="cancelled">
                                                            {cancelledBookings && cancelledBookings.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-lg font-semibold mt-6 mb-2 text-red-600 dark:text-red-400">Annulées</h4>
                                                                    <div className="space-y-4">
                                                                        {cancelledBookings.map((booking, index) => (
                                                                            <BookingCard key={booking.id}
                                                                                         booking={booking}
                                                                                         index={index}/>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {!cancelledBookings || cancelledBookings.length === 0 && (
                                                                <p className="text-gray-500 dark:text-gray-400 mt-4">Aucune réservation
                                                                    annulée.</p>
                                                            )}
                                                        </TabsContent>
                                                    </Tabs>
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
                                        <div className="flex flex-col justify-center text-gray-500 dark:text-gray-400 gap-2">
                                            <p>
                                                Pour accéder à vos réservations et avis reçus, veuillez aller sur le
                                                dashboard dédié.
                                            </p>
                                            <Link
                                                to="/dashboard"
                                                className="text-blue-600 dark:text-blue-400 hover:underline group flex items-center justify-center text-sm font-medium transition-colors duration-200 rounded-lg px-4 py-2 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-800/50"
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
                {/* Modal de notation du coach → Obligé de passer chaque propriété, car gros BUG */}
                <CoachRatingModal
                    isModalOpen={isModalOpen}
                    closeRatingModal={closeRatingModal}
                    selectedBooking={selectedBooking}
                    onRatingSubmitted={handleRatingSubmit}
                />
            </motion.div>
        </div>
    );
};

export default AccountComponent;