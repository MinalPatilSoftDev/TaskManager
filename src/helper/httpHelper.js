
import axios from "axios";
export const httpAxios = axios.create({
  baseURL: process.env.BASE_URL,
});


//This function is used for call API's/ call services
//Note:- 'npm install axios' run in terminal