import axios from "axios";

export const fetchPets = () => {
  return axios.get("/api/pets/index")
    .then(function(response) {
      return response.data;
    })
};

export const fetchPet = petId => {
  return axios.get(`/api/pets/${petId}`)
    .then(function (response) {
      return response.data;
    })
};

export const createPet = data => {
  return axios.post(`/api/pets/register`, data)
    .then(function(response) {
      return response;
    })
};

export const updatePet = data => {
  return axios.put(`/api/pets/edit/${data._id}`, data)
    .then(function(response) {
      return response;
    })
}