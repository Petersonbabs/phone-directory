import { createContext, useContext, useState } from "react";

const ContactsContext = createContext();
export const useContactContext = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts"))
  );
  const [singleContact, setSingleContact] = useState({});

  const addNewContact = (id, formData) => {
    const contactId = Math.floor(Math.random() * 9999);
    const contactExists = contacts.find(
      (contact) => contact.phoneNumber == formData.phoneNumber
    );

    let updatedContacts;
    if (contactExists) {
      alert("This contact already exist as " + contactExists.name);
      return;
    }

    updatedContacts = contacts.push(formData);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setCart(updatedCart);
  };

  // GET SINGLE CONTACT
  const getSingleContact = (id) => {
    setSingleContact(contacts.find((contact) => contact.id == id));
  };

  const value = {
    contacts,
    singleContact,
    getSingleContact,
    addNewContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
