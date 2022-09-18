import React from 'react';
import s from './UserInput.module.css';
import RegBtn from 'components/common/RegBtn/RegBtn';
import PropTypes from 'prop-types';
import { AiOutlineUserAdd } from 'react-icons/ai';

function UserInput({ onChange, addContact, valueName, valueTel }) {
  return (
    <form className={s.formWrapper}>
      <input
        className={s.userInput}
        placeholder="Name"
        type="text"
        value={valueName}
        name="name"
        onChange={onChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        className={s.userInput}
        onChange={onChange}
        placeholder="Phone"
        value={valueTel}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      {valueName && valueTel ? (
        <RegBtn handleClick={addContact} className="addContact" type="submit">
          <AiOutlineUserAdd /> Add contact
        </RegBtn>
      ) : (
        <p>Add contact details to add it to the contact list</p>
      )}
    </form>
  );
}

export default UserInput;

UserInput.prototype = {
  onChange: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  valueName: PropTypes.string.isRequired,
  valueTel: PropTypes.string.isRequired,
};
