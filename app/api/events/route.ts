import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const data: CalendarEvent[] = [
  {
    id: "1",
    title: "Homiletics Year 1",
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
    date: "2025-09-09",
    time: "11:00 AM - 11:45 AM",
    room: "Room 202",
    students: 27,
    type: "class",
    status: "scheduled"
  },
  {
    id: "3",
    title: "Christian Leadership Year 1",
    date: "2025-09-09",
    time: "2:00 PM - 2:45 PM",
    room: "Room 204",
    students: 32,
    type: "class",
    status: "scheduled"
  },
  {
    id: "4",
    title: "Faculty Meeting",
    date: "2025-09-11",
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
    date: "2025-09-13",
    time: "1:00 PM - 1:45 PM",
    room: "Room 208",
    students: 31,
    type: "class",
    status: "scheduled"
  },
  {
    id: "7",
    title: "Ministerial Ethics Year 3",
    date: "2025-09-16",
    time: "3:00 PM - 3:45 PM",
    room: "Room 206",
    students: 25,
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
