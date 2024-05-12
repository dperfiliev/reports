export default function Navigation(){
    return(
        <nav>
            <ul className="flex space-x-4">
                <li><a className="font-upper text-[10px] md:text-xs lg:text-sm" href="/">ОТЧЁТЫ</a></li>
                <li><a className="font-upper text-[10px] md:text-xs lg:text-sm" href="/">ГУБЕРНАТОРЫ</a></li>
                <li><a className="font-upper text-[10px] md:text-xs lg:text-sm text-nowrap" href="/">О ПРОЕКТЕ</a></li>
            </ul>
        </nav>
    )
}