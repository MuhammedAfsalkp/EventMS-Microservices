import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { EventContext } from '../../shared/context/event-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './EventItem.css';

const EventItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const eve = useContext(EventContext)
  const history = useHistory();
//   const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
 
//   const openMapHandler = () => setShowMap(true);

//   const closeMapHandler = () => setShowMap(false);

  // const showDetailsHandler = () => {
  //   eve.setDetails(true);
  //   eve.setId(props.id);
  //   history.push('/' + props.id + '/details');
  // };

  const orderCreateHandler = async () =>{
    try {
      
      
      const responseData = await sendRequest(
        'http://localhost:7000/api/orders',
        'POST',
        JSON.stringify({
          eventId: props.id,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/orders');
    } catch (err) {console.log(err)}

  }

//   const cancelDeleteHandler = () => {
//     setShowConfirmModal(false);
//   };

//   const confirmDeleteHandler = async () => {
//     setShowConfirmModal(false);
//     try {
//       await sendRequest(
//         `http://localhost:5000/api/places/${props.id}`,
//         'DELETE',
//         null,
//         {
//           Authorization: 'Bearer ' + auth.token
//         }
//       );
//       props.onDelete(props.id);
//     } catch (err) {}
//   };
      
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <Modal
        // show={showMap}
        // onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal> */}
      {/* <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal> */}
      <li className="event-item">
        <Card className="event-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:8000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="event-item__info">
            <h2>{props.title}</h2>
            {/* <h3>{props.address}</h3>
            <p>{props.description}</p>
            <h3>{props.price}$</h3> */}
          </div>
          <div className="place-item__actions">
            <Button  inverse to={`/${props.id}/details`} >
              VIEW DETAILS
            </Button>
            {auth.currentUser.id === props.creatorId && (
              <Button to={`/events/${props.id}`}>EDIT</Button>
            )}
           
             {auth.role === 'user'  &&  <Button onClick={orderCreateHandler}>ORDER</Button>}
          

           
              {/* <Button danger >
                Order
              </Button> */}
            
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default EventItem;