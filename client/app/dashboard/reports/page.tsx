import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportsAnalytics } from "@/components/reports-analytics"

export default function ReportsPage() {
  return (
    <DashboardLayout currentPage="Reports">
      <ReportsAnalytics />
    </DashboardLayout>
  )
}
