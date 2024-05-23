"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SetStateAction} from 'react';
import React, { useState } from 'react'
import { Outline } from 'react-pdf'

export default function OutlineContent({
    contents,
    setPageNumber
}: {
    contents:{
        id: string,
        pageNumber: number
        title: string
    }[],
    setPageNumber: (value: SetStateAction<number>) => void
}) {
    const [outlineEmpty, setOutlineEmpty] = useState(true);
    const [outlineOpen, setOutlineOpen] = useState(false);

    return (
        <div className="w-full h-full">
            {/* Mobile */}
            <Button 
                variant="outline"
                className="font-upper font-medium text-base lg:hidden block"
                onClick={() => setOutlineOpen((prev) => !prev) }
            >
                Содержание
            </Button>
            {/* Desktop */}
            <h3 className="font-upper font-semibold text-lg lg:block hidden">
                Содержание
            </h3>
            {outlineEmpty && (
                <div className={cn(
                    'prose prose-li:text-blue text-foreground underline font-lower',
                    outlineOpen ? "block" : "lg:block hidden",
                )}>
                    <ul>
                        {contents.map(item => (
                            <li 
                                key={item.id}
                                className='cursor-pointer'
                                onClick={() => setPageNumber(item.pageNumber) }
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Outline 
                className={cn(
                  "prose prose-a:text-blue underline font-lower",
                  outlineOpen ? "block" : "lg:block hidden",
                  outlineEmpty && "hidden"
                )}
                onItemClick={({pageNumber}) => {
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
