import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = {
  _id: new Date().getTime(),
  title: 'Cumpleaños',
  user: {
    _id: '123',
    name: 'Jheysson'
  },
  notes:'Example note',
  start: new Date(),
  end: addHours(new Date(), 2),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvents
    ],
    activeEvent: null
  },
  reducers: { 
    onSetActiveEvent (state, {payload}) {
      console.log('payload', payload)
      state.activeEvent = payload
    },
    onAddNewEvent (state, {payload}) {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent (state, {payload}){
      state.events = state.events.map(event => {
        if(event._id === payload._id){
          return payload;
        }
        return event;
      })
    },
    onDeleteEvent ( state )  {
      state.events = state.events.filter(event => event._id !== state.activeEvent._id)
      state.activeEvent = null
    }
  }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions