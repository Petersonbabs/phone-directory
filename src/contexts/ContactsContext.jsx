import { createContext, useContext, useState } from "react";

const ContactsContext = createContext();
export const useContactContext = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts"))
  );
  const [singleContact, setSingleContact] = useState({})
  const getSingleContact = (id) => {
    
    setSingleContact(contacts.find((contact) => contact.id == id));
  };

  const value = {
    contacts,
    singleContact,
    getSingleContact
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
