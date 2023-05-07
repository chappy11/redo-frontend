import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PageContainer } from '../../../components'
import { getNotification } from '../../../service/Notification';
import { getUserFromStorage } from '../../../utils/storage.utils';

export default function Notification() {
    const [data,setData] = useState<any[]>([]);


    const sendRequest = useCallback(
      async() => {
        try {
            const user = await getUserFromStorage();
            const resp = await getNotification(user.user_id);
            
            setData(resp.data.data);
        } catch (error) {
            console.log(error)
        }
      },
      [],
    );

    useEffect(() => {
      sendRequest();
    }, []);
    
    
    const displayNotification = useMemo(() => {
        return data?.map((val,i)=>(
            <div className=' bg-white p-4 my-3 shadow-lg'>
                <h1 className=' text-lg font-bold'>{val.header}</h1>
                <p className=' text-sm'>{val.date}</p>
                <p className=' mt-3'>
                    {val.body}
                </p>
            </div>
        ))
    }, [data])
  
    return (
    <PageContainer>
        <div className=' m-auto w-1/2'>
            <div className=' bg-primary p-4'>
                <p className=' text-white font-bold text-xl'>Notification</p>
            </div>
            <div className=' h-3'></div>
            {displayNotification}
        </div>
    </PageContainer>
  )
}
