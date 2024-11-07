import React from 'react';
import EventCreate from '@/components/UI/CreateEvent';

const CreateEventPage = () => {
    return (
      <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <EventCreate />
      </div>
    );
};

export default CreateEventPage;