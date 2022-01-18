import React from 'react';

/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css } from '@emotion/react';

import { string, object, func } from 'prop-types';

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

Button.propTypes = {
  text: string.isRequired,
  style: object,
  onClick: func,
};

Button.defaultProps = {
  style: {},
  onClick: () => null,
};

export default Button;
