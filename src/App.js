import './App.css';

import React, { useState } from 'react';

function App() {
  // State variables to store contacts and input values
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedContact, setSelectedContact] = useState(null); // Track the selected contact
  const [isEditMode, setIsEditMode] = useState(false); // Flag to indicate edit mode


  // Function to handle adding a new contact
  const handleAddContact = () => {
    if (newName && newPhone && newEmail) {
      const newContact = { id: Date.now(), name: newName, phone: newPhone, email: newEmail };
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setNewName('');
      setNewPhone('');
      setNewEmail('');
    }
  };

  // Set the selected contact to edit and populate input fields
  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setNewName(contact.name);
    setNewPhone(contact.phone);
    setNewEmail(contact.email);
    setIsEditMode(true); 
  };

  // Find the selected contact in the contacts list and update its details
  const handleUpdateContact = () => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          name: newName,
          phone: newPhone,
          email: newEmail,
        };
      }
      return contact;
    });

    // Clear input fields and exit edit mode
    setContacts(updatedContacts);
    setSelectedContact(null);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setIsEditMode(false);
  }; 

  // Function to handle deleting a contact
  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1 className ="header">Contacts List</h1>
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong>- {contact.phone} - {contact.email}
            <button id="edit" onClick={() => handleEditContact(contact)}>Edit</button>
            <button id ="delete" onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="add-contact">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="(_ _ _) - _ _ _ - _ _ _ _"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="example@yourmail.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {isEditMode ? (
          <button onClick={handleUpdateContact}>Update Contact</button>
        ) : (
          <button onClick={handleAddContact}>Add Contact</button>
        )}
      </div>
    </div>
  );
}

export default App;