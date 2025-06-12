import {cn} from "~/lib/utils";

type Props = {
    quickStatsData: {
        monthlyEarnings: number;
        totalHours: number;
        pendingEarnings: number;
        activeBookings: number;
    };
    className?: string;
}

const QuickStats = ({quickStatsData, className}: Props) => {
    return (
        <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 p-6", className)}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aperçu rapide
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenus ce mois</span>
                    <span
                        className="font-semibold text-blue-600">{quickStatsData.monthlyEarnings}€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Heures enseignées</span>
                    <span className="font-semibold">{quickStatsData.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenus à venir</span>
                    <span
                        className="font-semibold text-green-600">{quickStatsData.pendingEarnings}€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Réservations actives</span>
                    <span className="font-semibold">{quickStatsData.activeBookings}</span>
                </div>
            </div>
        </div>
    );
};

export default QuickStats;
