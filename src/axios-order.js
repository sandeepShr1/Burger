import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-app-5d564-default-rtdb.firebaseio.com/'
});

export default instance ;