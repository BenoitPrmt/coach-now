import React from 'react';
import PerformanceIndicator from '../PerformanceIndicator';
import ChartControls from '../ChartControls';
import type {PerformanceIndicatorData, TrendData, MaxValueInfo} from '~/types';

interface ChartHeaderProps {
    chartMode: 'earnings' | 'count';
    timeRange: string;
    performanceIndicator: PerformanceIndicatorData;
    trend: TrendData;
    recentAverage: number;
    maxInfo: MaxValueInfo;
    onChartModeChange: (mode: 'earnings' | 'count') => void;
    onTimeRangeChange: (range: string) => void;
}

const ChartHeader = ({
                         chartMode,
                         timeRange,
                         performanceIndicator,
                         trend,
                         recentAverage,
                         maxInfo,
                         onChartModeChange,
                         onTimeRangeChange
                     }: ChartHeaderProps) => {
    const getAverageDaysLabel = (timeRange: string): string => {
        switch (timeRange) {
            case '7d':
                return '7j';
            case '30d':
                return '30j';
            case '90d':
                return '90j';
            default:
                return '7j';
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Évolution des {chartMode === 'earnings' ? 'revenus' : 'réservations'}
                </h3>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Performance indicator */}
                    <PerformanceIndicator
                        indicator={performanceIndicator}
                        trend={trend}
                    />

                    {/* Max value info */}
                    {maxInfo.date && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Pic: <span className="font-medium">{maxInfo.formattedValue}</span>
                            {' '}le {new Date(maxInfo.date).toLocaleDateString('fr-FR')}
                        </div>
                    )}

                    {/* Recent average */}
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                        Moyenne {getAverageDaysLabel(timeRange)}:
                        <span className="font-medium">
                                {chartMode === 'earnings' ? `${recentAverage}€` : `${recentAverage}`}
                            </span>
                    </div>
                </div>
            </div>

            <ChartControls
                chartMode={chartMode}
                timeRange={timeRange}
                onChartModeChange={onChartModeChange}
                onTimeRangeChange={onTimeRangeChange}
            />
        </div>
    );
};

export default ChartHeader;