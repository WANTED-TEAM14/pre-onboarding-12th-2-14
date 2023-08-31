# 원티드 프리온보딩 프론트엔드 2주차 개인 과제

#### 개발 환경 프로젝트 실행 방법

```
npm install
npm start
```

### 기능 구현 내용

GitHub Rest API를 이용하여 facebook의 react 레포지토리 이슈 목록을 보여줍니다.

1. 공통 헤더

   Layout 컴포넌트에 Header와 children을 렌더링 하도록 작성했습니다.

   Header를 필요로 하는 페이지를 Layout으로 감싸서 Header를 공통으로 사용했습니다.
   
   <br/>

2. IssueList 이슈 목록 페이지

   open 상태인 이슈들을 코멘트가 많은 순서대로 정렬하여 보여줍니다.

   이슈는 10개씩 로딩되며 IntersectionObserver API를 이용하여 무한 스크롤 기능을 구현했습니다.

   다섯번째 셀마다 광고 이미지 출력하는 기능을 위해 Advertise 컴포넌트를 사용했습니다.

   사용 데이터: 이슈 번호, 이슈 제목, 작성자, 작성일, 코멘트
   
   <br/>

3. IssueDetail 이슈 상세 페이지

   이슈 number로 특정 이슈를 가져오는 API를 사용했습니다.

   IssueList에서 특정 이슈를 클릭하는 경우 Link state로 이슈 number를 넘겨주는 방법을 사용했습니다.

   사용 데이터: 작성자 이미지, 이슈 번호, 이슈 제목, 작성자, 작성일, 코멘트
   
   <br/>

4. 에러 페이지

   이슈 데이터를 가져오지 못하는 경우 “데이터를 불러오는데 실패했습니다. 새로고침 후 이용해주세요.” 문구를

   보여주는 페이지입니다.

   <br/>

5. 404 페이지

   존재하지 않는 경로로 접근하는 경우 “페이지가 존재하지 않습니다.” 문구와 메인 페이지로 이동할 수 있는 버튼을

   보여주는 페이지입니다.
   
   <br/>

6. Loading 컴포넌트

   이슈 목록, 이슈 상세 내용, 무한스크롤 기능 작동시 데이터 로딩 과정에 “데이터를 로딩중입니다” 문구를 보여주는 컴포넌트입니다.

   <br/>

**[custom hooks]**

컴포넌튼 내에서 상태 관리와 기능 작동 로직이 너무 많이 작성되어 커스텀 훅으로 분리했습니다.

- useFetch: 이슈 목록 또는 이슈를 가져오는 api 통신
- useIntersect: 무한스크롤