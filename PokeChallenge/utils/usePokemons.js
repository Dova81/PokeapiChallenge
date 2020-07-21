import Api from "../api-client/api";
import { useState, useEffect } from "react";

function usePokemon(max) {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(false);

  useEffect(
    () =>
      Api.getPokemon(max)
        .then((response) => setPokemons(response))
        .catch(() => setError(true)),
    []
  );

  const changePokemons = (pokemons) => {
    setPokemons(pokemons);
  };

  return [
    pokemons,
    {
      getNext: (url) =>
        Api.getNextPokemon(url).then((response) => changePokemons(response)),
      isLoading: pokemons.length === 0 && !error,
      error: error,
    },
  ];
}
export default usePokemon;
