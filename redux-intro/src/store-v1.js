import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {customerReducer} from "./features/customers/customerSlice";
import {accountReducer} from "./features/accounts/accountSlice";
import {composeWithDevTools} from "redux-devtools-extension";

import {configureStore} from '@reduxjs/toolkit';

// combine reducer
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer
});

const storeV1 = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default storeV1;