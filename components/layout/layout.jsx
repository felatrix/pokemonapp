import React from 'react';
import { element } from 'prop-types';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css } from '@emotion/react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  const bodyContainerCss = {
    minHeight: '100vh',
    maxWidth: '560px',
    margin: 'auto',
    backgroundColor: 'white',
    padding: '70px 15px',
  };

  return (
    <>
      <Navbar />
      <div css={bodyContainerCss}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: element.isRequired,
};
