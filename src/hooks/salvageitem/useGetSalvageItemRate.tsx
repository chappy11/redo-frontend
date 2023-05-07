import React, { useCallback, useEffect, useState } from 'react'
import { getSalvageRating } from '../../service/SalvageRating';

type Props ={
    salvageitem_id:string;
}

export default function useGetSalvageItemRate(props:Props) {
    const [rating,setRating] = useState<number>(0);
    const {salvageitem_id} = props;
    
    const sendRequest = useCallback(
     async() => {
        try {
            if(!salvageitem_id){
                return;
            }

            const resp = await getSalvageRating(salvageitem_id);
            let rate = 0;
            if(resp.data.data){
                rate = resp.data.data.rate;
            }

            setRating(rate);
            
        } catch (error) {
            console.log(error)   
        }
        
      },
      [salvageitem_id],
    )
    
    useEffect(() => {
      sendRequest();
    }, [sendRequest,salvageitem_id])
    
    return {
        rating
    }
}
