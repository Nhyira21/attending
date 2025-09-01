"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Download, Calendar, TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const weeklyAttendanceData = [
  { day: 'Mon', attendance: 87.2, students: 149 },
  { day: 'Tue', attendance: 89.1, students: 152 },
  { day: 'Wed', attendance: 85.3, students: 146 },
  { day: 'Thu', attendance: 91.4, students: 156 },
  { day: 'Fri', attendance: 83.7, students: 143 },
]

const monthlyTrendData = [
  { month: 'Sep', rate: 85.2 },
  { month: 'Oct', rate: 87.8 },
  { month: 'Nov', rate: 84.6 },
]

const classDistributionData = [
  { name: 'Homiletics', value: 30, color: '#ef4444' },
  { name: 'Hermeneutics', value: 27, color: '#3b82f6' },
  { name: 'Christian Leadership', value: 32, color: '#f59e0b' },
  { name: 'Systematic Theology', value: 29, color: '#10b981' },
  { name: 'Ministerial Ethics', value: 25, color: '#8b5cf6' },
  { name: 'Apostolic Mandate', value: 28, color: '#f97316' },
  { name: 'Pastoral Care & Counselling', value: 31, color: '#14b8a6' },
]

const absenteeismData = [
  { class: 'Homiletics Y1', rate: 6.7 },
  { class: 'Hermeneutics Y2', rate: 11.1 },
  { class: 'Christian Leadership Y1', rate: 18.7 },
  { class: 'Systematic Theology Y2', rate: 24.1 },
  { class: 'Ministerial Ethics Y3', rate: 28.0 },
  { class: 'Apostolic Mandate Y3', rate: 39.3 },
  { class: 'Pastoral Care & Counselling Y4', rate: 38.7 },
]


export function ReportsPage() {
  const [reportPeriod, setReportPeriod] = React.useState("this-month")
  const [reportType, setReportType] = React.useState("overview")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive attendance insights and trends</p>
        </div>
        <div className="flex space-x-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-semester">This Semester</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-[#2563eb] hover:bg-[#1d4ed8]"
            onClick={() => alert('Report exported successfully!')}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900">87.2%</p>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Daily Present</p>
                <p className="text-2xl font-bold text-gray-900">149</p>
                <p className="text-xs text-green-600">+3 from last month</p>
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
                <p className="text-sm text-gray-600">Chronic Absenteeism</p>
                <p className="text-2xl font-bold text-gray-900">8.2%</p>
                <p className="text-xs text-red-600">+0.5% from last month</p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Late Arrivals</p>
                <p className="text-2xl font-bold text-gray-900">5.3</p>
                <p className="text-xs text-yellow-600">-1.2 from last month</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Attendance Trend */}
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                attendance: {
                  label: "Attendance Rate",
                  color: "#2563eb",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: {
                  label: "Attendance Rate",
                  color: "#059669",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="var(--color-rate)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-rate)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mathematics: { label: "Mathematics", color: "#2563eb" },
                physics: { label: "Physics", color: "#7c3aed" },
                chemistry: { label: "Chemistry", color: "#059669" },
                others: { label: "Others", color: "#dc2626" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {classDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Absenteeism by Class */}
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Absenteeism Rate by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: {
                  label: "Absenteeism Rate",
                  color: "#dc2626",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={absenteeismData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="class" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill="var(--color-rate)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Positive Trends</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Overall attendance improved by 2.1% this month</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Thursday shows consistently highest attendance (91.4%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Late arrivals decreased by 1.2 students per day</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2"></div>
                  <span>Chemistry 9B has concerning absenteeism rate (34.5%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2"></div>
                  <span>Friday attendance consistently lowest (83.7%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2"></div>
                  <span>Chronic absenteeism increased by 0.5%</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
