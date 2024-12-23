"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LayoutScroll({ children }: {children : React.ReactNode}) {

    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="relative container flex flex-col justify-between mx-auto px-4 md:px-12 min-h-screen md:shadow-neutral-300 md:shadow-md bg-white">
            {children}
        </div>
    )
}