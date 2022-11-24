import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from '../api'

export const useAuthStore = () => {

  const dispatch = useDispatch()
  const {  status, user, errorMessage} = useSelector(state => state.auth)

  const startLogin = async ({ email, password}) => {
    try{
      const resp = await calendarApi.post('/auth', {email, password})
      console.log('resp => ', {resp})
    }catch(error){
      console.error(error)
    }
  }

  return {
    //* States
    status, user, errorMessage,
    //* Actions
    startLogin
  }
}