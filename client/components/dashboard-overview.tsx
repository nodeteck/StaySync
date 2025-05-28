"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Bed,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Star,
  MapPin,
  Activity,
  Target,
  Eye,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardOverview() {
  // Enhanced mock data with more comprehensive metrics
  const stats = {
    totalRooms: 24,
    occupiedRooms: 18,
    availableRooms: 4,
    maintenanceRooms: 2,
    todayCheckIns: 8,
    todayCheckOuts: 5,
    revenue: 12450,
    occupancyRate: 75,
    averageDailyRate: 185,
    revPAR: 139,
    guestSatisfaction: 4.6,
    repeatGuests: 35,
    walkIns: 3,
    noShows: 1,
  }

  const recentReservations = [
    {
      id: 1,
      guest: "Alice Smith",
      room: "101",
      checkIn: "Today",
      status: "confirmed",
      nights: 3,
      amount: 555,
      guestType: "business",
    },
    {
      id: 2,
      guest: "Bob Johnson",
      room: "205",
      checkIn: "Tomorrow",
      status: "pending",
      nights: 2,
      amount: 370,
      guestType: "leisure",
    },
    {
      id: 3,
      guest: "Carol Williams",
      room: "301",
      checkIn: "Jan 20",
      status: "confirmed",
      nights: 4,
      amount: 1200,
      guestType: "group",
    },
    {
      id: 4,
      guest: "David Brown",
      room: "102",
      checkIn: "Jan 21",
      status: "vip",
      nights: 1,
      amount: 185,
      guestType: "vip",
    },
  ]

  const housekeepingTasks = [
    {
      id: 1,
      room: "102",
      task: "Deep Cleaning",
      priority: "high",
      status: "pending",
      assignee: "Maria Garcia",
      eta: "30 min",
    },
    {
      id: 2,
      room: "201",
      task: "Maintenance",
      priority: "urgent",
      status: "in_progress",
      assignee: "John Smith",
      eta: "1 hour",
    },
    {
      id: 3,
      room: "103",
      task: "Inspection",
      priority: "low",
      status: "completed",
      assignee: "Sarah Johnson",
      eta: "Completed",
    },
    {
      id: 4,
      room: "304",
      task: "Restocking",
      priority: "medium",
      status: "pending",
      assignee: "Maria Garcia",
      eta: "15 min",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Check-in completed",
      user: "Sarah Johnson",
      guest: "Alice Smith",
      time: "2 min ago",
      type: "checkin",
    },
    {
      id: 2,
      action: "Payment processed",
      user: "Front Desk",
      guest: "Bob Johnson",
      time: "5 min ago",
      type: "payment",
    },
    {
      id: 3,
      action: "Room cleaned",
      user: "Maria Garcia",
      guest: "Room 103",
      time: "15 min ago",
      type: "housekeeping",
    },
    {
      id: 4,
      action: "New reservation",
      user: "Online Booking",
      guest: "Emma Davis",
      time: "23 min ago",
      type: "booking",
    },
    {
      id: 5,
      action: "Maintenance completed",
      user: "John Smith",
      guest: "Room 201",
      time: "1 hour ago",
      type: "maintenance",
    },
  ]

  const roomStatus = [
    { floor: 1, total: 8, occupied: 6, available: 1, maintenance: 1 },
    { floor: 2, total: 8, occupied: 7, available: 1, maintenance: 0 },
    { floor: 3, total: 8, occupied: 5, available: 2, maintenance: 1 },
  ]

  const upcomingEvents = [
    { id: 1, title: "Conference Group Arrival", time: "2:00 PM", guests: 15, type: "group" },
    { id: 2, title: "VIP Guest Check-in", time: "4:30 PM", guests: 1, type: "vip" },
    { id: 3, title: "Wedding Party", time: "6:00 PM", guests: 8, type: "event" },
  ]

  const quickStats = [
    { label: "Avg Stay", value: "2.3 nights", change: "+0.2", trend: "up" },
    { label: "Walk-ins", value: stats.walkIns.toString(), change: "+1", trend: "up" },
    { label: "No-shows", value: stats.noShows.toString(), change: "-2", trend: "down" },
    { label: "Satisfaction", value: `${stats.guestSatisfaction}/5`, change: "+0.1", trend: "up" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "checkin":
        return <Users className="h-4 w-4 text-green-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-blue-600" />
      case "housekeeping":
        return <CheckCircle className="h-4 w-4 text-purple-600" />
      case "booking":
        return <Calendar className="h-4 w-4 text-orange-600" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "vip":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Good morning, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening at Grand Hotel today</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRooms}</div>
            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
              <span className="text-green-600">{stats.occupiedRooms} occupied</span>
              <span className="text-blue-600">{stats.availableRooms} available</span>
              <span className="text-orange-600">{stats.maintenanceRooms} maintenance</span>
            </div>
            <Progress value={(stats.occupiedRooms / stats.totalRooms) * 100} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% from yesterday
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              ADR: ${stats.averageDailyRate} | RevPAR: ${stats.revPAR}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-ins/outs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.todayCheckIns}/{stats.todayCheckOuts}
            </div>
            <p className="text-xs text-muted-foreground">In/Out today</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {stats.walkIns} walk-ins
              </Badge>
              <Badge variant="outline" className="text-xs">
                {stats.noShows} no-shows
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.guestSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +0.2 this week
            </p>
            <div className="text-xs text-muted-foreground mt-1">{stats.repeatGuests}% repeat guests</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Reservations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Reservations
                </CardTitle>
                <CardDescription>Latest booking activity and guest arrivals</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>
                        {reservation.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{reservation.guest}</p>
                      <p className="text-sm text-muted-foreground">
                        Room {reservation.room} • {reservation.nights} nights • {reservation.checkIn}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {reservation.guestType}
                        </Badge>
                        <span className="text-xs text-muted-foreground">${reservation.amount}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status by Floor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Room Status by Floor
            </CardTitle>
            <CardDescription>Current occupancy breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatus.map((floor) => (
                <div key={floor.floor} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Floor {floor.floor}</span>
                    <span className="text-xs text-muted-foreground">
                      {floor.occupied}/{floor.total}
                    </span>
                  </div>
                  <Progress value={(floor.occupied / floor.total) * 100} className="h-2" />
                  <div className="flex gap-2 text-xs">
                    <span className="text-green-600">{floor.occupied} occupied</span>
                    <span className="text-blue-600">{floor.available} available</span>
                    {floor.maintenance > 0 && <span className="text-orange-600">{floor.maintenance} maintenance</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Housekeeping Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Housekeeping Tasks
            </CardTitle>
            <CardDescription>Current task status and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {housekeepingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {task.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : task.priority === "urgent" ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">Room {task.room}</p>
                      <p className="text-xs text-muted-foreground">{task.task}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.assignee} • {task.eta}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "urgent" ? "destructive" : task.priority === "high" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Today's scheduled arrivals and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {event.type === "group" ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : event.type === "vip" ? (
                      <Star className="h-4 w-4 text-primary" />
                    ) : (
                      <Calendar className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.time} • {event.guests} guests
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.guest}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used operations and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Walk-in Check-in</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">New Reservation</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Assign Task</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Process Payment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
