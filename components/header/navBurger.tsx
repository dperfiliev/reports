'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { useState } from "react";
import Image from "next/image"
import Link from "next/link";

export default function NavBurger() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOutside, setIsOutside] = useState(false);

  const [selected, setSelected] = useState(1);


  interface navItemT {
    id: number,
    name: string,
    link: string
  }

  const navs: Array<navItemT> = [
    { id: 1, name: "ГЛАВНАЯ", link: "/" },
    { id: 2, name: "ОТЧЁТЫ", link: "/availableReports" },
    { id: 3, name: "ГУБЕРНАТОРЫ", link: "/allGubers" },
    { id: 4, name: "О ПРОЕКТЕ", link: "/about" },
  ]


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleOutside = () => {
    setIsOpen(false);
  };

  const itemSelect = (id: number) => {
    setSelected(id);
  };

  console.log(selected)
  return (
    <div className="md:hidden flex items-center">
      <NavigationMenu>
        <NavigationMenuList onClick={toggleMenu}>
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className="w-7 h-7 bg-white">
              <Image src={isOpen ? "/images/cross.svg" : "/images/hamburger.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover rounded-xl" />
            </NavigationMenuTrigger>

            <NavigationMenuContent className="p-4 flex flex-col gap-4" onEscapeKeyDown={toggleOutside}>

              {
                navs.map((item) => (
                  <div key={item.id}>
                    <NavigationMenuLink href={item.link} onClick={() => itemSelect(item.id)}>
                    <div className={selected === item.id ? `custom-text-section text-nowrap text-blue font-bold` : ""}>
                        {item.name}
                    </div>
                  </NavigationMenuLink>        
                  </div>
                  
                ))
              }


            </NavigationMenuContent>

          </NavigationMenuItem>

        </NavigationMenuList>

      </NavigationMenu>
    </div>
  )
}