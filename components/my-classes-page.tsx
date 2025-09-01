"use client"

import * as React from "react"
import { Users, Clock, TrendingUp, TrendingDown, MoreHorizontal, Eye, Edit, Calendar, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const classesData = [
  {
    id: 1,
    name: "Homiletics",
    grade: "Year 1",
    students: 30,
    room: "201",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    attendanceRate: 93.3,
    trend: "up",
    lastClass: "2024-11-08",
    status: "active",
    color: "bg-red-500"
  },
  {
    id: 2,
    name: "Hermeneutics",
    grade: "Year 2",
    students: 27,
    room: "202",
    schedule: "Tue, Thu - 11:00 AM",
    attendanceRate: 88.9,
    trend: "up",
    lastClass: "2024-11-07",
    status: "active",
    color: "bg-indigo-500"
  },
  {
    id: 3,
    name: "Christian Leadership",
    grade: "Year 1",
    students: 32,
    room: "204",
    schedule: "Mon, Wed, Fri - 1:00 PM",
    attendanceRate: 81.3,
    trend: "down",
    lastClass: "2024-11-08",
    status: "active",
    color: "bg-yellow-500"
  },
  {
    id: 4,
    name: "Systematic Theology",
    grade: "Year 2",
    students: 29,
    room: "205",
    schedule: "Tue, Thu - 2:00 PM",
    attendanceRate: 75.9,
    trend: "down",
    lastClass: "2024-11-07",
    status: "active",
    color: "bg-teal-500"
  },
  {
    id: 5,
    name: "Ministerial Ethics",
    grade: "Year 3",
    students: 25,
    room: "206",
    schedule: "Mon, Wed - 10:30 AM",
    attendanceRate: 72.0,
    trend: "down",
    lastClass: "2024-11-08",
    status: "active",
    color: "bg-pink-500"
  },
  {
    id: 6,
    name: "Apostolic Mandate",
    grade: "Year 3",
    students: 28,
    room: "207",
    schedule: "Tue, Thu - 3:30 PM",
    attendanceRate: 60.7,
    trend: "down",
    lastClass: "2024-11-07",
    status: "needs_attention",
    color: "bg-orange-500"
  },
  {
    id: 7,
    name: "Pastoral Care and Counselling",
    grade: "Year 4",
    students: 31,
    room: "208",
    schedule: "Mon, Fri - 12:00 PM",
    attendanceRate: 61.3,
    trend: "down",
    lastClass: "2024-11-08",
    status: "needs_attention",
    color: "bg-green-500"
  }
]

// Sample student data generator (reuse from attendance-records-page)
const generateStudentData = (className: string, grade: string) => {
  const baseStudents = [
    { name: "Emma Johnson", grade, attendanceRate: 95.2, present: 40, total: 42, status: "excellent" },
    { name: "Michael Chen", grade, attendanceRate: 88.1, present: 37, total: 42, status: "good" },
    { name: "Sarah Williams", grade, attendanceRate: 76.2, present: 32, total: 42, status: "average" },
    { name: "David Brown", grade, attendanceRate: 92.8, present: 39, total: 42, status: "excellent" },
    { name: "Jessica Lee", grade, attendanceRate: 85.7, present: 36, total: 42, status: "good" },
    { name: "Robert Wilson", grade, attendanceRate: 71.4, present: 30, total: 42, status: "average" },
    { name: "Amanda Davis", grade, attendanceRate: 97.6, present: 41, total: 42, status: "excellent" },
    { name: "James Martinez", grade, attendanceRate: 81.0, present: 34, total: 42, status: "good" },
    { name: "Lauren Garcia", grade, attendanceRate: 90.5, present: 38, total: 42, status: "excellent" },
    { name: "Ryan Rodriguez", grade, attendanceRate: 78.6, present: 33, total: 42, status: "average" },
    { name: "Ashley Anderson", grade, attendanceRate: 94.0, present: 39, total: 42, status: "excellent" },
    { name: "Christopher Taylor", grade, attendanceRate: 83.3, present: 35, total: 42, status: "good" },
    { name: "Nicole Thomas", grade, attendanceRate: 88.1, present: 37, total: 42, status: "good" },
    { name: "Kevin Johnson", grade, attendanceRate: 73.8, present: 31, total: 42, status: "average" },
    { name: "Stephanie White", grade, attendanceRate: 91.7, present: 38, total: 42, status: "excellent" },
    { name: "Daniel Harris", grade, attendanceRate: 86.9, present: 36, total: 42, status: "good" },
    { name: "Michelle Clark", grade, attendanceRate: 79.8, present: 33, total: 42, status: "average" },
    { name: "Matthew Lewis", grade, attendanceRate: 95.2, present: 40, total: 42, status: "excellent" },
    { name: "Kimberly Robinson", grade, attendanceRate: 82.1, present: 34, total: 42, status: "good" },
    { name: "Andrew Walker", grade, attendanceRate: 77.4, present: 32, total: 42, status: "average" },
    { name: "Rebecca Hall", grade, attendanceRate: 93.3, present: 39, total: 42, status: "excellent" },
    { name: "Joshua Allen", grade, attendanceRate: 84.5, present: 35, total: 42, status: "good" },
    { name: "Samantha Young", grade, attendanceRate: 89.3, present: 37, total: 42, status: "good" },
    { name: "Tyler King", grade, attendanceRate: 75.0, present: 31, total: 42, status: "average" },
    { name: "Brittany Wright", grade, attendanceRate: 96.4, present: 40, total: 42, status: "excellent" },
    { name: "Brandon Lopez", grade, attendanceRate: 80.9, present: 34, total: 42, status: "good" },
    { name: "Megan Hill", grade, attendanceRate: 87.2, present: 36, total: 42, status: "good" },
    { name: "Justin Green", grade, attendanceRate: 91.7, present: 38, total: 42, status: "excellent" }
  ]
  return baseStudents
}

export function MyClassesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedClass, setSelectedClass] = React.useState<any>(null)

  const handleMarkAttendance = (classItem: any) => {
    setSelectedClass(classItem)
    setIsModalOpen(true)
  }

  const downloadCSV = () => {
    if (!selectedClass) return
    const students = generateStudentData(selectedClass.name, selectedClass.grade)
    const csvHeaders = ["Level", "Attendance Rate", "Present/Total", "Status"]
    const csvContent = [
      csvHeaders.join(","),
      ...students.map(student => [
        `"${student.grade}"`,
        `"${student.attendanceRate}%"`,
        `"${student.present}/${student.total}"`,
        `"${student.status}"`
      ].join(","))
    ].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${selectedClass.name}_${selectedClass.grade}_Students.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600">Manage your classes and track attendance</p>
        </div>
        <Button 
          className="bg-[#2563eb] hover:bg-[#1d4ed8]"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'Calendar' }))}
        >
          <Calendar className="mr-2 h-4 w-4" />
          View Schedule
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">171</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">80.3%</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Classes Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classesData.map((classItem) => (
          <Card key={classItem.id} className="rounded-2xl border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-12 w-12 rounded-xl ${classItem.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{classItem.grade}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{classItem.name}</CardTitle>
                    <p className="text-sm text-gray-600">Grade {classItem.grade} • Room {classItem.room}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Students</span>
                <span className="font-semibold text-gray-900">{classItem.students}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Schedule</span>
                <span className="font-medium text-gray-900">{classItem.schedule}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Attendance Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{classItem.attendanceRate}%</span>
                  {classItem.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <Badge variant={classItem.status === "active" ? "default" : "destructive"}>
                  {classItem.status === "active" ? "Active" : "Needs Attention"}
                </Badge>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]"
                  onClick={() => handleMarkAttendance(classItem)}
                >
                  Download Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for CSV download */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2563eb]" />
              Download Student Data
            </DialogTitle>
            <DialogDescription>
              Download the current data of all students for {selectedClass?.name} {selectedClass?.grade}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedClass?.name} {selectedClass?.grade}</h3>
                  <p className="text-sm text-gray-600">Room {selectedClass?.room} • {selectedClass?.schedule}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Students</p>
                  <p className="font-medium">{selectedClass?.students}</p>
                </div>
                <div>
                  <p className="text-gray-500">Attendance Rate</p>
                  <p className="font-medium text-[#2563eb]">{selectedClass?.attendanceRate}%</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]"
                onClick={downloadCSV}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
