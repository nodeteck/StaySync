"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReservationsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock reservations data
  const reservations = [
    {
      id: 1,
      guestName: "Alice Smith",
      room: "101",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed",
      guests: 2,
    },
    {
      id: 2,
      guestName: "Bob Johnson",
      room: "205",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      status: "checked_in",
      guests: 1,
    },
    {
      id: 3,
      guestName: "Carol Williams",
      room: "301",
      checkIn: "2024-01-20",
      checkOut: "2024-01-23",
      status: "pending",
      guests: 3,
    },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getReservationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return reservations.filter((res) => {
      const checkIn = new Date(res.checkIn)
      const checkOut = new Date(res.checkOut)
      return date >= checkIn && date < checkOut
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reservations Calendar</h2>
          <p className="text-muted-foreground">Manage bookings and room assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Reservation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Reservation</DialogTitle>
              <DialogDescription>Add a new booking to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="guest-name" className="text-right">
                  Guest Name
                </Label>
                <Input id="guest-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">Room 101</SelectItem>
                    <SelectItem value="102">Room 102</SelectItem>
                    <SelectItem value="103">Room 103</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="check-in" className="text-right">
                  Check-in
                </Label>
                <Input id="check-in" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="check-out" className="text-right">
                  Check-out
                </Label>
                <Input id="check-out" type="date" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Reservation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {monthYear}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-24" />
              }

              const dayReservations = getReservationsForDate(day)
              const isToday = day.toDateString() === new Date().toDateString()

              return (
                <div
                  key={day.toISOString()}
                  className={`p-2 h-24 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                    isToday ? "bg-primary/10 border-primary" : "border-border"
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                  <div className="space-y-1">
                    {dayReservations.slice(0, 2).map((reservation) => (
                      <div key={reservation.id} className="text-xs p-1 rounded bg-primary/20 text-primary truncate">
                        {reservation.room} - {reservation.guestName}
                      </div>
                    ))}
                    {dayReservations.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{dayReservations.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
          <CardDescription>Current and upcoming bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{reservation.guestName}</p>
                    <p className="text-sm text-muted-foreground">
                      Room {reservation.room} • {reservation.guests} guest{reservation.guests > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>
                      {reservation.checkIn} to {reservation.checkOut}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    reservation.status === "confirmed"
                      ? "default"
                      : reservation.status === "checked_in"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {reservation.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
