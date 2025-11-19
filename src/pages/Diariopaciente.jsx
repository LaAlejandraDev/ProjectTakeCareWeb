import { useEffect, useState } from "react";
import { DiarioAPI } from "../api/diario.api";

export default function DiarioPaciente({ idPaciente }) {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fechaFiltro, setFechaFiltro] = useState("");

  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);

  const emojis = {
    feliz: "😊",
    neutro: "😐",
    triste: "😔",
    ansioso: "😰",
    enojado: "😡",
    emocionado: "🤩",
  };

  async function cargarDatos() {
    try {
      setLoading(true);
      const res = await DiarioAPI.getByPaciente(idPaciente);
      setEntradas(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, [idPaciente]);

  const entradasFiltradas = entradas.filter((e) =>
    fechaFiltro ? e.fecha.startsWith(fechaFiltro) : true
  );

  const totalPaginas = Math.ceil(entradasFiltradas.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = entradasFiltradas.slice(inicio, inicio + porPagina);

  function abrirModal(entrada) {
    setEntradaSeleccionada(entrada);
    setModalOpen(true);
  }

  function cerrarModal() {
    setModalOpen(false);
    setEntradaSeleccionada(null);
  }

  if (loading) return <p>Cargando diario...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Diario emocional del paciente</h2>

      <div className="mb-4">
        <label className="mr-3">Filtrar por fecha:</label>
        <input
          type="date"
          className="border px-2 py-1"
          value={fechaFiltro}
          onChange={(e) => {
            setPagina(1);
            setFechaFiltro(e.target.value);
          }}
        />
      </div>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Nivel</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {datosPagina.map((e) => (
            <tr key={e.id} className="text-center">
              <td className="border p-2">
                {new Date(e.fecha).toLocaleDateString()}
              </td>
              <td className="border p-2">{emojis[e.estadoEmocional]}</td>
              <td className="border p-2">{e.nivel}</td>
              <td className="border p-2">
                <button
                  onClick={() => abrirModal(e)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-2">
        <button
          className="px-3 py-1 border rounded"
          disabled={pagina === 1}
          onClick={() => setPagina(pagina - 1)}
        >
          ⬅
        </button>

        <span>
          Página {pagina} de {totalPaginas}
        </span>

        <button
          className="px-3 py-1 border rounded"
          disabled={pagina === totalPaginas}
          onClick={() => setPagina(pagina + 1)}
        >
          ➡
        </button>
      </div>

      {modalOpen && entradaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-xl w-80 relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={cerrarModal}
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-3 text-center">
              {emojis[entradaSeleccionada.estadoEmocional]}{" "}
              {entradaSeleccionada.estadoEmocional}
            </h3>

            <p>
              <b>Nivel:</b> {entradaSeleccionada.nivel}
            </p>

            <p className="mt-2">
              <b>Comentario:</b>
              <br />
              {entradaSeleccionada.comentario || "Sin comentario"}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              <b>Fecha:</b>{" "}
              {new Date(entradaSeleccionada.fecha).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
