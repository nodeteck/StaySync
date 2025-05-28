"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, Shield, Activity, Search, MoreHorizontal, Edit, Trash2, Eye, Clock } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Admin",
      email: "admin@hotel.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T09:30:00Z",
      createdAt: "2023-06-15",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "frontdesk@hotel.com",
      role: "front_desk",
      status: "active",
      lastLogin: "2024-01-15T08:45:00Z",
      createdAt: "2023-08-20",
      permissions: ["reservations", "check_in", "check_out", "payments"],
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "housekeeping@hotel.com",
      role: "housekeeping",
      status: "active",
      lastLogin: "2024-01-15T07:15:00Z",
      createdAt: "2023-09-10",
      permissions: ["housekeeping", "inventory"],
    },
    {
      id: 4,
      name: "David Manager",
      email: "manager@hotel.com",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-14T18:20:00Z",
      createdAt: "2023-05-01",
      permissions: ["reports", "analytics", "user_management"],
    },
    {
      id: 5,
      name: "Lisa Brown",
      email: "lisa@hotel.com",
      role: "front_desk",
      status: "inactive",
      lastLogin: "2024-01-10T16:30:00Z",
      createdAt: "2023-11-15",
      permissions: ["reservations", "check_in"],
    },
  ]

  const roles = [
    {
      name: "admin",
      description: "Full system access",
      permissions: ["all"],
      userCount: 1,
    },
    {
      name: "manager",
      description: "Management and reporting access",
      permissions: ["reports", "analytics", "user_management", "financial"],
      userCount: 1,
    },
    {
      name: "front_desk",
      description: "Front desk operations",
      permissions: ["reservations", "check_in", "check_out", "payments", "guests"],
      userCount: 2,
    },
    {
      name: "housekeeping",
      description: "Housekeeping and maintenance",
      permissions: ["housekeeping", "inventory", "maintenance"],
      userCount: 1,
    },
  ]

  const activityLogs = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "Checked in guest",
      details: "Alice Smith - Room 101",
      timestamp: "2024-01-15T14:30:00Z",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      user: "Maria Garcia",
      action: "Completed housekeeping task",
      details: "Room 103 - Deep cleaning",
      timestamp: "2024-01-15T13:45:00Z",
      ip: "192.168.1.105",
    },
    {
      id: 3,
      user: "John Admin",
      action: "Created new user",
      details: "Added Lisa Brown to front desk role",
      timestamp: "2024-01-15T12:15:00Z",
      ip: "192.168.1.101",
    },
    {
      id: 4,
      user: "David Manager",
      action: "Generated report",
      details: "Monthly occupancy report",
      timestamp: "2024-01-15T11:30:00Z",
      ip: "192.168.1.102",
    },
    {
      id: 5,
      user: "Sarah Johnson",
      action: "Processed payment",
      details: "$360.00 - Credit Card",
      timestamp: "2024-01-15T10:45:00Z",
      ip: "192.168.1.100",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "manager":
        return "default"
      case "front_desk":
        return "secondary"
      case "housekeeping":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary"
  }

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="user@hotel.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front_desk">Front Desk</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="Temporary password" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Accounts
                  </CardTitle>
                  <CardDescription>Manage user accounts and access</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .filter(
                      (user) =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.role.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleColor(user.role)}>{user.role.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {role.name.replace("_", " ").toUpperCase()}
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Permissions:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((permission, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {permission.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit Role
                      </Button>
                      <Button size="sm" variant="outline">
                        View Users
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Logs
              </CardTitle>
              <CardDescription>Recent user activities and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-muted-foreground">{log.details}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatLastLogin(log.timestamp)}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.ip}</TableCell>
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
