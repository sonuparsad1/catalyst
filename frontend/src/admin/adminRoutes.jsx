import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import Tickets from "./pages/Tickets.jsx";
import Attendance from "./pages/Attendance.jsx";
import Scan from "./pages/Scan.jsx";
import Members from "./pages/Members.jsx";
import Settings from "./pages/Settings.jsx";

export const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "events", element: <Events /> },
  { path: "tickets", element: <Tickets /> },
  { path: "attendance", element: <Attendance /> },
  { path: "scan", element: <Scan /> },
  { path: "members", element: <Members /> },
  { path: "settings", element: <Settings /> },
];
