"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, UserX, Search, Key, Clock, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FrontDesk() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const checkIns = [
    {
      id: 1,
      guestName: "Alice Smith",
      room: "101",
      checkInTime: "14:00",
      guests: 2,
      status: "pending",
      phone: "+1234567890",
    },
    {
      id: 2,
      guestName: "Bob Johnson",
      room: "205",
      checkInTime: "15:30",
      guests: 1,
      status: "ready",
      phone: "+1234567891",
    },
  ]

  const checkOuts = [
    {
      id: 1,
      guestName: "Carol Williams",
      room: "301",
      checkOutTime: "11:00",
      guests: 3,
      status: "pending",
      totalBill: 450.0,
    },
    {
      id: 2,
      guestName: "David Brown",
      room: "102",
      checkOutTime: "10:30",
      guests: 2,
      status: "completed",
      totalBill: 320.0,
    },
  ]

  const rooms = [
    { number: "101", type: "Standard", status: "occupied", guest: "Alice Smith", floor: 1 },
    { number: "102", type: "Standard", status: "vacant", guest: null, floor: 1 },
    { number: "103", type: "Deluxe", status: "cleaning", guest: null, floor: 1 },
    { number: "201", type: "Suite", status: "maintenance", guest: null, floor: 2 },
    { number: "202", type: "Standard", status: "occupied", guest: "Bob Johnson", floor: 2 },
    { number: "203", type: "Deluxe", status: "vacant", guest: null, floor: 2 },
    { number: "301", type: "Suite", status: "occupied", guest: "Carol Williams", floor: 3 },
    { number: "302", type: "Standard", status: "vacant", guest: null, floor: 3 },
  ]

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200"
      case "vacant":
        return "bg-green-100 text-green-800 border-green-200"
      case "cleaning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const processCheckIn = (guestId: number) => {
    console.log(`Processing check-in for guest ${guestId}`)
    // In real app, this would update the database
  }

  const processCheckOut = (guestId: number) => {
    console.log(`Processing check-out for guest ${guestId}`)
    // In real app, this would update the database
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Front Desk Operations</h2>
          <p className="text-muted-foreground">Manage check-ins, check-outs, and room assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Room Assignment
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Walk-in Guest
          </Button>
        </div>
      </div>

      <Tabs defaultValue="checkins" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="checkouts">Check-outs</TabsTrigger>
          <TabsTrigger value="rooms">Room Status</TabsTrigger>
        </TabsList>

        <TabsContent value="checkins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Today's Check-ins
              </CardTitle>
              <CardDescription>Guests scheduled to arrive today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkIns.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{guest.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          Room {guest.room} • {guest.guests} guest{guest.guests > 1 ? "s" : ""} • {guest.phone}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expected: {guest.checkInTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={guest.status === "ready" ? "default" : "secondary"}>{guest.status}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Check In</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Check-in: {guest.guestName}</DialogTitle>
                            <DialogDescription>Complete the check-in process for Room {guest.room}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="id-verification" className="text-right">
                                ID Verified
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select verification status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Yes - ID Verified</SelectItem>
                                  <SelectItem value="no">No - Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="payment" className="text-right">
                                Payment
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="card">Credit Card</SelectItem>
                                  <SelectItem value="cash">Cash</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="notes" className="text-right">
                                Notes
                              </Label>
                              <Input id="notes" placeholder="Special requests..." className="col-span-3" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button onClick={() => processCheckIn(guest.id)}>Complete Check-in</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Today's Check-outs
              </CardTitle>
              <CardDescription>Guests scheduled to depart today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkOuts.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <UserX className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{guest.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          Room {guest.room} • {guest.guests} guest{guest.guests > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expected: {guest.checkOutTime}
                        </p>
                        <p className="text-sm font-medium">Total Bill: ${guest.totalBill.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={guest.status === "completed" ? "default" : "secondary"}>{guest.status}</Badge>
                      {guest.status !== "completed" && (
                        <Button size="sm" onClick={() => processCheckOut(guest.id)}>
                          Check Out
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Room Status Overview
              </CardTitle>
              <CardDescription>Current status of all rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rooms
                  .filter(
                    (room) =>
                      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((room) => (
                    <Card key={room.number} className={`border-2 ${getRoomStatusColor(room.status)}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Room {room.number}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            Floor {room.floor}
                          </Badge>
                        </div>
                        <CardDescription>{room.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Status:</span>
                            <Badge className={getRoomStatusColor(room.status)}>{room.status}</Badge>
                          </div>
                          {room.guest && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Guest:</span>
                              <span className="text-sm">{room.guest}</span>
                            </div>
                          )}
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1">
                              Details
                            </Button>
                            {room.status === "vacant" && (
                              <Button size="sm" className="flex-1">
                                Assign
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
