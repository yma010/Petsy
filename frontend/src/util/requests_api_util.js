import axios from "axios";

export const fetchMyRequests = () => {
  return axios.get("/api/requests/")
}