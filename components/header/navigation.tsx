import Link from "next/link"

export default function Navigation(){
    return(
        <nav>
            <ul className="sm:flex space-x-4 hidden sm:visible">
                <li><Link className="font-upper custom-text-small" href="/availableReports">ОТЧЁТЫ</Link></li>
                <li><Link className="font-upper custom-text-small" href="/allGubers">ГУБЕРНАТОРЫ</Link></li>
                <li><Link className="font-upper custom-text-small text-nowrap" href="/about">О ПРОЕКТЕ</Link></li>
            </ul>
        </nav>
    )
}