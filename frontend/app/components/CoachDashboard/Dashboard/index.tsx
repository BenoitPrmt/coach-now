import {useUser} from "~/hooks/useUser";
import React, {useEffect, useState} from "react";
import type {Coach, CoachDashboard} from "~/types";
import {API_URL} from "~/constants/api";
import {getDashboardDataFromCoach} from "~/lib/getDashboardDataFromCoach";
import Loader from "~/components/Loader";
import {CoachHolidaysModal} from "~/components/Coach/CoachHolidays/CoachHolidaysModal";
import {
    Calendar,
    ChartAreaIcon
} from "lucide-react";
import {Button} from "~/components/ui/button";
import CoachDashboardStats from "~/components/CoachDashboard/Dashboard/Stats";
import {cn} from "~/lib/utils";
import CoachDashboardBookings from "~/components/CoachDashboard/Dashboard/Bookings";


const CoachDashboardComponent = () => {
    const {user, userToken} = useUser();
    const [coachData, setCoachData] = useState<Coach | null>(null);
    const [dashboardData, setDashboardData] = useState<CoachDashboard | null>(null);
    const [view, setView] = useState<'dashboard' | 'calendar'>('dashboard');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (user && user.coachId && userToken) {
            const fetchCoachData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${API_URL}/coach/${user.coachId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${userToken}`,
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }

                    const data = await response.json();
                    setCoachData(data);
                    setDashboardData(getDashboardDataFromCoach(data));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchCoachData();
        }
    }, [user, userToken]);

    if (isLoading) return <Loader/>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex max-md:flex-col justify-between items-center mb-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Dashboard Coach
                        </h1>
                        {coachData && (
                            <p className="text-gray-600 dark:text-gray-400">
                                Bienvenue, {coachData.user.firstName} {coachData.user.lastName}!
                            </p>
                        )}
                    </div>


                    <div className="flex flex-row items-center space-x-4">
                        {coachData?.id && user?.id && (
                            <CoachHolidaysModal coachId={coachData?.id} userId={user?.id} userToken={userToken} />
                        )}

                        <div className="isolate flex -space-x-px">
                            <Button variant="outline"
                                    className={cn("rounded-r-none focus:z-10", view === 'dashboard' ? 'bg-gray-200 dark:bg-gray-700 text-primary dark:text-primary-foreground' : 'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700')}
                                    onClick={() => setView('dashboard')}>
                                <ChartAreaIcon/>
                                Dashboard
                            </Button>
                            <Button variant="outline"
                                    className={cn("rounded-l-none focus:z-10", view === 'calendar' ? 'bg-gray-200 dark:bg-gray-700 text-primary dark:text-primary-foreground' : 'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700')}
                                    onClick={() => setView('calendar')}>
                                <Calendar/>
                                Réservations
                            </Button>
                        </div>
                    </div>
                </div>

                {dashboardData ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        {
                            view === 'dashboard' ? (
                                <CoachDashboardStats dashboardData={dashboardData}/>
                            ) : (
                                <CoachDashboardBookings user={user} userToken={userToken}/>
                            )
                        }
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Chargement des données du coach...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoachDashboardComponent;