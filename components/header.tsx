import LogoHolder from "./logoholder"
import Navigation from "./navigation"

export default function Header(){
    return (
        <div className="flex items-center justify-center">
            {/* LOGOHOLDER */}
            <LogoHolder />
            {/* LINE */}
            <div className="w-full h-[0.5px] lg:h-[1px] bg-blue mx-5">

            </div>
            {/* NAV */}
            <Navigation />
        </div>
    )
}