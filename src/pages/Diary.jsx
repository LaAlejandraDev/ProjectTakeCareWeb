import React, { useState } from "react";

export default function Diary() { // Componente principal del diario personal
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "2025-11-08",
      title: "Un día productivo",
      content:
        "Hoy me senti con mucha energía siento que logre avanzar en mis metas y tuve más tiempo para relajarme un poco.",
    },
    {
      id: 2,
      date: "2025-11-07",
      title: "Dia difícil ",
      content:
        "Tuve algunos problemas de concentración, pero recorde que es normal, espero que mañana sea un nuevo día",
    },
  ]);

  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.content) return;

    const newDiary = {
      id: entries.length + 1,
      date: new Date().toISOString().split("T")[0],
      ...newEntry,
    };

    setEntries([newDiary, ...entries]);
    setNewEntry({ title: "", content: "" });
  };

  return (
    <div className="flex w-full min-h-screen bg-base-200">
      <main className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Mi Diario</h1>
          <button
            className="btn btn-primary btn-sm md:btn-md"
            onClick={() =>
              document.getElementById("new_entry_modal").showModal()
            }
          >
            Nueva entrada +
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center opacity-70 mt-16">
            <p>No tienes entradas aún. </p>
            <p>Empieza a escribir tu primer pensamiento del día.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition border border-base-300"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="card-title text-lg font-semibold text-primary">
                      {entry.title}
                    </h2>
                    <span className="text-sm opacity-70">{entry.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{entry.content}</p>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-outline btn-xs">Editar</button>
                    <button className="btn btn-error btn-xs text-white">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <dialog id="new_entry_modal" className="modal">
          <div className="modal-box bg-base-100 max-w-lg">
            <h3 className="font-bold text-lg mb-2">Nueva entrada</h3>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={newEntry.title}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, title: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Escribe tus pensamientos..."
                value={newEntry.content}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, content: e.target.value })
                }
                className="textarea textarea-bordered w-full h-32"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("new_entry_modal").close()
                  }
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </main>
    </div>
  );
}
