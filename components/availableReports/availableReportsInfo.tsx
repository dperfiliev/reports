interface Props {
    pages: number | undefined,
    textType: string | undefined
    source: string | undefined,
    output: string | undefined
}

export default function AvailableReportsInfo({ pages, textType, source, output }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <p className="mb-2 md:mb-4 font-bold custom-text-big">
                Общая информация
            </p>
            <p className="custom-text-small">
                Объём (страниц): {pages ? pages : "неизвестно"}
            </p>
            <p className="custom-text-small">
                Тип текста: {textType ? textType : "неизвестно"}
            </p>
            <p className="custom-text-small">
                Источник: {source ? source : "неизвестно"}
            </p>
            <p className="custom-text-small">
                Выходные данные: {output ? output : "неизвестно"}
            </p>
        </div>
    )
}