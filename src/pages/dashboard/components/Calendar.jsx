import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarMinimal({
  events = [],
  workDays = [],
  onDateClick,
  onEventClick,
  onSelectRange,
}) {
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // 2025-11-20
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="p-4 rounded-xl bg-base-100 border border-base-300 shadow-sm">
      <FullCalendar
        aspectRatio={1.7}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        locale="esLocale"

        dateClick={(info) => {
          const clickedDate = new Date(info.date.setHours(0, 0, 0, 0));
          if (clickedDate < today) return;
          onDateClick?.(info);
        }}

        select={(info) => {
          const startDate = new Date(info.start.setHours(0, 0, 0, 0));
          if (startDate < today) return;
          onSelectRange?.(info);
        }}

        eventClick={(info) => onEventClick?.(info.event)}

        fixedWeekCount={false}
        displayEventTime={false}

        eventClassNames="bg-primary/20 text-primary px-5 py-[2px] rounded-md border border-primary/30 text-sm"

        dayHeaderClassNames="text-sm font-semibold text-base-content/80 border-b border-base-300"

        dayCellClassNames="text-sm text-base-content/80 hover:bg-base-200 transition"

        dayCellDidMount={(info) => {
          const cellDate = new Date(info.date);
          cellDate.setHours(0, 0, 0, 0);

          const cellISO = formatDate(cellDate);

          if (cellISO === formatDate(today)) {
            info.el.classList.add(
              "bg-primary/10",
              "border",
              "border-primary/30",
              "rounded-md"
            );
          }

          if (cellDate < today) {
            info.el.classList.add(
              "opacity-40",
              "pointer-events-none",
              "bg-base-200"
            );
          }

          const isWorkDay = workDays.some(d => {
            const dayISO = d.fecha?.split("T")[0];
            return dayISO === cellISO;
          });

          if (isWorkDay) {
            info.el.classList.add(
              "bg-blue-200",
              "border",
              "border-blue-400",
              "font-semibold",
              "text-blue-900"
            );
          }
        }}
      />
    </div>
  );
}