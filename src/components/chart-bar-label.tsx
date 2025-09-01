'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
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

export const description =
    'Gráfico de barras exibindo o total de feedbacks enviados por mês';

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
        color: '#6458ee',
    },
} satisfies ChartConfig;

export function ChartBarLabel({ className }: { className?: string }) {
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
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="enviados" fill="#6458ee" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
