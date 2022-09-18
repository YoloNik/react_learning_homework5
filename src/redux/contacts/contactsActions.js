const setContacts = contacts => ({
  type: 'SET_CONTACTS',
  payload: contacts,
});

const addContact = newContact => ({
  type: 'ADD_CONTACT',
  payload: newContact,
});

const removeContact = contactToRemove => ({
  type: 'REMOVE_CONTACT',
  payload: contactToRemove,
});

export { setContacts, addContact, removeContact };
