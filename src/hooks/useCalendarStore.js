import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../../api";
import { convertDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onloadEvents } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return
            }

            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventSave.id, user }))
        } catch (error) {
            console.log({ error })
            Swal.fire('error al guardar', error.response.data.msg, 'error');
        }
        
    }

    const startDeleteEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log({ error })
            Swal.fire('error al eliminar', error.response.data.msg, 'error');
        }


    }

    const startLoadingEvent = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertDateEvents(data.eventos);
            dispatch(onloadEvents(events))
        } catch (error) {
            console.log(error)
        }
    }


    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvent,
    }
}
