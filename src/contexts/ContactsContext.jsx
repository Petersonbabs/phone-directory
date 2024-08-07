import { createContext, useContext, useEffect, useState } from "react";

const ContactsContext = createContext();
export const useContactContext = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [singleContact, setSingleContact] = useState({});

  const addNewContact = (formData) => {
    const contactId = Math.floor(Math.random() * 9999);
    formData.id = contactId;
    const contactExist = contacts.find((item) => item.phoneNumber == formData.phoneNumber || item.email == formData.email);
    if (contactExist) {
      alert('This contact already exist!')
      return
    }
    const updatedContacts = [...contacts, formData];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

  };

  // GET CONTACTS
  const getContacts = () => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  };

  // GET SINGLE CONTACT
  const getSingleContact = (id) => {
    setSingleContact(contacts?.find((contact) => contact.id == id));
  };

  // EDIT CONTACT
  const editContact = (id, updatedData) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...updatedData } : contact
    );

    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  // DELETE CONTACT
  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    console.log(updatedContacts);
  };


  const value = {
    contacts,
    singleContact,
    getSingleContact,
    getContacts,
    setContacts,
    addNewContact,
    editContact,
    deleteContact
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
