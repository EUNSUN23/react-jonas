import {createSlice} from '@reduxjs/toolkit';

// * createSlice *
// - reducer에 대한 action creator를 자동으로 생성한다
// - switch문, default문을 자동으로 핸들링한다.
// - reducer함수내에서 mutable한 로직을 사용할 수 있다. (Immer라이브러리가 내부적으로 immutable한 로직으로 변환)

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
};

const accountSlice = createSlice(
    {
        name: 'account',
        initialState,
        reducers: {
            deposit(state, action) { // 'account/deposit'
                state.balance -= action.payload;
                state.isLoading = false;
            },
            withdraw(state, action) {
                state.balance -= action.payload;
            },
            requestLoan: {
                prepare(amount, purpose) { // 인자 2개 받기위한 prepare
                    return {
                        payload: {amount, purpose}
                    };
                },

                reducer(state, action) {
                    if (state.loan > 0) return; // state를 반환할 필요 없다.
                    state.loan = action.payload.amount;
                    state.loanPurpose = action.payload.purpose;
                    state.balance = state.balance + action.payload.amount;
                },
            },
            payLoan(state, action) {
                state.balance -= state.loan;
                state.loan = 0;
                state.loanPurpose = '';
            },
            convertingCurrency(state) {
                state.isLoading = true;
            },
        }
    });

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

// redux-toolkit 방식이 아니라 기존 redux 방식이지만 훨씬 간단하고 redux-toolkit과 함께 사용가능하므로..
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

export default accountSlice.reducer;