import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import EventItem from './EventItem';
import Button from '../../shared/components/FormElements/Button';
import './EventList.css';

const EventList = props => {
  if (props.items.length === 0) {
    return (
      <div className="event-list center">
        <Card>
          <h2>No Events found. Maybe create one?</h2>
          <Button to="/events/new">Search</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="event-list">
      {props.items.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          description={event.description}
          address={event.address}
          price={event.price}
          creatorId={event.agentId}
        //   coordinates={event.location}
        //   onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default EventList;