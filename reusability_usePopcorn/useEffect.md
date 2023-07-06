## useEffect의 effect 실행

### 👉 **Render phase -> Commit phase -> Browser painting -> effect**

: 이펙트는 data fetching등 시간이 많이 소요되는 작업을 수행할 때가 있어서, 이로 인해 browser painting이 지연되지 않도록 browser painting이 완료된 후에 이펙트가 실행된다.

```js
useEffect(function () {
        console.log("After initial render");
    },[]);

    useEffect(function () {
        console.log("After every render");
    });

    useEffect(function () {
        console.log("D")
    },[query]);

    console.log("During render");

// 출력 순서 : "During render" -> ("After initial render") -> "After every render" -> ("D")
```

-> *즉 effect가 state를 업데이트하면 다시 컴포넌트 인스턴스 호출 ~ browser painting까지의 단계를 처음부터 다시 해야한다.(지양!)*

## useEffect의 dependency array

👉 useEffect의 콜백함수는 기본적으로는 매 렌더링 이후에 실행되는데, useEffect의 두번째 인자로 dependency array를 넘겨주면 특정 렌더링 이후에만 이펙트를 실행하게 할 수 있다.

👉 **dependency array요소가 변할 때 마다 이펙트는 재실행된다.**

### dependency array rules

👉 useEffect의 이펙트 실행 함수 내에서 쓰는 props, state는 반드시 dependency array에 포함되어야 한다.

👉 useEffect 이펙트 실행 함수 내에서 쓰이는 context value, props, state와 관련된 모든 reactive value도 dependency array에 포함되어야 한다. --> eslint가 경고하는 value들은 전부 넣자.

👉 object나 배열은 렌더링시마다 재생성되므로 dependency로 넣지 말자.

✅ **불필요한 함수 dependency 줄이는 법**

- useEffect안에서만 사용하는 함수는 useEffect안에서 선언하자
- useEffect밖에서도 사용하는 함수는 useCallback으로 memoization
- 어떤 reactive value도 사용하지 않는 함수라면 아예 컴포넌트 밖으로 빼자

✅ **불필요한 객체 dependency 줄이는 법**

- 되도록 원시데이터만 useEffect내에서 사용하자
- 객체를 써야한다면 memoization 하기
- state setter나 useReducer의 dispatch는 기본적으로 리액트에 의해 동일성이 보장되므로 디펜던시에 추가하지 않아도 된다.

## useEffect의 cleanup function

👉 이펙트가 재실행되기 전, 이전 이펙트 결과물을 clean up한다.

👉 컴포넌트 인스턴스가 unmount 된 후에 사이드 이펙트들을 clean up한다.

👉 컴포넌트가 unmount되거나 리렌더링 된 후에도 이전 사이드 이펙트들이 남아있는 경우에 cleanup하기 위한 용도로 사용한다.

ex) useEffect로 실행시킨 이전 http 요청이 계속 pending인 상태에서 똑같은 http요청을 보내는 경우 race condition 버그가 발생하므로, cleanup function을 통해서 이전 request는 취소해주는 것이 좋다.

✅ 한 useEffect에서는 하나의 이펙트만 처리하도록 하자. cleanup하기에 훨씬 수월하다.

## useEffect 사용을 지양해야하는 경우(과사용 금지!)

👉 이벤트 핸들러 함수로 처리할 수 있는 사용자 이벤트
👉 초기마운트시 data fetching -> 작은 프로젝트에선 괜찮지만 실무에선 React Query로 처리한다.
👉 한 state 업데이트를 기반으로 다른 state 업데이트

## useEffect안의 closure원리

👉 closure란, 함수가 생성되었을 때의 렉시컬 스코프의 모든 변수를 기억했다가 함수 호출시 사용하는, 함수가 자기 내부
변수들에 대한 closure로 동작하는 현상을 말한다.

👉 클로저 원리로 인해서, 이펙트함수는 디펜던시에 추가된 변수들 외의 다른 변수들에 대해서는 함수가 이전에 생성되었을 때의 값으로 기억하고 있다. 그래서 이펙트 함수 내에서 사용하는 모든 reactive value들은 디펜던시에 추가해야 한다.

```js
useEffect(function () {
      console.log(duration, sets); 
      document.title = `Your ${number}-exercise workout`;  
     },[number]); 
```



