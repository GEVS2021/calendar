import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = {
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
    activeEven: null
  },
  reducer: { 
    increment (action) {
      state.counter = action.payload
    }
  }
})

export const { increment } = calendarSlice.actions