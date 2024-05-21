

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function ReportsBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="custom-text-small">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/availableReports" className="text-blue font-bold">Отчёты
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}