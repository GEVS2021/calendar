import React, { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { localizer } from '../helpers/calendarLocalizer';
import { getCalendarMessagesES } from '../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';


export const CalendarPage = () => {
  
  //redux
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

  useEffect(() => {
    startLoadingEvent();    
  }, [])
  

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(user.uid);
    console.log(event.title)
    console.log(event.user._id);
    console.log(event.user.uid);
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
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
    setActiveEvent(event);
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
      <FabAddNew />
      <FabDelete />
    </>
  )
}
