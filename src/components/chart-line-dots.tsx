import { TrendingDown, TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from './ui/chart';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';

export const description = 'A line chart with dots';

const chartData = [
    { month: 'Fevereiro', enviados: 20 },
    { month: 'Março', enviados: 32 },
    { month: 'Abril', enviados: 15 },
    { month: 'Maio', enviados: 40 },
    { month: 'Junho', enviados: 36 },
    { month: 'Julho', enviados: 50 },
];

const chartConfig = {
    enviados: {
        label: 'Enviados',
        color: '#e69335',
    },
} satisfies ChartConfig;

export function ChartLineDots({
    isUp,
    className,
}: {
    isUp: boolean;
    className?: string;
}) {
    return (
        <Card className={`${className} border-gray-200 bg-white gap-8`}>
            <CardHeader>
                <CardTitle>Feedbacks por Semana</CardTitle>
                <CardDescription>Fevereiro - Julho 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                        height={300}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="enviados"
                            type="natural"
                            stroke="var(--color-primary)"
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-primary)',
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 text-sm">
                <div
                    className={`flex gap-2 leading-none font-medium text-base ${
                        isUp ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {isUp ? (
                        <>
                            Tendência de alta este mês <TrendingUp size={16} />
                        </>
                    ) : (
                        <>
                            Tendência de queda este mês{' '}
                            <TrendingDown size={16} />
                        </>
                    )}
                </div>
                <div className="text-(--color-muted-text) leading-none">
                    Comparativo mensal de feedbacks enviados
                </div>
            </CardFooter>
        </Card>
    );
}
