import {useUser} from "~/hooks/useUser";
import {useEffect, useState} from "react";
import type {Coach, CoachDashboard} from "~/types";
import {API_URL} from "~/constants/api";
import {getDashboardDataFromCoach} from "~/lib/getDashboardDataFromCoach";
import Loader from "~/components/Loader";
import StatCard from "./StatCard";
import {Calendar, DollarSign, Star, Users} from "lucide-react";
import {CoachHolidaysModal} from "~/components/Coach/CoachHolidays/CoachHolidaysModal";

const CoachDashboardComponent = () => {
    const {user, userToken} = useUser();
    const [coachData, setCoachData] = useState<Coach | null>(null);
    const [dashboardData, setDashboardData] = useState<CoachDashboard | null>(null);
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
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Dashboard Coach
                        </h1>
                        {coachData && (
                            <p className="text-gray-600">
                                Bienvenue, {coachData.user.firstName} {coachData.user.lastName}!
                            </p>
                        )}
                    </div>
                    {coachData?.id && user?.id && (
                        <CoachHolidaysModal coachId={coachData?.id} userId={user?.id} userToken={userToken} />
                    )}
                </div>

                {dashboardData ? (
                    <div className="space-y-6">
                        {/* Métriques principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Réservations aujourd'hui"
                                value={dashboardData.todayBookings}
                                icon={Calendar}
                            />

                            <StatCard
                                title="Réservations totales"
                                value={dashboardData.totalBookings}
                                icon={Users}
                            />

                            <StatCard
                                title="Revenus générés"
                                value={`${dashboardData.totalEarnings.toLocaleString('fr-FR')}€`}
                                subtitle={dashboardData.pendingEarnings > 0 ? `(+${dashboardData.pendingEarnings}€ à venir)` : undefined}
                                icon={DollarSign}
                            />

                            <StatCard
                                title="Note moyenne"
                                value={dashboardData.averageRating > 0 ? `${dashboardData.averageRating}/5` : 'Aucun avis'}
                                subtitle={dashboardData.totalRatings > 0 ? `Basé sur ${dashboardData.totalRatings} avis` : undefined}
                                icon={Star}
                            />
                        </div>

                        {/* Statistiques détaillées */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Statistiques rapides */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Aperçu rapide
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Revenus ce mois</span>
                                        <span
                                            className="font-semibold text-blue-600">{dashboardData.monthlyEarnings}€</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Heures enseignées</span>
                                        <span className="font-semibold">{dashboardData.totalHours}h</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Revenus à venir</span>
                                        <span
                                            className="font-semibold text-green-600">{dashboardData.pendingEarnings}€</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Réservations actives</span>
                                        <span className="font-semibold">{dashboardData.activeBookings}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Prochaines réservations */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                                        <p className="text-gray-500 text-center py-4">Aucune réservation à venir</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/*  TODO: Ajouter graphs  */}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Chargement des données du coach...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoachDashboardComponent;