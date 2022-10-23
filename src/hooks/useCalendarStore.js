import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    console.log('calendarEvent', calendarEvent)
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async(calendarEvent) => {
    //TODO: llegar backend

    //Todo bien
    if(calendarEvent._id){
      //actualizando
    } else{
      //creando
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }

  return {
    //*Properties
    activeEvent,
    events,

    //*Methods
    setActiveEvent,
    startSavingEvent
  }
}
