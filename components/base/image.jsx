import React from 'react';
import { string, object } from 'prop-types';
// /** @jsxImportSource @emotion/react */
// // eslint-disable-next-line no-unused-vars
// import { css } from '@emotion/react';

const Image = ({ url, styleCss }) => {
  const imageStyle = {
    objectFit: 'cover',
  };
  if (url !== '') {
    return <img src={url} css={{ ...imageStyle, ...styleCss }} />;
  } else {
    return (
      <img
        src={'./images/placeholder.png'}
        css={{ ...imageStyle, ...styleCss }}
      />
    );
  }
};

Image.propTypes = {
  url: string,
  styleCss: object,
};

Image.defaultProps = {
  url: '',
  styleCss: {},
};

export default Image;
