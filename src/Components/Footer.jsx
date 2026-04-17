
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#244F44] text-[#EAF3EF]">
            <div className="mx-auto max-w-6xl px-5 py-14 pb-6 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
                    KeenKeeper
                </h1>

                <p className="mx-auto mt-3 max-w-3xl text-xs leading-6 text-white/80">
                    Your personal shelf of meaningful connections. Browse, tend, and
                    nurture the relationships that matter most.
                </p>

                <div className="mt-6">
                    <div className="text-xs font-semibold text-white/90">Social Links</div>

                    <div className="mt-3 flex justify-center gap-3">
                        <a href="#" aria-label="Instagram" className="inline-flex rounded-full bg-white p-2">
                            <Image src="/assets/instagram.png" alt="Instagram" width={24} height={24} />
                        </a>
                        <a href="#" aria-label="Facebook" className="inline-flex rounded-full bg-white p-2">
                            <Image src="/assets/facebook.png" alt="Facebook" width={24} height={24} />
                        </a>
                        <a href="#" aria-label="Twitter" className="inline-flex rounded-full bg-white p-2">
                            <Image src="/assets/twitter.png" alt="Twitter" width={24} height={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-9 flex flex-col items-center justify-between gap-3 text-[11px] text-white/60 sm:flex-row">
                <div>© 2026 KeenKeeper. All rights reserved.</div>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-white/80">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white/80">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-white/80">
                        Cookies
                    </a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;