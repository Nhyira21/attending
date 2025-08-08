"use client"

import * as React from "react"
import { Calendar, Download, Filter, Search, ChevronLeft, ChevronRight, FileDown, Users, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const attendanceRecords = [
  {
    id: 1,
    date: "2024-11-08",
    class: "Mathematics 10A",
    period: "Period 3",
    time: "10:30 AM - 11:15 AM",
    totalStudents: 28,
    present: 26,
    absent: 2,
    late: 0,
    attendanceRate: 92.9,
    markedBy: "Ms. Johnson",
    markedAt: "10:35 AM"
  },
  {
    id: 2,
    date: "2024-11-08",
    class: "Chemistry 10B",
    period: "Period 6",
    time: "1:00 PM - 1:45 PM",
    totalStudents: 30,
    present: 25,
    absent: 4,
    late: 1,
    attendanceRate: 83.3,
    markedBy: "Ms. Johnson",
    markedAt: "1:05 PM"
  },
  {
    id: 3,
    date: "2024-11-07",
    class: "Physics 11B",
    period: "Period 7",
    time: "2:00 PM - 2:45 PM",
    totalStudents: 25,
    present: 22,
    absent: 2,
    late: 1,
    attendanceRate: 88.0,
    markedBy: "Ms. Johnson",
    markedAt: "2:03 PM"
  },
  {
    id: 4,
    date: "2024-11-07",
    class: "Mathematics 9A",
    period: "Period 2",
    time: "9:00 AM - 9:45 AM",
    totalStudents: 32,
    present: 25,
    absent: 6,
    late: 1,
    attendanceRate: 78.1,
    markedBy: "Ms. Johnson",
    markedAt: "9:05 AM"
  },
  {
    id: 5,
    date: "2024-11-06",
    class: "Physics 10A",
    period: "Period 4",
    time: "11:30 AM - 12:15 PM",
    totalStudents: 27,
    present: 20,
    absent: 5,
    late: 2,
    attendanceRate: 74.1,
    markedBy: "Ms. Johnson",
    markedAt: "11:35 AM"
  },
  {
    id: 6,
    date: "2024-11-06",
    class: "Chemistry 9B",
    period: "Period 8",
    time: "3:00 PM - 3:45 PM",
    totalStudents: 29,
    present: 19,
    absent: 8,
    late: 2,
    attendanceRate: 65.5,
    markedBy: "Ms. Johnson",
    markedAt: "3:08 PM"
  }
]

// Sample student data for CSV generation
const generateStudentData = (className: string) => {
// const response = await fetch('http://localhost:5000/api/base-students')
// const data = await response.json()

  const baseStudents = [
    { name: "Emma Johnson", studentId: "STU001", grade: "10A", attendanceRate: 95.2, present: 40, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Michael Chen", studentId: "STU002", grade: "10A", attendanceRate: 88.1, present: 37, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Sarah Williams", studentId: "STU003", grade: "10A", attendanceRate: 76.2, present: 32, total: 42, status: "average", lastAttendance: "2024-11-07" },
    { name: "David Brown", studentId: "STU004", grade: "10A", attendanceRate: 92.8, present: 39, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Jessica Lee", studentId: "STU005", grade: "10A", attendanceRate: 85.7, present: 36, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Robert Wilson", studentId: "STU006", grade: "10A", attendanceRate: 71.4, present: 30, total: 42, status: "average", lastAttendance: "2024-11-06" },
    { name: "Amanda Davis", studentId: "STU007", grade: "10A", attendanceRate: 97.6, present: 41, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "James Martinez", studentId: "STU008", grade: "10A", attendanceRate: 81.0, present: 34, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Lauren Garcia", studentId: "STU009", grade: "10A", attendanceRate: 90.5, present: 38, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Ryan Rodriguez", studentId: "STU010", grade: "10A", attendanceRate: 78.6, present: 33, total: 42, status: "average", lastAttendance: "2024-11-07" },
    { name: "Ashley Anderson", studentId: "STU011", grade: "10A", attendanceRate: 94.0, present: 39, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Christopher Taylor", studentId: "STU012", grade: "10A", attendanceRate: 83.3, present: 35, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Nicole Thomas", studentId: "STU013", grade: "10A", attendanceRate: 88.1, present: 37, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Kevin Johnson", studentId: "STU014", grade: "10A", attendanceRate: 73.8, present: 31, total: 42, status: "average", lastAttendance: "2024-11-06" },
    { name: "Stephanie White", studentId: "STU015", grade: "10A", attendanceRate: 91.7, present: 38, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Daniel Harris", studentId: "STU016", grade: "10A", attendanceRate: 86.9, present: 36, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Michelle Clark", studentId: "STU017", grade: "10A", attendanceRate: 79.8, present: 33, total: 42, status: "average", lastAttendance: "2024-11-07" },
    { name: "Matthew Lewis", studentId: "STU018", grade: "10A", attendanceRate: 95.2, present: 40, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Kimberly Robinson", studentId: "STU019", grade: "10A", attendanceRate: 82.1, present: 34, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Andrew Walker", studentId: "STU020", grade: "10A", attendanceRate: 77.4, present: 32, total: 42, status: "average", lastAttendance: "2024-11-07" },
    { name: "Rebecca Hall", studentId: "STU021", grade: "10A", attendanceRate: 93.3, present: 39, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Joshua Allen", studentId: "STU022", grade: "10A", attendanceRate: 84.5, present: 35, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Samantha Young", studentId: "STU023", grade: "10A", attendanceRate: 89.3, present: 37, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Tyler King", studentId: "STU024", grade: "10A", attendanceRate: 75.0, present: 31, total: 42, status: "average", lastAttendance: "2024-11-06" },
    { name: "Brittany Wright", studentId: "STU025", grade: "10A", attendanceRate: 96.4, present: 40, total: 42, status: "excellent", lastAttendance: "2024-11-08" },
    { name: "Brandon Lopez", studentId: "STU026", grade: "10A", attendanceRate: 80.9, present: 34, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Megan Hill", studentId: "STU027", grade: "10A", attendanceRate: 87.2, present: 36, total: 42, status: "good", lastAttendance: "2024-11-08" },
    { name: "Justin Green", studentId: "STU028", grade: "10A", attendanceRate: 91.7, present: 38, total: 42, status: "excellent", lastAttendance: "2024-11-08" }
  ]
  
  // Filter students based on class name and adjust grade if needed
  return baseStudents.map(student => ({
    ...student,
    grade: className.includes("11") ? "11B" : className.includes("9") ? "9A" : "10A"
  }))
}

export function AttendanceRecordsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterClass, setFilterClass] = React.useState("all")
  const [filterDate, setFilterDate] = React.useState("all")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedRecord, setSelectedRecord] = React.useState<any>(null)

  const handleRowClick = (record: any) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  const downloadCSV = () => {
    if (!selectedRecord) return

    const students = generateStudentData(selectedRecord.class)
    const csvHeaders = ["Student", "Grade", "Attendance Rate", "Present/Total", "Status", "Last Attendance"]
    
    const csvContent = [
      csvHeaders.join(","),
      ...students.map(student => [
        `"${student.name}"`,
        `"${student.grade}"`,
        `"${student.attendanceRate}%"`,
        `"${student.present}/${student.total}"`,
        `"${student.status}"`,
        `"${student.lastAttendance}"`
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${selectedRecord.class}_Students_${selectedRecord.date}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass === "all" || record.class.includes(filterClass)
    const matchesDate = filterDate === "all" || record.date === filterDate
    
    return matchesSearch && matchesClass && matchesDate
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
          <p className="text-gray-600">View and manage historical attendance data</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'Calendar' }))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button 
            className="bg-[#2563eb] hover:bg-[#1d4ed8]"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'Reports' }))}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Records
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">83.6%</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Classes Marked</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by class name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="2024-11-08">Nov 8, 2024</SelectItem>
                <SelectItem value="2024-11-07">Nov 7, 2024</SelectItem>
                <SelectItem value="2024-11-06">Nov 6, 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance Records ({filteredRecords.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">Page 1 of 5</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Present/Total</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Marked By</TableHead>
                <TableHead>Marked At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow 
                  key={record.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(record)}
                >
                  <TableCell className="font-medium">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{record.class}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.period}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {record.time}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-green-600">{record.present}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-600">{record.totalStudents}</span>
                    </div>
                    {record.absent > 0 && (
                      <p className="text-xs text-red-600">{record.absent} absent</p>
                    )}
                    {record.late > 0 && (
                      <p className="text-xs text-yellow-600">{record.late} late</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${
                        record.attendanceRate >= 90 ? 'text-green-600' :
                        record.attendanceRate >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {record.attendanceRate}%
                      </span>
                      <div className={`h-2 w-12 rounded-full ${
                        record.attendanceRate >= 90 ? 'bg-green-200' :
                        record.attendanceRate >= 75 ? 'bg-yellow-200' : 'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            record.attendanceRate >= 90 ? 'bg-green-500' :
                            record.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${record.attendanceRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {record.markedBy}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {record.markedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Download Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2563eb]" />
              Class Student Data
            </DialogTitle>
            <DialogDescription>
              Download student attendance data for {selectedRecord?.class}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedRecord?.class}</h3>
                  <p className="text-sm text-gray-600">{selectedRecord?.period} • {selectedRecord?.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">
                    {selectedRecord && new Date(selectedRecord.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Students</p>
                  <p className="font-medium">{selectedRecord?.totalStudents}</p>
                </div>
                <div>
                  <p className="text-gray-500">Present</p>
                  <p className="font-medium text-green-600">{selectedRecord?.present}</p>
                </div>
                <div>
                  <p className="text-gray-500">Attendance Rate</p>
                  <p className="font-medium text-[#2563eb]">{selectedRecord?.attendanceRate}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FileDown className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">CSV Export Includes:</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Student Name & ID</li>
                    <li>• Grade & Attendance Rate</li>
                    <li>• Present/Total Classes</li>
                    <li>• Status & Last Attendance</li>
                  </ul>
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
