import { useState, useCallback, useEffect } from 'react';

export const useEvent = () => {
    const [details,setIsDetails]  = useState(false);
    const [eventId,setEventId]  = useState(null);

    const setDetails = useCallback((value)=>{
        console.log("working setDeatils",value)
        setIsDetails(value);
    },[])

    const setId = useCallback((value)=>{
        setEventId(value);
    },[])





    return {eventId,details,setId,setDetails}



}