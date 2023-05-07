import React, { useCallback, useEffect, useState } from 'react'
import { getAllSuccessRefurbrish } from '../service/RefubrishOrder';

export default function useGetAllSuccessRefurbrishOrder() {
    const [data,setData] = useState<any[]>([]);
    
    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getAllSuccessRefurbrish();

            if(resp.data.status == 1){
                setData(resp.data.data)
            }
        } catch (error) {
            
        }
    },[])
    

    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
        data
    }
}
