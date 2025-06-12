import type {ElementType} from "react";
import {DollarSign, Star, TrendingUp, Users} from "lucide-react";
import {cn} from "~/lib/utils";

type Props = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ElementType;
    trend?: 'up' | 'down';
    trendValue?: string;
    className?: string;
};

const StatCard = ({title, value, subtitle, icon: Icon, trend, trendValue, className}: Props) => (
    <div
        className={cn(
            "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-300",
            className
        )}
    >
        <div className="flex items-center justify-between mb-4">
            <div
                className={`p-3 rounded-lg ${
                    Icon === DollarSign 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : Icon === Users 
                        ? 'bg-blue-100 dark:bg-blue-900/30' 
                        : Icon === Star 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                        : 'bg-purple-100 dark:bg-purple-900/30'
                }`}
            >
                <Icon
                    className={`h-6 w-6 ${
                        Icon === DollarSign 
                            ? 'text-green-600 dark:text-green-400' 
                            : Icon === Users 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : Icon === Star 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : 'text-purple-600 dark:text-purple-400'
                    }`}
                />
            </div>
            {trend && (
                <div className={`flex items-center text-sm ${
                    trend === 'up' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                }`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`}/>
                    {trendValue}
                </div>
            )}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
    </div>
);

export default StatCard;