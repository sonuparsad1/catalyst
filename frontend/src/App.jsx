import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
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

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background text-textPrimary">
        <Navbar />
        <div className="flex-1">
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
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
