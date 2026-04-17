"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const TimelinePage = () => {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    useEffect(() => {
        const savedTimeline = JSON.parse(sessionStorage.getItem("timeline") || "[]");
        const sorted = savedTimeline.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTimeline(sorted);
        setLoading(false);
    }, []);

    const getIcon = (type) => {
        const iconMap = {
            call: "/assets/call.png",
            text: "/assets/text.png",
            video: "/assets/video.png",
        };

        const src = iconMap[type];
        if (!src) return null;

        return <Image src={src} alt={type} width={32} height={32} />;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const filteredTimeline = timeline.filter((entry) => {
        const search = searchQuery.trim().toLowerCase();
        const dateText = formatDate(entry.date).toLowerCase();
        const titleText = entry.title.toLowerCase();
        const typeText = entry.type.toLowerCase();
        const matchesSearch =
            !search ||
            titleText.includes(search) ||
            typeText.includes(search) ||
            dateText.includes(search);
        const matchesType = typeFilter === "all" || entry.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 py-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Timeline</h2>

                <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 ease-out hover:shadow-lg">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search by name, type, or date..."
                            className="w-full sm:w-2/3 px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500 transition"
                        />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full sm:w-1/3 px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500 transition"
                        >
                            <option value="all">All Interaction Types</option>
                            <option value="call">Call</option>
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-slate-600">Loading timeline...</p>
                    ) : timeline.length === 0 ? (
                        <div className="text-center py-12 rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <p className="text-slate-600 text-lg">No interactions logged yet</p>
                            <p className="text-slate-500">Visit a friend's details to log a call, text, or video interaction</p>
                        </div>
                    ) : filteredTimeline.length === 0 ? (
                        <div className="text-center py-12 rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <p className="text-slate-600 text-lg">No timeline entries match your filter</p>
                            <p className="text-slate-500">Try changing the search term or interaction type.</p>
                        </div>
                    ) : (
                        filteredTimeline.map((entry) => (
                            <div
                                key={entry.id}
                                className="flex flex-col gap-4 rounded-3xl border border-dashed border-blue-300 bg-white p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center rounded-3xl bg-slate-100 p-4">
                                    {getIcon(entry.type)}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-semibold text-slate-900 text-lg sm:text-xl">{entry.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{formatDate(entry.date)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelinePage;