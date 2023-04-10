import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import { approved, getpendingshop } from "../../../../service/User";
import { Button } from "../../../../components";
import Table from "../../../../components/Table";
import useAlertOptions from "../../../../hooks/useAlertOptions";

export default function PendingShop() {
  const [data, setData] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const { alertSuccess, alertError } = useAlertOptions();

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getpendingshop();

      setData(resp.data.data);
    } catch (error) {}
  }, []);

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr className=" border-b border-b-slate-400 text-primary">
        <td className=" py-5 text-secondary">{val.fullname}</td>
        <td className=" text-secondary">{val.email}</td>
        <td className=" capitalize text-secondary">{val.shop_name}</td>
        <td className=" capitalize text-secondary">{val.shopAddress}</td>

        <td>
          <Button onClick={() => handleApproved(val.user_id)}>Approve</Button>
        </td>
      </tr>
    ));
  }, [data]);

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
      <div className=" m-auto w-3/4 py-10">
        <h1>Repair Shop Application</h1>
        <div className=" bg-white p-3 mt-5">
          <Table
            header={[
              "Owner Name",
              "Email",
              "Shop Name",
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
