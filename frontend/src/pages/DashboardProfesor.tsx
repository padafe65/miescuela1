import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipCard from "../components/FlipCard";
import API from "../api/axiosConfig";


export default function DashboardProfesor() {
  const navigate = useNavigate();
  // const [nombre, setNombre] = useState<string | null>(null);
  // const [autenticado, setAutenticado] = useState(false);
const [mostrarCard, setMostrarCard] = useState(false);
   const [usuario, setUsuario] = useState({
  nombre: "",
  rol: "",
  correo: "",
  autenticado: false
});

const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
  const token = localStorage.getItem("token");
  const nombreUsuario = localStorage.getItem("nombre") ?? "";
  const rolUsuario = localStorage.getItem("rol") ?? "";
  const correoUsuario = localStorage.getItem("correo") ?? "";

  if (!token || rolUsuario !== "profesor") {
    navigate("/", { replace: true });
    return;
  }

  setUsuario({
    nombre: nombreUsuario,
    rol: rolUsuario,
    correo: correoUsuario,
    autenticado: true
  });
}, [navigate]);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const cargarUsuarios = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/usuarios/getAllUsuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUsuarios(response.data);
    setMostrarUsuarios(true);

  } catch (error) {
    console.error("Error cargando usuarios:", error);
    alert("No se pudieron obtener los usuarios");
  }
};

const editarUsuario = (id: number) => {
  navigate(`/editar-usuario/${id}`);
};

const eliminarUsuario = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Usuario eliminado correctamente");
    cargarUsuarios(); // Recargar la lista de usuarios después de eliminar

  } catch (error) {
    console.error("Error eliminando usuario:", error);
    alert("No se pudo eliminar el usuario");
  }
};

  return (
    <div className="dashboard">
      {/* Menú lateral */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "#0d6efd",
          color: "white",
          padding: "1rem",
        }}
      >
        <h2>Panel profesor</h2>
        <button
          onClick={() => alert("Ver Estudiantes próximamente")}
        >
          👥 Ver Estudiantes
        </button>
        <button
          onClick={() => setMostrarCard(!mostrarCard)}
        >
          📄 Mi Información
        </button>
        <button onClick={cargarUsuarios}>
          👥 Ver Usuarios
        </button>

        <button
          onClick={handleLogout}
        >
          🚪 Salir
        </button>
      </aside>

      {/* Contenido principal */}
      <main>
        <header>
          <h4>{usuario.autenticado ? `👨‍🏫 Bienvenido al Dashboard del Profesor ${usuario.nombre}` : "No autenticado"}</h4>
          {usuario.autenticado && <span>✅ Sesión activa</span>}
        </header>

        <section style={{ marginTop: "2rem" }}>
          <p>
            Aquí puedes ver los estudiantes, gestionar calificaciones, etc.
          </p>
                  {/* Contenedor de la FlipCard */}
                  {mostrarCard && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "40px",
                      }}
                      className="fade-slide-in"  // 👈 ANIMACIÓN DE TU App.css
                    >
                      <FlipCard
                        frontImage="/img/pizarra.gif"
                        backImage="/img/datos.gif"
                        frontText="Mis Datos"
                        backText={{
                          Nombre: usuario.nombre,
                          Rol: usuario.rol,
                          Correo: usuario.correo,
                        }}
                      />
                    </div>
                  )}

          {mostrarUsuarios && (
            <div style={{ marginTop: "30px" }}>
              <h3>Usuarios Registrados</h3>

              <table border={1} cellPadding={8} style={{ width: "100%", marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
<<<<<<< HEAD
                    <th>Acciones</th>
                  </tr>
                </thead>

=======
                    <th>Acciones</th> {/* Nueva columna */}
                  </tr>
                </thead>
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nombre_completo}</td>
                      <td>{u.correo}</td>
<<<<<<< HEAD
                      <td>{Array.isArray(u.rol) ? u.rol.join(", ") : String(u.rol)}</td>
=======
                      <td>{u.rol}</td>
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
                      <td>
                        <button
                          onClick={() => editarUsuario(u.id)}
                          style={{
                            backgroundColor: "#0d6efd",
                            color: "white",
                            marginRight: "8px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            border: "none",
                          }}
                        >
                          ✏️ Editar
                        </button>

                        <button
                          onClick={() => eliminarUsuario(u.id)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            border: "none",
                          }}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
