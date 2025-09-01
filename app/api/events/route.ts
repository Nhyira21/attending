import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const data = [
  {
    id: 1,
    title: "Homiletics Year 1",
    time: "9:00 AM - 9:45 AM",
    room: "Room 201",
    students: 30,
    type: "class",
    status: "scheduled",
    date: "2025-09-09"
  },
  {
    id: 2,
    title: "Hermeneutics Year 2",
    time: "11:00 AM - 11:45 AM",
    room: "Room 202",
    students: 27,
    type: "class",
    status: "scheduled",
    date: "2025-09-09"
  },
  {
    id: 3,
    title: "Christian Leadership Year 1",
    time: "2:00 PM - 2:45 PM",
    room: "Room 204",
    students: 32,
    type: "class",
    status: "scheduled",
    date: "2025-09-01"
  },
  {
    id: 4,
    title: "Faculty Meeting",
    time: "4:00 PM - 5:30 PM",
    room: "Conference Hall",
    students: null,
    type: "meeting",
    status: "scheduled",
    date: "2025-09-01"
  },
  {
    id: 5,
    title: "Systematic Theology Year 2",
    time: "10:30 AM - 11:15 AM",
    room: "Room 205",
    students: 29,
    type: "class",
    status: "completed",
    date: "2025-09-05"
  },
  {
    id: 6,
    title: "Pastoral Care and Counselling Year 4",
    time: "1:00 PM - 1:45 PM",
    room: "Room 208",
    students: 31,
    type: "class",
    status: "scheduled",
    date: "2025-09-13"
  },
  {
    id: 7,
    title: "Ministerial Ethics Year 3",
    time: "3:00 PM - 3:45 PM",
    room: "Room 206",
    students: 25,
    type: "class",
    status: "scheduled",
    date: "2025-09-16"
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
