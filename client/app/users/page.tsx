import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout currentPage="User Management">
      <UserManagement />
    </DashboardLayout>
  )
}
