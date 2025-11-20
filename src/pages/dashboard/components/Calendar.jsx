import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function Calendar({ events = [], onDateClick, onEventClick, onSelectRange }) {
  return (
    <div className="p-4 bg-base-200 rounded-xl shadow-lg">
      <FullCalendar
        
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}

        // Click en un día del mes
        dateClick={(info) => {
          if (onDateClick) onDateClick(info);
        }}

        // Selección de rango (para agregar eventos)
        select={(info) => {
          if (onSelectRange) onSelectRange(info);
        }}

        // Click en evento
        eventClick={(info) => {
          if (onEventClick) onEventClick(info.event);
        }}

        height="auto"
        fixedWeekCount={false}
        displayEventTime={false}
        eventClassNames="bg-primary text-primary-content"
        dayHeaderClassNames="bg-primary text-white font-bold"
        dayCellClassNames="text-dark font-bold hover:bg-pink-300 transition"
      />
    </div>
  );
}
