"use client";
import React, { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

interface PeriodScrollListProps {
    periods: PeriodT[];
    paramPeriod: string;
}

export default function GubersPeriodClicks({ periods, paramPeriod }: PeriodScrollListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentValuePeriod = searchParams.get(paramPeriod) ?? "";

    const [activePeriod, setActivePeriod] = useState(currentValuePeriod || "Все");

    const containerRef = useRef<HTMLDivElement>(null);

    const periodsWithAll = useMemo(() => [{ id: "all", attributes: { value: "Все" } }, ...periods], [periods]);

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
            const savedScrollTop = localStorage.getItem("scrollTop");
            if (currentContainer && savedScrollTop) {
                currentContainer.scrollTop = parseInt(savedScrollTop, 10);
            }

            const handleScroll = () => {
                if (currentContainer) {
                    localStorage.setItem("scrollTop", currentContainer.scrollTop.toString());
                }
            };

            currentContainer?.addEventListener("scroll", handleScroll);
            return () => currentContainer?.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        const periodFromParams = searchParams.get(paramPeriod);
        setActivePeriod(periodFromParams || "Все");
        router.refresh()

    }, [pathname, searchParams, paramPeriod]);

    const handlePeriodClick = useCallback((periodId: string, valuePeriod: string | null) => {
        setActivePeriod(valuePeriod || "Все");

        const params = new URLSearchParams(window.location.search);

        if (valuePeriod === "Все") {
            params.delete(paramPeriod);
        } else if (valuePeriod) {
            params.set(paramPeriod, valuePeriod);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        //router.refresh()

        if (containerRef.current) {
            const selectedElement = containerRef.current.querySelector(`[data-id="${periodId}"]`) as HTMLElement;
            selectedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

    }, [paramPeriod, pathname, router]);

    const handleScrollUp = () => {
        const currentIndex = periodsWithAll.findIndex(period => period.attributes?.value === activePeriod);
        if (currentIndex > 0) {
            const prevPeriod = periodsWithAll[currentIndex - 1];
            handlePeriodClick(prevPeriod.id, prevPeriod.attributes?.value);
        }
    };

    const handleScrollDown = () => {
        const currentIndex = periodsWithAll.findIndex(period => period.attributes?.value === activePeriod);
        if (currentIndex < periodsWithAll.length - 1) {
            const nextPeriod = periodsWithAll[currentIndex + 1];
            handlePeriodClick(nextPeriod.id, nextPeriod.attributes?.value);
        }
    };

    useEffect(() => {
        if (activePeriod === "Все" && containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [activePeriod]);

    return (
        <div className="hidden lg:flex flex-col gap-2 items-center mr-8">
            <button onClick={handleScrollUp} className="relative w-3 h-3">

                <Image src='/images/arrow-scroll.svg' alt="" fill sizes='10vw' />

            </button>

            <div ref={containerRef} className="h-48 overflow-y-auto scroll-invisible">
                <div className="flex flex-col items-center gap-3 custom-text-norm">
                    {periodsWithAll.map((period) => (
                        <div
                            key={period?.id}
                            data-id={period?.id}
                            onClick={() => handlePeriodClick(period?.id, period?.attributes?.value)}
                            className={`cursor-pointer ${activePeriod === period.attributes?.value ? 'text-blue font-bold' : ''}`}
                        >
                            <p>
                                {period.attributes?.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={handleScrollDown} className="relative w-3 h-3">
                <Image src='/images/arrow-scroll.svg' alt="" fill sizes='10vw' className="rotate-180" />
            </button>
        </div>
    );
}
