# CoachPro Dashboard

Welcome to the **CoachPro Dashboard** – a modern web application for managing school attendance, classes, and student records.

## Features

- **Dashboard Overview**: See today's classes, attendance metrics, and quick stats.
- **QR Code Attendance**: Mark attendance using QR codes for each class session.
- **Class Management**: View and manage your classes and students.
- **Attendance Records**: Browse and analyze attendance history.
- **Reports**: Generate and view attendance reports.
- **Calendar**: See your class and event schedule.
- **Responsive UI**: Clean, modern interface built with React and Tailwind CSS.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/coachpro-dashboard.git
   cd coachpro-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

- `components/` – React components (dashboard, sidebar, pages, etc.)
- `app/api/` – API routes (e.g., `/api/events`)
- `public/` – Static assets (images, icons)
- `styles/` – Global styles

## Usage

- **Mark Attendance:** Click the "Mark Attendance" button on the dashboard to open a QR code modal. Students scan the code to mark their attendance.
- **Navigate:** Use the sidebar to access classes, students, records, reports, and calendar.
- **View Schedule:** Click "View Schedule" to see your calendar.

## Customization

- Update class, student, and event data in the API route files (e.g., `app/api/events/route.ts`).
- Modify UI components in the `components/` directory.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [QRCode SVG](https://github.com/zpao/qrcode.react) (for QR code generation)

## License

This project is for educational/demo purposes.

---

**Made with ❤️ for educators and students.**
