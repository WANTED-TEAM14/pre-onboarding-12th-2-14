import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { IssueType } from 'types';

import IssueInfo from './IssueInfo';

export interface IssueItemPropsType {
  issue: IssueType;
}
function IssueItem({ issue }: IssueItemPropsType) {
  const { pathname } = useLocation();
  return (
    <IssueItemWrapper $pathname={pathname}>
      <Link to={`/detail/${issue.number}`} state={{ issue }}>
        <IssueInfo issue={issue} />
      </Link>
    </IssueItemWrapper>
  );
}

export default IssueItem;

const IssueItemWrapper = styled.li<{ $pathname: string }>`
  list-style: none;
`;
