import React, { useCallback } from 'react'
import Container from '../../../components/Container'
import { useParams } from 'react-router-dom'
import useGetUserShop from '../../../../../hooks/user/useGetUserShop';
import { BASE_URL } from '../../../../../constant/config';
import { Button, Item } from '../../../../../components';
import { approved } from '../../../../../service/User';
import useAlertOptions from '../../../../../hooks/useAlertOptions';
import { AlertIcon } from '../../../../../types/AlertIcon.enum';
import { RoutesPath } from '../../../../../types/RoutesPath.enum';

export default function ShopDetails() {
  const {id} = useParams();
  const {data} = useGetUserShop({user_id:id?id:''})
  const {alertSuccess,alertError,alertWithAction} = useAlertOptions();
  
  const handleApproved = useCallback(async () => {
    try {
      if(!id){
        return;
      }
      const resp = await approved(id);

      if (resp.data.status === 1) {
        alertWithAction({
            title: 'Successfully Updated',
            text: resp.data.message,
            icon: AlertIcon.SUCCESS,
            onConfirm:()=>{window.location.href=RoutesPath.PENDING_SHOP}
        })
        return;
      }

      alertError();
    } catch (error) {
      console.log(error);
    } finally {
      
    }
  }, [alertError, alertSuccess, id]);
  return (
    <Container>
        <div className=' m-auto w-3/4 mt-10'>
            <h1 className=' text-xl font-bold'>Shop Details</h1>
            <div className=' mt-3 bg-white shadow-lg rounded-md p-4'>
                <div className=' flex flex-row'>
                    <div>
                        <h1 className=' font-bold mb-3'>BIR Photo</h1>
                        <img src={BASE_URL+data?.birPhoto} alt='GG' className=' w-52 h-52'/>
                        <div className=' h-5'/>
                        <h1 className=' font-bold mb-3'>DTI Photo</h1>
                        <img src={BASE_URL+data?.dtiPhoto} alt='GG' className=' w-52 h-52'/>
                    </div>
                    <div  className=' w-full'>
                        <div className=' flex w-full justify-center'>
                            <img src={BASE_URL+data?.shopImage} alt="wew" className=' w-32 h-32 rounded-full'/>
                        </div>
                       <p className=' text-center font-bold mt-3 text-xl'>{data?.shop_name}</p>
                       <p className=' text-center mt-3'>{data?.shopAddress}</p>
                       <div className=' flex justify-center'>
                       
                        <div className=' w-1/2'>
                            <div className=' border border-b border-b-slate-100 my-2'></div>
                            <Item label='Fullname' value={data?.fullname}/>
                            <Item label='Address' value={data?.address}/>
                            <Item label='Mobile Number' value={data?.phoneNumber}/>
                            <div className=' flex gap-7'>
                                <Button onClick={handleApproved}>Approved</Button>
                                <Button backgroundColor=' bg-red-500'>Decline</Button>
                            </div>
                        </div>
                    </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </Container>
  )
}
