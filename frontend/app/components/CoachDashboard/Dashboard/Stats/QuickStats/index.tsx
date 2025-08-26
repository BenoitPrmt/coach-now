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
        <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-100 dark:border-gray-700 p-6", className)}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Aperçu rapide
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Revenus ce mois</span>
                    <span
                        className="font-semibold text-blue-600 dark:text-blue-400">{quickStatsData.monthlyEarnings}€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Heures enseignées</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{quickStatsData.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Revenus à venir</span>
                    <span
                        className="font-semibold text-green-600 dark:text-green-400">{quickStatsData.pendingEarnings}€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Réservations actives</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{quickStatsData.activeBookings}</span>
                </div>
            </div>
        </div>
    );
};

export default QuickStats;