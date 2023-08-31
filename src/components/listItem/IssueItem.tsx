import React, { memo } from 'react';

import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IssueType } from 'types';

import IssueInfo from './IssueInfo';

function IssueItem({ ...issue }: IssueType) {
  return (
    <IssueItemWrapper>
      <Link to={`/detail/${issue.number}`} state={{ issue }}>
        <IssueInfo {...issue} />
      </Link>
    </IssueItemWrapper>
  );
}

export default memo(IssueItem);

const IssueItemWrapper = styled.div`
  list-style: none;
`;
