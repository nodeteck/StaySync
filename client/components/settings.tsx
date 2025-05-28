"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Hotel, Bell, Shield, Database, Mail, CreditCard, Wifi, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function Settings() {
  const [hotelSettings, setHotelSettings] = useState({
    name: "Grand Hotel",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@grandhotel.com",
    website: "www.grandhotel.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    currency: "USD",
    timezone: "America/New_York",
    taxRate: "8.5",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    maintenanceAlerts: true,
    lowInventoryAlerts: true,
  })

  const [integrations, setIntegrations] = useState({
    paymentGateway: "stripe",
    emailService: "sendgrid",
    smsService: "twilio",
    pmsIntegration: false,
    channelManager: false,
    accountingSoftware: false,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    ipWhitelist: false,
    auditLogging: true,
    dataEncryption: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Configure hotel settings and system preferences</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Hotel Information
              </CardTitle>
              <CardDescription>Basic hotel details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotel-name">Hotel Name</Label>
                  <Input
                    id="hotel-name"
                    value={hotelSettings.name}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={hotelSettings.phone}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={hotelSettings.address}
                  onChange={(e) => setHotelSettings({ ...hotelSettings, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={hotelSettings.email}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={hotelSettings.website}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, website: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operational Settings</CardTitle>
              <CardDescription>Check-in/out times and business preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="check-in">Check-in Time</Label>
                  <Input
                    id="check-in"
                    type="time"
                    value={hotelSettings.checkInTime}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, checkInTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out">Check-out Time</Label>
                  <Input
                    id="check-out"
                    type="time"
                    value={hotelSettings.checkOutTime}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, checkOutTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={hotelSettings.currency}
                    onValueChange={(value) => setHotelSettings({ ...hotelSettings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={hotelSettings.timezone}
                    onValueChange={(value) => setHotelSettings({ ...hotelSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    value={hotelSettings.taxRate}
                    onChange={(e) => setHotelSettings({ ...hotelSettings, taxRate: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Alert Types</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Booking Alerts</Label>
                    <p className="text-sm text-muted-foreground">New reservations and cancellations</p>
                  </div>
                  <Switch
                    checked={notifications.bookingAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, bookingAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">Payment confirmations and failures</p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Room maintenance and housekeeping updates</p>
                  </div>
                  <Switch
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, maintenanceAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">When supplies are running low</p>
                  </div>
                  <Switch
                    checked={notifications.lowInventoryAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, lowInventoryAlerts: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Third-Party Integrations
              </CardTitle>
              <CardDescription>Connect with external services and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Payment Gateway</h4>
                      <p className="text-sm text-muted-foreground">Process credit card payments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={integrations.paymentGateway}
                      onValueChange={(value) => setIntegrations({ ...integrations, paymentGateway: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Email Service</h4>
                      <p className="text-sm text-muted-foreground">Send automated emails to guests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={integrations.emailService}
                      onValueChange={(value) => setIntegrations({ ...integrations, emailService: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="ses">Amazon SES</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">PMS Integration</h4>
                      <p className="text-sm text-muted-foreground">Connect with property management system</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integrations.pmsIntegration}
                      onCheckedChange={(checked) => setIntegrations({ ...integrations, pmsIntegration: checked })}
                    />
                    <Button size="sm" variant="outline">
                      Setup
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Channel Manager</h4>
                      <p className="text-sm text-muted-foreground">Sync with booking platforms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integrations.channelManager}
                      onCheckedChange={(checked) => setIntegrations({ ...integrations, channelManager: checked })}
                    />
                    <Button size="sm" variant="outline">
                      Setup
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Policy</Label>
                    <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Select
                    value={security.passwordPolicy}
                    onValueChange={(value) => setSecurity({ ...security, passwordPolicy: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch
                    checked={security.ipWhitelist}
                    onCheckedChange={(checked) => setSecurity({ ...security, ipWhitelist: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user activities and system events</p>
                  </div>
                  <Switch
                    checked={security.auditLogging}
                    onCheckedChange={(checked) => setSecurity({ ...security, auditLogging: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                  </div>
                  <Switch
                    checked={security.dataEncryption}
                    onCheckedChange={(checked) => setSecurity({ ...security, dataEncryption: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
