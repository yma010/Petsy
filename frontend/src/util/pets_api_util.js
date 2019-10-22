import axios from "axios";

export const fetchPets = () => {
  return axios.get("/api/pets/index")
};

