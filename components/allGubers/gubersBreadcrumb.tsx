

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function GubersBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="custom-text-small">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/allGubers" className="text-blue font-bold">Губернаторы
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}