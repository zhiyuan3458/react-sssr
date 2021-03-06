import { GET_USER } from './type';

const initState = {
    tabs: [
        { key: 'home', title: '้ฆ้กต' },
        { key: 'me', title: 'ๆ็' }
    ],
    users: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER: { state = { ...state, ...action.payload }; break; }
        default: break;
    }

    return state;
};
