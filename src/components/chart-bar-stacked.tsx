import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
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

export const description =
    'Gráfico de barras exibindo o total de feedbacks enviados por mês';

const chartData = [
    { month: 'Fevereiro', feedbacksIdentified: 20, feedbacksAnonymous: 42 },
    { month: 'Março', feedbacksIdentified: 32, feedbacksAnonymous: 42 },
    { month: 'Abril', feedbacksIdentified: 15, feedbacksAnonymous: 42 },
    { month: 'Maio', feedbacksIdentified: 40, feedbacksAnonymous: 22 },
    { month: 'Junho', feedbacksIdentified: 36, feedbacksAnonymous: 42 },
    { month: 'Julho', feedbacksIdentified: 50, feedbacksAnonymous: 42 },
];

const chartConfig = {
    feedbacksIdentified: {
        label: 'Identificados',
        color: '#6458ee',
    },
    feedbacksAnonymous: {
        label: 'Anonimos',
        color: 'var(--color-primary-ligth)',
    },
} satisfies ChartConfig;

export function ChartBarStacked({
    className,
    chartData,
}: {
    className?: string;
    chartData: {
        month: string;
        feedbacksIdentified: number;
        feedbacksAnonymous: number;
    }[];
}) {
    return (
        <Card className={`${className} border-0 rounded-3xl`}>
            <CardHeader>
                <CardTitle>Feedbacks Enviados</CardTitle>
                <CardDescription>
                    Período: Fevereiro a Julho de 2025
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[380px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="feedbacksIdentified"
                            stackId="a"
                            fill="var(--color-feedbacksIdentified)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="feedbacksAnonymous"
                            stackId="a"
                            fill="var(--color-feedbacksAnonymous)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    );
}
