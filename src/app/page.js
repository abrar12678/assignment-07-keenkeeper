"use client";

import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [friendsList, setFriendsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch("/friends.json");
      const data = await res.json();
      setFriendsList(data || []);
      setLoading(false);
    };

    fetchFriends();
  }, []);

  const totalFriends = friendsList.length;
  const onTrackCount = friendsList.filter((f) => f.status === "on-track").length;
  const overdueCount = friendsList.filter((f) => f.status === "overdue").length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center py-16 sm:py-24 space-y-6">
        <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">Friends to keep close in your life</h2>
        <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#244D3F] px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-slate-900/10 transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#1f4137]">
          <span className="p-1">
            <IoMdAdd />
          </span>
          <span>Add a Friend</span>
        </button>
        {loading && (
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <div className="h-3 w-3 rounded-full bg-[#244D3F] animate-pulse" />
            <span>Loading friend data...</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
        {[
          { title: "Total Friends", value: loading ? "—" : totalFriends },
          { title: "On Track", value: loading ? "—" : onTrackCount },
          { title: "Need Attention", value: loading ? "—" : overdueCount },
          { title: "Interactions This Month", value: loading ? "—" : totalFriends },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 mb-3">{card.value}</h2>
            <p className="text-sm text-slate-500">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="border border-slate-200 mx-auto max-w-6xl px-4 sm:px-8 my-8"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-2xl sm:text-3xl">Your Friends</h2>
          <p className="text-sm text-slate-500">Tap a card to open the detail page</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse"
              >
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-slate-200" />
                <div className="h-5 mb-3 rounded-full bg-slate-200" />
                <div className="h-3 mb-3 rounded-full bg-slate-200" />
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <span className="h-7 w-16 rounded-full bg-slate-200" />
                  <span className="h-7 w-16 rounded-full bg-slate-200" />
                </div>
              </div>
            ))
            : friendsList.map((friend) => {
              const statusStyles = {
                overdue: "bg-red-500 text-white",
                "almost due": "bg-amber-400 text-white",
                "on-track": "bg-emerald-700 text-white",
              };

              return (
                <div
                  key={friend.id}
                  onClick={() => router.push(`/friends/${friend.id}`)}
                  className="rounded-3xl border border-slate-200 bg-white px-6 py-7 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                >
                  <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full bg-slate-100">
                    <img
                      src={friend.picture}
                      alt={friend.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{friend.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{friend.days_since_contact}d ago</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {(friend.tags || []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[friend.status] || "bg-slate-200 text-slate-700"}`}
                    >
                      {friend.status === "almost due"
                        ? "Almost Due"
                        : friend.status === "on-track"
                          ? "On-Track"
                          : "Overdue"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}