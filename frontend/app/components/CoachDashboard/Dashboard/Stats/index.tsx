import React from 'react';
import {motion, type Variants} from "motion/react";
import {ANIMATIONS} from "~/constants";
import StatCard from "~/components/CoachDashboard/Dashboard/Stats/StatCard";
import {Calendar, DollarSign, Star, Users} from "lucide-react";
import QuickStats from "~/components/CoachDashboard/Dashboard/Stats/QuickStats";
import type {CoachDashboard} from "~/types";

const CHILD_VARIANTS: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
};

const CoachDashboardStats = ({dashboardData}: { dashboardData: CoachDashboard }) => {
    return (
        <div className="space-y-6">
            {/* Métriques principales */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={ANIMATIONS.COACH_DASHBOARD_FIRST_GRID_VARIANTS}
            >
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={CHILD_VARIANTS}
                    whileHover={{
                        y: -5,
                        transition: {duration: 0.2, ease: "easeInOut"}
                    }}
                    whileTap={{
                        y: 0,
                        transition: {duration: 0.1, ease: "easeInOut"}
                    }}
                >
                    <StatCard
                        title="Réservations aujourd'hui"
                        value={dashboardData.todayBookings}
                        icon={Calendar}
                        className="h-full w-full"
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={CHILD_VARIANTS}
                    whileHover={{
                        y: -5,
                        transition: {duration: 0.2, ease: "easeInOut"}
                    }}
                    whileTap={{
                        y: 0,
                        transition: {duration: 0.1, ease: "easeInOut"}
                    }}
                >
                    <StatCard
                        title="Réservations totales"
                        value={dashboardData.totalBookings}
                        icon={Users}
                        className="h-full w-full"
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={CHILD_VARIANTS}
                    whileHover={{
                        y: -5,
                        transition: {duration: 0.2, ease: "easeInOut"}
                    }}
                    whileTap={{
                        y: 0,
                        transition: {duration: 0.1, ease: "easeInOut"}
                    }}
                >
                    < StatCard
                        title="Revenus générés"
                        value={`${dashboardData.totalEarnings.toLocaleString('fr-FR')}€`}
                        subtitle={dashboardData.pendingEarnings > 0 ? `(+${dashboardData.pendingEarnings}€ à venir)` : undefined}
                        icon={DollarSign}
                        className="h-full w-full"
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={CHILD_VARIANTS}
                    whileHover={{
                        y: -5,
                        transition: {duration: 0.2, ease: "easeInOut"}
                    }}
                    whileTap={{
                        y: 0,
                        transition: {duration: 0.1, ease: "easeInOut"}
                    }}
                >

                    <StatCard
                        title="Note moyenne"
                        value={dashboardData.averageRating > 0 ? `${dashboardData.averageRating}/5` : 'Aucun avis'}
                        subtitle={dashboardData.totalRatings > 0 ? `Basé sur ${dashboardData.totalRatings} avis` : undefined}
                        icon={Star}
                        className="h-full w-full"
                    />
                </motion.div>
            </motion.div>

            {/* Statistiques détaillées */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATIONS.COACH_DASHBOARD_SECOND_GRID_VARIANTS}
            >
                {/* Statistiques rapides */}
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={CHILD_VARIANTS}
                    whileHover={{
                        y: -5,
                        transition: {duration: 0.2, ease: "easeInOut"}
                    }}
                    whileTap={{
                        y: 0,
                        transition: {duration: 0.1, ease: "easeInOut"}
                    }}
                >
                    <QuickStats
                        quickStatsData={
                            {
                                monthlyEarnings: dashboardData.monthlyEarnings,
                                totalHours: dashboardData.totalHours,
                                pendingEarnings: dashboardData.pendingEarnings,
                                activeBookings: dashboardData.activeBookings
                            }
                        }
                        className="h-full w-full"
                    />
                </motion.div>

                {/* Prochaines réservations */}
                <motion.div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                            initial="hidden"
                            animate="visible"
                            variants={CHILD_VARIANTS}
                            whileHover={{
                                y: -5,
                                transition: {duration: 0.2, ease: "easeInOut"}
                            }}
                            whileTap={{
                                y: 0,
                                transition: {duration: 0.1, ease: "easeInOut"}
                            }}
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Prochaines réservations
                    </h3>
                    <div className="space-y-3">
                        {dashboardData
                            .nextBookings
                            .map((booking) => {
                                const startDate = new Date(booking.startDate);
                                return (
                                    <div key={booking.id}
                                         className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {booking.user.firstName} {booking.user.lastName}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {startDate.toLocaleDateString('fr-FR')} à {startDate.toLocaleTimeString('fr-FR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-green-600">{booking.totalPrice}€</p>
                                        </div>
                                    </div>
                                );
                            })}
                        {dashboardData.bookings.filter(booking => {
                            const bookingDate = new Date(booking.startDate);
                            return bookingDate > new Date() && booking.isActive;
                        }).length === 0 && (
                            <p className="text-gray-500 text-center py-4">Aucune réservation à
                                venir</p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
            {/*  TODO: Ajouter graphs  */}
        </div>
    );
};

export default CoachDashboardStats;
