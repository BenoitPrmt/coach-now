import React, {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {useUser} from "~/hooks/useUser";
import Loader from "~/components/Loader";
import type {User, Booking, UserRole, Coach} from "~/types";
import {getPublicEnv} from "../../../env.common";
import {motion, AnimatePresence} from "motion/react";
import {Info, Calendar, Star, Clock, Euro, User as UserIcon, Mail, ArrowRight, Edit, Save, X} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "~/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import {Button} from "~/components/ui/button"
import CoachImage from "~/components/Coach/CoachImage";
import {Link} from "react-router";
import RatingCards from "~/components/Rating/RatingCards";
import {cn} from "~/lib/utils";
import {formatDate} from "~/lib/time";
import {FaDumbbell, FaUser, FaCrown, FaInfo} from "react-icons/fa6";
import {isOfTypeCoach} from "~/validation/typesValidations";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {profileSchema} from "~/validation/zod";
import {z} from "zod";

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserInfo = ({user, userRole = "USER", onEditClick}: {
    user: User | Coach,
    userRole?: UserRole,
    onEditClick: () => void
}) => {
    let totalBookings = 0;
    let totalRatings = 0;
    if (!isOfTypeCoach(user)) {
        totalBookings = user.bookings?.length || 0;
        totalRatings = user.ratings?.length || 0;
    }
    return (
        <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, ease: "easeOut"}}
        >
            {/* Avatar */}
            <motion.div
                className="relative"
                whileHover={{scale: 1.05}}
                transition={{type: "spring", stiffness: 300}}
            >
                {
                    isOfTypeCoach(user) && userRole === "COACH" ? (
                        <img
                            src={user.profilePictureUrl}
                            alt={`${user.user.firstName} ${user.user.lastName}`}
                            className="w-24 h-24 bg-primary rounded-full object-cover shadow-lg"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <UserIcon className="w-10 h-10 text-white"/>
                        </div>
                    )
                }
                <div
                    className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </motion.div>

            {/* User Details */}
            <div className="text-center space-y-2">
                <motion.h2
                    className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    {isOfTypeCoach(user)
                        ? `${user.user.firstName} ${user.user.lastName}`
                        : `${user.firstName} ${user.lastName}`}
                </motion.h2>
                <motion.div
                    className="flex items-center justify-center space-x-2 text-gray-600"
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.3}}
                >
                    <Mail className="w-4 h-4"/>
                    <p className="text-sm">
                        {isOfTypeCoach(user) ? user.user.email : user.email}
                    </p>
                </motion.div>
                <motion.div
                    className="inline-flex px-3 py-1 bg-primary text-white rounded-full text-xs font-medium"
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.4}}
                >
                    {
                        userRole === 'COACH' ? (
                            <FaDumbbell className="w-4 h-4 mr-1" title="Coach"/>
                        ) : userRole === 'USER' ? (
                            <FaUser className="w-4 h-4 mr-1" title="Utilisateur"/>
                        ) : userRole === 'ADMIN' ? (
                            <FaCrown
                                className="w-4 h-4 mr-1" title="Administrateur"/>
                        ) : (
                            <FaInfo className="w-4 h-4 mr-1" title="Rôle inconnu"/>
                        )
                    }
                    {userRole}
                </motion.div>
            </div>

            {/* Bouton Modifier le profil */}
            <motion.div
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.45}}
            >
                <Button
                    onClick={onEditClick}
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                    <Edit className="w-4 h-4 mr-2"/>
                    Modifier le profil
                </Button>
            </motion.div>

            {/* Stats (que si user) */}
            {
                userRole === 'USER' && (
                    <motion.div
                        className="grid grid-cols-2 gap-4 w-full"
                        initial={{y: 30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.5}}
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-ring">{totalBookings}</div>
                            <div className="text-xs text-ring">Réservations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{totalRatings}</div>
                            <div className="text-xs text-yellow-600">Avis</div>
                        </div>
                    </motion.div>
                )
            }
        </motion.div>
    );
}

const ProfileEditModal = ({isOpen, onClose, user, userRole, onProfileUpdate}: {
    isOpen: boolean;
    onClose: () => void;
    user: User | Coach;
    userRole?: UserRole;
    onProfileUpdate: (updatedUser: User | Coach) => void;
}) => {
    const {userToken} = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: isOfTypeCoach(user) ? user.user.firstName : user.firstName,
            lastName: isOfTypeCoach(user) ? user.user.lastName : user.lastName,
            email: isOfTypeCoach(user) ? user.user.email : user.email,
        },
    });

    const onSubmit = async (values: ProfileFormValues) => {
        if (!userToken) return;

        setIsSubmitting(true);
        try {
            const endpoint = `${getPublicEnv(import.meta.env).VITE_API_URL}/${userRole?.toLowerCase()}/${isOfTypeCoach(user) ? user.user.id : user.id}`;

            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const updatedUser = await response.json();
            console.log(`Profil mis à jour avec succès:`, updatedUser);
            onProfileUpdate({
                ...updatedUser,
                user: isOfTypeCoach(updatedUser) ? updatedUser.user : {
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email
                }
            });
            onClose();

            // Reset form avec les nouvelles valeurs
            form.reset({
                firstName: isOfTypeCoach(updatedUser) ? updatedUser.user.firstName : updatedUser.firstName,
                lastName: isOfTypeCoach(updatedUser) ? updatedUser.user.lastName : updatedUser.lastName,
                email: isOfTypeCoach(updatedUser) ? updatedUser.user.email : updatedUser.email,
            });
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5 text-primary"/>
                        <span>Modifier le profil</span>
                    </DialogTitle>
                    <DialogDescription>
                        Modifiez vos informations personnelles. Cliquez sur sauvegarder pour confirmer les changements.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre prénom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre nom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="votre@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                <X className="w-4 h-4 mr-2"/>
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Save className="w-4 h-4 mr-2"/>
                                {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

const BookingCard = ({booking, index}: { booking: Booking; index: number }) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const durationMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const displayDuration = useCallback((
        hours: number,
        minutes: number
    ) => {
        if (hours === 0 && minutes === 0) return "0min";
        return new Intl.NumberFormat('fr-FR', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(hours) + 'h' + (minutes > 0 ? minutes : '');
    }, []);

    const bookingStatus = useMemo(() => {
        // Si la réservation est annulée (isActive === false)
        if (!booking.isActive) {
            return "Annulée";
        }

        const now = new Date();
        if (startDate > now) {
            return "À venir";
        } else if (startDate <= now && endDate >= now) {
            return "En cours";
        } else {
            return "Terminée";
        }
    }, [booking.isActive]);

    // Déterminer si la carte doit être grisée
    const isBookingCancelled = !booking.isActive;

    return (
        <motion.div
            className={cn(
                "bg-white dark:bg-neutral-700 rounded-xl p-6 transition-all duration-300",
                isBookingCancelled && "opacity-60 grayscale bg-gray-50 dark:bg-gray-800"
            )}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
        >
            <div className="flex justify-between items-start mb-4">
                <Link
                    to={`/coach/${booking.coach.id}`}
                    className={cn(
                        "flex items-center space-x-3 hover:underline",
                        isBookingCancelled && "pointer-events-none"
                    )}
                >
                    <CoachImage
                        src={booking.coach.profilePictureUrl}
                        alt={`${booking.coach.user.firstName} ${booking.coach.user.lastName}`}
                        className={cn(
                            "w-12 h-12 rounded-full object-cover shadow-sm",
                            isBookingCancelled && "grayscale opacity-70"
                        )}
                    />
                    <div>
                        <h4 className={cn(
                            "font-semibold text-gray-900 dark:text-white",
                            isBookingCancelled && "text-gray-500 dark:text-gray-400"
                        )}>
                            Coach {booking.coach.user.firstName} {booking.coach.user.lastName}
                        </h4>
                    </div>
                </Link>
                <div className={cn('px-3 py-1 rounded-full text-xs font-medium',
                    bookingStatus === "Annulée" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                        bookingStatus === "À venir" ? "bg-yellow-100 text-yellow-800" :
                            bookingStatus === "En cours" ? "bg-green-100 text-green-800" :
                                "bg-gray-100 text-gray-800"
                )}>
                    {bookingStatus}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center md:justify-center space-x-2">
                    <Calendar className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Début</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{
                            formatDate(startDate)
                        }</p>
                    </div>
                </div>
                <div className="flex items-center md:justify-center space-x-2">
                    <Clock className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Durée</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{
                            displayDuration(hours, minutes)
                        }</p>
                    </div>
                </div>
                <div className="flex items-center md:justify-center space-x-2">
                    <Calendar className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Fin</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{formatDate(endDate)}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-neutral-600">
                <div className="flex items-center space-x-2">
                    <Euro className={cn(
                        "w-4 h-4 text-green-600",
                        isBookingCancelled && "text-gray-400"
                    )}/>
                    <span className={cn(
                        "font-bold text-green-600",
                        isBookingCancelled && "text-gray-400 line-through"
                    )}>{booking.totalPrice}€</span>
                </div>
                <div className={cn(
                    "text-xs text-gray-500",
                    isBookingCancelled && "text-gray-400"
                )}>
                    {booking.coach.hourlyRate}€/h
                </div>
                {
                    booking.coach.levels && booking.coach.levels.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {booking.coach.levels.map((level, i) => (
                                <span
                                    key={`${booking.id}-level-${level}-${i}`}
                                    className={cn(
                                        "px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium",
                                        isBookingCancelled && "bg-gray-100 text-gray-500"
                                    )}>
                                    {level}
                                </span>
                            ))}
                        </div>
                    )
                }
                {
                    booking.coach.sports && booking.coach.sports.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {booking.coach.sports.map((sport, i) => (
                                <span
                                    key={`${booking.id}-sport-${sport}-${i}`}
                                    className={cn(
                                        "px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium",
                                        isBookingCancelled && "bg-gray-100 text-gray-500"
                                    )}>
                                    {sport}
                                </span>
                            ))}
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
};

const Account = () => {
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
                `${getPublicEnv(import.meta.env).VITE_API_URL}/${user!.role.toLowerCase()}/${user!.id}`,
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
                                                to="/coach/dashboard"
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

export default Account;