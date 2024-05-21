
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AboutBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList className="custom-text-small">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Главная
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/about" className="text-blue font-bold">О проекте
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}