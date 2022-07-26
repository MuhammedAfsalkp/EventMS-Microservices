import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './EventForm.css';

const UpdateEvent = () => {
//   const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvent, setLoadedEvent] = useState();
  const eventId = useParams().eventId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/events/${eventId}`
        );
        setLoadedEvent(responseData);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true
            },
            description: {
              value: responseData.description,
              isValid: true
            },
            address: {
                value: responseData.address,
                isValid: true
              },
              price: {
                value: responseData.price,
                isValid: true
              }

          },
          true
        );
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId, setFormData]);

  const eventUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
        // const formData = new FormData();
    //   formData.append('title', formState.inputs.title.value);
    //   formData.append('description', formState.inputs.description.value);
    //   formData.append('address', formState.inputs.address.value);
    //   formData.append('price', formState.inputs.price.value);
    // //   formData.append('image', formState.inputs.image.value);
    //    console.log("formdata",Array.from(formData))
      await sendRequest(
        `http://localhost:8000/api/events/${eventId}`,'PUT',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address:formState.inputs.address.value,
          price:formState.inputs.price.value
        }),{
          'Content-Type': 'application/json'
        } );
      history.push('/');
    } catch (err) {
      console.log(err)
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEvent && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedEvent && (
        <form className="event-form" onSubmit={eventUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedEvent.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedEvent.description}
            initialValid={true}
          />
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid aracters"
            onInput={inputHandler}
            initialValue={loadedEvent.address}
            initialValid={true}
          />
          <Input
          id="price"
          element="input"
          label="price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a price."
          onInput={inputHandler}
          initialValue={loadedEvent.price}
            initialValid={true}
        />
          
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE 
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEvent;