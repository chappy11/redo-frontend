import React, { useCallback, useEffect, useState } from 'react'
import { getUserByShop } from '../../service/User';

type Props = {
    user_id:string;
}
export default function useGetUserShop(props:Props) {
    const [data,setData] = useState<any>(null);
    const {user_id} = props
    
    const sendRequest = useCallback(
      async() => {
        try {
            const resp = await getUserByShop(user_id)        
        
            if(resp.data.status == 1){
                setData(resp.data.data)
            }
        } catch (error) {
            
        }
      },
      [user_id],
    )
    
    useEffect(() => {
      sendRequest()
    }, [sendRequest,user_id])
    
    
    return {
        data
    }
}
