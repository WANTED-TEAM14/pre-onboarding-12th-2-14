import { createBrowserRouter } from 'react-router-dom';

import Layout from 'components/common/Layout';
import IssueDetail from 'pages/IssueDetail';
import IssueList from 'pages/IssueList';
import NotFound from 'pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <IssueList /> },
      { path: '/detail/:issueNumber', element: <IssueDetail /> },
    ],
  },
]);

export default router;
