import LogoHolder from "./logoHolder"
import Navigation from "./navigation"

import NavMobile from "./NavMobile"

export default function Header(){
    return (
        <div className="flex items-center justify-center py-3 bg-white sticky top-0 z-20 container mx-auto px-4 md:px-12">
            {/* LOGOHOLDER */}
            <LogoHolder />
            {/* LINE */}
            <div className="flex-1 h-[0.5px] md:h-px bg-blue mx-5">

            </div>
            {/* NAV */}
            <Navigation />
            <NavMobile />
        </div>
    )
}