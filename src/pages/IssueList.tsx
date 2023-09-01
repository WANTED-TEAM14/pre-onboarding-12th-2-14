import React, { useState } from 'react';

import styled from 'styled-components';

import Loading from 'components/common/Loading';
import Advertisement from 'components/listItem/Advertisement';
import IssueItem from 'components/listItem/IssueItem';
import useFetch from 'hooks/useFetch';
import useIntersect from 'hooks/useIntersect';

import ErrorPage from './ErrorPage';

const TARGET_IDX = 4;

function IssueList() {
  const [page, setPage] = useState<number>(1);
  const { issueList, loading, isShowError, errorMessage } = useFetch({ currentNum: page });
  const { targetRef } = useIntersect({ loading, setPage });

  const isAdvertisementCell = (idx: number) => {
    return (idx + 1) % TARGET_IDX === 0;
  };

  const checkIsLastIssue = (idx: number) => {
    return idx === issueList.length - 1;
  };

  if (isShowError) {
    return <ErrorPage error={errorMessage} />;
  }

  if (issueList.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <IssueListWrapper>
        {issueList.map((issue, idx) => {
          return (
            <li key={issue.number} ref={checkIsLastIssue(idx) ? targetRef : null}>
              <IssueItem {...issue} errorMessage={errorMessage} />
              {isAdvertisementCell(idx) && <Advertisement />}
            </li>
          );
        })}
        {loading && <Loading />}
      </IssueListWrapper>
    </>
  );
}

export default IssueList;

const IssueListWrapper = styled.ul`
  height: 600px;
  margin: 0 10px;
  padding: 20px;
  overflow-y: auto;
`;
