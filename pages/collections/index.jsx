import React from 'react';
import Head from 'next/head';
import { useAppContext } from '../../contexts/AppContext';
import Image from '../../components/base/image';
import Button from '../../components/base/button';

/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Head>
        <title>PokemonApp || Collection</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {state.pokemon.length !== 0 ? (
          state.pokemon.map((pokeData, index) => {
            return (
              <div
                key={index}
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '48%',
                  border: '1px solid black',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '2%',
                }}
              >
                <Image url={pokeData?.sprites?.front_default} />
                <p
                  css={{
                    fontSize: '12px',
                    margin: '0 0 10px',
                    alignSelf: 'flex-start',
                  }}
                >
                  NickName :&nbsp; <span>{pokeData.nickName}</span>
                </p>
                <p
                  css={{
                    fontSize: '12px',
                    margin: '0 0 10px',
                    alignSelf: 'flex-start',
                  }}
                >
                  Pokemon :&nbsp; <span>{pokeData.name}</span>
                </p>
                <Button
                  onClick={() => {
                    handlerRemove(pokeData);
                  }}
                  text="Remove"
                />
              </div>
            );
          })
        ) : (
          <p>you dont have any collection yet , please catch some</p>
        )}
      </div>
    </motion.div>
  );
};

export default Collections;
