"use client"
import React from "react";

import { useRef, useCallback, useState, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PeriodScrollListProps {
    periods: PeriodT[];
    paramPeriod: string;
}

export default function GubersPeriodsScroll({ periods, paramPeriod }: PeriodScrollListProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentValuePeriod = searchParams.get(paramPeriod) ?? "";


    const [, setValuePeriod] = useState(currentValuePeriod);
    const [activePeriod, setActivePeriod] = useState(currentValuePeriod || (periods?.length > 0 ? periods[0]?.attributes?.value : ""));


    const [, startTransitionPeriod] = React.useTransition();

    const listRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const [isLastItemAtTop, setIsLastItemAtTop] = useState(false);

    useEffect(() => {
        if (!currentValuePeriod && periods?.length > 0) {
            const firstPeriodValue = periods[0]?.attributes?.value;
            const params = new URLSearchParams(window.location.search);
            params.set(paramPeriod, firstPeriodValue);
            router.replace(`${pathname}?${params.toString()}`);
            setActivePeriod(firstPeriodValue);
        }
    }, [periods, currentValuePeriod, paramPeriod, pathname, router]);

    const handleScroll = useCallback(() => {
        const lastPeriod = periods[periods?.length - 1];
        if (lastPeriod && itemRefs.current[lastPeriod.id] && listRef.current) {
            const list = listRef.current;
            const element = itemRefs.current[lastPeriod.id];
            const elementTop = element.offsetTop;
            const listScrollTop = list.scrollTop;

            // Если последний элемент достиг верха списка
            if (listScrollTop >= elementTop) {
                list.scrollTop = elementTop;
                setIsLastItemAtTop(true);
            } else {
                setIsLastItemAtTop(false);
            }
        }
    }, [periods]);

    useEffect(() => {
        const currentListRef = listRef.current;
        if (currentListRef) {
            currentListRef.addEventListener('scroll', handleScroll);
            return () => {
                currentListRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const handlePeriodClick = useCallback((periodId: string, valuePeriod: string | null) => {
        const params = new URLSearchParams(window.location.search);
        setActivePeriod(valuePeriod ?? "");

        if (valuePeriod && valuePeriod?.length > 0) {
            setValuePeriod(valuePeriod);
            params.set(paramPeriod, valuePeriod);
        } else {
            setValuePeriod("");
            params.delete(paramPeriod);
        }

        startTransitionPeriod(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });

        const element = itemRefs.current[periodId];
        if (element && listRef.current) {
            const topPos = element.offsetTop;
            listRef.current.scrollTo({
                top: topPos,
                behavior: 'smooth'
            });
        }
    }, [paramPeriod, pathname, router, startTransitionPeriod]);

    useEffect(() => {
        if (isLastItemAtTop) {
            const list = listRef.current;
            const handleWheel = (event: WheelEvent) => {
                if (event.deltaY > 0) {
                    event.preventDefault();
                }
            };
            list?.addEventListener('wheel', handleWheel);
            return () => {
                list?.removeEventListener('wheel', handleWheel);
            };
        }
    }, [isLastItemAtTop]);

    return (
        <div className="relative">
            <div className="hidden lg:flex flex-col gap-6 items-center mr-8">
                <div className="h-52 overflow-y-auto scroll-invisible" ref={listRef}>
                    <div className="flex flex-col gap-4 pb-52 custom-text-norm">
                        {periods.map((period) => (
                            <div key={period?.id}
                                ref={el => {
                                    if (el !== null) {
                                        itemRefs.current[period?.id] = el;
                                    }
                                }}
                                onClick={() => handlePeriodClick(period?.id, period?.attributes?.value)}
                                className={activePeriod === period?.attributes?.value ? "text-blue font-bold" : ""}>
                                <p className="cursor-pointer">
                                    {period.attributes?.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
