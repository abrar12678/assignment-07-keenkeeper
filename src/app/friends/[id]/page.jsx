"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

export default function FriendDetails() {
    const router = useRouter();
    const params = useParams();
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await fetch("/friends.json");
                const data = await res.json();
                const foundFriend = data.find((f) => f.id === parseInt(params.id));
                setFriend(foundFriend);
            } catch (error) {
                console.error("Error fetching friend data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [params.id]);

    const handleInteraction = (type) => {
        if (!friend) return;

        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            type: type,
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friend.name}`,
        };

        const existingTimeline = JSON.parse(sessionStorage.getItem("timeline") || "[]");
        existingTimeline.push(newEntry);
        sessionStorage.setItem("timeline", JSON.stringify(existingTimeline));

        const typeLabel = type === "call" ? "Call" : type === "text" ? "Text" : "Video";
        toast.success(`${typeLabel} logged with ${friend.name}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-slate-500">Loading...</p>
            </div>
        );
    }

    if (!friend) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-slate-500">Friend not found</p>
            </div>
        );
    }

    const statusStyles = {
        overdue: "bg-red-500 text-white",
        "almost due": "bg-amber-400 text-white",
        "on-track": "bg-emerald-700 text-white",
    };

    const statusLabel = friend.status === "almost due" ? "Almost Due" : friend.status === "on-track" ? "On-Track" : "Overdue";

    return (
        <div className="bg-white min-h-screen">
            <div className="px-8 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <IoArrowBack size={20} />
                    <span>Back</span>
                </button>
            </div>

            <div className="px-8 py-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-1">
                        <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-slate-100">
                                <img
                                    src={friend.picture}
                                    alt={friend.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{friend.name}</h1>

                            <span
                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${statusStyles[friend.status] || "bg-slate-200 text-slate-700"}`}
                            >
                                {statusLabel}
                            </span>

                            <div className="mb-4 flex flex-wrap justify-center gap-1">
                                {(friend.tags || []).slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold uppercase text-emerald-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-sm text-slate-600 italic mb-4">"{friend.bio}"</p>

                            <p className="text-xs text-slate-500 mb-6">Preferred: email</p>

                            <div className="border-t border-slate-100 my-6"></div>

                            <div className="space-y-2">
                                <button className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-3">
                                    <span>⏰</span>
                                    <span className="text-sm font-medium">Snooze 2 Weeks</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-3">
                                    <span>📦</span>
                                    <span className="text-sm font-medium">Archive</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3">
                                    <span>🗑️</span>
                                    <span className="text-sm font-medium">Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-50 rounded-xl p-6 text-center">
                                <p className="text-3xl font-bold text-slate-900 mb-1">{friend.days_since_contact}</p>
                                <p className="text-sm text-slate-600">Days Since Contact</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6 text-center">
                                <p className="text-3xl font-bold text-slate-900 mb-1">{friend.goal}</p>
                                <p className="text-sm text-slate-600">Goal (Days)</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6 text-center">
                                <p className="text-slate-900 font-semibold mb-1">
                                    {new Date(friend.next_due_date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-sm text-slate-600">Next Due</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-slate-900">Relationship Goal</h2>
                                <button className="text-sm text-slate-600 hover:text-slate-900">Edit</button>
                            </div>
                            <p className="text-slate-700">
                                Connect every <span className="font-semibold">{friend.goal} days</span>
                            </p>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Check-In</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => handleInteraction("call")}
                                    className="flex flex-col items-center justify-center py-8 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                >
                                    <Image src="/assets/call.png" alt="Call" width={32} height={32} className="mb-2" />
                                    <span className="text-sm font-medium text-slate-900">Call</span>
                                </button>
                                <button
                                    onClick={() => handleInteraction("text")}
                                    className="flex flex-col items-center justify-center py-8 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                >
                                    <Image src="/assets/text.png" alt="Text" width={32} height={32} className="mb-2" />
                                    <span className="text-sm font-medium text-slate-900">Text</span>
                                </button>
                                <button
                                    onClick={() => handleInteraction("video")}
                                    className="flex flex-col items-center justify-center py-8 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                >
                                    <Image src="/assets/video.png" alt="Video" width={32} height={32} className="mb-2" />
                                    <span className="text-sm font-medium text-slate-900">Video</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
