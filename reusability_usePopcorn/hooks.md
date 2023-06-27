## React Hooks

👉 Fiber tree로부터 state를 생성하고 관리하는 등의 리액트 기능을 사용할 수 있게 해주는 내장 함수
👉 항상 'use' 로 시작해야한다

## The Rules of Hooks

#### 1. hooks는 항상 코드 최상단(조건문/함수/반복문 등 내부x,early return다음도 x)에 호출되어야 한다.

-> hooks는 순서에 의존하기 때문에, 항상 동일한 순서로 호출되어야 한다.
: 초기 렌더링시 생성되는 React Element tree를 바탕으로 생성되는 Fiber Tree는 각 Fiber안에 요소별 prop, state 그리고 호출된 hooks의 linked list를 가지고 있다. linked list는 각 요소가 다음 요소에 대한 link를 가지고 있는데, 다음과 같은 코드에서는 hooks의 linked list가 깨지게 될수 있고, 그럼 hooks가 제대로 동작하지 않는다.

```js
const [A, setA] = useState(5);
if(A === 23) const [B, setB] = useState(''); 
// 만약 A가 23으로 바뀌면 B hook은 호출되지 않고, 고정된 순서를 가지고 있는 hooks의 linked list가 깨지게 된다. (Fiber Tree는 초기렌더링 이후 재렌더링이 일어나지 않기 때문에 Fiber도 수정 불가능)
useEffect(fnz, []);
```

#### 2. hooks는 반드시 React 함수안에서 호출해야 한다.

