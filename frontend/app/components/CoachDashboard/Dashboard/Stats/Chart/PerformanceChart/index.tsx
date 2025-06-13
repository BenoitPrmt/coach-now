import {ChartContainer, ChartTooltip, ChartTooltipContent} from "~/components/ui/chart";
import {AreaChart, Area, CartesianGrid, XAxis} from "recharts";
import {
    formatTooltipDate,
    formatXAxisDate,
    formatTooltipValue
} from '~/lib/chartUtils';

import type {ChartDataPoint} from '~/types';

import {CHART_CONFIG as CHART_CONFIG_CONSTANT} from "~/constants"

const {COACH_DASHBOARD_CHART_CONFIG} = CHART_CONFIG_CONSTANT;

interface PerformanceChartProps {
    data: ChartDataPoint[];
    chartMode: 'earnings' | 'count';
}

const PerformanceChart = ({data, chartMode}: PerformanceChartProps) => {
    if (data.length === 0) {
        return (
            <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Aucune donnée disponible pour la période sélectionnée
                </p>
            </div>
        );
    }

    return (
        <div className="h-[300px]">
            <ChartContainer config={COACH_DASHBOARD_CHART_CONFIG} className="h-full w-full">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="fillData" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--primary)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--primary)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        {/* Gradient alternatif pour plus de style */}
                        <linearGradient id="fillDataHover" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor="var(--primary)"
                                stopOpacity={0.9}
                            />
                            <stop
                                offset="50%"
                                stopColor="var(--primary)"
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--primary)"
                                stopOpacity={0.05}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.3}
                    />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={formatXAxisDate}
                        tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}}
                    />
                    <ChartTooltip
                        cursor={{
                            stroke: 'var(--primary)',
                            strokeWidth: 1,
                            strokeDasharray: '5 5',
                            fillOpacity: 0.1,
                            fill: 'var(--primary)'
                        }}
                        content={
                            <ChartTooltipContent
                                labelFormatter={formatTooltipDate}
                                formatter={(value, name) => formatTooltipValue(value as number, chartMode)}
                                indicator="dot"
                                className="bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg"
                            />
                        }
                    />
                    <Area
                        dataKey={chartMode}
                        type="monotone"
                        fill="url(#fillData)"
                        stroke="var(--primary)"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{
                            r: 4,
                            fill: 'var(--primary)',
                            stroke: 'var(--background)',
                            strokeWidth: 2
                        }}
                        style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
};

export default PerformanceChart;