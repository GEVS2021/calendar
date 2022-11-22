import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(calendarEvent => {
                if(calendarEvent.id === payload.id){
                    return payload;
                }

                return calendarEvent;
            })
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent){
                state.events = state.events.filter(calendarEvent => calendarEvent.id != state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload=[] }) => {
            state.isLoading = false;
            payload.map(newEvent => {
                const exists = state.events.some(currentEvent => currentEvent.id === newEvent.id);
                if(!exists)
                    state.events.push(newEvent);
            })
        }
    }
});

export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent,
    onLoadEvents
} = calendarSlice.actions;