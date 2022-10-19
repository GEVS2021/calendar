import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    title: "Cumpleaños del Jefe",
    notes: "Hay que comprar el regalo",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "fafafa",
    user: {
        _id: "123",
        name: "Fernando"
    }
};

export const calendarSlice = createSlice({
    name: "ui",
    initialState: {
        events: [ tempEvent ],
        activeEvent: null
    },
    reducers: {
       
    }
});

export const {  } = calendarSlice.actions;