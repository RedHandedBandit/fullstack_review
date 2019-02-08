const initialState = {
    id: 0,
    username: '',
    profile_pic: '',
    balance: 0
}

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case UPDATE_USER:
            const {id, username, profile_pic, balance} = payload;
            return {...state, id, username, profile_pic,balance}
        default: 
        return state;
    }
}