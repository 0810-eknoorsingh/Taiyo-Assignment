import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteContact } from '../features/contactSlice';
import ContactDetails from './ContactDetails';
import { Contact } from '../types';

interface ContactListProps {
  onEditContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEditContact }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleShowDetails = (id: string) => {
    setShowDetails(id);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <ul className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <li key={contact.id} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-gray-500">{contact.email}</p>
              <p className="text-gray-500">{contact.phone}</p>
            </div>
            <div className="flex">
            <button
                onClick={() => onEditContact(contact)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleShowDetails(contact.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Details
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showDetails && (
        <ContactDetails
          contact={contacts.find((contact) => contact.id === showDetails)!}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default ContactList;