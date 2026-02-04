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
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import Education from "./pages/Education.jsx";
import Sports from "./pages/Sports.jsx";
import Recruitment from "./pages/Recruitment.jsx";
import Sponsorship from "./pages/Sponsorship.jsx";
import Team from "./pages/Team.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payments from "./pages/Payments.jsx";
import Invoices from "./pages/Invoices.jsx";
import Refunds from "./pages/Refunds.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import AdminPayments from "./pages/AdminPayments.jsx";
import MyTickets from "./pages/MyTickets.jsx";
import AdminEvents from "./pages/AdminEvents.jsx";
import AdminScan from "./pages/AdminScan.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

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
            <Route path="/events/:id" element={<EventDetail />} />
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
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
              path="/tickets"
              element={
                <ProtectedRoute>
                  <MyTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refunds"
              element={
                <ProtectedRoute>
                  <Refunds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <ProtectedRoute>
                  <AdminPayments />
                </ProtectedRoute>
              path="/admin/events"
              element={
                <AdminRoute>
                  <AdminEvents />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/scan"
              element={
                <AdminRoute>
                  <AdminScan />
                </AdminRoute>
              }
            />
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
