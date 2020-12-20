import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      console.log('work');
      return toast.info(`🙄 ${name} is already in contacts!`);
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>

      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}

      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>Your phonebook is empty. Add contact.</p>
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
