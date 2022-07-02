// import react from "react";

// const Event = ()=>{
//     return(<h1>Events</h1>)
// }

// export default Event;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventList from '../components/EventList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Event = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

//   const userId = useParams().userId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/events`
        );
        setLoadedPlaces(responseData);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

//   const placeDeletedHandler = deletedPlaceId => {
//     setLoadedPlaces(prevPlaces =>
//       prevPlaces.filter(place => place.id !== deletedPlaceId)
//     );
//   };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <EventList items={loadedPlaces}  />
      )}
    </React.Fragment>
  );
};

export default Event;