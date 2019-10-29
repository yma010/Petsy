import axios from "axios";

export const fetchPets = (searchParams = "") => {
  let query = "";
  if (searchParams.length > 0) {
    query = `?${searchParams}`
  }
  return axios.get(`/api/pets/index${query}`)
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
      console.log(response);
      return response;
    })
};

export const updatePet = data => {
  return axios.put(`/api/pets/edit/${data._id}`, data)
    .then(function(response) {
      return response;
    })
}