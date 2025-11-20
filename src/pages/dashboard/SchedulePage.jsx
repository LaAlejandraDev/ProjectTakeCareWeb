import { useContext, useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import { toast } from "react-toastify";
import { PsicologoAPI } from "../../api/psicologo.api";
import { AuthContext } from "../../context/AuthContext";
import { citasAPI } from "../../api/citas.api";

export default function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [workDays, setWorkDays] = useState([])
  const { rolId } = useContext(AuthContext)
  const idPsycologist = rolId?.psicologo?.id;

  const getLaboralDays = async () => {
    try {
      const response = await PsicologoAPI.getPsycologistDays(idPsycologist)
      if (response.status === 200) {
        const data = response.data
        setWorkDays(data)
      } else {
        toast.error("Error al obtener la información, Intenta mas tarde")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getEvents = async () => {
    try {
      const response = await citasAPI.getDates(idPsycologist)
      if (response.status === 200) {
        const data = response.data
        const eventesMapped = data.map(cita => ({
          id: String(cita.id),
          title: cita.motivo + " - " + cita.ubicacion,
          start: cita.fechaInicio,
          end: cita.fechaFin,
          extendedProps: cita
        }));
        setEvents([...eventesMapped])
      } else {
        toast.error("Error al obtener la información, Intenta mas tarde")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!idPsycologist) return;

    getLaboralDays();
    getEvents();
  }, [idPsycologist]);

  const onHandleDateClick = async (info) => {
    const data = {
      "idPsicologo": rolId.psicologo.id,
      "fecha": info.dateStr
    }
    try {
      const response = await PsicologoAPI.setPsycologistDays(data)
      if (response.status === 201) {
        toast.success("Se agrego el dia: " + data.fecha)
      }
    } catch (error) {
      console.error(error)
      if (error.status === 400) {
        toast.warning(error.response.data)
      }
    }
  };

  const handleEventClick = (event) => {
    toast.info(`Evento: ${event.title}`);
  };

  return (
    <>
      <div className="">
        <Calendar
          key={JSON.stringify({ events, workDays })}
          workDays={workDays}
          events={events}
          onDateClick={onHandleDateClick}
          onEventClick={handleEventClick}
        />
      </div>
    </>
  );
}
