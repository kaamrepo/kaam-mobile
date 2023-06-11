import axios from "axios";


const API = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: "",
    }
})

//interceptor which calls custom enable loader function when the request is sent through axios
// API.interceptors.request.use(async (request) =>
// {
//     const token = sessionStorage.getItem('token') || "";
//     request.headers.Authorization = token
//     loaderShowHandler()
//     return request;
// });


//interceptor which calls custom disable loader function when the response is received.
// API.interceptors.response.use(
//     async (response) =>
//     {
//         loaderDisableHandler();
//         return response;
//     },
//     async (error) =>
//     {
//         loaderDisableHandler();
//         throw error;
//     }
// );

export default API;