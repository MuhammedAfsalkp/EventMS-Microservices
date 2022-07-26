import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Avatar from '../../shared/components/UIElements/Avatar'
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { EventContext } from '../../shared/context/event-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './OrderItem.css';

const OrderItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth=useContext(AuthContext)
  const history = useHistory();
  const payHandler = () => {
    
  };
  const sendReq = async (token) =>{
    try {console.log("sending money")
      const response = await sendRequest(
        `http://localhost:9000/api/payments`,
        'POST',JSON.stringify({orderId:props.id,token:token}),  {
          'Content-Type': 'application/json'
        }
      );
      console.log("paid",response)
      
      history.push('/events');
    } catch (err) {console.log(err)}

  }

  const cancelOrder = async () => {
    try {console.log(props.id,props.event.price)
      await sendRequest(
        `http://localhost:7000/api/orders/${props.id}`,
        'DELETE',null,{}
      );
      console.log("deleted")
      
      history.push('/events');
    } catch (err) {console.log(err)}
    
  };
 
   return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className='link' to={`/${props.event.id}/details`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:8000/${props.event.image}`} alt={props.event.name} />
          </div>
          <div className="user-item__info">
           { auth.role === 'agent'  && <h2>{props.userName}</h2>}
           { <h2>{props.event.title}</h2>}
            <h3>
              {props.status} 
            </h3>
          </div>
          <div className='btn'>
          {/* <Button   onClick={payHandler}>Pay</Button> */}
          {auth.role === 'user' &&<StripeCheckout
          token={({id})=>sendReq(id)}
          stripeKey="pk_test_51LEPLnSDY8ulaATOUQ7J7uKs8AGP5sq0HiWRYqqIBD7pwJiHIiF4QQJf1Qqv69B7r9kFw74InqZc3x3Vns2zOq6k00EZTQxL8j"
          amout={props.event.price * 100}
          email={auth.currentUser.email}

          ></StripeCheckout>}
          <Button danger onClick={cancelOrder}> Cancel </Button> 
          </div>       
           </div>
      </Card>
    </li>
  );
};


export default OrderItem;