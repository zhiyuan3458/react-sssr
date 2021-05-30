import { createStore } from 'redux';
import reducer from './index';

export default store => createStore(reducer, store);
