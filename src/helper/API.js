import axios from "axios";
import useLoaderStore from "../store/loader.store";
import { getTimeZone } from "react-native-localize";

const API = axios.create({
    headers: {
        "Content-Type": "application/json",
        timezone: getTimeZone()
    },
})

//interceptor which calls custom enable loader function when the request is sent through axios
API.interceptors.request.use(async (request) =>
{
    useLoaderStore.getState().setLoading(true)
    return request;
});


//interceptor which calls custom disable loader function when the response is received.
API.interceptors.response.use(
    async (response) =>
    {
        useLoaderStore.getState().setLoading(false)
        return response;
    },
    async (error) =>
    {
        useLoaderStore.getState().setLoading(false)
        throw error;
    }
);

export default API;

