import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../calendar/helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const saveEvent = async (calendarEvent) => {
        try {
            if(calendarEvent.id){
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            } 
    
            const { data } = await calendarApi.post("/events/create", calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.result.id, user}));
        } catch (error) {
            Swal.fire("Error al guardar", error.response.data?.msg, "error");
        }
    }

    const deleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvent = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDate(data.eventos);
            dispatch(onLoadEvents(events));
            
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