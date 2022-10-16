import React, { useState } from 'react'
import { Navbar, CalendarEvent, CalendarModal } from '../'
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { getMessgesES, localizer } from '../../helpers'


const events = [{
  title: 'Cumpleaños',
  user: {
    _id: '123',
    name: 'Jheysson'
  },
  notes:'Example note',
  start: new Date(),
  end: addHours(new Date(), 2),
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected ) => {
    

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({doubleClick: event})
  }

  const onSelect = (event) => {
    console.log({click: event})
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages = {getMessgesES()}
        eventPropGetter={eventStyleGetter}
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
