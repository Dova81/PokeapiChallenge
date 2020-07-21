import React, { useState } from "react";
import {
  Card,
  Row,
  Avatar,
  Spacer,
  Text,
  Modal,
  Spinner,
} from "@zeit-ui/react";
import useSinglePokemon from "../utils/useSinglePokemon";
import useI18n from "../utils/use-i18n";

function PokemonDetail({ url, open, onClose }) {
  const i18n = useI18n();
  const [pokemonsDetail, { isLoading, error }] = useSinglePokemon(url);
  if (error)
    return (
      <Modal width="52rem" open={open} onClose={onClose}>
        <Modal.Content>
          <h1 className="centerText"> {i18n.t("error")}</h1>
          <img className="adjustImage" src="/sadPickachu.gif" alt="DE" />
        </Modal.Content>
        <Modal.Action passive onClick={onClose}>
          Salir
        </Modal.Action>
      </Modal>
    );
  return (
    <>
      <Modal open={open} onClose={onClose}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Avatar src={pokemonsDetail?.sprites.front_default} size="large" />
            <Modal.Title>{pokemonsDetail?.name}</Modal.Title>
            <Modal.Content>
              {pokemonsDetail?.abilities.map((ability) => (
                <div>
                  <h3>{`${ability.name}:`}</h3>
                  <h5>{ability.description.effect}</h5>
                </div>
              ))}
            </Modal.Content>
            <Modal.Action passive onClick={onClose}>
              Salir
            </Modal.Action>
          </>
        )}
      </Modal>
    </>
  );
}

function PokemonCard({ url, name }) {
  const [enable, setEnable] = useState(false);

  return (
    <>
      {enable && (
        <PokemonDetail
          url={url}
          open={enable}
          onClose={() => setEnable(false)}
        />
      )}
      <Card
        onClick={() => setEnable(!enable)}
        shadow
        style={{ height: "100%", width: "100%" }}
      >
        <Card.Content>
          <Row>
            <Avatar />
            <Spacer x={0.5} />
            <Text size="1.25rem" b>
              {name}
            </Text>
          </Row>
        </Card.Content>
      </Card>
    </>
  );
}

export default PokemonCard;
