import { Card, useDisclosure } from "@chakra-ui/react";
import {
  type DateSpanApi,
  type DateSelectArg,
  type EventInput,
  type EventClickArg,
} from "@fullcalendar/core/index.js";
import { type EventImpl } from "@fullcalendar/core/internal";
import frLocale from "@fullcalendar/core/locales/fr.js"; // French locale
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo, useState } from "react";

import { ChakraFullCalendarWrapper } from "./ChakraFullCalendarWrapper";
import { AddMatchDialog } from "../../match/components/AddMatchDialog";
import { ShowMatchDialog } from "../../match/components/ShowMatchDialog";

import { useAppSelector } from "@/common/store";
import { formatDateForCalendar } from "@/common/utils/date";
import { useGetMatchsQuery } from "@/features/match/match.api";
import { selectAllMatchs } from "@/features/match/match.selector";
import { useGetPlayersQuery } from "@/features/players/players.api";
import { selectAllPlayers } from "@/features/players/players.selector";

type SelectedDates = {
  start: Date | null;
  end: Date | null;
};

export default function Calendar() {
  useGetMatchsQuery();
  useGetPlayersQuery();
  const matchs = useAppSelector(selectAllMatchs);
  const players = useAppSelector(selectAllPlayers);

  const events: EventInput[] = useMemo(() => {
    return matchs.map((match) => {
      const homePlayer = players.find((p) => p.playerId === match.homePlayerId);
      const awayPlayer = players.find((p) => p.playerId === match.awayPlayerId);
      return {
        title: `${homePlayer?.nameTag} (${homePlayer?.team}) / ${awayPlayer?.nameTag} (${awayPlayer?.team})`,
        start: formatDateForCalendar(match.startDate),
        end: formatDateForCalendar(match.endDate),
        id: match.matchId,
      } as EventInput;
    });
  }, [matchs, players]);

  const [selectedMatch, setSelectedMatch] = useState<EventImpl | undefined>(
    undefined
  );
  const {
    open: openAddMatch,
    onOpen: onOpenAddMatch,
    onClose: onCloseAddMatch,
  } = useDisclosure();
  const {
    open: openDetail,
    onOpen: onOpenDetail,
    onToggle: onToggleDetail,
  } = useDisclosure();

  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    start: null,
    end: null,
  });

  const onDateSelect = (arg: DateSelectArg) => {
    setSelectedDates({
      start: arg.start,
      end: arg.end,
    });
    onOpenAddMatch();
  };

  const onEventClick = (arg: EventClickArg) => {
    setSelectedMatch(arg.event);
    onOpenDetail();
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
            height={"auto"}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek,timeGridDay", // user can switch between the two
            }}
            events={events}
            locale={frLocale} // Set the locale to French
            allDayText=""
            slotMinTime={"10:00:00"}
            slotMaxTime={"20:00:00"}
            slotDuration={"00:15:00"} // 15 minutes
            selectable={true}
            selectOverlap={false}
            select={onDateSelect}
            selectAllow={handleSelectAllow}
            eventClick={onEventClick}
            validRange={{ start: new Date() }}
            eventLongPressDelay={100}
            selectLongPressDelay={100}
          />
        </Card.Body>
      </Card.Root>

      <AddMatchDialog
        startDate={selectedDates.start}
        endDate={selectedDates.end}
        open={openAddMatch}
        onOpenChange={onCloseAddMatch}
        onConfirm={() => {
          setSelectedDates({ start: null, end: null });
        }}
      />

      {selectedMatch && (
        <ShowMatchDialog
          open={openDetail}
          onOpenChange={onToggleDetail}
          matchId={selectedMatch?.id}
          onConfirm={() => setSelectedMatch(undefined)}
        />
      )}
    </ChakraFullCalendarWrapper>
  );
}
