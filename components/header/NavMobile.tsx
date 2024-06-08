'use client'

import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface navItemT {
  id: number,
  name: string,
  link: string
}

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const navs: Array<navItemT> = [
    { id: 1, name: "ГЛАВНАЯ", link: "/" },
    { id: 2, name: "ОТЧЁТЫ", link: "/availableReports" },
    { id: 3, name: "ГУБЕРНАТОРЫ", link: "/allGubers" },
    { id: 4, name: "О ПРОЕКТЕ", link: "/about" },
  ]

  const itemSelect = () => {
    setIsOpen(false); // Закрываем Drawer
  };

  return (  
    <div className="sm:hidden flex items-center">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="relative w-7 h-7" onClick={() => setIsOpen(true)}>
          <Image src={"/images/hamburger.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover" />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center justify-center sm:hidden">
          <DrawerClose className="relative w-10 h-10 self-end mr-5" onClick={() => setIsOpen(false)}>
            <Image src={"/images/cross.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover" />
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          <div className="h-screen flex flex-col justify-evenly">
            <div className="flex flex-col items-center gap-8">
              {
                navs.map((item) => (
                  <div key={item?.id}>
                    <Link href={item?.link} onClick={() => itemSelect()} className="text-2xl font-upper text-nowrap">
                      <div>
                        {item?.name}
                      </div>
                    </Link>        
                  </div> 
                ))
              }
            </div>

              <div className="relative mb-4 h-64 w-64">
                <Image src={"/images/bg.png"} alt="img" fill sizes="30vw" priority={true} className="" />
              </div>
          </div>

        </DrawerContent>
      </Drawer>
    </div>
  )
}


//<Image src={"/images/BgMobile.png"} alt="img" fill sizes="30vw" priority={true} className="object-cover object-top" />