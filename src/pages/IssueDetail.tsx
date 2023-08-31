import React from 'react';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';

import Layout from 'components/common/Layout';
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
    <Layout>
      {issue ? (
        <>
          <IssueDetailWrapper>
            <div>
              <img src={`${issue.user.avatar_url}`} alt={`${issue.user.login} 이미지`} />
              <IssueInfo issue={issue} />
            </div>
          </IssueDetailWrapper>
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export default IssueDetail;

const IssueDetailWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;
