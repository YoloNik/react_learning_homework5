import { legacy_createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import contactsReduser from './contacts/contactsReduser';
import { combineReducers } from 'redux';
//console.log(contactsReduser);

const rootReduser = combineReducers({
  contacts: contactsReduser,
});

const store = legacy_createStore(rootReduser, devToolsEnhancer());

export default store;
