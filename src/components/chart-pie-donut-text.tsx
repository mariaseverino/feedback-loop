'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from './ui/chart';

export const description = 'Gráfico de rosca com total de feedbacks no centro';

const chartData = [
    { browser: 'Identificados', feedbacks: 200, fill: '#6458ee' },
    { browser: 'Anônimos', feedbacks: 287, fill: '#C2FC92' },
];

const chartConfig = {
    feedbacks: {
        label: 'feedbacks',
    },
    identificados: {
        label: 'Identificados',
        color: 'var(--chart-1)',
    },
    anonimos: {
        label: 'Anonimos',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function ChartPieDonutText({ className }: { className?: string }) {
    const totalfeedbacks = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.feedbacks, 0);
    }, []);

    return (
        <Card className={`${className} flex flex-col rounded-3xl border-0`}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Feedbacks Anônimos e Identificados</CardTitle>
                <CardDescription>
                    Período: Fevereiro a Junho de 2025
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="feedbacks"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalfeedbacks.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Feedbacks
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
