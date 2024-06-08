import Link from "next/link"

export default function NotDound(){
    return(
        <main className="h-screen flex flex-col gap-4 justify-center items-center text-center">
            <h2 className="custom-text-section text-blue font-bold">
                404
            </h2>
            <p className="custom-text-norm font-bold">
                Страница не найдена
            </p>
            <p className="custom-text-norm">
                Вернуться на <Link href="/" className="text-blue font-bold">главную страницу</Link>?
            </p>
        </main>
    )
}