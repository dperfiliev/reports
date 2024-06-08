"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SetStateAction } from 'react';
import { Outline } from 'react-pdf'
import Image from 'next/image';

export default function OutlineContent({
    contents,
    setPageNumber
}: {
    contents: ({
        id: string,
        pageNumber: number | undefined
        title: string | undefined
    } | undefined)[],
    setPageNumber: (value: SetStateAction<number>) => void
}) {
    const [outlineEmpty, setOutlineEmpty] = useState(true);
    const [outlineOpen, setOutlineOpen] = useState(false);

    return (
        <div className="lg:w-1/2 w-full h-full" onClick={() => setOutlineOpen((prev) => !prev)}>
            {/* Mobile */}
            <div className='relative lg:hidden flex items-center'>
                <Button

                    className="relative custom-text-big px-0 py-0 h-fit mr-2"

                >
                    Содержание
                </Button>
                <div className='relative h-4 w-4'>
                    <Image src='/images/chevron.svg' fill sizes='20vw' alt=""></Image>
                </div>
            </div>
            {/* Desktop */}
            <h3 className="font-upper mb-4 font-semibold text-lg lg:block hidden">
                Содержание
            </h3>
            {outlineEmpty && (
                <div className={cn(
                    'prose prose-li:text-blue text-foreground custom-text-small prose-ul:ps-0',
                    outlineOpen ? "block" : "lg:block hidden",
                )}>
                    <ul className='list-none'>
                        {contents.map(item => (
                            <li
                                key={item?.id}
                                className='cursor-pointer'
                                onClick={() => setPageNumber(item?.pageNumber === undefined ? 1 : item?.pageNumber)}
                            >
                                {item?.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Outline
                className={cn(
                    "mt-4 prose prose-a:text-blue custom-text-small prose-ul:list-none prose-a:no-underline prose-ul:ps-0 prose-li:ps-0",
                    outlineOpen ? "block" : "lg:block hidden",
                    outlineEmpty && "hidden"
                )}
                onItemClick={({ pageNumber }) => {
                    setPageNumber(pageNumber)
                    setOutlineOpen(false)
                }}
                onLoadSuccess={(outline) => {
                    if (outline !== null) setOutlineEmpty(false)
                }}
            />
        </div>
    )
}
