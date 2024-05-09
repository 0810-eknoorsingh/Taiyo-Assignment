import React from 'react';
import { Contact } from '../types';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">{contact.name}</h2>
        <p className="mb-2">
          <strong>Email:</strong> {contact.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {contact.phone}
        </p>
        {/* Add any other contact details you want to display */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;