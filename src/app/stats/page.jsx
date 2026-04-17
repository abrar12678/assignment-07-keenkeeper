'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#1F2937'];

const typeLabels = {
    text: 'Text',
    call: 'Call',
    video: 'Video',
};

export default function StatsPage() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const savedTimeline = JSON.parse(sessionStorage.getItem('timeline') || '[]');
        const counts = savedTimeline.reduce((acc, entry) => {
            acc[entry.type] = (acc[entry.type] || 0) + 1;
            return acc;
        }, {});

        const data = Object.entries(typeLabels).map(([key, label]) => ({
            name: label,
            value: counts[key] || 0,
            fill: COLORS[Object.keys(typeLabels).indexOf(key) % COLORS.length],
        }));

        setChartData(data);
    }, []);

    const activeSlices = chartData.filter((item) => item.value > 0);

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/30 transition duration-300 ease-out hover:shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Friendship Analytics</h1>
                    <p className="text-sm sm:text-base text-slate-500">By Interaction Type</p>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/30">
                    <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
                        <div className="w-full lg:w-2/3 h-[360px] sm:h-[420px] flex items-center justify-center">
                            {activeSlices.length === 0 ? (
                                <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                                    No timeline interactions yet.
                                </div>
                            ) : (
                                <div className="w-full max-w-[500px] h-full animate-fade-in-up">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={activeSlices}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={90}
                                                outerRadius={130}
                                                cornerRadius={50}
                                                paddingAngle={5}
                                                labelLine={false}
                                                label={false}
                                                isAnimationActive={true}
                                            >
                                                {activeSlices.map((entry) => (
                                                    <Cell key={entry.name} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 ease-out hover:shadow-lg">
                                {chartData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.fill }} />
                                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}