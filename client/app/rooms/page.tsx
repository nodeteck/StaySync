import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoomsPage() {
  return (
    <DashboardLayout currentPage="Rooms">
      <Card>
        <CardHeader>
          <CardTitle>Room Management</CardTitle>
          <CardDescription>Manage room inventory, types, and configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Room management features coming soon...</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
