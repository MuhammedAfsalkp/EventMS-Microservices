import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import OrderItem from './OrderItem';
import Button from '../../shared/components/FormElements/Button';
import './OrdersList.css';

const OrderList = props => {
  if (props.orders.length === 0) {
    return (
      <div className="event-list center">
        <Card>
          <h2>No Orders found. Maybe create one?</h2>
          <Button to="/events">Search</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="event-list">
      {props.orders.map(order => (
        <OrderItem
          key={order.id}
          id={order.id}
          status={order.status}
          event={order.event}
          userName={order.userName}

        />
      ))}
    </ul>
  );
};

export default OrderList;