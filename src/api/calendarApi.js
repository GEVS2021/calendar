import { getEnvVariables } from "../calendar/helpers/getEnvVariables";
import axios from "axios";


const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// Todo: configurar interceptores

export default calendarApi;