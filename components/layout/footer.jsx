import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// eslint-disable-next-line no-unused-vars
import Image from '../base/image';

import { MdCatchingPokemon } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';

import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const footerCss = {
    maxWidth: '560px',
    margin: 'auto',
    height: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '15px 15px',
    backgroundColor: '#ccd0d3',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  };

  const footerContainerCss = {
    height: '70px',
    position: 'fixed',
    width: '100%',
    bottom: 0,
    zIndex: 30,
  };

  const footerIconCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    height: '100%',
    alignItems: 'center',
    cursor: 'pointer',
    width: '80px',
    transition: 'all 1s easy-in-out',
    '& p': css({
      margin: '0',
      marginTop: '5px',
      color: '#0a8bfb',
      fontSize: '10px',
    }),
  };

  return (
    <div css={footerContainerCss}>
      <div css={footerCss}>
        <div css={footerIconCss} onClick={() => router.push('/collections')}>
          <BiCollection
            size={30}
            color={router.asPath === '/collections' ? '#0a8bfb' : ''}
          />
          <p>Collections</p>
        </div>
        <div css={footerIconCss}>
          <MdCatchingPokemon
            size={30}
            onClick={() => router.push('/')}
            color={router.asPath === '/' ? '#0a8bfb' : ''}
          />
          <p>Catch</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
