import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAppContext } from '../../contexts/AppContext';
import Image from '../../components/base/image';

const Collections = () => {
  const { state, dispatch } = useAppContext();

  const handlerRemove = (data) => {
    const searchByName = state.pokemon.filter(
      (item) => item.name !== data.name
    );
    const searchDeleteByName = state.pokemon.filter(
      (item) => item.name === data.name
    );
    const searchByNickName = searchDeleteByName.filter(
      (item) => item.nickName !== data.nickName
    );
    const deleteResult = [...searchByName, ...searchByNickName];

    dispatch({ type: 'REMOVE_POKEMON', pokemon: deleteResult });
  };
  return (
    <div>
      <Head>
        <title>PokemonApp || Collection</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {state.pokemon !== undefined ? (
          state.pokemon.map((pokeData, index) => {
            return (
              <div key={index}>
                <p>{pokeData.name}</p>
                <Image url={pokeData?.sprites?.front_default} />
                <p>{pokeData.nickName}</p>
                <div
                  onClick={() => {
                    handlerRemove(pokeData);
                  }}
                >
                  hapus
                </div>
              </div>
            );
          })
        ) : (
          <p>you dont have any collection yet , please catch some</p>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default Collections;
