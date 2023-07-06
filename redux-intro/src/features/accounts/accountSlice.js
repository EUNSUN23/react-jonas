const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
};

export function accountReducer(state = initialState, action) {
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

export function deposit(amount){
    return {type:'account/deposit',payload:amount};
}
export function requestLoan(amount,purpose){
    return {type:'account/requestLoan',payload: {amount:amount, purpose:purpose}};
}
export function withdraw(payload){
    return {type:'account/withdraw',payload:payload};
}
export function payLoan(){
    return {type:'account/payLoan'};
}