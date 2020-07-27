import React from 'react';
import { css } from '@emotion/core';

export default () => {
  const emotionStyling = css`
    background-color: coral;
  `;
  return <div css={emotionStyling}>Fancy</div>;
};
