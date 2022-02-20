const INITIAL_STATE = {
    userdata: {}
}

const getUserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERDATA':
            return { userdata: action.payload };

        default:
            return state;
    }
}

export default getUserReducer;