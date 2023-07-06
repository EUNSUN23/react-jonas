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
            deposit: { // 'account/deposit'
                prepare(amount, currency) {
                    // reduxtoolkit가 생성한 action creator는 인자를 하나만 받기 때문에,
                    // 두개 인자를 받기 위해 prepare로 payload를 새로 만든다.
                    return {payload: {amount, currency}};
                },
                reducer(state, action) {
                    state.balance += action.payload;
                }
            },
            withdraw(state, action) {
                state.balance -= action.payload;
            },
            requestLoan: {
                prepare(amount, purpose) {
                    return {payload: {amount, purpose}}
                },
                reducer(state, action) {
                    if (state.loan === 0) return; // state를 반환할 필요 없다.
                    state.loan = action.payload.amount;
                    state.loanPurpose = action.payload.purpose;
                    state.balance += action.payload.amount;
                }
            },
            payLoan(state, action) {
                state.balance -= state.loan;
                state.loan = 0;
                state.loanPurpose = '';
            },
        }
    });

export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions;

export default accountSlice.reducer;