export default function Navigation(){
    return(
        <nav>
            <ul className="flex space-x-4">
                <li><a className="font-upper text-[8px] lg:text-[12px]" href="/">ОТЧЁТЫ</a></li>
                <li><a className="font-upper text-[8px] lg:text-[12px]"  href="/">ГУБЕРНАТОРЫ</a></li>
                <li><a className="font-upper text-[8px] lg:text-[12px] text-nowrap" href="/">О ПРОЕКТЕ</a></li>
            </ul>
        </nav>
    )
}