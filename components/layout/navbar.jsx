/* eslint-disable no-undef */
import React from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import Image from '../base/image';

const Navbar = () => {
  const navbarCss = {
    maxWidth: '560px',
    margin: 'auto',
    height: '60px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 15px',
  };

  const navbarContainerCss = {
    height: '60px',
    position: 'fixed',
    width: '100%',
    zIndex: 30,
  };

  return (
    <div css={navbarContainerCss}>
      <div css={navbarCss}>
        <Image
          styleCss={{ height: '100%' }}
          url={`${process.env.PUBLIC_URL}/images/navbar-logo.png`}
        />
        <div>
          <Image
            styleCss={{ height: '40px' }}
            url={`${process.env.PUBLIC_URL}/images/pokeball.png`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
