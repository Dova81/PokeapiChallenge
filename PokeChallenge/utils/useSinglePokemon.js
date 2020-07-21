import Api from "../api-client/api";
import { useState, useEffect } from "react";
import useI18n from "./use-i18n";

function useSinglePokemon(url) {
  const i18n = useI18n();
  const [pokemon, setpokemon] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Api.getSpecificPokemon(url)
      .then((pokemon) => {
        Promise.all(
          pokemon?.abilities.map((a) =>
            Api.getSpecificPokemonAbility(a.ability.name).then(
              (abilityDescription) => ({
                name: abilityDescription.name,
                description: filterBasedOnLenguaje(
                  abilityDescription.effect_entries
                ),
              })
            )
          )
        ).then((abilities) => {
          setpokemon({ ...pokemon, abilities });
        });
      })
      .catch(() => setError(true));
  }, []);

  const filterBasedOnLenguaje = (listOfLenguajes) =>
    listOfLenguajes.find((entry) => entry.language.name === i18n.activeLocale);

  return [
    pokemon,
    {
      isLoading: pokemon === null && !error,
      error: error,
    },
  ];
}
export default useSinglePokemon;
