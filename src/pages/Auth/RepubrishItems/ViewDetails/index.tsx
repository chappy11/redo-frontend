import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FixList,
  ImageView,
  PageContainer,
} from "../../../../components";
import { useParams } from "react-router-dom";
import { getItem } from "../../../../service/RepubrishItem";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { addtocart } from "../../../../service/RefubrishCart";

export default function ViewDetails() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const { data: user } = useGetFromStorage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alertSuccess, alertError, alertWarning } = useAlertOptions();
  const sendRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!id) {
        return;
      }
      const resp = await getItem(id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    sendRequest();
  }, [id]);

  async function handleAddToCart() {
    try {
      if (!user) {
        return;
      }
      const payload = {
        id,
        user_id: user?.user_id,
        seller_id: data?.user_id,
      };

      const resp = await addtocart(payload);
      if (resp.data.status === 1) {
        alertSuccess(resp.data.message);
        return;
      }
      alertWarning(resp.data.message);
    } catch (error) {
      alertError();
    }
  }

  const displayFix = useMemo(() => {
    if (!id) {
      return;
    }

    return (
      <FixList repubrishItem_id={data.repubrishItem_id} refetch={isLoading} />
    );
  }, [data.repubrishItem_id, id, isLoading]);
  return (
    <PageContainer>
      <div className=" m-auto w-1/2 md:w-3/4 lg:w-3/4">
        <h1 className=" text-xl font-bold mb-5">Device Details</h1>
        <div className=" bg-white p-5 w-full shadow-lg">
          <div className=" flex flex-col md:flex-row lg:flex-row">
            <div className=" flex-1 flex justify-center">
              <ImageView
                pic1={data?.rpic1}
                pic2={data?.rpic2}
                pic3={data?.rpic3}
              />
            </div>
            <div className=" flex-1">
              <h1 className=" text-lg font-bold">
                {data?.rdevice_name} ({data?.rdeviceBrand})
              </h1>
              <p className=" text-sm text-secondary">{data?.rdevice_type}</p>

              <p className=" mt-4 text-red-400 font-bold">
                PHP {data?.selling_price}
              </p>
              <div className=" mt-5">
                <p className=" text-sm font-bold">Device Issue/Description</p>
                <p className=" mx-3 text-sm mt-2">
                  {data?.rdevice_description}
                </p>
              </div>
              <div className=" flex w-full justify-end mt-5">
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
              <div className=" mt-5">
                <div className=" flex mb-5">
                  <p className=" font-bold">Device Fix:</p>
                </div>
              </div>
              {displayFix}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
