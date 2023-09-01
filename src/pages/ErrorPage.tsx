import React from 'react';

import { styled } from 'styled-components';

type Props = {
  error: string;
};

function ErrorPage({ error }: Props) {
  return (
    <ErrorWrapper>
      <p>{error}</p>
    </ErrorWrapper>
  );
}

export default ErrorPage;

const ErrorWrapper = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  button {
    border: none;
    background-color: #e2e2e2;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
  }
`;
