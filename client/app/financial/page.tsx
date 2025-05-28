import { DashboardLayout } from "@/components/dashboard-layout"
import { FinancialOverview } from "@/components/financial-overview"

export default function FinancialPage() {
  return (
    <DashboardLayout currentPage="Financial">
      <FinancialOverview />
    </DashboardLayout>
  )
}
