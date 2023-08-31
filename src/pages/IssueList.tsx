import React, { useState } from 'react';

import styled from 'styled-components';

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

  return (
    <>
      {issueList.length !== 0 ? (
        <IssueListWrapper>
          {issueList.map((issue, idx) => {
            if ((idx + 1) % 4 === 0) {
              return (
                <React.Fragment key={`${issue.id + idx}`}>
                  <IssueItem key={issue.id} issue={issue} />
                  <Advertisement key={idx + 1} />
                </React.Fragment>
              );
            } else {
              return <IssueItem key={issue.id} issue={issue} />;
            }
          })}
          <div ref={targetRef}></div>
          {loading && <Loading />}
        </IssueListWrapper>
      ) : (
        <Loading />
      )}
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
