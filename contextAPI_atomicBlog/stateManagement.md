# State의 종류 
<hr/>

## 👉 접근성에 따른 분류
- ### local state : 한 컴포넌트 혹은 그 자식 컴포넌트들만 사용하는 state
- ### global state : 전체 컴포넌트들이 공유하는 state 

## 👉 domain에 따른 분류

- ### Remote state : 서버(API)로부터 받아오는 데이터

  대체로 **비동기적으로** state를 저장하고, re-fetching, revalidating, caching 등이 필요하다.

- ### UI state : Remote state를 제외한 나머지. 테마, form 데이터 등..
  
  동기적으로 state를 저장하고 애플리케이션에 저장된다.


# State 관리 전략
<hr/>

## 👉 Local State 
- ### 일반 local component, lifting up이 필요하면 그 부모 컴포넌트 등에서 관리
- ### useState, useReducer, useRef 등으로 관리
   - useRef는 리렌더링을 일으키진 않지만 엄연히 state다. 

<br/>

## 👉 Global State / UI State

- ### context 통해 관리
- ### Context API + useState / useReducer 
   - Context API 자체는 state management 기능이 없다. 

<br/>

## 👉 Global state / Remote State / 필요에 따라 UI State

- ### 3rd-party 라이브러리 통해서 관리
- ### Redux, React Query, SWR, Zustand, etc. 

<br/>

## 👉 페이지간 공유하는 Global State (북마크 등)
- ### React Router에서 제공하는 useSearchParam 등으로 url에 state 저장 가능 

<br/>

## 👉사용자의 브라우저에 저장해야 하는 State 
- ### Local storage, session 등 사용. 