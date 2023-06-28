## React Hooks

👉 Fiber tree로부터 state를 생성하고 관리하는 등의 리액트 기능을 사용할 수 있게 해주는 내장 함수
👉 항상 'use' 로 시작해야한다

## The Rules of Hooks

👉 **1. hooks는 항상 코드 최상단(조건문/함수/반복문 등 내부x,early return다음도 x)에 호출되어야 한다.**

-> hooks는 순서에 의존하기 때문에, 항상 동일한 순서로 호출되어야 한다.
: 초기 렌더링시 생성되는 React Element tree를 바탕으로 생성되는 Fiber Tree는 각 Fiber안에 요소별 prop, state 그리고 호출된 hooks의 linked list를 가지고 있다. linked list는 각 요소가 다음 요소에 대한 link를 가지고 있는데, 다음과 같은 코드에서는 hooks의 linked list가 깨지게 될수 있고, 그럼 hooks가 제대로 동작하지 않는다.

```js
const [A, setA] = useState(5);
if(A === 23) const [B, setB] = useState(''); 
// 만약 A가 23으로 바뀌면 B hook은 호출되지 않고, 고정된 순서를 가지고 있는 hooks의 linked list가 깨지게 된다. (Fiber Tree는 초기렌더링 이후 재렌더링이 일어나지 않기 때문에 Fiber도 수정 불가능)
useEffect(fnz, []);
```

👉 2. hooks는 반드시 React 함수안에서 호출해야 한다.

## useState

👉 **state 생성**

- 값으로 state 초기화
- 콜백 함수의 return 값으로 초기화(이 때 콜백함수는 순수함수여야 하고, 인자를 받을 수 없다. 최초 mount시에 한번 실행)
  
  ```js
  const [watched, setWatched] = useState(function () {
       const storedValue = localStorage.getItem("watched");
       return JSON.parse(storedValue);
   });
  ```

👉 **state update**

- 반드시 이전 객체를 참조하지 않는 새 객체로 update해야한다.
- **한 실행컨텍스트 내의 여러 state update는 스케쥴링에 의해 batching(일괄처리) 된다.**
  
  ```js
  function handleTripleInc() {
       // state-batching으로 인해 아래의 likes는 모두 동일한 값이다.
       // setLikes(likes + 1);
       // setLikes(likes + 1);
       // setLikes(likes + 1);
  
       // 최신(현재) state를 기반으로 setState
       setLikes(likes => likes + 1);
       setLikes(likes => likes + 1);
       setLikes(likes => likes + 1);
   }
  ```

## useRef

👉 렌더링시에도 불변하는 데이터를 저장하는 Ref객체를 생성한다.
👉 .current 프로퍼티를 통해 데이터를 조회/수정 할 수 있다. **(Ref도 렌더링 로직에서 조회/수정하지 말것)**

- 이전 state 값, setTimeout 함수 등 렌더링으로 인해 초기화 되지 않아야하는 값 저장
- **DOM 요소 선택 및 저장**

👉 state와의 차이점

- .current를 통해 값을 조회/수정해도 re-rendering이 유발되지 않는다.
- mutable 하다
- update를 동기적으로 수행한다 (업데이트 직후에 바뀐 값 사용 가능)



