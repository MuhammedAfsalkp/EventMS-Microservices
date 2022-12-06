import React, { useState, useContext,useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useParams } from 'react-router-dom';
// import { EventContext } from "../../shared/context/event-context";
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import Avatar from '../../shared/components/UIElements/Avatar';
import './Details.css'
const Details = ()=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // const eve = useContext(EventContext);
    const auth = useContext(AuthContext);
    const [event,setLoadedEvent] = useState();
    const history = useHistory();
    // console.log("data",eve.details,eve.eventId)
    const eventId = useParams().eventId;

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:8000/api/events/${eventId}`
            );
            setLoadedEvent(responseData);
          } catch (err) {}
        };
        fetchEvents();
      }, [sendRequest,eventId]);

      const orderCreateHandler = async () =>{
        try {
          
          
          const responseData = await sendRequest(
            'http://localhost:7000/api/orders',
            'POST',
            JSON.stringify({
              eventId: eventId,
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          history.push('/orders');
        } catch (err) {console.log(err)}
    
      }
    
    
    
    return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
         
         {!isLoading && event && ( <ul className="details-list"> <li className="details-item">
            <Card className="details-item__content">
              {isLoading && <LoadingSpinner asOverlay />}
              <div className="details">
              <div className="details-item__image">
                <img
                  src={`http://localhost:8000/${event.image}`}
                  alt={event.title}
                />
                {/* <Avatar className="details" image={`http://localhost:8000/${event.image}`} alt={event.title} /> */}
              </div>
              <div className="details-item__info">
                <h2>{event.title}</h2>
                <h3>{event.address}</h3>
                <p>{event.description}</p>
                <h3>{event.price}$</h3>
              </div>
              </div>
              <div className="details-item__actions">
                { auth.role === 'user' && (<Button  inverse> PAY </Button>)}
                {auth.role === 'user' && (<Button onClick={orderCreateHandler}>ORDER</Button>) }
              </div>
            </Card>
          </li> 
          </ul> )}
        </React.Fragment>
      );
}

export default Details;



