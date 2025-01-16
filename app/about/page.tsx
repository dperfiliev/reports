import HelpProject from "@/components/helpProject"
import { AboutBreadcrumb } from "@/components/aboutBreadcrumb"
import Feedback from "./feedback";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "О проекте",
    description: "Официальные отчёты губернаторов Енисейской губернии XVIII и XIX века. В этих документах содержится важная информация о городах, организациях и людях, которые жили в регионе.",
  };


export default function About() {
    return (
        <div className="w-full mt-6 md:mt-8 lg:mt-12">
            <div>
                <div>
                    <AboutBreadcrumb />
                </div>
                <h1 className="mt-6 md:mt-8 custom-text-section">
                    О ПРОЕКТЕ
                </h1>
                <div className="text-justify">
                    <p className="mt-6 md:mt-8 custom-text-small">
                        Официальные отчёты губернаторов Енисейской губернии XVIII и XIX века.
                        В этих документах содержится важная информация о городах, организациях и людях, которые жили в регионе.
                    </p>
                    <p className="mt-4 custom-text-small">
                        В Сибирском федеральном университете реализуется уникальный для России проект:
                        сотрудники вуза с помощью студентов и волонтеров собирают и оцифровывают отчёты губернаторов
                        Енисейской губернии с момента ее основания в 1822 году и до революции.
                    </p>
                </div>

                <HelpProject />

                
                <Feedback />
                

            </div>
        </div>
    )
}