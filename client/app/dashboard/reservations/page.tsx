import { DashboardLayout } from "@/components/dashboard-layout"
import { ReservationsCalendar } from "@/components/reservations-calendar"

export default function ReservationsPage() {
  return (
    <DashboardLayout currentPage="Reservations">
      <ReservationsCalendar />
    </DashboardLayout>
  )
}
