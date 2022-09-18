import React from 'react';
import s from './ContactList.module.css';
import { AiOutlineUserDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';

function ContactList({ filter, contacts, filterByName, deleteContact }) {
  console.log(filterByName());
  return (
    <ul className={s.contactList}>
      {(filter &&
        filterByName().map(el => {
          return (
            <li className={s.contactItem} key={el.id}>
              <p>
                {el.name}: {el.number}
              </p>
              <button
                name={el.id}
                onClick={deleteContact}
                className={s.button}
                type="button"
              >
                <AiOutlineUserDelete /> Delete
              </button>
            </li>
          );
        })) ||
        contacts.map(el => {
          return (
            <li className={s.contactItem} key={el.id}>
              <p>
                {el.name}: {el.number}
              </p>
              <button
                name={el.id}
                onClick={deleteContact}
                className={s.button}
                type="button"
              >
                <AiOutlineUserDelete /> Delete
              </button>
            </li>
          );
        })}
    </ul>
  );
}

export default ContactList;

ContactList.prototype = {
  filter: PropTypes.string,
  contacts: PropTypes.array.isRequired,
  filterByName: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
