import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ContactsContext = createContext();
export const useContactContext = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [singleContact, setSingleContact] = useState({});
  const baseUrl = import.meta.env.VITE_baseUrl;


  // GET CONTACTS
  const getContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${baseUrl}/contacts`);
      const data = await response.data;
      setContacts(data.allContacts);
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // GET SINGLE CONTACT
  const getSingleContact = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/contacts/${id}`);
      const data = await response.data;
      setSingleContact(data.contact);
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const editContact = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/contacts/${id}`,
        updatedData
      );
      const data = await response.data;
      setSingleContact(data.contact)
      getContacts()
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE CONTACT
  const deleteContact = async (contactId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/contacts/${contactId}`);
      getContacts();
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    contacts,
    singleContact,
    getSingleContact,
    getContacts,
    setContacts,
    editContact,
    deleteContact,
    isLoading,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
