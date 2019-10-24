import axios from "axios";

export const requestSentRequests = () => {
  return axios.get("/api/requests/me")
    .then(response => {
      return response.data
    });
};

export const requestReceivedRequests = () => {
  return axios.get("/api/requests/mypets")
    .then(response => {
      return response.data;
    })
}

export const sendRequest = petId => {
  return axios.post(`/api/requests/${petId}`)
}

export const deleteRequest = petId => {
  return axios.delete(`/api/requests/${petId}`)
}

export const approveReceivedRequest = requestId => {
  return axios.patch(`/api/requests/${requestId}`)
}

export const denyReceivedRequest = requestId => {
  return axios.patch(`/api/requests/${requestId}`)
}
