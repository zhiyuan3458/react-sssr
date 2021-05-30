import { GET_USER } from './type';

const initState = {
    tabs: [
        { key: 'home', title: '首页' },
        { key: 'me', title: '我的' }
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
