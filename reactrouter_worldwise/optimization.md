## React 성능 최적화

### 1. 렌더링 최적화

✅ **컴포넌트 인스턴스 리렌더링이 일어나는 상황**
: state가 변할때, context가 변할때, 부모 컴포넌트가 리렌더링될 때

✅ **DOM 구조에 변화가 없는 필요 없는 렌더링을 줄인다.**

✅ **최적화 TOOL**

- memo
- useMemo
- useCallback
- 자식 컴포넌트를 children이나 일반 prop으로 내려줌

### 2. 애플리케이션 속도/반응최적화

- useMemo
- useCallback
- useTransition



### 3. 번들 사이즈 최적화

- 3rd-party 라이브러리 사용 최소화
- 코드 스플리팅 & lazy loading

