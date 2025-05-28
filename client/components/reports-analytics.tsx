"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Download, Users, Bed, DollarSign, Target } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("occupancy")

  // Mock analytics data
  const kpiMetrics = {
    occupancyRate: 78.5,
    adr: 185.5, // Average Daily Rate
    revPAR: 145.42, // Revenue per Available Room
    totalRevenue: 425000,
    totalBookings: 1250,
    averageStay: 2.8,
    customerSatisfaction: 4.6,
    repeatGuests: 35,
  }

  const occupancyData = [
    { month: "Jan", occupancy: 65, revenue: 285000, adr: 175 },
    { month: "Feb", occupancy: 72, revenue: 320000, adr: 180 },
    { month: "Mar", occupancy: 78, revenue: 365000, adr: 185 },
    { month: "Apr", occupancy: 82, revenue: 410000, adr: 190 },
    { month: "May", occupancy: 85, revenue: 445000, adr: 195 },
    { month: "Jun", occupancy: 88, revenue: 475000, adr: 200 },
  ]

  const roomTypePerformance = [
    { type: "Standard", occupancy: 85, revenue: 180000, adr: 120, rooms: 12 },
    { type: "Deluxe", occupancy: 78, revenue: 156000, adr: 180, rooms: 8 },
    { type: "Suite", occupancy: 65, revenue: 130000, adr: 300, rooms: 4 },
  ]

  const guestDemographics = [
    { segment: "Business", percentage: 45, revenue: 191250 },
    { segment: "Leisure", percentage: 35, revenue: 148750 },
    { segment: "Group", percentage: 15, revenue: 63750 },
    { segment: "Other", percentage: 5, revenue: 21250 },
  ]

  const topPerformingRooms = [
    { room: "301", type: "Suite", occupancy: 92, revenue: 15600, adr: 300 },
    { room: "201", type: "Deluxe", occupancy: 88, revenue: 12800, adr: 180 },
    { room: "101", type: "Standard", occupancy: 85, revenue: 8500, adr: 120 },
    { room: "302", type: "Suite", occupancy: 82, revenue: 14200, adr: 300 },
    { room: "202", type: "Deluxe", occupancy: 80, revenue: 11200, adr: 180 },
  ]

  const customReports = [
    {
      id: 1,
      name: "Monthly Occupancy Report",
      type: "Occupancy",
      lastGenerated: "2024-01-15",
      status: "ready",
    },
    {
      id: 2,
      name: "Revenue Analysis Q1",
      type: "Financial",
      lastGenerated: "2024-01-10",
      status: "generating",
    },
    {
      id: 3,
      name: "Guest Satisfaction Survey",
      type: "Guest Experience",
      lastGenerated: "2024-01-12",
      status: "ready",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Performance metrics, occupancy reports, and business insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Custom Report</DialogTitle>
                <DialogDescription>Create a custom report with specific parameters.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="occupancy">Occupancy Report</SelectItem>
                      <SelectItem value="revenue">Revenue Analysis</SelectItem>
                      <SelectItem value="guest">Guest Demographics</SelectItem>
                      <SelectItem value="performance">Performance Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-range" className="text-right">
                    Period
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="quarter">Last 3 months</SelectItem>
                      <SelectItem value="year">Last 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="format" className="text-right">
                    Format
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Generate Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiMetrics.occupancyRate}%</div>
            <Progress value={kpiMetrics.occupancyRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Target: 80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ADR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiMetrics.adr}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +5.2% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiMetrics.revPAR}</div>
            <p className="text-xs text-muted-foreground">Revenue per available room</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiMetrics.customerSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">{kpiMetrics.repeatGuests}% repeat guests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="occupancy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Occupancy Trends
                </CardTitle>
                <CardDescription>Monthly occupancy rates and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {occupancyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-8">{data.month}</span>
                        <div className="flex-1">
                          <Progress value={data.occupancy} className="h-2" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{data.occupancy}%</p>
                        <p className="text-xs text-muted-foreground">${data.adr} ADR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Performance</CardTitle>
                <CardDescription>Occupancy by room category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roomTypePerformance.map((room, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{room.type}</span>
                        <Badge variant="outline">{room.rooms} rooms</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Occupancy: {room.occupancy}%</span>
                          <span>ADR: ${room.adr}</span>
                        </div>
                        <Progress value={room.occupancy} className="h-2" />
                        <p className="text-sm text-muted-foreground">Revenue: ${room.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue by Guest Segment
                </CardTitle>
                <CardDescription>Revenue breakdown by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guestDemographics.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-16">{segment.segment}</span>
                        <div className="flex-1">
                          <Progress value={segment.percentage} className="h-2" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{segment.percentage}%</p>
                        <p className="text-xs text-muted-foreground">${segment.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {occupancyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.occupancy}% occupancy</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${data.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">${data.adr} ADR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Rooms</CardTitle>
              <CardDescription>Rooms with highest occupancy and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>ADR</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformingRooms.map((room, index) => (
                    <TableRow key={room.room}>
                      <TableCell className="font-medium">{room.room}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={room.occupancy} className="h-2 w-16" />
                          <span className="text-sm">{room.occupancy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>${room.revenue.toLocaleString()}</TableCell>
                      <TableCell>${room.adr}</TableCell>
                      <TableCell>
                        <Badge variant={index < 2 ? "default" : "secondary"}>{index < 2 ? "Excellent" : "Good"}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Generate and manage custom reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.lastGenerated}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "ready" ? "default" : "secondary"}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            Regenerate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
