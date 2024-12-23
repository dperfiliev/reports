"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
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
    const [, setValuePeriod] = useState(currentValuePeriod);
    const [activePeriod, setActivePeriod] = useState(currentValuePeriod || (periods?.length > 0 ? periods[0]?.attributes?.value : ""));
    //const [, startTransitionPeriod] = React.useTransition();

    useEffect(() => {
        if (!currentValuePeriod && activePeriod) {
            const params = new URLSearchParams(window.location.search);
            params.set(paramPeriod, activePeriod);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [currentValuePeriod, activePeriod, paramPeriod, pathname, router]);

    const containerRef = useRef<HTMLDivElement>(null);

    const handlePeriodClick = useCallback((periodId: string, valuePeriod: string | null) => {
        setActivePeriod(valuePeriod ?? "");

        if (valuePeriod && valuePeriod?.length > 0) {
            setValuePeriod(valuePeriod);
            const params = new URLSearchParams(window.location.search);
            params.set(paramPeriod, valuePeriod);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }

        // Прокрутка контейнера к выбранному элементу
        if (containerRef.current) {
            const selectedElement = containerRef.current.querySelector(`[data-id="${periodId}"]`) as HTMLElement;
            if (selectedElement) {
                const topPos = selectedElement.offsetTop - containerRef.current.offsetTop;
                containerRef.current.scrollTo({ top: topPos, behavior: 'smooth' });
            }
        }
    }, [paramPeriod, pathname, router]);

    useEffect(() => {
        if (containerRef.current) {
            const selectedElement = containerRef.current.querySelector(`[data-id="${activePeriod}"]`) as HTMLElement;
            if (selectedElement) {
                const topPos = selectedElement.offsetTop - containerRef.current.offsetTop;
                containerRef.current.scrollTo({ top: topPos, behavior: 'smooth' });
            }
        }
    }, [activePeriod]);

    const handleScrollUp = () => {
        const currentIndex = periods.findIndex(period => period.attributes?.value === activePeriod);
        if (currentIndex > 0) {
            const prevPeriod = periods[currentIndex - 1];
            handlePeriodClick(prevPeriod.id, prevPeriod.attributes?.value);
        }
    };

    const handleScrollDown = () => {
        const currentIndex = periods.findIndex(period => period.attributes?.value === activePeriod);
        if (currentIndex < periods.length - 1) {
            const nextPeriod = periods[currentIndex + 1];
            handlePeriodClick(nextPeriod.id, nextPeriod.attributes?.value);
        }
    };

    return (
        <div className="hidden lg:flex flex-col gap-2 items-center mr-8">
            <button onClick={handleScrollUp} className="relative w-3 h-3">

                <Image src='/images/arrow-scroll.svg' alt="" fill sizes='10vw' />
                
            </button>

            <div ref={containerRef} className="h-48 overflow-y-auto scroll-invisible">
                <div className="flex flex-col items-center gap-3 custom-text-norm">
                    {periods.map((period) => (
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
              
                <Image src='/images/arrow-scroll.svg' alt="" fill sizes='10vw' className="rotate-180"/>
            </button>
        </div>
    );
}
