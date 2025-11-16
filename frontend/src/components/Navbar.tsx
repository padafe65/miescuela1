import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [rol, setRol] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/", { replace: true });
  };

  return (
    <nav
      style={{
        background: "#1976d2",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}
        >
          Inicio
        </Link>
        {!rol && (
          <>
            <Link
              to="/register"
              style={{
                margin: "0 1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Registrar
            </Link>
          </>
        )}
      </div>

      {rol ? (
        <div>
          <span style={{ marginRight: "1rem" }}>👤 Rol: {rol}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#1976d2",
              border: "none",
              padding: "5px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <span>🔒 No autenticado</span>
      )}
    </nav>
  );
}
  
