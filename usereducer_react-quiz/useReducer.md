# useReducer

## 👉 When to use?

- 한 이벤트에 여러 state가 동시에 update되어야 할 때
- 3~4개 이상의 서로 연관성 있는 state를 관리해야할 때
- 개별 state를 업데이트하는 이벤트 핸들러가 너무 많아서 컴포넌트가 지저분 할때

## 👉 How to use?

- reducer, useReducer
  
  ```js
  const initialState = {count: 0, step: 1}
  
  // reducer -  첫번째 인자로 현재 state를 받고, 두번째 인자로 action를 받아서 업데이트 된 state를 반환한다.
  // reducer는 side effect없는 순수함수여야 한다(항상 현재 state와 action을 받아서 새 state를 반환해야 함)
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

