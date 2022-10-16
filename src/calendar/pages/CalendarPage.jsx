import React from 'react'
import { Navbar } from '../'
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { getMessgesES, localizer } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'


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

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages = {getMessgesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
      />
    </>
  )
}
