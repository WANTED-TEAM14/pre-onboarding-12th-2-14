import { styled } from 'styled-components';

import IssueInfo from 'components/listItem/IssueInfo';
import { IssueItemPropsType } from 'components/listItem/IssueItem';

function IssueDetailHeader({ issue }: IssueItemPropsType) {
  return (
    <IssueDetailHeaderWrapper>
      <img src={`${issue.user.avatar_url}`} alt={`${issue.user.login} 이미지`} />
      <IssueInfo issue={issue} />
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
