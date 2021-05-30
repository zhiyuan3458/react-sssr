import {GET_DETAIL} from '../detail/type';

const initState = {
    detail: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_DETAIL: { state = { ...state, ...action.payload }; break; }
        default: break;
    }

    return state;
};
