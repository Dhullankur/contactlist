import { combineReducers } from 'redux';
import contactsReducer from './contact_reducer';

const appReducers = combineReducers({
    contactsReducer
});

export default appReducers;