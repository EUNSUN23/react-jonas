# useReducer

## 👉 When to use?

   서로 연관이 있는 state들(update가 다른 state업데이트에 의존하는 등)을 하나의 state로 깔끔하게 관리해야 할 때



## 👉 How to use?

- reducer, useReducer
  
  ```js
  const initialState = {count: 0, step: 1}
  
  // reducer -  첫번째 인자로 현재 state를 받고, 두번째 인자로 action를 받아서 업데이트 된 state를 반환한다.
  function reducer(state, action) {
   switch (action.type) { 
       case 'inc':
           return {...state, count: state.count + state.step};
       case 'dec':
           return {...state, count: state.count - state.step};
       case 'setCount':
           return {...state, count: action.payload};
       case 'setStep':
           return {...state, step: action.payload};
       case 'reset':
           return initialState;
       default :
           throw Error("Unknown action");
   }
  
  }
  
  // useReducer - 첫번째 인자로 reducer함수, 두번째 인자로 초기 state 값을 받고, [state, dispatch함수] 배열을 반환한다.
  function DateCounter() {
   const [state, dispatch] = useReducer(reducer, initialState);
   const {count, step} = state;
  
   // 나머지 코드 생략
  
  }
  ```

<br/>

- dispatch 호출
  
  - dispatch에 action파라미터를 넘기면, 내부적으로 이를 두번째 파라미터로 받는 reducer함수가 호출된다
  - reducer함수는 첫번째 인자로 받은 state를 action에 따라 업데이트 해서 반환한다
  
  ```js
  const dec = function () {
       dispatch({type: 'dec'}); // reducer함수에 넘겨주는 action 파라미터
      };
  ```





