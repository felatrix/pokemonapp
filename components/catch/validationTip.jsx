import React from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css } from '@emotion/react';
import { object, bool } from 'prop-types';

const ValidationTip = ({ show, data }) => {
  const tooltipText = {
    fontSize: '10px',
  };
  return (
    <div
      css={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? 1 : 0,
        width: '140px',
        height: '100px',
        backgroundColor: '#555',
        color: '#fff',
        textAlign: 'center',
        padding: '5px 0',
        borderRadius: '6px',
        position: 'absolute',
        zIndex: 30,
        bottom: '44%',
        left: '78%',
        marginLeft: '-60px',
        transition: 'opacity 0.3s',
        '&::after': css({
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '35%',
          marginLeft: '-5px',
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: '#555 transparent transparent transparent',
        }),
      }}
    >
      <p
        css={{
          ...tooltipText,
          textDecoration: !data?.minChar ? 'line-through' : 'none',
        }}
      >
        Char min 4
      </p>
      <p
        css={{
          ...tooltipText,
          textDecoration: !data?.maxChar ? 'line-through' : 'none',
        }}
      >
        Char max 8
      </p>
      <p
        css={{
          ...tooltipText,
          textDecoration: !data?.noSpace ? 'line-through' : 'none',
        }}
      >
        no space char
      </p>
    </div>
  );
};

ValidationTip.propTypes = {
  show: bool.isRequired,
  data: object.isRequired,
};

export default ValidationTip;
