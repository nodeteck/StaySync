import { DashboardLayout } from "@/components/dashboard-layout"
import { FrontDesk } from "@/components/front-desk"

export default function FrontDeskPage() {
  return (
    <DashboardLayout currentPage="Front Desk">
      <FrontDesk />
    </DashboardLayout>
  )
}
