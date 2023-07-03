# State Management

## Types Of State

#### 1. 접근성 - local VS global

#### 2. State Domain

- ##### Remote state : 서버(API)로부터 받아오는 데이터

  👉 대체로 비동기적으로 state를 저장하고, re-fetching, updating이 필요하다.

- ##### UI state : Remote state를 제외한 나머지. 테마, form 데이터 등..
  
  👉 동기적으로 state를 저장하고 애플리케이션에 저장된다.


