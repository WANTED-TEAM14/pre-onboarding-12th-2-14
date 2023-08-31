import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { styled } from 'styled-components';

import { IssueItemPropsType } from 'components/listItem/IssueItem';

/* interface IssueBody {
  issueBody: string;
}
 */
function IssueDetailBody({ issue }: IssueItemPropsType) {
  return (
    <IssueDetailBodyWrapper>
      <ReactMarkdown>{issue.body}</ReactMarkdown>
    </IssueDetailBodyWrapper>
  );
}

export default IssueDetailBody;

const IssueDetailBodyWrapper = styled.div`
  margin-bottom: 16px;
  word-break: break-all;
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.4rem;
  }
  h3 {
    font-size: 1.3rem;
  }
  h1,
  h2,
  h2 {
    margin: 1rem 0;
  }
  p {
    margin: 0.5rem 0;
  }
  img {
    width: 100%;
  }
  pre {
    overflow: scroll;
  }
  code {
    background-color: whitesmoke;
    padding: 0 0.25rem;
    border-radius: 4px;
  }
  ul,
  li {
    list-style: disc;
    margin-left: 0.5rem;
  }
`;
