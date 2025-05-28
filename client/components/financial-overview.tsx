"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, Plus, Download, Filter } from "lucide-react"
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

export function FinancialOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  // Mock financial data
  const financialMetrics = {
    todayRevenue: 12450,
    monthlyRevenue: 385000,
    yearlyRevenue: 4200000,
    averageDailyRate: 185,
    revPAR: 139,
    occupancyRate: 75,
    totalBookings: 67,
    pendingPayments: 8500,
  }

  const revenueStreams = [
    { source: "Room Revenue", amount: 285000, percentage: 74, change: 12 },
    { source: "Food & Beverage", amount: 65000, percentage: 17, change: -3 },
    { source: "Spa Services", amount: 25000, percentage: 6, change: 8 },
    { source: "Other Services", amount: 10000, percentage: 3, change: 15 },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "payment",
      guest: "Alice Smith",
      room: "101",
      amount: 360.0,
      method: "Credit Card",
      status: "completed",
      date: "2024-01-15T14:30:00Z",
    },
    {
      id: 2,
      type: "refund",
      guest: "Bob Johnson",
      room: "205",
      amount: -120.0,
      method: "Credit Card",
      status: "processed",
      date: "2024-01-15T13:15:00Z",
    },
    {
      id: 3,
      type: "payment",
      guest: "Carol Williams",
      room: "301",
      amount: 450.0,
      method: "Cash",
      status: "completed",
      date: "2024-01-15T12:00:00Z",
    },
    {
      id: 4,
      type: "payment",
      guest: "David Brown",
      room: "102",
      amount: 320.0,
      method: "Credit Card",
      status: "pending",
      date: "2024-01-15T11:30:00Z",
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      guest: "Alice Smith",
      room: "101",
      amount: 360.0,
      status: "paid",
      dueDate: "2024-01-18",
      issueDate: "2024-01-15",
    },
    {
      id: "INV-002",
      guest: "Bob Johnson",
      room: "205",
      amount: 480.0,
      status: "overdue",
      dueDate: "2024-01-14",
      issueDate: "2024-01-11",
    },
    {
      id: "INV-003",
      guest: "Carol Williams",
      room: "301",
      amount: 540.0,
      status: "pending",
      dueDate: "2024-01-20",
      issueDate: "2024-01-17",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "refund":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      case "processed":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Overview</h2>
          <p className="text-muted-foreground">Revenue tracking, payments, and financial analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Manual Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Record Manual Payment</DialogTitle>
                <DialogDescription>Add a cash or manual payment to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="guest" className="text-right">
                    Guest
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select guest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Smith</SelectItem>
                      <SelectItem value="bob">Bob Johnson</SelectItem>
                      <SelectItem value="carol">Carol Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input id="amount" type="number" placeholder="0.00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="method" className="text-right">
                    Method
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Record Payment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialMetrics.todayRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialMetrics.averageDailyRate}</div>
            <p className="text-xs text-muted-foreground">Per occupied room</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialMetrics.revPAR}</div>
            <p className="text-xs text-muted-foreground">Revenue per available room</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialMetrics.pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting collection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Revenue Streams */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
                <CardDescription>Breakdown by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{stream.source}</span>
                          <span className="text-sm text-muted-foreground">{stream.percentage}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${stream.amount.toLocaleString()}</span>
                          <span
                            className={`text-sm flex items-center gap-1 ${
                              stream.change > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stream.change > 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {Math.abs(stream.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Key financial metrics for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold">${financialMetrics.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Total Bookings</p>
                      <p className="text-2xl font-bold">{financialMetrics.totalBookings}</p>
                    </div>
                    <Receipt className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Occupancy Rate</p>
                      <p className="text-2xl font-bold">{financialMetrics.occupancyRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payment activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTransactionIcon(transaction.type)}
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.guest}</TableCell>
                      <TableCell>{transaction.room}</TableCell>
                      <TableCell className={transaction.amount < 0 ? "text-red-600" : "text-green-600"}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Manage guest invoices and billing</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.guest}</TableCell>
                      <TableCell>{invoice.room}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Send
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
