import React, { useCallback, useEffect, useState } from 'react'
import { getAllSuccessSalvage } from '../service/SalvageOrder';

export default function useGetAllSuccessSalvageOrder() {
    const [data,setData] = useState<any[]>([]);

    const sendRequest = useCallback(async()=>{
        try {   
            const resp = await getAllSuccessSalvage();

            if(resp.data.status == 1){
                setData(resp.data.data)
            }
        } catch (error) {
            
        }
    },[])

    useEffect(() => {
      sendRequest();
    }, [])
    
  
    return{
        data
  }
}
