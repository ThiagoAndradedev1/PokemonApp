import React, { useState } from 'react';
import axios from 'axios';
import PokemonApiContext from './pokemonapiContext';

const PokemonapiState = (props) => {
  const [data, setData] = useState('');
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setShowError] = useState(false);

  const searchPokemons = async (pokemonInfo) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonInfo}/`
      );
      const resSpecies = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo}/`
      );
      setData(res);
      setSpecies(resSpecies);
      setLoading(false);
    } catch {
      setLoading(false);
      setShowError(true);
    }
  };

  return (
    <PokemonApiContext.Provider
      value={{ searchPokemons, data, loading, species, error, setShowError }}
    >
      {props.children}
    </PokemonApiContext.Provider>
  );
};

export default PokemonapiState;
