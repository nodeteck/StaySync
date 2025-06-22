import { DashboardLayout } from "@/components/dashboard-layout"
import { Settings } from "@/components/settings"

export default function SettingsPage() {
  return (
    <DashboardLayout currentPage="Settings">
      <Settings />
    </DashboardLayout>
  )
}
