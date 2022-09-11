# YouTube 클론코딩

### Demo : [youtubeclone-lani.netlify.app](https://youtubeclone-lani.netlify.app/)

### 사용 기술

- HTML, CSS, JavaScript

### 개발 목표

- ES6 모듈 형태로 구현
- HTML, CSS(Flex Box, Grid, media query) 이해를 바탕으로 반응형 웹 구현

### 개발 기간

- 진행중(2022.08.20~)

### 컴포넌트 구조

- URL 라우팅에 따라 MainPage, VideoSearchPage, VideoDetailPage 컴포넌트를 렌더링하는 구조
  ![유튜브 클론코딩 컴포넌트 구조](/imgs/IMG_1895.jpg)

### 주요기능

- ES6 모듈 형태로 작성
  - import, export 기능 이용
- media query를 적용하여 반응형으로 구현
- youTube Api 활용하여 데이터 조회
  - async/await 사용
  - serverless function 중 Netlify Functions를 활용하여 API키 숨김 처리
- 동영상 리스트 중 하나를 선택하여 페이지 이동시 이벤트 위임을 활용하여 처리

### 개선사항

- 동영상 검색시 최근 검색어 저장하여 보여주기
- 에러가 발생할 수 있는 상황에 대해 방어코드 작성
- 메인화면 동영상들 스크롤 시에 Lazy Loading 구현
- 좋아요/싫어요/... 버튼들 구현

### 참고사이트

- [드림코딩] 클론코딩 유튜브 사이트 따라 만들기(HTML+CSS 연습편, 웹 포트폴리오) | 프론트엔드 개발자 입문편: HTML, CSS, Javascript
- [유튜브] https://youtu.be/67stn7Pu7s4
- [프로그래머스 블로그] 과제테스트 연습 문제 해설
  - 프로그래밍 언어 검색: https://prgms.tistory.com/139
  - 쇼핑몰 SPA : https://prgms.tistory.com/113
  - 고양이 사진첩 애플리케이션 : https://prgms.tistory.com/53
- MDN
  - History API : https://developer.mozilla.org/ko/docs/Web/API/History_API
