import { DashboardLayout } from "@/components/dashboard-layout"
import { Housekeeping } from "@/components/housekeeping"

export default function HousekeepingPage() {
  return (
    <DashboardLayout currentPage="Housekeeping">
      <Housekeeping />
    </DashboardLayout>
  )
}
