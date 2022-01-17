/* eslint-disable react/prop-types */
import React from 'react';

/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css } from '@emotion/react';

const Button = ({ text, style, onClick }) => {
  const buttonCss = {
    background: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '#00000042 solid 1px',
    cursor: 'pointer',
    minWidth: '100px',
    whiteSpace: 'pre-wrap',
    fontFamily: 'PKMN RBYGSC',
    margin: '5px 0',
  };
  return (
    <input
      type="button"
      value={text}
      css={{ ...style, ...buttonCss }}
      onClick={onClick ? () => onClick() : null}
    ></input>
  );
};

export default Button;
