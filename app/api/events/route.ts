import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// GET /api/events
export async function GET(request: NextRequest) {
  const data = [
    {
      id: 1,
      title: "Mathematics 10A",
      time: "10:30 AM - 11:15 AM",
      room: "Room 204",
      students: 28,
      type: "class",
      status: "scheduled",
      date: "2024-11-11"
    },
    {
      id: 2,
      title: "Chemistry 10B",
      time: "1:00 PM - 1:45 PM",
      room: "Room 205",
      students: 30,
      type: "class",
      status: "scheduled",
      date: "2024-11-11"
    },
    {
      id: 3,
      title: "Physics 11B",
      time: "2:00 PM - 2:45 PM",
      room: "Room 301",
      students: 25,
      type: "class",
      status: "scheduled",
      date: "2024-11-11"
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      time: "4:00 PM - 6:00 PM",
      room: "Conference Room",
      students: null,
      type: "meeting",
      status: "scheduled",
      date: "2024-11-12"
    },
    {
      id: 5,
      title: "Mathematics 9A",
      time: "9:00 PM - 9:45 PM",
      room: "Room 203",
      students: 32,
      type: "class",
      status: "completed",
      date: "2025-08-08"
    }
  ];
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Optionally, validate body here
  console.log(body);
  return NextResponse.json({ received: body });
}
