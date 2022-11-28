import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onlogoutCalendar } from "../store";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.user_name, uid: data._id }))

        } catch (error) {
            dispatch(onLogout('credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.user_name, uid: data._id }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '---error---'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const ckeckAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get('auth/renew/')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onlogoutCalendar())
        dispatch(onLogout());
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        ckeckAuthToken,
        startLogout
    }
}