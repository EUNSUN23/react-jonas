import {combineReducers, createStore} from 'redux';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
};

const initialStateCustomer ={
    fullName:'',
    nationalID:'',
    createdAt:'',
    status:''
}

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {...state, balance: state.balance + action.payload};
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload};
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose};
        case 'account/payLoan':
            return {...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan};
        default:
            return state; // context의 reducer와 다르게, 에러 던지는것 권장 x
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt};
        case 'customer/updateName':
            return {...state, fullName: action.payload.fullName};
        default:
            return state;
    }
}

// combine reducer
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer
});

const store = createStore(rootReducer);


function deposit(amount){
    return {type:'account/deposit',payload:amount};
}
function requestLoan(amount,purpose){
    return {type:'account/requestLoan',payload: {amount:amount, purpose:purpose}};
}
function withdraw(payload){
    return {type:'account/withdraw',payload:payload};
}
function payLoan(){
    return {type:'account/payLoan'};
}

function createCustomer(fullName,nationalID){
    return {type:'customer/createCustomer', payload:{fullName, nationalID, createdAt: new Date().toISOString()}}; // reducer안에서는 side effect없어야 하므로 여기서..
}

function updateName(fullName) {
    return {type:'customer/updateName',payload:fullName}
}

store.dispatch(createCustomer('EUNSUN KIM','23424'));
console.log(store.getState())
