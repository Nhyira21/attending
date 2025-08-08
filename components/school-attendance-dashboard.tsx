"use client"

import * as React from "react"
import { BarChart3, Calendar, ClipboardList, Home, MessageCircle, FileText, Users, Settings, ExternalLink, ArrowRight, Clock, UserCheck, AlertTriangle, TrendingUp, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Add imports for all the new page components at the top
import { MyClassesPage } from "./my-classes-page"
import { StudentsPage } from "./students-page"
import { AttendanceRecordsPage } from "./attendance-records-page"
import { ReportsPage } from "./reports-page"
import { CalendarPage } from "./calendar-page"

const navigationItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "My Classes", icon: Users, active: false },
  { label: "Students", icon: UserCheck, active: false },
  { label: "Attendance Records", icon: ClipboardList, active: false },
  { label: "Reports", icon: FileText, active: false },
  { label: "Calendar", icon: Calendar, active: false },
  { label: "Messages", icon: MessageCircle, active: false },
  { label: "Settings", icon: Settings, active: false },
]

const classPerformanceData = [
  { position: 1, name: "Mathematics 10A", students: 28, present: 26, rate: 92.9, status: "excellent" },
  { position: 2, name: "Physics 11B", students: 25, present: 22, rate: 88.0, status: "good" },
  { position: 3, name: "Chemistry 10B", students: 30, present: 25, rate: 83.3, status: "good" },
  { position: 4, name: "Mathematics 9A", students: 32, present: 25, rate: 78.1, status: "average" },
  { position: 5, name: "Physics 10A", students: 27, present: 20, rate: 74.1, status: "average" },
  { position: 6, name: "Chemistry 9B", students: 29, present: 19, rate: 65.5, status: "concern" },
]

const metricsData = [
  { title: "Overall Attendance", value: "87.2%", icon: TrendingUp, trend: "+2.1%" },
  { title: "Total Students", value: "171", icon: Users, trend: "+3" },
  { title: "Classes Today", value: "6", icon: Clock, trend: "0" },
  { title: "Absent Students", value: "22", icon: AlertTriangle, trend: "-5" },
]

function AppSidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) {
  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">EduTrack</h2>
              <p className="text-sm text-gray-600">Attendance System</p>
            </div>
            <SidebarMenu className="space-y-2 p-4">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={activePage === item.label}
                    className={`w-full justify-start rounded-xl px-4 py-3 text-sm font-medium transition-all ${activePage === item.label
                        ? "bg-[#2563eb] text-white shadow-lg"
                        : "text-gray-600 hover:bg-[#f1f5f9] hover:text-[#2563eb]"
                      }`}
                  >
                    <button
                      onClick={() => setActivePage(item.label)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * ISSUE EXPLANATION:
 * The modal (Dialog) for scanning QR codes was not opening as expected when clicking the "Mark Attendance" button or the card background because:
 * - The DialogTrigger component expects a single child and only opens the modal if that child is directly clicked.
 * - If you call setIsQRModalOpen from a button inside the child, it does not open the modal unless the DialogTrigger is clicked.
 * - This causes confusion and inconsistent modal opening behavior.
 * 
 * SOLUTION:
 * - Remove DialogTrigger entirely.
 * - Control the Dialog's open state directly via a boolean (isQRModalOpen) and setIsQRModalOpen.
 * - Pass setIsQRModalOpen and handleMarkAttendance to NextClassCard.
 * - When the card or the Mark Attendance button is clicked, call setIsQRModalOpen(true) (after any logic).
 * - This ensures the modal opens reliably from both the card and the button.
 */

function NextClassCard({
  setActivePage,
  onOpenQRModal,
}: {
  setActivePage: (page: string) => void,
  onOpenQRModal: () => void,
}) {
  const [nextClass, setNextClass] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch('/api/events');
        const events = await res.json();

        // Get today's date in YYYY-MM-DD
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);

        // Filter for today's classes only
        const todaysClasses = events.filter(
          (e: any) =>
            e.type === "class" &&
            e.date === todayStr
        );

        // Parse event start/end times and find the next class
        const nowMinutes =
          now.getHours() * 60 + now.getMinutes();

        // Helper to parse "10:30 AM - 11:15 AM"
        function parseTimeRange(timeRange: string) {
          const [start, end] = timeRange.split(" - ");
          function toMinutes(t: string) {
            const [time, ampm] = t.split(" ");
            let [h, m] = time.split(":").map(Number);
            if (ampm === "PM" && h !== 12) h += 12;
            if (ampm === "AM" && h === 12) h = 0;
            return h * 60 + m;
          }
          return {
            start: toMinutes(start),
            end: toMinutes(end),
          };
        }

        // Find the next class (start time >= now)
        const upcoming = todaysClasses
          .map((e: any) => ({
            ...e,
            ...parseTimeRange(e.time),
          }))
          .filter((e: any) => e.end >= nowMinutes)
          .sort((a: any, b: any) => a.start - b.start);

        setNextClass(upcoming.length > 0 ? upcoming[0] : null);
      } catch (err) {
        setNextClass(null);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Card className="lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg flex items-center justify-center min-h-[180px]">
        <span className="text-gray-500">Loading next class...</span>
      </Card>
    );
  }

  if (!nextClass) {
    return (
      <Card className="lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg flex items-center justify-center min-h-[180px]">
        <span className="text-gray-500">No more classes scheduled for today.</span>
      </Card>
    );
  }

  // Determine if attendance can be marked (current time within class time)
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const canMarkAttendance = nowMinutes >= nextClass.start && nowMinutes <= nextClass.end;

  // Card click handler: always open modal (regardless of canMarkAttendance)
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening if clicking the Mark Attendance button or its children
    if (
      (e.target as HTMLElement).closest("button[data-mark-attendance]")
    ) {
      return;
    }
    onOpenQRModal();
  };

  // Mark Attendance button click handler: always open modal (regardless of canMarkAttendance)
  const handleMarkAttendanceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenQRModal();
  };

  return (
    <Card
      className={`lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-disabled={false}
      style={{ outline: "none" }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Next Class</CardTitle>
            <p className="text-sm text-gray-600">
              {nextClass.title}, {nextClass.time}, {nextClass.room}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#2563eb] hover:bg-[#f1f5f9]"
            onClick={(e) => {
              e.stopPropagation()
              setActivePage('Calendar')
            }}
          >
            View Schedule <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {nextClass.title.match(/\d+[A-Z]/) ? nextClass.title.match(/\d+[A-Z]/)[0] : "Class"}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {nextClass.title.replace(/\d+[A-Z]/, '').trim()}
                </h3>
                <p className="text-sm text-gray-600">
                  {nextClass.title.match(/\d+/) ? `Grade ${nextClass.title.match(/\d+/)[0]}` : ""}
                  {nextClass.title.match(/[A-Z]$/) ? ` - Section ${nextClass.title.match(/[A-Z]$/)[0]}` : ""}
                </p>
                <p className="text-sm text-gray-500">
                  {nextClass.students != null ? `${nextClass.students} students enrolled` : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Button
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              data-mark-attendance
              onClick={handleMarkAttendanceClick}
              // No longer disabling the button
            >
              <QrCode className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              {/* This could be dynamic if you track last attendance */}
              Last marked: Nov 8, 2024
            </p>
            {(() => {
              if (nowMinutes < nextClass.start) {
                return (
                  <p className="text-xs text-yellow-600 mt-1">
                    Attendance can be marked from {nextClass.time.split(" - ")[0]}
                  </p>
                );
              }
              if (nowMinutes > nextClass.end) {
                return (
                  <p className="text-xs text-red-500 mt-1">
                    This class session has ended.
                  </p>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SchoolAttendanceDashboard() {
  const [activePage, setActivePage] = React.useState("Dashboard")
  const [isQRModalOpen, setIsQRModalOpen] = React.useState(false)
  const [qrCodeData, setQrCodeData] = React.useState("")

  // Add event listener for cross-page navigation
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActivePage(event.detail)
    }

    window.addEventListener('navigate', handleNavigate as EventListener)
    return () => window.removeEventListener('navigate', handleNavigate as EventListener)
  }, [])

  // This function is called when the card or Mark Attendance button is clicked
  const handleOpenQRModal = () => {
    // Generate unique QR code data for this class session
    const sessionData = "https://docs.google.com/forms/d/e/1FAIpQLSdEzTyTJ1849Z4nBSTZCnF1YF4NeQpM1EsMhSCvdzN120UnVQ/viewform?usp=dialog"
    setQrCodeData(JSON.stringify(sessionData))
    setIsQRModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <SidebarProvider>
        <AppSidebar activePage={activePage} setActivePage={setActivePage} />
        <SidebarInset>
          {activePage === "Dashboard" && (
            <div className="flex-1 space-y-6 p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, Ms. Johnson👋</h1>
                  <p className="text-gray-600">Monday, November 11, 2024</p>
                </div>
                <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                  <AvatarImage src="/teacher-profile.png" alt="Ms. Johnson" />
                  <AvatarFallback className="bg-[#2563eb] text-white">MJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Next Class */}
                <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-[#2563eb]" />
                        Scan QR Code for Attendance
                      </DialogTitle>
                      <DialogDescription>
                        Students should scan this QR code with their mobile devices to mark their attendance for Mathematics 10A.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                        <QRCodeSVG
                          value={qrCodeData}
                          size={200}
                          level="M"
                          includeMargin={true}
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-900">Mathematics 10A</p>
                        <p className="text-xs text-gray-500">Session ID: {qrCodeData ? JSON.parse(qrCodeData).sessionId : ''}</p>
                        <p className="text-xs text-gray-500">Valid until: {new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString()}</p>
                      </div>
                      <div className="flex gap-2 w-full">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsQRModalOpen(false)}
                        >
                          Close
                        </Button>
                        <Button
                          className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]"
                          onClick={() => {
                            // Here you would typically send the attendance data to your backend
                            console.log('Attendance session ended')
                            setIsQRModalOpen(false)
                          }}
                        >
                          End Session
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                  {/* NextClassCard is outside DialogTrigger, and controls modal open state directly */}
                  <NextClassCard setActivePage={setActivePage} onOpenQRModal={handleOpenQRModal} />
                </Dialog>

                {/* Today's Attendance Summary */}
                <Card className="rounded-2xl border-0 bg-white shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900">Today's Summary</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#2563eb] hover:bg-[#f1f5f9]"
                        onClick={() => setActivePage('Students')}
                      >
                        View Details <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">149</div>
                        <div className="text-xs text-gray-600">Present</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">22</div>
                        <div className="text-xs text-gray-600">Absent</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">5</div>
                        <div className="text-xs text-gray-600">Late</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex h-3 overflow-hidden rounded-full bg-gray-200">
                        <div className="bg-green-500 w-[84.7%]"></div>
                        <div className="bg-red-500 w-[12.5%]"></div>
                        <div className="bg-yellow-500 w-[2.8%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>176 total students</span>
                        <span>84.7% attendance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Class Performance */}
                <Card className="lg:col-span-2 rounded-2xl border-0 bg-white shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900">Class Attendance Performance</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#2563eb] hover:bg-[#f1f5f9]"
                        onClick={() => setActivePage('My Classes')}
                      >
                        View All Classes <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-xs font-semibold text-gray-600">CLASS</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 text-center">STUDENTS</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 text-center">PRESENT</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 text-center">RATE</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 text-center">STATUS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classPerformanceData.map((classData) => (
                          <TableRow key={classData.position} className="border-gray-100">
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${classData.position === 1 ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                  {classData.position}
                                </span>
                                <span className="text-gray-900">{classData.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center text-gray-600">{classData.students}</TableCell>
                            <TableCell className="text-center text-gray-600">{classData.present}</TableCell>
                            <TableCell className="text-center font-semibold text-gray-900">{classData.rate}%</TableCell>
                            <TableCell className="text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classData.status === 'excellent' ? 'bg-green-100 text-green-800' :
                                  classData.status === 'good' ? 'bg-blue-100 text-blue-800' :
                                    classData.status === 'average' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                }`}>
                                {classData.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Metrics Cards */}
                <div className="space-y-4">
                  {metricsData.map((metric, index) => (
                    <Card key={index} className="rounded-2xl border-0 bg-white shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <p className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-600' :
                                metric.trend.startsWith('-') ? 'text-red-600' : 'text-gray-500'
                              }`}>
                              {metric.trend !== "0" && `${metric.trend} from last week`}
                            </p>
                          </div>
                          <div className="rounded-full bg-[#dbeafe] p-3">
                            <metric.icon className="h-6 w-6 text-[#2563eb]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reminder Banner */}
              <Card className="rounded-2xl border-0 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Follow up with absent students</h3>
                      <p className="text-sm text-white/80">5 students have been absent for more than 2 consecutive days</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:flex space-x-2">
                        <div className="h-8 w-8 rounded-full bg-white/20"></div>
                        <div className="h-6 w-6 rounded-full bg-white/30"></div>
                        <div className="h-4 w-4 rounded-full bg-white/40"></div>
                      </div>
                      <Button
                        className="bg-white text-[#2563eb] hover:bg-white/90"
                        onClick={() => setActivePage('Students')}
                      >
                        View Absent Students
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activePage === "My Classes" && <MyClassesPage />}
          {activePage === "Students" && <StudentsPage />}
          {activePage === "Attendance Records" && <AttendanceRecordsPage />}
          {activePage === "Reports" && <ReportsPage />}
          {activePage === "Calendar" && <CalendarPage />}
          {activePage === "Messages" && (
            <div className="flex-1 space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                  <p className="text-gray-600">Communication center for students and parents</p>
                </div>
              </div>
              <Card className="rounded-2xl border-0 bg-white shadow-lg">
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages Coming Soon</h3>
                  <p className="text-gray-600">This feature will allow you to communicate with students and parents.</p>
                </CardContent>
              </Card>
            </div>
          )}
          {activePage === "Settings" && (
            <div className="flex-1 space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600">Configure your attendance system preferences</p>
                </div>
              </div>
              <Card className="rounded-2xl border-0 bg-white shadow-lg">
                <CardContent className="p-12 text-center">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Coming Soon</h3>
                  <p className="text-gray-600">This feature will allow you to customize system preferences.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
