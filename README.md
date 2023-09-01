# 원티드 프리온보딩 프론트엔드 12기 Week 2 과제 - 특정 깃헙 저장소의 이슈 목록 페이지 구현

## 1. 팀원 프로필

| <img src="https://avatars.githubusercontent.com/ha-il" width=150px><br />[김형우](https://github.com/ha-il)(팀장) | <img src="https://avatars.githubusercontent.com/kimxminsu" width=150px><br />[김민수](https://github.com/kimxminsu) | <img src="https://avatars.githubusercontent.com/NEARworld" width=150px><br />[신승식](https://github.com/NEARworld) | <img src="https://avatars.githubusercontent.com/somin00" width=150px><br />[오소민](https://github.com/somin00) | <img src="https://avatars.githubusercontent.com/jyh2610" width=150px><br />[조윤환](https://github.com/jyh2610) |
| :---------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|                                         라우터 설정<br />이슈 상세 페이지                                         |                                                이슈 목록 화면<br />                                                 |                                                  에러 핸들링<br />                                                  |                                              인피니티 스크롤<br />                                              |                                               API 설정<br /> 배포                                               |

## 2. 디렉터리 구조

```
 ├ .husky # git hook 설정 자동화를 위한 husky 설정
 ├ src
 │ ├ apis # Octokit을 활용한 API 설정
 │ ├ components
 │ │ ├ common # 헤더, 로딩, 레이아웃 등 공용으로 사용되는 컴포넌트 폴더
 │ │ ├ IssueDetail # 이슈 상세 페이지 관련 컴포넌트 폴더
 │ │ │ ├ IssueDetailBody.tsx
 │ │ │ └ IssueDetailHeader.tsx
 │ │ └ listItem # 이슈 목록 페이지 관련 컴포넌트 폴더
 │ │ │ ├ Advertisement.tsx
 │ │ │ ├ IssueInfo.tsx
 │ │ │ └ IssueItem.tsx
 │ ├ hooks
 │ │ ├ useFetch.ts # api 요청 커스텀 훅
 │ │ └ useIntersect.ts # 인피니티 스크롤 커스텀 훅
 │ ├ pages
 │ │ ├ ErrorPage.tsx # API 요청 에러 처리를 위한 페이지 컴포넌트
 │ │ ├ IssueDetail.tsx # 이슈 상세 페이지 컴포넌트
 │ │ ├ IssueList.tsx # 이슈 목록 페이지 컴포넌트
 │ │ └ NotFound.tsx # 라우터 에러 처리를 위한 페이지 컴포넌트
 │ ├ routers # App 컴포넌트에서 라우터관련 코드를 분리하기 위한 라우터 관련 폴더
 │ ├ style
 │ ├ utils # Date 형식 변환 등 유틸 함수 폴더
 │ ├ App.tsx
 │ ├ constant.ts # 프로젝트 전반에 사용되는 상수 변수 파일
 │ ├ index.tsx
 │ └ types.ts # 프로젝트 전반에 사용되는 타입 관련 파일
 ├ .eslintrc # 코드 스타일 통일을 위한 esLint 설정
 └ .prettierrc # 코드 포맷팅을 위한 prettier 설정
```

## 3. 추가한 라이브러리

| 목적            | 이름                                   | 버전    | 링크                                                                                                                                         |
| --------------- | -------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP Client     | @octokit/rest                          | ^20.0.1 | [https://www.npmjs.com/package/@octokit/rest](https://www.npmjs.com/package/@octokit/rest)                                                   |
| 라우터 설정     | react-router-dom                       | ^6.14.2 | [https://www.npmjs.com/package/react-router-dom](https://www.npmjs.com/package/react-router-dom)                                             |
| 스타일          | styled-components                      | ^6.0.7  | [https://www.npmjs.com/package/styled-components](https://www.npmjs.com/package/styled-components)                                           |
| 마크다운 렌더링 | react-markdown                         | ^8.0.7  | [https://www.npmjs.com/package/react-markdown](https://www.npmjs.com/package/react-markdown)                                                 |
| 환경 설정       | eslint                                 | ^8.48.0 | [https://www.npmjs.com/package/eslint](https://www.npmjs.com/package/eslint)                                                                 |
| 환경 설정       | prettier                               | ^3.0.2  | [https://www.npmjs.com/package/prettier](https://www.npmjs.com/package/prettier)                                                             |
| 환경 설정       | husky                                  | ^8.0.3  | [https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky)                                                                   |
| 환경 설정       | lint-staged                            | ^14.0.1 | [https://www.npmjs.com/package/lint-staged](https://www.npmjs.com/package/lint-staged)                                                       |
| 환경 설정       | eslint-plugin-no-relative-import-paths | ^1.5.2  | [https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths](https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths) |

<br />

## 4. Best Practice 도출 과정 요약

Best Practice 도출 과정의 상세 설명은 해당 [링크](https://distinct-attraction-cde.notion.site/1-445e2326b84945798c1e621deb042002?pvs=4)에서 확인하실 수 있습니다.

### 4.1 API 요청 코드와 배포

데이터 페칭 octokit으로 이전 및 페칭 커스텀훅 리팩토링

- 담당: 조윤환
- axios로 이슈 데이터 페칭 받는 로직을 **Octokit**으로 변경 후 코멘트순 , 오픈여부로 데이터 소팅
- 기존 전체 이슈 , 상세 이슈로 **2번 통신하는 코드를 전체이슈만 받도록 수정**
- 깃헙 액세스 토큰 배포 시 **Netlify** 환경 변수로 적용
- 매개 변수 타입 지정 간소화
- 커스텀훅에서 각각 이슈 데이터를 받는 코드 제거

### 4.2 이슈 목록 화면

이슈 목록의 연산자/조건문 관련 리팩토링

- 담당: 김민수
- 광고 이미지 반복 연산식을 상수(repeatAdvertisement)로 처리하여 광고를 몇 번째마다 반복해서 나타내는 연산식이 분리되어 **상수이름만으로 코드 이해가 쉽도록 개선**
- **반복 사용되는 if문을 &&연산자로 변경**하여 반복되는 코드를 없애고 광고가 나타나는 조건을 명확하게 표현
- Fragment안의 IssuItem, Advertisement에서 **반복 사용되는 key 제거하여 코드 간결화**
- issue 전개 연산자 사용(IssueDetail, IssueList ), IssueItem 파라미터 수정하여 동일한 이름으로 사용되는 issue를 구분하여 표기하여 가독성을 높임
- Loading 관련 삼항연산자 제거 및 if문으로 Loading 분리하여 로딩되는 조건을 명확하게 표현

### 4.3 인피니티 스크롤

useIntersect 커스텀 훅으로 인피니티 스크롤 구현 및 개선

- 담당: 오소민
- 스크롤 감지 요소를 content가 없는 div에서 **이슈 목록의 마지막 항목(IssueItem)으로 변경**
- 데이터 로딩 문구가 로딩 상태와 상관없이 렌더링 되는 문제 해결
- **불필요한 렌더링을 줄이기 위해** 이슈 목록에 포함되는 IssueItem, Advertisement 컴포넌트에 **memoization 추가**

### 4.4 라우터 설정과 이슈 상세 화면

프로젝트 전반의 라우터 설정과 이슈 상세 화면의 컴포넌트 구조 리팩터링

- 담당: 김형우
- **createBrowserRouter 함수의 element 속성에 Layout 컴포넌트 설정**하여, Layout 컴포넌트 중복 제거.
- 마크다운 라이브러리 적용 후 css 스타일링 추가하여 마크다운 렌더링 개선.
- 이슈 리스트에서 state로 데이터를 상세 페이지로 넘기도록 리팩터링하여 **불필요한 api 요청 제거**.
- **IssueInfo 컴포넌트 생성** 후 이슈 리스트와 상세 페이지에서 **재사용할 수 있도록 개선**.
- 이슈 상세 화면을 헤더와 바디 컴포넌트로 분리하여 유지보수 용이하도록 개선.

### 4.5 에러 페이지와 에러 핸들링

api 응답 상태 코드에 따른 에러 핸들링 로직 구현

- 담당: 신승식
- **useFetch 커스텀 훅스** 안에서 handleError 함수로 api 에러 핸들링
- handleError 함수 내에서 **api 응답 코드에 대응하는 에러 문구** 설정
- handleError에서 업데이트된 errorMessage 상태를 useFetch 훅스에서 리턴
- ErrorPage 컴포넌트에서 errorMessage 상태를 props로 전달받도록 구현

<br />

## 5. 프로젝트 배포 링크

**배포 링크**: [https://effortless-lamington-3da8ae.netlify.app/](https://effortless-lamington-3da8ae.netlify.app/)

<br />

## 6. 개발 환경에서 프로젝트 실행 방법

1. 터미널에서 이 저장소를 git clone 하거나, 이 저장소의 파일을 다운받아 압축을 해제한 뒤 터미널로 열어주세요.
   <br/>
2. 터미널에 아래와 같이 명령어를 입력합니다.

   ```
   # git clone 한 경우
   cd pre-onboarding-12th-2-14

   # 파일을 다운받은 경우
   cd pre-onboarding-12th-2-14-main
   ```

3. 터미널에 `npm install`을 입력하여 의존성을 설치합니다.
   <br/>
4. `npm start`를 입력하여 애플리케이션을 실행합니다.

<br />

## 7. 데모 영상

### 7.1 이슈 목록

|                                                        이슈 목록 페이지                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------: |
| 이슈 마우스 호버 → 이슈 클릭 → 상세 페이지로 이동 → </br>공통 헤더 클릭 → 이슈 목록으로 이동 → 이미지 클릭 → 원티드 사이트로 이동 |
|   ![list-low](https://github.com/WANTED-TEAM14/pre-onboarding-12th-2-14/assets/108077643/75d80dcf-e884-4492-8cdb-0e372db8e8e6)    |

### 7.2 이슈 리스트 스크롤(인피니티 스크롤)

|                                           이슈 리스트 페이지 스크롤(인피니티 스크롤)                                           |
| :----------------------------------------------------------------------------------------------------------------------------: |
|                                     이슈 목록 스크롤 → 데이터 로딩 → 새로운 이슈 렌더링                                      |
| ![scroll-low](https://github.com/WANTED-TEAM14/pre-onboarding-12th-2-14/assets/108077643/1c9b92d0-5cc6-4b61-bc58-0680aa01a2e0) |

### 7.3 이슈 상세

|                                                        이슈 상세 페이지                                                        |
| :----------------------------------------------------------------------------------------------------------------------------: |
|                             이슈 상세 내용 렌더링 → 스크롤 → 공통 헤더 클릭 → 이슈 목록으로 이동                             |
| ![detail-low](https://github.com/WANTED-TEAM14/pre-onboarding-12th-2-14/assets/108077643/3489e4cc-707f-4d8a-a5d6-b8bc6949aab6) |
