import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { Contact } from '../types';



const ContactsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get<Contact[]>('/api/contacts');
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (contact: Contact) => {
      if (contact.id) {
        return axios.put(`/api/contacts/${contact.id}`, contact);
      } else {
        return axios.post('/api/contacts', contact);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>
      <button
        onClick={handleAddContact}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Contact
      </button>
      <ContactList onEditContact={handleEditContact} />
      {showForm && (
  <ContactForm
    initialContact={editingContact || undefined}
    onSubmit={mutation.mutate}
    onClose={handleCloseForm}
  />
)}
    </div>
  );
};

export default ContactsPage;