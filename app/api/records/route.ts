import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
// GET /api/records
export async function GET(request: NextRequest) {
  return NextResponse.json(attendanceRecords);
}

// POST /api/records
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Optionally, validate body here

  return NextResponse.json({ received: body });
}
