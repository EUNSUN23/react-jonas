## React Hooks

👉 Fiber tree로부터 state를 생성하고 관리하는 등의 리액트 기능을 사용할 수 있게 해주는 내장 함수
<br/>
👉 항상 'use' 로 시작해야한다

## The Rules of Hooks

👉 **1. hooks는 항상 코드 최상단(조건문/함수/반복문 등 내부x,early return다음도 x)에 호출되어야 한다.**
<br/>
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
<br/>
👉 .current 프로퍼티를 통해 데이터를 조회/수정 할 수 있다. **(state와 마찬가지로 Ref.current값도 렌더링 로직(렌더링 일어날때마다 실행되는 영역)에서 조회/수정하지 말자.)**
- .current 프로퍼티를 통한 값 변경은 주로 이벤트 핸들러나 useEffect내부에서 한다.

👉 jsx내부에서도 ref를 사용할 수 있지만, 보통 jsx로 사용자들에게 보일 필요가 없는 데이터를 저장하는데 사용한다. 

- 이전 state 값, setTimeout 함수 ID값 등 렌더링으로 인해 초기화 되지 않아야하는 값 저장
  <br/><br/>
  - **DOM 요소 선택 및 저장**
  <br/><br/>
    - Ref 적용 하지 않고 DOM요소 선택하기: 
      ```js
      // Search 컴포넌트 첫 마운트시 search Input에 포커스 가도록 하기 
        function Search({query,setQuery}){
            useEffiect(function(){
                const el = document.querySelector(".search");
                el.focus();
            },[]);
      
        return(
            <input
                className="search"
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        )
      }
       ```
      👉 의도한대로 정상동작하지만, 선언형 프로그래밍을 하는 리액트의 취지와 맞지 않는다. 
      <br/>
      👉 search 요소를 css선택자로 선택하기위해서는 굳이 input에 class를 붙여야 한다. 
      <br/> <br/>
- Ref 적용해서 DOM요소 선택: 
  ```js
     function Search({query, setQuery}) {
         const inputEl = useRef(null); // 초기값 - null
    
          useEffect(function () {
    
                function callback(event) {
                    if (event.code.toLowerCase() === key.toLowerCase()){
                        if (document.activeElement === inputEl.current) return;  // 이미 focus된 상태면 return
                            inputEl.current.focus();
                            setQuery("");
                        }                 
                 }
  
                document.addEventListener('keydown', callback); // MovieDetails인스턴스가 mount될때마다 이벤트리스너가 누적되어서 등록된다.--> cleanup 필요
          
              return function () {
                  document.removeEventListener('keydown', callback);
              };

        }, [setQuery]);
                
          return (
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputEl}
            />
          );
      }
   ```
  👉 선언형 프로그래밍 방식으로, inputEl이 어느 input가리키는지 단순하게 알 수 있다. 
  <br/>
  👉 inputElement에는 DOM 로딩이 완료된 후에 접근 가능하므로, useEffect안에서만 ref.current를 사용한 수정이 가능하다. 
  <br/><br/>

👉 state와의 차이점

- **.current를 통해 값을 조회/수정해도 re-rendering이 유발되지 않는다.**
- mutable 하다
- update를 동기적으로 수행한다 (업데이트 직후에 바뀐 값 사용 가능)

## React.forwardRef 
<hr/>


> 💡 **ref의 값은 노드의 유형에 따라 다르다.** 
>  - ref 어트리뷰트가 HTML 엘리먼트에 쓰였다면, 생성자에서 React.createRef()로 생성된 ref는 자신을 전달받은 DOM 엘리먼트를 current 프로퍼티의 
> 값으로 받는다. 
>  - ref 어트리뷰트가 커스텀 클래스 컴포넌트에 쓰였따면, ref 객체는 마운트된 컴포넌트의 인스턴스를 current프로퍼티의 값으로서 받는다.
>  - **함수 컴포넌트는 인스턴스가 없기 때문에 함수 컴포넌트에는 ref 어트리뷰트를 사용할 수 없다.**

<br/>

### 함수 컴포넌트를 ref로 제어하기 위해서는 forwardRef함수로 해당 컴포넌트를 감싸야 한다. 
#### 👉 ex: 부모 컴포넌트에서 함수컴포넌트를 ref로 제어해서 포커스 등을 할 때 
   ```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
    const { label, ...otherProps } = props;
    
    return (
      <label>
        {label}
        <input {...otherProps} ref={ref} />
      </label>
    );
});
```

```js
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```
출처: https://react.dev/reference/react/forwardRef