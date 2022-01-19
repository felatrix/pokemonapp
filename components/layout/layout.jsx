import React from 'react';
import { element } from 'prop-types';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css } from '@emotion/react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  const bodyContainerCss = {
    margin: 'auto',
    backgroundColor: 'white',
    width: '100%',
  };

  return (
    <>
      <Navbar />
      <div css={bodyContainerCss}>
        <div
          css={{
            maxWidth: '560px',
            margin: 'auto',
            minHeight: '100vh',
            padding: '70px 15px',
            boxShadow: '0 0 48px 0 rgb(0 0 0 / 20%)',
          }}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: element.isRequired,
};
