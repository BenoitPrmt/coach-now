import {useState, useMemo, useEffect} from 'react';
import {motion, type Variants} from "motion/react";
import {ANIMATIONS} from "~/constants";
import StatCard from "~/components/CoachDashboard/Dashboard/Stats/StatCard";
import {Calendar, DollarSign, Star, Users} from "lucide-react";
import QuickStats from "~/components/CoachDashboard/Dashboard/Stats/QuickStats";
import PerformanceChart from "~/components/CoachDashboard/Dashboard/Stats/Chart/PerformanceChart";
import ChartHeader from "~/components/CoachDashboard/Dashboard/Stats/Chart/ChartHeader";
import type {CoachDashboard, MaxValueInfo} from "~/types";
import {useIsMobile} from "~/hooks/use-mobile";
import {generateChartData, getPerformanceIndicator, getRecentAverage, getTrend} from "~/lib/chartUtils";

const CHILD_VARIANTS: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
};

const CoachDashboardStats = ({dashboardData}: { dashboardData: CoachDashboard }) => {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");
    const [chartMode, setChartMode] = useState<'earnings' | 'count'>('earnings');

    useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const chartData = useMemo(() => {
        let days = 30;
        if (timeRange === "7d") days = 7;
        else if (timeRange === "90d") days = 90;

        return generateChartData(dashboardData.bookings, days);
    }, [dashboardData.bookings, timeRange]);

    const {maxInfo, recentAverage, performanceIndicator, trend} = useMemo(() => {
        const values = chartData.map(item => chartMode === 'earnings' ? item.earnings : item.count);
        const maxVal = Math.max(...values, 1);

        const maxDataPoint = chartData.find(item =>
            (chartMode === 'earnings' ? item.earnings : item.count) === maxVal
        );

        const maxInfo: MaxValueInfo = {
            value: maxVal,
            date: maxDataPoint?.date,
            formattedValue: chartMode === 'earnings' ? `${maxVal}€` : `${maxVal} réservations`
        };


        const recentAvg = getRecentAverage(chartData, timeRange, chartMode);
        const trendData = getTrend(chartData, timeRange, chartMode);

        const performanceInd = getPerformanceIndicator(recentAvg, maxVal);

        return {
            maxValue: maxVal,
            maxInfo,
            recentAverage: recentAvg,
            performanceIndicator: performanceInd,
            trend: trendData
        };
    }, [chartData, chartMode, timeRange]);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Dashboard
            </h2>

            {/* Stats Cards Grid */}
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
                    <StatCard
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

            {/* Detailed Stats Grid */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={ANIMATIONS.COACH_DASHBOARD_SECOND_GRID_VARIANTS}
            >
                {/* Quick Stats */}
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
                        quickStatsData={{
                            monthlyEarnings: dashboardData.monthlyEarnings,
                            totalHours: dashboardData.totalHours,
                            pendingEarnings: dashboardData.pendingEarnings,
                            activeBookings: dashboardData.activeBookings
                        }}
                        className="h-full w-full"
                    />
                </motion.div>

                {/* Next Bookings */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Prochaines réservations
                    </h3>
                    <div className="space-y-3">
                        {dashboardData.nextBookings.map((booking) => {
                            const startDate = new Date(booking.startDate);
                            return (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {booking.user.firstName} {booking.user.lastName}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {startDate.toLocaleDateString('fr-FR')} à {startDate.toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            {booking.totalPrice}€
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {dashboardData.nextBookings.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                Aucune réservation à venir
                            </p>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
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
                <ChartHeader
                    chartMode={chartMode}
                    timeRange={timeRange}
                    performanceIndicator={performanceIndicator}
                    trend={trend}
                    recentAverage={recentAverage}
                    maxInfo={maxInfo}
                    onChartModeChange={setChartMode}
                    onTimeRangeChange={setTimeRange}
                />

                <PerformanceChart
                    data={chartData}
                    chartMode={chartMode}
                />
            </motion.div>
        </div>
    );
};

export default CoachDashboardStats;