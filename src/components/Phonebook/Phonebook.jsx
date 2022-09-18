import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import UserInput from './UserInput/UserInput';
import FilterPhonebook from './FilterPhonebook/FilterPhonebook';
import ContactList from './ContactList/ContactList';
import phonebookData from 'data/phonebookData';
import {
  addContact,
  setContacts,
  removeContact,
} from 'redux/contacts/contactsActions';
import { filterChange } from 'redux/contacts/filtersActions';
import { nanoid } from 'nanoid';
import s from './Phonebook.module.css';

const Phonebook = ({
  contacts,
  onAddContact,
  onSetContacts,
  onRemoveContact,
}) => {
  const [user, setUser] = useState('');
  const [number, setNumber] = useState('');
  const filter = useSelector(state => state.contacts.filter);
  const filterDispatch = useDispatch();

  useEffect(() => {
    onSetContacts(phonebookData.contacts);
  }, [onSetContacts]);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setUser(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      case 'filter':
        filterDispatch(filterChange(e.target.value));
        break;

      default:
        break;
    }
  };

  const addContact = e => {
    e.preventDefault();

    const searchSameName = contacts.items.map(cont => cont.name).includes(user);

    searchSameName
      ? alert(`${user} is already in contacts`)
      : onAddContact({
          name: user,
          number: number,
          id: nanoid(),
        });
    reset();
  };

  const reset = () => {
    setUser('');
    setNumber('');
  };

  const deleteContact = e => {
    console.log(e.target.name);

    onRemoveContact(e.target.name);
  };

  const filterByName = () => {
    return contacts.items.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  return (
    <div className={s.phonebook}>
      <h2 className={s.title}>Phonebook</h2>
      <UserInput
        valueName={user}
        valueTel={number}
        onChange={handleChange}
        addContact={addContact}
      />

      <h3>Contacts</h3>
      <FilterPhonebook filterValue={filter} onChange={handleChange} />
      <ContactList
        filter={filter}
        contacts={contacts.items}
        filterByName={filterByName}
        deleteContact={deleteContact}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  onSetContacts: contacts => dispatch(setContacts(contacts)),
  onAddContact: newContact => dispatch(addContact(newContact)),
  onRemoveContact: contact => dispatch(removeContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
