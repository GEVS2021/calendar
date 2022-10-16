import React from 'react';
import { Calendar } from 'react-big-calendar';
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar } from '../'
import { localizer } from '../helpers/calendarLocalizer';
import { getCalendarMessagesES } from '../helpers';

const events = [{
  title: "Cumpleaños del Jefe",
  notes: "Hay que comprar el regalo",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "fafafa",
  user: {
    _id: "123",
    name: "Fernando"
  }
}];

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event, start, end, isSelected);

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

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={ getCalendarMessagesES() }
        eventPropGetter = { eventStyleGetter }
      />
    </>
  )
}
