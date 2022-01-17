import React from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

const Input = ({ onChange, value, style, onKeyUp, onKeyDown }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyUp={() => onKeyUp()}
      onKeyDown={() => onKeyDown()}
      css={{
        ...style,
        borderRadius: '5px',
        padding: '5px 10px',
        border: '#00000042 solid 1px',
        fontFamily: 'PKMN RBYGSC',
      }}
    />
  );
};

export default Input;
