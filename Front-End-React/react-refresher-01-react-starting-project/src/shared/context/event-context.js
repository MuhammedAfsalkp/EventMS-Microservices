import { createContext } from 'react';

export const EventContext = createContext({
  details: false,
  eventId:null,
  setId: () => {},
  setDetails: () => {},


});