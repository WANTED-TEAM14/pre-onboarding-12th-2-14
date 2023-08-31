import React, { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { IssueType } from 'types';

import IssueInfo from './IssueInfo';

function IssueItem({ ...issue }: IssueType) {
  const { pathname } = useLocation();
  return (
    <IssueItemWrapper $pathname={pathname}>
      <Link to={`/detail/${issue.number}`} state={{ issue }}>
        <IssueInfo issue={issue} />
      </Link>
    </IssueItemWrapper>
  );
}

export default memo(IssueItem);

const IssueItemWrapper = styled.li<{ $pathname: string }>`
  list-style: none;
`;
