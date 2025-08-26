import type {Booking, ChartDataPoint, MaxValueInfo, PerformanceIndicatorData, TrendData} from "~/types";

export const getTrend = (data: ChartDataPoint[], timeRange: string, chartMode: 'earnings' | 'count'): TrendData => {
    if (data.length < 2) return {direction: 'stable', percentage: 0};

    let recentDays: number;
    let previousDays: number;

    switch (timeRange) {
        case '7d':
            recentDays = Math.min(3, data.length);
            previousDays = Math.min(3, data.length - recentDays);
            break;
        case '30d':
            recentDays = Math.min(7, data.length);
            previousDays = Math.min(7, data.length - recentDays);
            break;
        case '90d':
            recentDays = Math.min(14, data.length);
            previousDays = Math.min(14, data.length - recentDays);
            break;
        default:
            recentDays = Math.min(7, data.length);
            previousDays = Math.min(7, data.length - recentDays);
    }

    const recent = data.slice(-recentDays);
    const previous = data.slice(-(recentDays + previousDays), -recentDays);

    if (recent.length === 0 || previous.length === 0) {
        return {direction: 'stable', percentage: 0};
    }

    const recentAvg = recent.reduce((acc, item) =>
        acc + (chartMode === 'earnings' ? item.earnings : item.count), 0
    ) / recent.length;

    const previousAvg = previous.reduce((acc, item) =>
        acc + (chartMode === 'earnings' ? item.earnings : item.count), 0
    ) / previous.length;

    if (previousAvg === 0) return {direction: 'stable', percentage: 0};

    const change = ((recentAvg - previousAvg) / previousAvg) * 100;

    if (Math.abs(change) < 5) return {direction: 'stable', percentage: Math.round(change)};

    return {
        direction: change > 0 ? 'up' : 'down',
        percentage: Math.round(Math.abs(change))
    };
};

export const generateChartData = (bookings: Booking[], days: number): ChartDataPoint[] => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const dateMap = new Map<string, ChartDataPoint>();

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        dateMap.set(dateStr, {
            date: dateStr,
            earnings: 0,
            count: 0
        });
    }

    bookings.forEach(booking => {
        if (!booking.isActive) return;

        const bookingDate = new Date(booking.startDate);
        const dateStr = bookingDate.toISOString().split('T')[0];

        if (dateMap.has(dateStr)) {
            const existing = dateMap.get(dateStr)!;
            existing.earnings += booking.totalPrice;
            existing.count += 1;
        }
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
};

export const getRecentAverage = (data: ChartDataPoint[], timeRange: string, chartMode: 'earnings' | 'count') => {
    if (data.length === 0) return 0;

    let recentDays: number;
    switch (timeRange) {
        case '7d':
            recentDays = Math.min(3, data.length); // 3 derniers jours pour 7d
            break;
        case '30d':
            recentDays = Math.min(7, data.length); // 7 derniers jours pour 30d
            break;
        case '90d':
            recentDays = Math.min(14, data.length); // 14 derniers jours pour 90d
            break;
        default:
            recentDays = Math.min(7, data.length);
    }

    const recentData = data.slice(-recentDays);
    const sum = recentData.reduce((acc, item) =>
        acc + (chartMode === 'earnings' ? item.earnings : item.count), 0
    );
    return Math.round(sum / recentData.length);
};

export const getPerformanceIndicator = (currentValue: number, maxVal: number): PerformanceIndicatorData => {
    if (maxVal === 0 || currentValue < 0) {
        return {
            color: 'text-gray-500 dark:text-gray-400',
            label: 'Aucune donnée',
            bgColor: 'bg-gray-100 dark:bg-gray-700',
            percentage: 0
        };
    }

    const percentage = Math.round((currentValue / maxVal) * 100);

    if (percentage >= 80) {
        return {
            color: 'text-green-700 dark:text-green-400',
            label: 'Excellent',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            percentage
        };
    }

    if (percentage >= 60) {
        return {
            color: 'text-blue-700 dark:text-blue-400',
            label: 'Bon',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            percentage
        };
    }

    if (percentage >= 40) {
        return {
            color: 'text-orange-700 dark:text-orange-400',
            label: 'Moyen',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
            percentage
        };
    }

    return {
        color: 'text-red-700 dark:text-red-400',
        label: 'Faible',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        percentage
    };
};

export const getMaxValueInfo = (
    data: ChartDataPoint[],
    chartMode: 'earnings' | 'count'
): MaxValueInfo => {
    const values = data.map(item => chartMode === 'earnings' ? item.earnings : item.count);
    const maxValue = Math.max(...values, 1);

    const maxDataPoint = data.find(item =>
        (chartMode === 'earnings' ? item.earnings : item.count) === maxValue
    );

    return {
        value: maxValue,
        date: maxDataPoint?.date,
        formattedValue: chartMode === 'earnings' ? `${maxValue}€` : `${maxValue} réservations`
    };
};

export const formatTooltipDate = (value: string): string => {
    return new Date(value).toLocaleDateString("fr-FR", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export const formatXAxisDate = (value: string): string => {
    const date = new Date(value);
    return date.toLocaleDateString("fr-FR", {
        month: "short",
        day: "numeric",
    });
};

export const formatTooltipValue = (
    value: number,
    chartMode: 'earnings' | 'count'
): [string, string] => {
    return [
        chartMode === 'earnings' ? `${value}€ ` : `${value} `,
        chartMode === 'earnings' ? 'Revenus' : 'Réservations'
    ];
};