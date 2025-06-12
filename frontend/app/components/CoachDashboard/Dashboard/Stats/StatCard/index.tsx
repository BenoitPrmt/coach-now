import type {ElementType} from "react";
import {DollarSign, Star, TrendingUp, Users} from "lucide-react";

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
        className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 ${className}`}>
        <div className="flex items-center justify-between mb-4">
            <div
                className={`p-3 rounded-lg ${Icon === DollarSign ? 'bg-green-100' : Icon === Users ? 'bg-blue-100' : Icon === Star ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                <Icon
                    className={`h-6 w-6 ${Icon === DollarSign ? 'text-green-600' : Icon === Users ? 'text-blue-600' : Icon === Star ? 'text-yellow-600' : 'text-purple-600'}`}/>
            </div>
            {trend && (
                <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`}/>
                    {trendValue}
                </div>
            )}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{title}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
    </div>
);

export default StatCard;