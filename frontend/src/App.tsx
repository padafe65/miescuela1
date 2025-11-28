import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// 🧩 Páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardEstudiante from "./pages/DashboardEstudiante";
import DashboardProfesor from "./pages/DashboardProfesor";

// 🧠 Componentes
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectByRole from "./components/RedirectByRole";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";

function AppContent() {
  const location = useLocation();

  // ✅ Ocultamos Navbar y Footer dentro de los dashboards
  const isDashboard =
    location.pathname.includes("/dashboard-estudiante") ||
    location.pathname.includes("/dashboard-profesor");

  return (
    <>
      {/* Mostrar Navbar solo si no está en un dashboard */}
      {!isDashboard && <Navbar />}

      <div style={{ padding: isDashboard ? "0" : "2rem", minHeight: "80vh" }}>
        <Routes>
          {/* 🏠 Página inicial: siempre Login */}
          <Route path="/" element={<Login />} />

          {/* 🧾 Registro */}
          <Route path="/register" element={<Register />} />

          <Route
            path="/editar-usuario/:id"
            element={
              <ProtectedRoute>
                <Register modo="editar" />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />



          {/* 🚪 Redirección automática según rol */}
          <Route
            path="/redireccion"
            element={
              <ProtectedRoute>
                <RedirectByRole />
              </ProtectedRoute>
            }
          />

          {/* 🎓 Dashboard Estudiante */}
          <Route
            path="/dashboard-estudiante"
            element={
              <ProtectedRoute>
                <DashboardEstudiante />
              </ProtectedRoute>
            }
          />

          {/* 👨‍🏫 Dashboard Profesor */}
          <Route
            path="/dashboard-profesor"
            element={
              <ProtectedRoute>
                <DashboardProfesor />
              </ProtectedRoute>
            }
          />

          {/* ❌ Cualquier otra ruta → vuelve al login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Mostrar Footer solo si no está en un dashboard */}
      {!isDashboard && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
