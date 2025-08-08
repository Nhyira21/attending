"use client"

import * as React from "react"
import { Search, Filter, Download, UserCheck, UserX, Clock, MoreHorizontal, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const studentsData = [
  {
    id: 1,
    name: "Emma Johnson",
    studentId: "STU001",
    grade: "10A",
    email: "emma.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    attendanceRate: 95.2,
    totalClasses: 42,
    present: 40,
    absent: 2,
    late: 0,
    status: "excellent",
    lastAttendance: "2024-11-08",
    avatar: "/student1.png"
  },
  {
    id: 2,
    name: "Michael Chen",
    studentId: "STU002",
    grade: "11B",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    attendanceRate: 88.1,
    totalClasses: 42,
    present: 37,
    absent: 4,
    late: 1,
    status: "good",
    lastAttendance: "2024-11-08",
    avatar: "/student2.png"
  },
  {
    id: 3,
    name: "Sarah Williams",
    studentId: "STU003",
    grade: "10B",
    email: "sarah.williams@school.edu",
    phone: "+1 (555) 345-6789",
    attendanceRate: 76.2,
    totalClasses: 42,
    present: 32,
    absent: 8,
    late: 2,
    status: "average",
    lastAttendance: "2024-11-07",
    avatar: "/student3.png"
  },
  {
    id: 4,
    name: "David Rodriguez",
    studentId: "STU004",
    grade: "9A",
    email: "david.rodriguez@school.edu",
    phone: "+1 (555) 456-7890",
    attendanceRate: 92.9,
    totalClasses: 42,
    present: 39,
    absent: 2,
    late: 1,
    status: "excellent",
    lastAttendance: "2024-11-08",
    avatar: "/student4.png"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    studentId: "STU005",
    grade: "10A",
    email: "lisa.thompson@school.edu",
    phone: "+1 (555) 567-8901",
    attendanceRate: 64.3,
    totalClasses: 42,
    present: 27,
    absent: 12,
    late: 3,
    status: "concern",
    lastAttendance: "2024-11-06",
    avatar: "/student5.png"
  }
]

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterGrade, setFilterGrade] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade
    const matchesStatus = filterStatus === "all" || student.status === filterStatus
    
    return matchesSearch && matchesGrade && matchesStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student information and attendance records</p>
        </div>
        <Button 
          className="bg-[#2563eb] hover:bg-[#1d4ed8]"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'Reports' }))}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">171</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">149</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">22</p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late Today</p>
                <p className="text-2xl font-bold text-yellow-600">5</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search students by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9A">Grade 9A</SelectItem>
                <SelectItem value="10A">Grade 10A</SelectItem>
                <SelectItem value="10B">Grade 10B</SelectItem>
                <SelectItem value="11B">Grade 11B</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="concern">Needs Attention</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Student Records ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Present/Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{student.attendanceRate}%</span>
                      <div className={`h-2 w-16 rounded-full ${
                        student.attendanceRate >= 90 ? 'bg-green-200' :
                        student.attendanceRate >= 75 ? 'bg-yellow-200' : 'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            student.attendanceRate >= 90 ? 'bg-green-500' :
                            student.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.attendanceRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{student.present}/{student.totalClasses}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      student.status === 'excellent' ? 'default' :
                      student.status === 'good' ? 'secondary' :
                      student.status === 'average' ? 'outline' : 'destructive'
                    }>
                      {student.status === 'excellent' ? 'Excellent' :
                       student.status === 'good' ? 'Good' :
                       student.status === 'average' ? 'Average' : 'Needs Attention'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {student.lastAttendance}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Contact Parent
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
    </div>
  )
}
