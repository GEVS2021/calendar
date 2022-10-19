import React, { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent, CalendarModal } from '../'
import { localizer } from '../helpers/calendarLocalizer';
import { getCalendarMessagesES } from '../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {
  
  //redux
  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: '0px',
      opacity: 0.8,
      color: "white"
    }

    return {
      style
    };
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({ click: event });
  }

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={ getCalendarMessagesES() }
        eventPropGetter = { eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  )
}
