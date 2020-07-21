import Head from "next/head";
import { Alert, Spinner, Button, Row, Col } from "@zeit-ui/react";
import usePokemon from "../utils/usePokemons";
import useI18n from "../utils/use-i18n";
import { contentLanguageMap } from "../i18n";
import EN from "../locales/en.js";
import DE from "../locales/de.js";
import { useEffect } from "react";

import PokemonCard from "../Components/PokemonCard";

const MAX_LIMIT = 5;

function Home() {
  const i18n = useI18n();

  useEffect(() => {
    i18n.locale("en", EN);
  }, []);

  const [pokemons, { getNext, isLoading, error }] = usePokemon(MAX_LIMIT);
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="center" justify="center" align="midle">
        <h1 className="centerText"> {i18n.t("error")}</h1>
        <img src="/sadPickachu.gif" alt="DE" />
      </div>
    );
  return (
    <div className="scroll">
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale]}
        />
      </Head>
      <>
        <Row justify="center" align="top">
          <img className="AdjustLogo" src="/pokemonLogo.png" alt="DE" />
        </Row>
        {pokemons?.results.map((l) => (
          <Row className="spaced" gap={3} justify="center">
            <PokemonCard {...l} />
          </Row>
        ))}
        <Row className="spaced" gap={0.8} align="bottom" justify="center">
          <Button
            className="leftSpaced"
            onClick={() => getNext(pokemons.previous)}
            disabled={!pokemons.previous}
          >
            {i18n.t("previous")}
          </Button>

          <Button onClick={() => getNext(pokemons.next)}>
            {i18n.t("next")}
          </Button>
        </Row>

        <div class="flags">
          <Button
            value="2"
            onClick={() => i18n.locale("en", EN)}
            className="adjustButton flag"
          >
            <img className="adjustImage" src="/En.png" alt="EN" />
          </Button>
          <Button
            value="1"
            onClick={() => i18n.locale("de", DE)}
            className="adjustButton flag"
          >
            <img className="adjustImage" src="/De.png" alt="DE" />
          </Button>
        </div>

        <Row gap={0.3} justify="end" align="bottom">
          <Col span={3}></Col>
          <Col span={3}></Col>
        </Row>
      </>
    </div>
  );
}

export default Home;
