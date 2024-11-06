/* import EventCreate from "../../../../components/UI/CreateEvent";

export default async function Events(){
    return(
        <EventCreate />
    )
} */

// site/events/create-event/page.tsx
import React from 'react';
import CategoryContainer from '@/components/UI/Categories';

const CreateEventPage = () => {
    return (
      <div>
        <CategoryContainer />
      </div>
    );
  };
  
  export default CreateEventPage;