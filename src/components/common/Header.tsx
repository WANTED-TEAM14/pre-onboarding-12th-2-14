import React from 'react';

import { REPO_INFO } from 'constant';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function Header() {
  const { organization, repository } = REPO_INFO;
  return (
    <HeaderWrapper>
      <Link to='/'>{`${organization} / ${repository}`}</Link>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  width: 500px;
  text-align: center;
  padding: 30px 0;
  font-size: 1.6rem;
`;
