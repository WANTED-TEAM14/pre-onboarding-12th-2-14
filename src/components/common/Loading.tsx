import React from 'react';

import { styled } from 'styled-components';

function Loading() {
  return <LoadingWrapper>데이터를 로딩중입니다.</LoadingWrapper>;
}

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-weight: bold;
`;
