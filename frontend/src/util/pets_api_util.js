import axios from "axios";

export const fetchPets = () => {
  return axios.get("/api/pets/index")
    .then(function(response) {
      return response.data;
    })
};

///api/requests/:petId