const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
};

export function accountReducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {...state, balance: state.balance + action.payload, isLoading: false};
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload};
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose};
        case 'account/payLoan':
            return {...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan};
        case 'account/convertingCurrency':
            return {...state, isLoading: true};
        default:
            return state; // context의 reducer와 다르게, 에러 던지는것 권장 x
    }
}

export function deposit(amount, currency) {
    if (currency === 'USD') return {type: 'account/deposit', payload: amount};

    // middleware(thunk)사용해서 api 호출  --> api호출 등 미들웨어 작업이 끝나야 dispatch가 발생하게끔 한다.
    return async function (dispatch, getState) {
        dispatch({type: 'account/convertingCurrency'});
        // API CALL
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        dispatch({type: 'account/deposit', payload: converted});
    };

}

export function requestLoan(amount, purpose) {
    return {type: 'account/requestLoan', payload: {amount: amount, purpose: purpose}};
}

export function withdraw(payload) {
    return {type: 'account/withdraw', payload: payload};
}

export function payLoan() {
    return {type: 'account/payLoan'};
}