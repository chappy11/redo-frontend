import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '../components/Container'
import { getIncome } from '../../../service/IncomeReport';
import { Tabular } from '../../../components';
import { convertMoney } from '../../../utils/money.utils';

export default function IncomeReports() {
  const [data,setData] = useState<any[]>([]);
  

  const sendRequest = useCallback(async()=>{
    try {
      const resp = await getIncome();

      setData(resp.data.data);
    } catch (error) { 
      console.log(error)
    }
  },[])

  useEffect(() => {
    sendRequest();
  }, [])

  const total = useMemo(()=>{
    let total = 0;
    data.forEach((val,i)=>{
      total+=parseFloat(val.amount);
    });

    return convertMoney(total.toString());
  },[data])
  console.log(data);
  return (
   <Container>
    <div className=' m-auto w-1/2'>
      <div className=' bg-white p-4 mt-10'>
        <h1 className=' text-lg font-bold'>Income Reports</h1>
        <div className=' h-5'/>
        <Tabular isAlloweView={false} header={['Transaction No.','Amount',"Mobile No.","Date"]} data={data} keys={['refNo','amount','senderMobile','date_created']} onClick={function (id: any): void {
            throw new Error('Function not implemented.');
          } } id={'id'}/>
        <p className=' text-end font-bold mt-3'>Total: {total}</p>
      </div>
    </div>
   </Container>
  )
}
