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

👉 useEffect의 이펙트 실행 함수 내에서 쓰는 props, state는 반드시 dependency array에 포함되어야 한다.

