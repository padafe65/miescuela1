import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axiosConfig";

interface Props {
  modo?: "editar" | "crear";
}

export default function Register({ modo = "crear" }: Props) {
  const [nombre_completo, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("estudiante");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // 🔥 Si es modo editar, carga los datos del usuario del backend
  useEffect(() => {
    if (modo === "editar" && id) {
      const cargarUsuario = async () => {
        try {
          const token = localStorage.getItem("token");

          const { data } = await API.get(`/usuarios/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setNombreCompleto(data.nombre_completo);
          setCorreo(data.correo);
          setRol(data.rol[0]);
        } catch (error) {
          console.error("Error cargando usuario", error);
        }
      };

      cargarUsuario();
    }
  }, [modo, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (modo === "crear") {
        // 🟢 CREAR
        const response = await API.post("/usuarios/registrar", {
          nombre_completo,
          correo,
          contrasena,
          rol: [rol],
        });

        setMensaje("✅ Usuario creado correctamente");
        console.log(response.data);

        setTimeout(() => navigate("/", { replace: true }), 1200);
      } else {
        // 🟡 EDITAR
        const token = localStorage.getItem("token");

        const response = await API.patch(
          `/usuarios/${id}`,
          {
            nombre_completo,
            correo,
            rol: [rol], 
            // contrasena es opcional, solo si el profe la escribe
            ...(contrasena && { contrasena }),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMensaje("✏️ Datos actualizados correctamente");
        console.log(response.data);

        setTimeout(() => navigate("/dashboard-profesor"), 1200);
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setMensaje("❌ Error al guardar cambios");
    }
  };

  return (
    <div className="container-registro">
      <h2>{modo === "crear" ? "Registro" : "Editar Usuario"}</h2>

      <form className="form-registro" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre_completo}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={modo === "editar" ? "Contraseña (opcional)" : "Contraseña"}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required={modo === "crear"}
        />

        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
          <option value="administrador">Administrador</option>
        </select>

        <button type="submit">
          {modo === "crear" ? "Registrar" : "Actualizar"}
        </button>

        <button
          className="login"
          type="button"
          onClick={() => navigate("/dashboard-profesor")}
        >
          Volver
        </button>
      </form>

      <p>{mensaje}</p>
    </div>
  );
}
