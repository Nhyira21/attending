"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


// API endpoint to send the calendarEvents list as JSON
// The endpoint is the GET handler for this file, so its route is `/api/calendar-page` 
// (or whatever route this file is mapped to in your Next.js app).

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const currentDate = new Date(2024, 10, 11) // November 11, 2024
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  room: string;
  students?: number;
  type: string;
  status: string;
}

export  function CalendarPage() {
  const [selectedDate, setSelectedDate] = React.useState(currentDate)
  const [viewMode, setViewMode] = React.useState<'month' | 'week' | 'day'>('week')
  const [calendarEvents, setCalendarEvents] = React.useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    title: '',
    lecturer: '',
    time: { start: '', end: '' },
    room: '',
    date: '',
    status: 'scheduled',
  })

  React.useEffect(() => {
    fetch('https://studlogging.netlify.app/api/events')
      .then(res => res.json())
      .then((data: CalendarEvent[]) => {
      console.log(data);
      setCalendarEvents(data);
      });
  }, []);
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return calendarEvents.filter(event => event.date === dateString);
  }

  const days = getDaysInMonth(selectedDate)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add event');
      setIsModalOpen(false);
      setForm({ title: '', lecturer: '', time: { start: '', end: '' }, room: '', date: '', status: 'scheduled' });
      // Refresh events
      fetch('https://studlogging.netlify.app/api/events')
        .then(res => res.json())
        .then((data: CalendarEvent[]) => setCalendarEvents(data));
    } catch (err) {
      alert('Error adding event');
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Schedule and track your classes</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex rounded-lg border border-gray-200 bg-white">
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('day')}
              className="rounded-r-none"
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
              className="rounded-none"
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
              className="rounded-l-none"
            >
              Month
            </Button>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="lecturer">Lecturer Name</Label>
                  <Input
                    id="lecturer"
                    value={form.lecturer}
                    onChange={e => setForm(f => ({ ...f, lecturer: e.target.value }))}
                    placeholder="Enter lecturer name"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time-start"
                    type="time"
                    value={form.time.start}
                    onChange={e => setForm(f => ({ ...f, time:{ ...f.time, start: e.target.value} }))}
                  />
                  <Input
                    id="time-end"
                    type="time"
                    value={form.time.end}
                    onChange={e => setForm(f => ({
                      ...f,
                      time: {
                        ...f.time,
                        end: e.target.value
                      }
                    }))}
                    />
                </div>
                <div>
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    value={form.room}
                    onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                    placeholder="Enter room"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    title = "status"
                    className="w-full border rounded px-2 py-1"
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <Card className="lg:col-span-3 rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'month' && (
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] border border-gray-100 p-2 ${
                      day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                    } ${
                      day && day.toDateString() === new Date().toDateString() 
                        ? 'bg-blue-50 border-blue-200' 
                        : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(day).slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'class' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {getEventsForDate(day).length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{getEventsForDate(day).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'week' && (
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-4">
                  <div className="text-sm font-semibold text-gray-600">Time</div>
                  {daysOfWeek.slice(1, 6).map(day => (
                    <div key={day} className="text-sm font-semibold text-gray-600 text-center">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Time slots */}
                {Array.from({ length: 9 }, (_, i) => i + 8).map(hour => (
                  <div key={hour} className="grid grid-cols-8 gap-4 border-t border-gray-100 py-2">
                    <div className="text-sm text-gray-500">
                      {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                    </div>
                    {daysOfWeek.slice(1, 6).map((day, dayIndex) => {
                      const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay() + dayIndex + 1)
                      const events = getEventsForDate(currentDay).filter(event => {
                        const eventHour = parseInt(event.time.split(':')[0])
                        return eventHour === hour
                      })
                      
                      return (
                        <div key={day} className="min-h-[60px] relative">
                          {events.map(event => (
                            <div
                              key={event.id}
                              className={`absolute inset-0 p-2 rounded-lg text-xs ${
                                event.type === 'class' 
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}
                            >
                              <div className="font-semibold truncate">{event.title}</div>
                              <div className="text-xs opacity-75">{event.room}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="rounded-2xl border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {calendarEvents
              .filter(event => event.date === currentDate.toISOString().split('T')[0])
              .map(event => (
                <div key={event.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.room}</span>
                      </div>
                      {event.students && (
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{event.students} students</span>
                        </div>
                      )}
                    </div>
                    <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                  {event.type === 'class' && event.status === 'scheduled' && (
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-[#2563eb] hover:bg-[#1d4ed8]"
                      onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'Attendance Records' }))}
                    >
                      Mark Attendance
                    </Button>
                  )}
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
