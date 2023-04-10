import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  FixList,
  ImageView,
  Item,
  PageContainer,
  TextInput,
} from "../../../../components";
import { getItem } from "../../../../service/RepubrishItem";
import Modal from "../../../../components/Modal";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { createFix } from "../../../../service/RefubrishFix";
import { convertMoney } from "../../../../utils/money.utils";

export default function RepubrishItemDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fix, setFix] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.00");
  const { alertError, alertSuccess, alertWarning } = useAlertOptions();
  const [total, setTotal] = useState<string>("0.00");

  const getData = useCallback(async () => {
    try {
      const resp = await getItem(id ?? "");
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const totalFix = useMemo(() => {
    return parseFloat(data?.selling_price) - parseFloat(data?.rsalvage_price);
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [id, isLoading]);

  async function handleAddFix() {
    try {
      setIsLoading(true);
      if (!fix) {
        alertWarning("Please put what you fix");

        return;
      }

      if (parseFloat(amount) < 1) {
        alertWarning("The amount should be greater than zero");

        return;
      }

      const payload = {
        id: data?.repubrishItem_id,
        fix,
        amount,
      };

      const resp = await createFix(payload);

      if (resp.data.status === 1) {
        alertSuccess(resp.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      <div className=" w-3/4 md:w-1/2 lg:w-1/2 m-auto">
        <h1 className=" text-xl font-bold">Device Details</h1>
        <div className=" h-5" />
        <div className=" w-full md:flex lg:flex bg-white shadow-lg p-3">
          <div className=" flex-1">
            <div className=" flex justify-center">
              <ImageView
                pic1={data.rpic1}
                pic2={data.rpic2}
                pic3={data.rpic3}
              />
            </div>
          </div>
          <div className=" h-5" />
          <div className=" flex-1">
            <h1 className=" text-lg font-bold">Device Info</h1>
            <Item label="Device Name" value={data?.rdevice_name} />
            <Item label="Device Type" value={data?.rdevice_type} />
            <Item label="Device Brand" value={data?.rdeviceBrand} />
            <Item label="Salvage Value" value={data?.rsalvage_price} />
            <Item label="Total Fix" value={convertMoney(totalFix.toString())} />
            <Item label="Total Selling Price" value={data?.selling_price} />

            <div className=" h-5" />

            <div className=" flex">
              <div className=" flex-1 flex items-center ">
                <h1 className=" text-lg font-bold">List of fixes</h1>
              </div>
              <div>
                <Button onClick={() => setIsOpen(true)}>Add Fix</Button>
              </div>
            </div>

            <Modal
              setShowModal={setIsOpen}
              showModal={isOpen}
              header="Create Fix"
              onConfirm={() => handleAddFix()}
              onCancel={() => setIsOpen(false)}
            >
              <div className=" w-full ">
                <TextInput
                  placeholder="Fix"
                  onChange={(e) => setFix(e.target.value)}
                />
                <div className=" h-5" />
                <TextInput
                  placeholder="Amount"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </Modal>
            <FixList
              repubrishItem_id={data?.repubrishItem_id}
              refetch={isLoading}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
