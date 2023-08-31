import React from 'react';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';

import Loading from 'components/common/Loading';
import IssueInfo from 'components/listItem/IssueInfo';

import ErrorPage from './ErrorPage';

function IssueDetail() {
  const location = useLocation();
  const issue = location.state.issue;

  if (!issue) {
    return <ErrorPage />;
  }

  return (
    <>
      {issue ? (
        <IssueDetailWrapper>
          <IssueDetailHeader>
            <img src={`${issue.user.avatar_url}`} alt={`${issue.user.login} 이미지`} />
            <IssueInfo issue={issue} />
          </IssueDetailHeader>
          <IssueDetailBody>
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </IssueDetailBody>
        </IssueDetailWrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default IssueDetail;

const IssueDetailWrapper = styled.div`
  height: 600px;
  width: 500px;
  padding: 0% 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 20px;
`;

const IssueDetailHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;

  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;

const IssueDetailBody = styled.div`
  margin-bottom: 16px;
  word-break: break-all;
`;
