"use client";
import Image from "next/image";
import Link from "next/link";
import { IoBarChartOutline, IoHomeOutline, IoTimeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();

    const isActive = (href) => {
        if (href === "/" && pathname === "/") return true;
        if (href !== "/" && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 py-4 px-4 sm:px-8">
            <div className="flex items-center">
                <Image src="/assets/logo.png" alt="KeenKeeper" width={140} height={38} className="object-contain" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Link
                    href="/"
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out ${isActive("/")
                        ? "bg-[#244D3F] text-white shadow-lg shadow-[#244D3F]/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                >
                    <IoHomeOutline size={18} />
                    <span>Home</span>
                </Link>

                <Link
                    href="/timeline"
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out ${isActive("/timeline")
                        ? "bg-[#244D3F] text-white shadow-lg shadow-[#244D3F]/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                >
                    <IoTimeOutline size={18} />
                    <span>Timeline</span>
                </Link>

                <Link
                    href="/stats"
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out ${isActive("/stats")
                        ? "bg-[#244D3F] text-white shadow-lg shadow-[#244D3F]/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                >
                    <IoBarChartOutline size={18} />
                    <span>Stats</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
