import React, { useEffect, useState,useContext } from 'react';

import OrderList from '../components/OrdersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';


const OrderedEvent = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedOrders, setLoadedOrders] = useState();
  const auth = useContext(AuthContext);
  


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:7000/api/orders/user/${auth.currentUser.id}`
        );
        console.log(responseData);

        setLoadedOrders(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedOrders && <OrderList orders={loadedOrders} />}
    </React.Fragment>
  );
};

export default OrderedEvent;