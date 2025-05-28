"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, Plus, Search, Clock, CheckCircle, AlertTriangle, Package, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function Housekeeping() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const tasks = [
    {
      id: 1,
      room: "101",
      type: "cleaning",
      priority: "medium",
      status: "pending",
      assignedTo: "Maria Garcia",
      description: "Standard room cleaning after checkout",
      estimatedTime: 45,
      createdAt: "2024-01-15T09:00:00Z",
    },
    {
      id: 2,
      room: "201",
      type: "maintenance",
      priority: "high",
      status: "in_progress",
      assignedTo: "John Smith",
      description: "Fix leaking faucet in bathroom",
      estimatedTime: 120,
      createdAt: "2024-01-15T08:30:00Z",
    },
    {
      id: 3,
      room: "103",
      type: "inspection",
      priority: "low",
      status: "completed",
      assignedTo: "Maria Garcia",
      description: "Pre-arrival room inspection",
      estimatedTime: 30,
      createdAt: "2024-01-15T07:00:00Z",
    },
    {
      id: 4,
      room: "205",
      type: "restocking",
      priority: "medium",
      status: "pending",
      assignedTo: "Sarah Johnson",
      description: "Restock minibar and amenities",
      estimatedTime: 20,
      createdAt: "2024-01-15T10:00:00Z",
    },
  ]

  const inventory = [
    {
      id: 1,
      name: "Towels",
      category: "Linens",
      currentStock: 150,
      minStock: 50,
      unit: "pieces",
      status: "good",
    },
    {
      id: 2,
      name: "Bed Sheets",
      category: "Linens",
      currentStock: 45,
      minStock: 75,
      unit: "sets",
      status: "low",
    },
    {
      id: 3,
      name: "Toilet Paper",
      category: "Bathroom",
      currentStock: 300,
      minStock: 100,
      unit: "rolls",
      status: "good",
    },
    {
      id: 4,
      name: "Shampoo",
      category: "Bathroom",
      currentStock: 15,
      minStock: 25,
      unit: "bottles",
      status: "critical",
    },
  ]

  const staff = [
    { id: 1, name: "Maria Garcia", role: "Housekeeper", status: "available", tasksToday: 3 },
    { id: 2, name: "John Smith", role: "Maintenance", status: "busy", tasksToday: 2 },
    { id: 3, name: "Sarah Johnson", role: "Housekeeper", status: "available", tasksToday: 4 },
  ]

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100
    if (percentage <= 50) return "critical"
    if (percentage <= 100) return "low"
    return "good"
  }

  const getStockColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600"
      case "low":
        return "text-orange-600"
      case "good":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Housekeeping Management</h2>
          <p className="text-muted-foreground">Manage cleaning tasks, maintenance, and inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Assign a new housekeeping task.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="type" className="text-right">
                  Task Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="restocking">Restocking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Assign To
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" placeholder="Task details..." className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Housekeeping Tasks
              </CardTitle>
              <CardDescription>Current and pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {tasks
                  .filter(
                    (task) =>
                      task.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      task.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {task.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : task.priority === "high" ? (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            Room {task.room} - {task.type}
                          </p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.estimatedTime} min
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <Badge variant={getTaskStatusColor(task.status)}>{task.status.replace("_", " ")}</Badge>
                        {task.status !== "completed" && (
                          <Button size="sm" variant="outline">
                            Update
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Management
              </CardTitle>
              <CardDescription>Track supplies and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => {
                  const stockPercentage = (item.currentStock / item.minStock) * 100
                  const status = getStockStatus(item.currentStock, item.minStock)

                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-muted-foreground">
                              {item.currentStock} {item.unit} available
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Min: {item.minStock} {item.unit}
                            </p>
                          </div>
                          <div className="mt-2">
                            <Progress value={Math.min(stockPercentage, 100)} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={status === "critical" ? "destructive" : status === "low" ? "secondary" : "default"}
                          className={getStockColor(status)}
                        >
                          {status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Restock
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Management
              </CardTitle>
              <CardDescription>Current staff status and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.tasksToday} tasks today</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.status === "available" ? "default" : "secondary"}>{member.status}</Badge>
                      <Button size="sm" variant="outline">
                        Assign Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
