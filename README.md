# BOBFULL REFACTORING

​    

## 개요

- 첫 리액트 프로젝트 `밥풀(Bobfull)`의 개선판
- 프로젝트를 진행하며 아쉬웠던 부분을 추가적인 공부를 통해 습득한 지식으로 리팩토링 진행
  - 구현
    - 로그인 과정 (로그인 방식, 개인정보 저장방식)
    - 검색
    - 채팅기능
    - 지도기능
  - 정리
    - 폴더구조
    - 클린코드
    - 타입스크립트 적용
    - 커밋 형식 지키기
    - 개발 이슈 정리하기
    - ERD 정리 



## 개선내용

| 개선내용     | Before                                  | After                            |
| ------------ | --------------------------------------- | -------------------------------- |
| 프레임워크   | 프레임워크 없이 React 라이브러리만 사용 | Next.js 사용                     |
| 폴더구조     | 중구난방으로 마구 생성                  | Next.js의 컨벤션에 맞춰 생성     |
| 타입스크립트 | 미적용                                  | 적용                             |
| 회원관리     | JWT토큰 사용                            | 미정                             |
| 클린코드     | 구현을 목표로 정리없이 작성             | 다른 사람들이 알아보기 쉽게 작성 |
| SEO          | 미사용                                  | 도입 예정                        |
| 백엔드       | Django Rest Framework 사용              | Nest.js 사용                     |
| CSS          | 일반 CSS 사용                           | Emotion 사용                     |

