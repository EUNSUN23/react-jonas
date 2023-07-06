import {useSelector} from "react-redux";

function Customer() {
  // useSelector : store를 구독한다. store의 state가 변하면 그 store를 구독하는 컴포넌트가 렌더링된다.
  const customer = useSelector(store => store.customer.fullName); // reducer 합칠 때 customerReducer에 부여한 이름

  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
