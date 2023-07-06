export const initialStateCustomer ={
    fullName:'',
    nationalID:'',
    createdAt:'',
    status:''
}

export function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt};
        case 'customer/updateName':
            return {...state, fullName: action.payload.fullName};
        default:
            return state;
    }
}

export function createCustomer(fullName,nationalID){
    return {type:'customer/createCustomer', payload:{fullName, nationalID, createdAt: new Date().toISOString()}}; // reducer안에서는 side effect없어야 하므로 여기서..
}

export function updateName(fullName) {
    return {type:'customer/updateName',payload:fullName}
}