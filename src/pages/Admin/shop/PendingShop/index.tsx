import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import { approved, getpendingshop } from "../../../../service/User";
import { Button } from "../../../../components";
import Table from "../../../../components/Table";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function PendingShop() {
  const [data, setData] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const { alertSuccess, alertError } = useAlertOptions();
  const [currentStatus,setCurrentStatus] = useState<string>(''); 

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getpendingshop();

      setData(resp.data.data);
    } catch (error) {}
  }, []);

  const statusData = useMemo(()=>{
    if(currentStatus === ''){
      return data;
    }

    return data.filter((val,i)=>{
      return val.isPending.toString() === currentStatus
    })
  },[currentStatus, data])


  const displayData = useMemo(() => {
    return statusData.map((val, i) => {
      const status  = val.isPending == 1 ? 'Pending' : 'Accepted';
      const textColor = val.isPending == 1 ?  'text-red-500' : 'text-secondary';
      return(<tr className=" border-b border-b-slate-400 text-primary">
        <td className=" py-5 text-secondary">{val.fullname}</td>
        <td className=" text-secondary">{val.email}</td>
        <td className=" capitalize text-secondary">{val.shop_name}</td>
        <td className={` ${textColor}`}>{status.toUpperCase()}</td>
        <td className=" capitalize text-secondary">{val.shopAddress}</td>

        <td>
          <Button onClick={() => window.location.href=RoutesPath.ADMIN_SHOP_DETAILS+val.user_id}>View Details</Button>
        </td>
      </tr>)
  
      });
  }, [statusData]);

  const handleApproved = useCallback(async (user_id: string) => {
    try {
      setRefetch(true);
      const resp = await approved(user_id);

      if (resp.data.status === 1) {
        alertSuccess(resp.data.message);

        return;
      }

      alertError();
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    sendRequest();
  }, [refetch]);

  return (
    <Container>
      <div className=" m-auto w-3/4 py-10 ">
        <div className=" flex w-full flex-1">
          <div className=" flex flex-1">
            <h1>Repair Shop Application</h1>
          </div>
          <div>
            <select className=" p-2 text-lg" onChange={(e)=>setCurrentStatus(e.target.value)}>
              <option className=" p-2" value={''}>
                All
              </option>
              <option className=" p-2" value={'1'}>
                Pending
              </option>
              <option className=" p-2" value={'0'}>
                Accepted
              </option>
            </select>
          </div>  

        </div>
        
        <div className=" bg-white p-3 mt-5">
          <Table
            header={[
              "Owner Name",
              "Email",
              "Shop Name",
              "Status",
              "Shop Address",
              "Action",
            ]}
          >
            {displayData}
          </Table>
        </div>
      </div>
    </Container>
  );
}
