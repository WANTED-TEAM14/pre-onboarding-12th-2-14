import { useEffect, useState } from 'react';

import { getIssues } from 'apis';
import { useLocation } from 'react-router-dom';
import { IssueType } from 'types';

function useFetch({ currentNum }: { currentNum: number }) {
  const { pathname } = useLocation();
  const [issueList, setIssueList] = useState<IssueType[]>([]);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await getIssues(currentNum);

        setLoading(true);
        setIssueList(prev => {
          return [...prev, ...data];
        });
      } catch (e) {
        setIsShowError(true);
      }
    };
    fetchIssues();
  }, [currentNum, pathname]);

  return { issueList, loading, isShowError };
}

export default useFetch;
