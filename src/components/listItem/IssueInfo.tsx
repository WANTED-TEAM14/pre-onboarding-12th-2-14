import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { changeDateFormat } from 'utils/changeDateFormat';

import { IssueItemPropsType } from './IssueItem';

function IssueInfo({ issue }: IssueItemPropsType) {
  const {
    number,
    title,
    created_at,
    comments,
    user: { login },
  } = issue;
  const { pathname } = useLocation();

  return (
    <IssueInfoStyle $pathname={pathname}>
      <div className='title'>
        &#35;{number} {title}
      </div>
      <div>
        <span>작성자: {login},</span>
        <span>작성일: {changeDateFormat(created_at)}</span>
      </div>
      <div className='comment'>코멘트: {comments}</div>
    </IssueInfoStyle>
  );
}

const IssueInfoStyle = styled.div<{ $pathname: string }>`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 10px;
  position: relative;
  font-size: ${({ $pathname }) => ($pathname !== '/' ? '0.9rem' : '1rem')};
  width: ${({ $pathname }) => ($pathname !== '/' ? '450px' : '')};
  & .title {
    display: inline-block;
    margin-bottom: 4px;
    font-weight: bold;
    width: ${({ $pathname }) => ($pathname !== '/' ? '300px' : '340px')};
    font-size: ${({ $pathname }) => ($pathname !== '/' ? '1rem' : '1.1rem')};
    overflow: ${({ $pathname }) => ($pathname !== '/' ? 'unset' : 'hidden')};
    text-overflow: ${({ $pathname }) => ($pathname !== '/' ? 'unset' : 'ellipsis')};
    white-space: ${({ $pathname }) => ($pathname !== '/' ? 'unset' : 'nowrap')};
  }

  .comment {
    position: absolute;
    right: 0;
    top: 16px;
  }

  &:hover {
    .title {
      text-overflow: unset;
      white-space: unset;
    }
    color: ${({ $pathname }) => ($pathname !== '/' ? 'black' : '#487eb0')};
    transition: color 0.3s ease-in-out;
  }
`;

export default IssueInfo;
