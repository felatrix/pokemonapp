/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Image from '../../components/base/image';
import Button from '../../components/base/button';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCards } from 'swiper';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import { GET_LIST } from '../../utils/graphql/queries/pokemon';
import getRandomInt from '../../utils/graphql/randomNumber';
import client from '../../utils/graphql/apollo-client';

import { SolarSystemLoading } from 'react-loadingg';

import { useAppContext } from '../../contexts/AppContext';

import { motion } from 'framer-motion';

const Catch = ({ data }) => {
  const bounceAnimation = keyframes`0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }`;
  SwiperCore.use([Autoplay, EffectCards]);

  const { pokemons } = data;
  const { results } = pokemons;

  const [refreshFetch, setRefreshFetch] = useState(false);
  const [listPokeMonCatch, setListPokemonCatch] = useState(results);
  const [currentPokemonDisplay, setCurrentPokemonDisplay] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const { state } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setCurrentPokemonDisplay(listPokeMonCatch[0]);
  }, []);

  useEffect(() => {
    setCurrentPokemonDisplay(listPokeMonCatch[0]);
  }, [listPokeMonCatch]);

  const refreshCatchList = () => {
    setRefreshFetch(true);
    const listPokemonParam = {
      limit: 10,
      //maximal offset from pokeapi is 1117
      offset: getRandomInt(0, 1117),
    };

    client
      .query({
        query: GET_LIST,
        variables: listPokemonParam,
      })
      .then((res) => {
        const { data } = res;
        const { pokemons } = data;
        const { results } = pokemons;
        setListPokemonCatch(results);
        setRefreshFetch(false);
      })
      .catch((err) => console.error(err));
  };

  const catchPokemonClick = () => {
    //generate random bollean with 0.5 probabilities
    // var random_boolean = Math.random() < 1;
    // setIsSuccesCatch(random_boolean);
    // setCatchSceneShow(true);
    router.push(`/detail/${currentPokemonDisplay.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {listPokeMonCatch && listPokeMonCatch.length > 0 ? (
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            height: '350px',
          }}
        >
          {!refreshFetch ? (
            <Swiper
              effect={'cards'}
              grabCursor={true}
              className="mySwiper"
              // autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSlideChange={(e) =>
                setCurrentPokemonDisplay(results[e.activeIndex])
              }
              onSwiper={(swiper) => console.log(swiper)}
            >
              {listPokeMonCatch.map((data) => {
                const searchByName = state?.pokemon.filter(
                  (item) => item.name === data.name
                );
                return (
                  <SwiperSlide key={data.name}>
                    {({ isActive }) => (
                      <div
                        css={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          css={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            animation: `${
                              isActive ? bounceAnimation : ''
                            } 1.5s ease infinite`,
                          }}
                        >
                          <Image
                            url={data.image}
                            styleCss={{ height: '200px' }}
                          />
                        </div>
                        <p
                          css={{
                            fontSize: '12px',
                            whiteSpace: 'pre-wrap',
                            textTransform: 'capitalize',
                          }}
                        >
                          {data.name.replace(/-/g, ' ')}
                        </p>
                        <p
                          css={{
                            fontSize: '12px',
                          }}
                        >
                          owned: {searchByName.length}
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}{' '}
            </Swiper>
          ) : (
            <SolarSystemLoading />
          )}
        </div>
      ) : (
        ''
      )}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          text={'Look This Pokemon Details'}
          onClick={() => catchPokemonClick()}
        ></Button>
        <Button
          text={'Refresh The Cards'}
          onClick={() => refreshCatchList()}
        ></Button>
      </div>
    </motion.div>
  );
};

export default Catch;
