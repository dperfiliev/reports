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

  const itemSelect = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="md:hidden flex items-center">
      <NavigationMenu>
        <NavigationMenuList onClick={toggleMenu}>
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className="w-7 h-7 bg-white">
              <Image src={isOpen ? "/images/cross.svg" : "/images/hamburger.svg"} alt="img" fill sizes="1vw" priority={true} className="mx-auto object-cover rounded-xl" />
            </NavigationMenuTrigger>

            <NavigationMenuContent className="p-3 flex flex-col">

              {
                navs.map((item) => (
                  <NavigationMenuLink key={item.id} onClick={() => itemSelect(item.id)}>
                    <div className={selected === item.id ? `text-blue font-bold` : ""}>
                      <Link className="custom-text-small-upper text-nowrap" href={item.link}>
                        {item.name}
                      </Link>
                    </div>
                  </NavigationMenuLink>
                ))
              }


            </NavigationMenuContent>

          </NavigationMenuItem>

        </NavigationMenuList>

      </NavigationMenu>
    </div>
  )
}