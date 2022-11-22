import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertEventsToDate } from "../calendar/helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const saveEvent = async (calendarEvent) => {
        if(calendarEvent._id){
            //*Actualizar
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            const { data } = await calendarApi.post("/events/create", calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.result.id, user}));
        }
    }

    const deleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvent = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDate(data.eventos);
            console.log({events});
            
        } catch (error) {
            console.log("Error cargando eventos");
            console.log(error);
        }
    }

    return {
        //*Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Métodos
        setActiveEvent,
        saveEvent,
        deleteEvent,
        startLoadingEvent
    }
}