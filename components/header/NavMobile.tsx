'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
  const [selected, setSelected] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const navs: Array<navItemT> = [
    { id: 1, name: "ГЛАВНАЯ", link: "/" },
    { id: 2, name: "ОТЧЁТЫ", link: "/availableReports" },
    { id: 3, name: "ГУБЕРНАТОРЫ", link: "/allGubers" },
    { id: 4, name: "О ПРОЕКТЕ", link: "/about" },
  ]

  const itemSelect = (id: number) => {
    setSelected(id);
    setIsOpen(false); // Закрываем Drawer
  };

  return (  
    <div className="sm:hidden flex items-center">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="relative w-7 h-7" onClick={() => setIsOpen(true)}>
          <Image src={"/images/hamburger.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover" />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center justify-center sm:hidden">
          <DrawerClose className="relative w-7 h-7 self-end mr-5" onClick={() => setIsOpen(false)}>
            <Image src={"/images/cross.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover" />
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col justify-center items-center gap-8">
            {
              navs.map((item) => (
                <div key={item.id}>
                  <Link href={item.link} onClick={() => itemSelect(item.id)} className="custom-text-section text-nowrap">
                    <div className={selected === item.id ? `custom-text-huge text-blue font-bold` : ""}>
                      {item.name}
                    </div>
                  </Link>        
                </div>
              ))
            }
          </div>

          <DrawerFooter className="w-full h-full flex justify-end">
            <div className="relative w-full h-[50vh]">
              <Image src={"/images/BgMobile.png"} alt="img" fill sizes="30vw" priority={true} className="object-cover object-top" />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
