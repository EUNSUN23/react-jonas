## React 성능 최적화

### 1. 렌더링 최적화

✅ 컴포넌트 인스턴스 리렌더링이 일어나는 상황
: state가 변할때, context가 변할때, 부모 컴포넌트가 리렌더링될 때

✅ DOM 구조에 변화가 없는 필요 없는 렌더링을 줄인다.

#### **Memoization**

: 순수함수인 함수를 한번만 호출해서 결과를 메모리에 저장하고, 같은 인자값에 대해서는 함수를 재호출하지 않고 메모리에 저장된 결과값을 반환하는 성능최적화 방법

- **memo (컴포넌트 Memoize)**
  : 부모 컴포넌트가 리렌더링 되어도 넘겨받는 props가 변하지 않으면 리렌더링 되지 않는 컴포넌트 생성
  (props 변화 외에 구독하는 context의 변화, 자기 자신의 state변화 등으로 인한 리렌더링은 막지 못한다)
  렌더링 비용이 많이들어서 ui가 느려지는 무거운 컴포넌트에만 적용해줘도 충분하다.
  
  단 부모가 리렌더링시 내려주는 props가 렌더링마다 새로 생성되는 **함수/객체** 등이면 매 렌더링마다 다른 props를 받는 것으로 인지하므로 memoization이 되지 않는다. -> 내려주는 props에 대해서 **useMemo**나 **useCallback**으로 memoize해줘야 한다.
  <br/>
- **useMemo(객체 Memoize), useCallback(함수 memoize)**
  : 디펜던시 값이 변하지 않는 이상, 인자로 받는 값을 메모리에 저장하고 재렌더링시 저장한 값을 반환한다. 디펜던시 값이 변하면 새 인자값을 생성해서 메모리에 저장한다.
  
  - memo와 함께 컴포넌트 리렌더링 자체를 줄이기 위해(props에 대한 memoization 수행)
  - 렌더링시 실행되는 로직 비용을 줄이기 위해
  - 다른 hook의 디펜던시 값에 대해 memoization하기 위해
    <br/>
- **context optimization**
  
  - context의 state가 항상 바뀌고, 컨슈머가 많고, 애플리케이션이 실제로 느릴 때 수행한다

<br/>

#### **자식 컴포넌트를 props로 받기**

```
function Counter({children}) {
 const [count, setCount] = useState(0);
 return (
     <div>
         <h1>Slow counter?!?</h1>
         <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
         {children} {/*Counter컴포넌트 외부에서 생성되어 전달되므로 Counter의 재렌더링에 영향 받지 않는다.*/}
     </div>
 );
}

export default function Test() {
 return (
     <Counter>
         <SlowComponent/>
     </Counter>
 );
}
```

### 2. 애플리케이션 속도/반응최적화

- useMemo
- useCallback
- useTransition

### 3. 번들 사이즈 최적화

- 3rd-party 라이브러리 사용 최소화
- 코드 스플리팅 & lazy loading

