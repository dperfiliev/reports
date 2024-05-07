import LogoHolder from "./logoholder"
import Navigation from "./navigation"

export default function Header(){
    return (
        <div className="flex items-center justify-center py-[10px] bg-white sticky top-0 z-20">
            {/* LOGOHOLDER */}
            <LogoHolder />
            {/* LINE */}
            <div className="flex-1 h-[0.5px] md:h-[1px] bg-blue mx-5">

            </div>
            {/* NAV */}
            <Navigation />
        </div>
    )
}