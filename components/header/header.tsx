import LogoHolder from "./logoHolder"
import Navigation from "./navigation"

import NavMobile from "./NavMobile"

export default function Header(){
    return (
        <div className="flex items-center justify-center py-2 bg sticky top-0 z-40 container mx-auto px-4 md:px-12 shadow-neutral-300 shadow-md bg-back"> {/* header-shadow */}
            {/* LOGOHOLDER */}
            <LogoHolder />
            {/* LINE */}
            <div className="flex-1 h-[0.5px] bg-blue mx-5">

            </div>
            {/* NAV */}
            <Navigation />
            <NavMobile />
        </div>
    )
}