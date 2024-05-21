import Link from "next/link"

export default function Navigation(){
    return(
        <nav>
            <ul className="md:flex space-x-2 sm:space-x-5 hidden md:visible">
                <li><Link className="font-upper custom-text-small" href="/availableReports">ОТЧЁТЫ</Link></li>
                <li><Link className="font-upper custom-text-small" href="/allGubers">ГУБЕРНАТОРЫ</Link></li>
                <li><Link className="font-upper custom-text-small text-nowrap" href="/about">О ПРОЕКТЕ</Link></li>
            </ul>
        </nav>
    )
}