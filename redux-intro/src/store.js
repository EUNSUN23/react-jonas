import {combineReducers, createStore} from 'redux';
import {createCustomer, customerReducer} from "./features/customers/customerSlice";
import {accountReducer} from "./features/accounts/accountSlice";

// combine reducer
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer
});

const store = createStore(rootReducer);

export default store;