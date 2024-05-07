export default function Navigation(){
    return(
        <nav>
            <ul className="flex space-x-4">
                <li><a className="font-upper text-[8px] lg:text-xs" href="/">ОТЧЁТЫ</a></li>
                <li><a className="font-upper text-[8px] lg:text-xs" href="/">ГУБЕРНАТОРЫ</a></li>
                <li><a className="font-upper text-[8px] lg:text-xs text-nowrap" href="/">О ПРОЕКТЕ</a></li>
            </ul>
        </nav>
    )
}