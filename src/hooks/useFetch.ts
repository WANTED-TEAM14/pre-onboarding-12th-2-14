import { useEffect, useState } from 'react';

import { getIssues } from 'apis';
import { useLocation } from 'react-router-dom';
import { IssueType } from 'types';

type OctokitError = {
  status: 403 | 404 | 422;
};

function useFetch(page: number) {
  const { pathname } = useLocation();
  const [issueList, setIssueList] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const data = await getIssues(page);
        setIssueList(prev => {
          return [...prev, ...data];
        });
      } catch (e) {
        handleError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [page, pathname]);

  const handleError = (error: unknown) => {
    if (error && typeof error === 'object' && 'status' in error) {
      const { status } = error as OctokitError;
      setErrorMessage(
        {
          404: '잘못된 경로의 요청입니다',
          403: 'API 요청 제한 횟수 초과로 인해 요청이 제한되었습니다.',
          422: '인증이 실패했거나 너무 많은 요청 시도가 있습니다.',
        }[status],
      );
    } else setErrorMessage('Unknown Network Error');
  };

  return { issueList, loading, errorMessage };
}

export default useFetch;
