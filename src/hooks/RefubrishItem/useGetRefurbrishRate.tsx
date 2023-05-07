import React, { useCallback, useEffect, useState } from 'react'
import { createRefurbrishRating, getRefurbrishRating } from '../../service/RefurbrishRating';

type Props = {
    refurbrishItem_id:string;
}


export default function useGetRefurbrishRate(props:Props) {
    const [rating,setRating] = useState<number>(0);
    const {refurbrishItem_id} = props;
    const sendRequest = useCallback(
      async() => {
        try {   
            const resp = await getRefurbrishRating(refurbrishItem_id);
            let rate = 0;
            if(resp.data.data){
                rate = resp.data.data.rate;
            }

            setRating(rate);
        } catch (error) {
            
        }
      },
      [refurbrishItem_id],
    )


    useEffect(() => {
      sendRequest();
    }, [sendRequest,refurbrishItem_id])
    
    
    return{
        rating
    }
}
