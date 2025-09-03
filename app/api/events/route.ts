import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const data: CalendarEvent[] = [
  {
    id: "1",
    title: "Homiletics",
    date: "2025-09-01",
    time: "3:00 PM - 5:45 PM",
    room: "Room 201",
    students: 30,
    type: "class",
    status: "scheduled"
  },
  {
    id: "2",
    title: "Hermeneutics Year 2",
    date: "2025-09-01",
    time: "11:00 AM - 11:45 AM",
    room: "Room 202",
    students: 27,
    type: "class",
    status: "scheduled"
  },
  {
    id: "3",
    title: "Christian Leadership Year 1",
    date: "2025-09-01",
    time: "2:00 PM - 2:45 PM",
    room: "Room 204",
    students: 32,
    type: "class",
    status: "scheduled"
  },
  {
    id: "4",
    title: "Faculty Meeting",
    date: "2025-09-03",
    time: "4:00 PM - 5:30 PM",
    room: "Conference Hall",
    type: "meeting",
    status: "scheduled"
  },
  {
    id: "5",
    title: "Systematic Theology Year 2",
    date: "2025-09-05",
    time: "10:30 AM - 11:15 AM",
    room: "Room 205",
    students: 29,
    type: "class",
    status: "completed"
  },
  {
    id: "6",
    title: "Pastoral Care and Counselling Year 4",
    date: "2025-09-06",
    time: "1:00 PM - 1:45 PM",
    room: "Room 208",
    students: 31,
    type: "class",
    status: "scheduled"
  },
  {
    id: "7",
    title: "Ministerial Ethics Year 3",
    date: "2025-09-07",
    time: "3:00 PM - 3:45 PM",
    room: "Room 206",
    students: 25,
    type: "class",
    status: "scheduled"
  },
  {
    id: "8",
    title: "Chapel Service",
    date: "2025-09-08",
    time: "8:00 AM - 9:00 AM",
    room: "Main Chapel",
    type: "event",
    status: "scheduled"
  },
  {
    id: "9",
    title: "Apostolic Mandate Year 2",
    date: "2025-09-09",
    time: "9:30 AM - 10:15 AM",
    room: "Room 210",
    students: 26,
    type: "class",
    status: "scheduled"
  },
  {
    id: "10",
    title: "Guest Lecture: Prophetic Ministry",
    date: "2025-09-10",
    time: "1:30 PM - 3:00 PM",
    room: "Auditorium",
    type: "event",
    status: "scheduled"
  },
  {
    id: "11",
    title: "Homiletics Year 1",
    date: "2025-09-11",
    time: "9:00 AM - 9:45 AM",
    room: "Room 201",
    students: 30,
    type: "class",
    status: "scheduled"
  },
  {
    id: "12",
    title: "Hermeneutics Year 2",
    date: "2025-09-12",
    time: "11:00 AM - 11:45 AM",
    room: "Room 202",
    students: 27,
    type: "class",
    status: "scheduled"
  },
  {
    id: "13",
    title: "Student Workshop: Leadership & Integrity",
    date: "2025-09-13",
    time: "2:00 PM - 4:00 PM",
    room: "Hall B",
    type: "event",
    status: "scheduled"
  },
  {
    id: "14",
    title: "Christian Leadership Year 1",
    date: "2025-09-15",
    time: "1:00 PM - 1:45 PM",
    room: "Room 204",
    students: 32,
    type: "class",
    status: "scheduled"
  },
  {
    id: "15",
    title: "Faculty Meeting",
    date: "2025-09-16",
    time: "4:00 PM - 5:30 PM",
    room: "Conference Hall",
    type: "meeting",
    status: "scheduled"
  },
  {
    id: "16",
    title: "Systematic Theology Year 2",
    date: "2025-09-18",
    time: "10:00 AM - 10:45 AM",
    room: "Room 205",
    students: 29,
    type: "class",
    status: "scheduled"
  },
  {
    id: "17",
    title: "Pastoral Care and Counselling Year 4",
    date: "2025-09-19",
    time: "3:00 PM - 3:45 PM",
    room: "Room 208",
    students: 31,
    type: "class",
    status: "scheduled"
  },
  {
    id: "18",
    title: "Ministerial Ethics Year 3",
    date: "2025-09-20",
    time: "2:00 PM - 2:45 PM",
    room: "Room 206",
    students: 25,
    type: "class",
    status: "scheduled"
  },
  {
    id: "19",
    title: "Special Seminar: Church Growth Strategies",
    date: "2025-09-22",
    time: "9:00 AM - 12:00 PM",
    room: "Auditorium",
    type: "event",
    status: "scheduled"
  },
  {
    id: "20",
    title: "Apostolic Mandate Year 2",
    date: "2025-09-23",
    time: "10:30 AM - 11:15 AM",
    room: "Room 210",
    students: 26,
    type: "class",
    status: "scheduled"
  },
  {
    id: "21",
    title: "Chapel Service",
    date: "2025-09-25",
    time: "8:00 AM - 9:00 AM",
    room: "Main Chapel",
    type: "event",
    status: "scheduled"
  },
  {
    id: "22",
    title: "Hermeneutics Year 2",
    date: "2025-09-26",
    time: "2:00 PM - 2:45 PM",
    room: "Room 202",
    students: 27,
    type: "class",
    status: "scheduled"
  },
  {
    id: "23",
    title: "Christian Leadership Year 1",
    date: "2025-09-28",
    time: "11:00 AM - 11:45 AM",
    room: "Room 204",
    students: 32,
    type: "class",
    status: "scheduled"
  },
  {
    id: "24",
    title: "Faculty Meeting",
    date: "2025-10-01",
    time: "4:00 PM - 5:30 PM",
    room: "Conference Hall",
    type: "meeting",
    status: "scheduled"
  },
  {
    id: "25",
    title: "Homiletics Year 1",
    date: "2025-10-03",
    time: "9:30 AM - 10:15 AM",
    room: "Room 201",
    students: 30,
    type: "class",
    status: "scheduled"
  }
];


// GET /api/events
export async function GET(request: NextRequest) {
 
  console.log(data)
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Optionally, validate body here
  console.log(body);
  data.push(body);
  return NextResponse.json({ received: body });
}
