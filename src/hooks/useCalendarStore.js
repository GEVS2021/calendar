import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const saveEvent = (calendarEvent) => {
        if(calendarEvent._id){
            //*Actualizar
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            //*Guardar
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
        }
    }

    return {
        //*Propiedades
        events, 
        activeEvent,

        //*Métodos
        setActiveEvent,
        saveEvent
    }
}