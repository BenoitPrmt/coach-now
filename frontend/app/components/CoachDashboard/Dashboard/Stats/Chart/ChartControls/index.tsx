import {Button} from "~/components/ui/button";

interface ChartControlsProps {
    chartMode: 'earnings' | 'count';
    timeRange: string;
    onChartModeChange: (mode: 'earnings' | 'count') => void;
    onTimeRangeChange: (range: string) => void;
}

const ChartControls = ({
                           chartMode,
                           timeRange,
                           onChartModeChange,
                           onTimeRangeChange
                       }: ChartControlsProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-2">
            {/* Sélecteur de mode */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                <Button
                    variant={chartMode === 'earnings' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none"
                    onClick={() => onChartModeChange('earnings')}
                >
                    Revenus
                </Button>
                <Button
                    variant={chartMode === 'count' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none border-l border-gray-200 dark:border-gray-600"
                    onClick={() => onChartModeChange('count')}
                >
                    Nombre
                </Button>
            </div>

            {/* Sélecteur de période */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                <Button
                    variant={timeRange === '7d' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none"
                    onClick={() => onTimeRangeChange('7d')}
                >
                    7j
                </Button>
                <Button
                    variant={timeRange === '30d' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none border-l border-gray-200 dark:border-gray-600"
                    onClick={() => onTimeRangeChange('30d')}
                >
                    30j
                </Button>
                <Button
                    variant={timeRange === '90d' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none border-l border-gray-200 dark:border-gray-600"
                    onClick={() => onTimeRangeChange('90d')}
                >
                    90j
                </Button>
            </div>
        </div>
    );
};

export default ChartControls;