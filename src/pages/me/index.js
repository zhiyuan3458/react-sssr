import React, { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Styles from './index.less';
import request from 'src/axios';
import {GET_USER} from '../../redux/home/type';

function Me (props) {
    const mapState = useCallback(state => ({
        users: state.home.users
    }), []);

    const { users } = useMappedState(mapState);

    return (
        <div className={ Styles.Me }>
            {
                Array.isArray(users) && users.map(user => (
                    <p className={ Styles.Name } key={ user._id }>{ user.name }</p>
                ))
            }
        </div>
    );
}

Me.asyncData = async (store) => {
    try {
        const { data } = await request.get('/user');
        store.dispatch({
            type: GET_USER,
            payload: { users: data?.data || [] }
        });
    } catch (e) {
        console.log(`Me.asyncData error: ${ e }`)
    }
};

export default Me;
