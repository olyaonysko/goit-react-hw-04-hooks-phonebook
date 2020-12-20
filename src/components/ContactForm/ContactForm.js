import { useState } from 'react';
import { toast } from 'react-toastify';

import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !number) {
      toast.info('👺 All fields must be filled!');
      return;
    }

    if (Number.isNaN(+number)) {
      toast.info('👺 Telephone number must be numeric!');
      return;
    }

    onSubmit(name, number);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          className={s.input}
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          className={s.input}
          placeholder="Enter phone number"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
