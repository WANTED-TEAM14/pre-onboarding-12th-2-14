import React, { useState } from 'react';

import styled from 'styled-components';

import Layout from 'components/common/Layout';
import Loading from 'components/common/Loading';
import Advertisement from 'components/listItem/Advertisement';
import IssueItem from 'components/listItem/IssueItem';
import useFetch from 'hooks/useFetch';
import useIntersect from 'hooks/useIntersect';

import ErrorPage from './ErrorPage';

function IssueList() {
  const [page, setPage] = useState<number>(1);
  const { issueList, loading, isShowError } = useFetch({ currentNum: page });
  const { targetRef } = useIntersect({ loading, setPage });

  if (isShowError) {
    return <ErrorPage />;
  }

  if (issueList.length === 0) {
    return <Loading />;
  }

  return (
    <Layout>
      <IssueListWrapper>
        {issueList.map((issue, idx) => {
          const repeatAdvertisement = (idx + 1) % 4 === 0;
          const isLastIssue = idx === issueList.length - 1;
          return (
            <li key={issue.number} ref={isLastIssue ? targetRef : null}>
              <IssueItem {...issue} />
              {repeatAdvertisement && <Advertisement />}
            </li>
          );
        })}
        {loading && <Loading />}
      </IssueListWrapper>
    </Layout>
  );
}

export default IssueList;

const IssueListWrapper = styled.ul`
  height: 600px;
  margin: 0 10px;
  padding: 20px;
  overflow-y: auto;
`;
