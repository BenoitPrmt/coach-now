import React from 'react';
import type {PerformanceIndicatorData, TrendData} from '~/types';

interface PerformanceIndicatorProps {
    indicator: PerformanceIndicatorData;
    trend: TrendData;
}

const PerformanceIndicator = ({
                                  indicator,
                                  trend
                              }: PerformanceIndicatorProps) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${indicator.bgColor}`}>
        <div className={`w-2 h-2 rounded-full ${indicator.color.replace('text-', 'bg-')}`}/>
        <span className={indicator.color}>
      {indicator.label} ({indicator.percentage}%)
    </span>
        {trend.direction !== 'stable' && (
            <span className={`text-xs ${
                trend.direction === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
            }`}>
        {trend.direction === 'up' ? '↗' : '↘'} {trend.percentage}%
      </span>
        )}
    </div>
);

export default PerformanceIndicator;