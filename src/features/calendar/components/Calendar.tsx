import { Card, useDisclosure } from "@chakra-ui/react";
import {
  type DateSpanApi,
  type DateSelectArg,
  type EventInput,
  type EventClickArg,
} from "@fullcalendar/core/index.js";
import frLocale from "@fullcalendar/core/locales/fr.js"; // French locale
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

import { ChakraFullCalendarWrapper } from "./ChakraFullCalendarWrapper";
import { EventDialog } from "./EventDialog";

type SelectedDates = {
  start: Date | null;
  end: Date | null;
};

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([
    {
      title: "Event 1",
      start: "2025-04-30 08:00",
      end: "2025-04-30 08:15",
      id: "1",
    },
  ]);
  const [dialogType, setDialogType] = useState<"add" | "view">("add");
  const { open, onOpen, onToggle } = useDisclosure();

  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    start: null,
    end: null,
  });

  const onDateSelect = (arg: DateSelectArg) => {
    setSelectedDates({
      start: arg.start,
      end: arg.end,
    });
    setDialogType("add");
    onOpen();
  };

  const onEventClick = (arg: EventClickArg) => {
    setDialogType("view");
    console.log(arg);
  };

  const handleAddEvent = (event: EventInput) => {
    setEvents((prev) => [...prev, event]);
    onToggle(); // Close the dialog after adding the event
  };

  const handleSelectAllow = (selectInfo: DateSpanApi) => {
    const duration = selectInfo.end.getTime() - selectInfo.start.getTime();
    return duration <= 15 * 60000;
  };

  return (
    <ChakraFullCalendarWrapper>
      <Card.Root>
        <Card.Body>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek,timeGridDay", // user can switch between the two
            }}
            events={events}
            locale={frLocale} // Set the locale to French
            allDayText=""
            slotMinTime={"08:00:00"}
            slotMaxTime={"20:00:00"}
            slotDuration={"00:15:00"} // 15 minutes
            selectable={true}
            selectOverlap={false}
            select={onDateSelect}
            selectAllow={handleSelectAllow}
            eventClick={onEventClick}
          />
        </Card.Body>
      </Card.Root>
      {dialogType === "add" ? (
        <EventDialog
          open={open}
          onOpenChange={onToggle}
          startDate={selectedDates.start}
          endDate={selectedDates.end}
          onAddEvent={handleAddEvent}
        >
          {" "}
        </EventDialog>
      ) : (
        <h2>Oui</h2>
      )}
    </ChakraFullCalendarWrapper>
  );
}
