import React from 'react'
import { Navbar } from '../'
import { Calendar, dateFnsLocalizer} from 'react-big-calendar'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours, parse, format, startOfWeek, getDay } from 'date-fns'

const locales = {
  'en-US': enUS,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const events = [{
  title: 'Cumpleaños',
  notes:'Example note',
  start: new Date(),
  end: addHours(new Date(), 2),
}]

export const CalendarPage = () => {
  return (
    <>
      <Navbar />
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
    />
    </>
  )
}
