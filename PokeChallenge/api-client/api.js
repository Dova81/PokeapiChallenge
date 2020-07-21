import Axios from "axios";

const server = process.env.SERVER_URL;

const API = {
  getPokemon: (limit) =>
    Axios.get(`${server}pokemon?limit=${limit}`).then(
      (response) => response.data
    ),
  getNextPokemon: (url) =>
    Axios.get(`${url}`).then((response) => response.data),

  getSpecificPokemon: (url) =>
    Axios.get(`${url}`).then((response) => response.data),

  getSpecificPokemonAbility: (id) =>
    Axios.get(`${server}ability/${id}`).then((response) => response.data),
};

export default API;
