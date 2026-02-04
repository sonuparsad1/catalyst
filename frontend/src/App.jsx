import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const Education = lazy(() => import("./pages/Education.jsx"));
const Sports = lazy(() => import("./pages/Sports.jsx"));
const Recruitment = lazy(() => import("./pages/Recruitment.jsx"));
const Sponsorship = lazy(() => import("./pages/Sponsorship.jsx"));
const Team = lazy(() => import("./pages/Team.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents.jsx"));
const AdminTickets = lazy(() => import("./pages/admin/AdminTickets.jsx"));
const AdminAttendance = lazy(() => import("./pages/admin/AdminAttendance.jsx"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments.jsx"));
const AdminRefunds = lazy(() => import("./pages/admin/AdminRefunds.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.jsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.jsx"));

const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-background text-textPrimary">
      {!isAdminRoute && <Navbar />}
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted">
              Loading experience...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/education" element={<Education />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="refunds" element={<AdminRefunds />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
};

export default App;
