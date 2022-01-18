import React from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';
import { func, string, object } from 'prop-types';

const Input = ({ onChange, value, style, onKeyUp, onKeyDown }) => {
  console.log('🚀 ~ file: input.jsx ~ line 8 ~ Input ~ onKeyDown', onKeyDown);
  console.log('🚀 ~ file: input.jsx ~ line 8 ~ Input ~ onKeyUp', onKeyUp);
  console.log('🚀 ~ file: input.jsx ~ line 8 ~ Input ~ style', style);
  console.log('🚀 ~ file: input.jsx ~ line 8 ~ Input ~ value', value);
  console.log('🚀 ~ file: input.jsx ~ line 8 ~ Input ~ onChange', onChange);
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

Input.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  style: object,
  onKeyUp: func,
  onKeyDown: func,
};

Input.defaultProps = {
  style: {},
  onKeyUp: () => null,
  onKeyDown: () => null,
};

export default Input;
