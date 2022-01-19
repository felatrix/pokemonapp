/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import client from '../../utils/graphql/apollo-client';
import { GET_POKEMON } from '../../utils/graphql/queries/pokemon';

import Image from '../../components/base/image';
import Button from '../../components/base/button';

import CatchScene from '../../components/catch/scene';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import { SolarSystemLoading } from 'react-loadingg';

import { motion } from 'framer-motion';

const DetailPokemon = ({ query }) => {
  const router = useRouter();
  const { name } = query;
  const [detailPokemon, setDetailPokemon] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [cardTabs] = useState([
    {
      name: 'stats',
    },
    {
      name: 'moves',
    },
    {
      name: 'abilities',
    },
  ]);
  const [currentCardTabs, setCurrentCardTabs] = useState('stats');
  const [catchSceneShow, setCatchSceneShow] = useState(false);
  const [isSuccesCatch, setIsSuccesCatch] = useState(false);

  const vibrateAnimation = keyframes`0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }`;

  useState(() => {
    const pokemonParam = {
      name: name,
    };
    client
      .query({
        query: GET_POKEMON,
        variables: pokemonParam,
      })
      .then((res) => {
        const { data } = res;
        setDetailPokemon(data?.pokemon);
        setIsFetching(false);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(detailPokemon);

  function clickTabHandler(name) {
    setCurrentCardTabs(name);
  }

  function renderTabClick(name) {
    return (
      <div
        css={{
          width: '33%',
          fontSize: '12px',
          textAlign: 'center',
          padding: '5px 0',
          cursor: 'pointer',
          borderBottom: currentCardTabs !== name ? '1px solid black' : '',
          borderRight: '1px solid black',
        }}
        onClick={() => clickTabHandler(name)}
      >
        {name}
      </div>
    );
  }

  function renderStatsContent() {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        {detailPokemon?.stats?.map((data, index) => (
          <p
            key={index}
            css={{
              width: '50%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '0 5px',
            }}
          >
            <span
              css={{
                fontSize: '8px',
              }}
            >
              {data.stat.name} &nbsp;:
            </span>
            &nbsp;
            <span
              css={{
                fontSize: '12px',
              }}
            >
              {data.base_stat}
            </span>
          </p>
        ))}
      </div>
    );
  }

  function renderMovesContent() {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '10px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { width: '10px' },
          '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
          '&::-webkit-scrollbar-thumb': { background: '#888' },
          '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
        }}
      >
        {detailPokemon?.moves.length > 0 ? (
          detailPokemon?.moves?.map((data, index) => (
            <p
              key={index}
              css={{
                width: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0 5px',
                fontSize: '12px',
              }}
            >
              {data.move.name}
            </p>
          ))
        ) : (
          <p
            css={{
              width: '100%',
            }}
          >
            There is no moves
          </p>
        )}
      </div>
    );
  }

  function renderAbilitiesContent() {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        {detailPokemon?.abilities?.map((data, index) => (
          <p
            key={index}
            css={{
              fontSize: '12px',
            }}
          >
            {data.ability.name}
          </p>
        ))}
      </div>
    );
  }

  function renderTabContent(name) {
    switch (name) {
      case 'stats':
        return <>{renderStatsContent()}</>;
      case 'moves':
        return <>{renderMovesContent()}</>;
      case 'abilities':
        return <>{renderAbilitiesContent()}</>;
    }
  }

  const catchPokemonClick = () => {
    // generate random bollean with 0.5 probabilities
    var random_boolean = Math.random() < 0.5;
    setIsSuccesCatch(random_boolean);
    setCatchSceneShow(true);
  };
  return (
    <motion.div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Head>
        <title>PokemonApp || Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {!isFetching ? (
        <div
          css={{
            width: '350px',
            height: '480px',
            border: 'solid black 1px',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <div
            css={{
              width: '100%',
              border: 'solid black 1px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '5px',
              background: 'white',
            }}
          >
            <p
              css={{
                fontSize: '14px',
                margin: '0',
              }}
            >
              {detailPokemon?.name}
            </p>
            <p
              css={{
                fontSize: '14px',
                margin: '0',
              }}
            >
              {detailPokemon?.types?.map((data, index) => {
                return (
                  <>
                    <span key={index}>{data.type.name}</span>
                    <span>
                      {detailPokemon?.types.length - 1 === index ? '' : '/'}
                    </span>
                  </>
                );
              })}
            </p>
          </div>
          <div
            css={{
              width: '100%',
              height: '200px',
              border: 'solid black 1px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: '10px',
              background: 'white',
            }}
          >
            <p
              css={{
                fontSize: '14px',
                position: 'absolute',
                top: '0',
                right: '5px',
              }}
            >
              {detailPokemon?.stats[0]?.stat.name} :
              {detailPokemon?.stats[0]?.base_stat}
            </p>
            <Image
              url={detailPokemon?.sprites?.front_default}
              styleCss={{
                height: '100%',
              }}
            />
            <Button
              text={'Catch This Pokemon'}
              onClick={() => catchPokemonClick()}
              style={{
                position: 'absolute',
                bottom: 0,
                animation: `${vibrateAnimation} 0.3s linear infinite both`,
              }}
            ></Button>
          </div>
          <div
            css={{
              width: '100%',
              height: '200px',
              border: 'solid black 1px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              position: 'relative',
              background: 'white',
            }}
          >
            <div
              css={{
                width: '100%',
                height: '30px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {cardTabs.map((data) => renderTabClick(data.name))}
            </div>
            <div
              css={{
                width: '100%',
                height: '180px',
                borderBottom: '1px solid black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {renderTabContent(currentCardTabs)}
            </div>
          </div>
        </div>
      ) : (
        <>
          <SolarSystemLoading />
        </>
      )}
      {catchSceneShow ? (
        <CatchScene
          currentPokemon={detailPokemon}
          backToCatch={() => router.back()}
          isCatch={isSuccesCatch}
          backToCollection={() => router.push('/collections')}
        />
      ) : (
        ''
      )}
    </motion.div>
  );
};
DetailPokemon.getInitialProps = async (ctx) => {
  const { query } = ctx;
  return { query: query };
};

export default DetailPokemon;
