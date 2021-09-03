//import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import shortid from "shortid";
import FormContact from "./components/FormContact/FormContact";
import Filter from "./components/Filter/Filter";
import ListContact from "./components/ListContact/ListContact";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };
  const onFilter = ({ target }) => {
    setFilter(target.value);
  };

  const filteredArray = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <FormContact addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilter} />
      <ListContact contacts={filteredArray()} deleteContact={deleteContact} />
    </>
  );
}
