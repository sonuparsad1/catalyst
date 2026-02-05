import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AdminLayout from "./admin/layout/AdminLayout.jsx";
import { adminRoutes } from "./admin/adminRoutes.jsx";

const CmsPage = lazy(() => import("./pages/CmsPage.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const EventDetail = lazy(() => import("./pages/EventDetail.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Payments = lazy(() => import("./pages/Payments.jsx"));
const Invoices = lazy(() => import("./pages/Invoices.jsx"));
const Refunds = lazy(() => import("./pages/Refunds.jsx"));
const MyTickets = lazy(() => import("./pages/MyTickets.jsx"));

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
            <Route path="/" element={<CmsPage slug="home" />} />
            <Route path="/about" element={<CmsPage slug="about" />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/education" element={<CmsPage slug="education" />} />
            <Route path="/sports" element={<CmsPage slug="sports" />} />
            <Route path="/recruitment" element={<CmsPage slug="recruitment" />} />
            <Route path="/sponsorship" element={<CmsPage slug="sponsorship" />} />
            <Route path="/team" element={<CmsPage slug="team" />} />
            <Route path="/contact" element={<CmsPage slug="contact" />} />
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
                </ProtectedRoute>
              }
            />
            <Route
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
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              {adminRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
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
