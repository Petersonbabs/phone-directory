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

  const addNewContact = (formData) => {
    const contactId = Math.floor(Math.random() * 9999);
    formData.id = contactId;
    const contactExist = contacts.find(
      (item) =>
        item.phoneNumber == formData.phoneNumber || item.email == formData.email
    );
    if (contactExist) {
      alert("This contact already exist!");
      return;
    }
    const updatedContacts = [...contacts, formData];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  // GET CONTACTS
  const getContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${baseUrl}/contacts`);
      const data = await response.data;
      setContacts(data.allContacts);
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
      console.log("done!");
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
      console.log(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
      console.log("done!");
    }
  };

  const editContact = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/contacts/${id}`,
        updatedData
      );
      console.log(response);
      const data = await response.data;
      console.log(data);
      setSingleContact(data.contact)
      getContacts()
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
      console.log("done!");
    }
  };

  // DELETE CONTACT
  const deleteContact = async (contactId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/contacts/${contactId}`);
      getContacts();
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
      console.log("done!");
    }
  };

  const value = {
    contacts,
    singleContact,
    getSingleContact,
    getContacts,
    setContacts,
    addNewContact,
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
