import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Llamada al backend NestJS
      const { data } = await API.post("/usuarios/login", {
        correo,
        contrasena,
      });

      console.log("✅ Login exitoso:", data);

      // Token JWT recibido del backend
      const token = data.token;
      localStorage.setItem("token", token);

      // Decodificamos el payload del token sin librerías externas
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("🔍 Token decodificado:", payload);

      // Extraemos el rol y guardamos datos útiles
      const rol = Array.isArray(payload.rol) ? payload.rol[0] : payload.rol;
      localStorage.setItem("rol", rol);
      localStorage.setItem("nombre", data.Details.UserDetails.name);
      localStorage.setItem("correo", data.Details.UserDetails.correo);

      // Redirección según el rol
      if (rol === "estudiante") {
        navigate("/dashboard-estudiante", { replace: true });
      } else if (rol === "profesor") {
        navigate("/dashboard-profesor", { replace: true });
      } else {
        setMensaje("Rol no reconocido. Contacta con el administrador.");
      }
    } catch (error: any) {
      console.error("❌ Error al iniciar sesión:", error.response?.data || error);
      setMensaje("❌ Credenciales incorrectas o error del servidor");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">
          Ingresar
        </button>
        <button
          className="login"
          type="button"
          onClick={() => navigate("/forgot-password")}
        >
          ¿Olvidaste tu contraseña?
        </button>

      </form>

      {mensaje && <p>{mensaje}</p>}

      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register" style={{ color: "#007bff" }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}


