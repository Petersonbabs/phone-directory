import React, { useEffect, useState } from 'react';
import { useContactContext } from '@/contexts/ContactsContext';

const EditContactForm = ({ contactId, isOpen, onClose }) => {
  const { getSingleContact, contacts, editContact } = useContactContext();
  const singleContact = contacts?.find(item => item.id == contactId)
    

  useEffect(()=>{
    getSingleContact(contactId)
  }, [])

  const [formData, setFormData] = useState({
    name: singleContact?.name || '',
    email: singleContact?.email || '',
    phoneNumber: singleContact?.phoneNumber || '',
    image: singleContact?.image || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editContact(contactId, formData);
    onClose(); 
  };

  return (
    // <EditContactModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    // </EditContactModal>
  );
};

export default EditContactForm;
