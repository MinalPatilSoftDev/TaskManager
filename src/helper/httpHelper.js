
import axios from "axios";


// Create an instance of Axios with custom configuration

export const httpAxios = axios.create({
  baseURL: process.env.BASE_URL,   // Set the base URL for your API requests

  // Enable sending cookies and authentication headers with cross-origin requests
  withCredentials: true
});


//This function is used for call API's/ call services
//Note:- 'npm install axios' run in terminal