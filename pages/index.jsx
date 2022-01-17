/* eslint-disable react/prop-types */
import React from 'react';

import { GET_LIST } from '../utils/graphql/queries/pokemon';
import client from '../utils/graphql/apollo-client';
import getRandomInt from '../utils/graphql/randomNumber';

import '../styles/Home.module.css';

/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import Catch from '../components/sections/catchSection';

const Home = ({ data }) => {
  return (
    <div>
      <Catch data={data} />
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    variables: {
      limit: 10,
      //maximal offset from pokeapi is 1117
      offset: getRandomInt(0, 1117),
    },
    query: GET_LIST,
    ssrMode: true,
  });
  return {
    props: { data },
  };
}

export default Home;
