import HelpProject from "@/components/helpProject"
import { AboutBreadcrumb } from "@/components/aboutBreadcrumb"

export default function About() {
    return (
        <div className="w-full mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div>
                <div>
                    <AboutBreadcrumb />
                </div>
                <h1 className="mt-4 md:mt-8 custom-text-section">
                    О ПРОЕКТЕ
                </h1>
                <div className="text-justify">
                    <p className="mt-4 md:mt-8 custom-text-small">
                        Официальные отчеты губернаторов Енисейской губернии XVIII и XIX века.
                        В этих документах содержится важная информация о городах, организациях и людях, которые жили в регионе.
                    </p>
                    <p className="mt-4 custom-text-small">
                        В Сибирском федеральном университете реализуется уникальный для России проект:
                        сотрудники вуза с помощью студентов и волонтеров собирают и оцифровывают отчеты губернаторов
                        Енисейской губернии с момента ее основания в 1822 году и до революции.
                    </p>
                </div>

                <HelpProject />

            </div>
        </div>
    )
}