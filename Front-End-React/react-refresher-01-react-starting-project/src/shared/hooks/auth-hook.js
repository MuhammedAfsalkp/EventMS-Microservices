import { useState, useCallback, useEffect,useContext } from 'react';
import {useHttpClient} from '../hooks/http-hook'
// import { useHistory } from 'react-router-dom';
import { EventContext } from '../context/event-context';


// let logoutTimer;


export const useAuth = () => {
  // const [token, setToken] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const [isLoggedIn,setLoggedIn]  = useState(false)
  const [entry,setEntry]  = useState('user')
  const [role,setRole] = useState('user')
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const eve = useContext(EventContext)


   

  // const history = useHistory();
  // const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((CurrentUser) => {
    console.log("ff",CurrentUser)
    console.log("LLLLLLOGING iN",CurrentUser.role,CurrentUser)
    // setToken(token);
    setcurrentUser(CurrentUser);
    setLoggedIn(true);
    setRole(CurrentUser.role)

    // const tokenExpirationDate =
    //   expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // setTokenExpirationDate(tokenExpirationDate);
    // localStorage.setItem(
    //   'userData',
    //   JSON.stringify({
    //     userId: uid,
    //     token: token,
    //     expiration: tokenExpirationDate.toISOString()
    //   })
    // );
  }, []);

  const logout = useCallback(async() => {
    console.log("loging out")
    eve.setDetails(false);
    eve.setId(null);
    const responseData = await sendRequest(
      'http://localhost:4000/api/users/signout',
      'POST',null,{}
    );
    console.log("logout response ",responseData)
    // setToken(null);
    setcurrentUser(null);
    setLoggedIn(false);
    setRole(null)
    // history.push('/auth');

   // setTokenExpirationDate(null);
    // localStorage.removeItem('userData');
  }, [sendRequest]);


  const authMode = useCallback((mode) => {
    console.log("modeee")
    setEntry(mode);
   
  }, []);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('userData'));
  //   if (
  //     storedData &&
  //     storedData.token
  //     //  && new Date(storedData.expiration) > new Date()
  //   ) {
  //     login(storedData.userId, storedData.token);
  //     // login(storedData.userId, storedData.token, new Date(storedData.expiration));
  //   }
  // }, [login]);

  return {  role,login, logout, currentUser,isLoggedIn,authMode,entry};
};


