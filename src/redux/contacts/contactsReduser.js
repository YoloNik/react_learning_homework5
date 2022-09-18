import { combineReducers } from 'redux';

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return action.payload;
    case 'ADD_CONTACT':
      return [...state, action.payload];
    case 'REMOVE_CONTACT':
      return state.filter(el => el.id !== action.payload);

    default:
      return state;
  }
};

const filterReduser = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.payload;

    default:
      return state;
  }
};

const contactsReduser = combineReducers({
  items: itemsReducer,
  filter: filterReduser,
});

export default contactsReduser;
