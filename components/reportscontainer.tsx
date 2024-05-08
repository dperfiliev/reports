import ReportCard from "./ReportCard"

const cards = [
    {
        link: "/images/img1.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив Российский государственный исторический архив"
    },
    {
        link: "/images/img2.jpg",
        title: "Отчет губернатора за 1828 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img3.jpg",
        title: "Отчет губернатора за 1851 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img4.jpg",
        title: "Отчет губернатора за 1852 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img5.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img1.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img2.jpg",
        title: "Отчет губернатора за 1828 г.",
        description: "Российский государственный исторический архив"
    },
]

export default function ReportsContainer(){
    return(
        <div className="mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((item, index) => (
                <ReportCard key={index}  link={item.link} title={item.title} description={item.description} />
            ))}
        </div>
    )
}