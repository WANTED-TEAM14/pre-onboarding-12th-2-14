import React from 'react';

import { useLocation } from 'react-router';
import { styled } from 'styled-components';

import Loading from 'components/common/Loading';
import IssueDetailBody from 'components/IssueDetail/IssueDetailBody';
import IssueDetailHeader from 'components/IssueDetail/IssueDetailHeader';

import ErrorPage from './ErrorPage';

function IssueDetail() {
  const location = useLocation();
  const { issue, errorMessage } = location.state;

  if (errorMessage) {
    return <ErrorPage error={errorMessage} />;
  }

  return (
    <>
      {issue ? (
        <IssueDetailWrapper>
          <IssueDetailHeader {...issue} />
          <IssueDetailBody {...issue} />
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
  width: 470px;
  padding: 0 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 20px;
`;
