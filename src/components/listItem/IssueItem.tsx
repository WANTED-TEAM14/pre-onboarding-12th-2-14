import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { IssueType } from 'types';
import { changeDateFormat } from 'utils/changeDateFormat';

interface IssueItemPropsType {
  issue: IssueType;
}
function IssueItem({ issue }: IssueItemPropsType) {
  const { pathname } = useLocation();
  return (
    <IssueItemWrapper $pathname={pathname}>
      <Link to={`/detail/${issue.number}`} state={{ issue }}>
        &#35;{`${issue.number} ${issue.title}`}
      </Link>
      <div>
        <span>작성자: {`${issue.user.login}`}, </span>
        <span>작성일: {`${changeDateFormat(issue.created_at)}`}</span>
      </div>
      <span className='comment'>코멘트: {`${issue.comments}`}</span>
    </IssueItemWrapper>
  );
}

export default IssueItem;

const IssueItemWrapper = styled.li<{ $pathname: string }>`
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 10px;
  position: relative;
  font-size: ${({ $pathname }) => ($pathname !== '/' ? '0.9rem' : '1rem')};

  a {
    display: inline-block;
    margin-bottom: 4px;
    width: ${({ $pathname }) => ($pathname !== '/' ? '300px' : '340px')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    font-size: ${({ $pathname }) => ($pathname !== '/' ? '1rem' : '1.1rem')};
  }

  .comment {
    position: absolute;
    right: 0;
    top: 16px;
  }
`;
