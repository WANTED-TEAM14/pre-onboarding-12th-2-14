import { styled } from 'styled-components';
import { IssueType } from 'types';

import IssueInfo from 'components/listItem/IssueInfo';

function IssueDetailHeader({ ...issue }: IssueType) {
  return (
    <IssueDetailHeaderWrapper>
      <img src={`${issue.user.avatar_url}`} alt={`${issue.user.login} 이미지`} />
      <IssueInfo {...issue} />
    </IssueDetailHeaderWrapper>
  );
}

export default IssueDetailHeader;

const IssueDetailHeaderWrapper = styled.div`
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
