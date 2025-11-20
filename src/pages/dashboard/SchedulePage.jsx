import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import { toast } from "react-toastify";

export default function SchedulePage() {
  const [events, setEvents] = useState([]);

  // Cargar eventos de ejemplo
  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Consulta psicológica",
        start: "2025-11-12",
        classNames: ["bg-primary", "text-primary-content", "rounded-md", "p-1"]
      },
      {
        id: "2",
        title: "Disponible",
        start: "2025-11-15",
        classNames: ["bg-success", "text-success-content", "rounded-md", "p-1"]
      },
      {
        id: "3",
        title: "Reunión de equipo",
        start: "2025-11-20",
        classNames: ["bg-warning", "text-warning-content", "rounded-md", "p-1"]
      }
    ]);
  }, []);

  const onHandleDateClick = (info) => {
    toast.info("Día seleccionado: " + info.dateStr);
  };

  const handleEventClick = (event) => {
    toast.info("Evento: " + event.title);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Calendar
        events={events}
        onDateClick={onHandleDateClick}
        onEventClick={handleEventClick}
      />
    </div>
  );
}
