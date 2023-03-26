import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ImageView, PageContainer } from "../../../../components";
import Item from "../../../../components/Item";
import { transaction } from "../../../../service/SellingTransaction";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function SellingTransactionDetails() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});

  const getData = useCallback(async () => {
    try {
      if (!id) {
        return;
      }
      const resp = await transaction(id?.toString());

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageContainer>
      <div className=" w-1/2 m-auto">
        <h1 className=" font-bold text-xl">{data.ref_id}</h1>
        <div className=" h-10" />
        <div className=" bg-white shadow-lg p-4 flex">
          <div className=" w-1/2 flex justify-center">
            <ImageView pic1={data?.pic1} pic2={data?.pic2} pic3={data?.pic3} />
          </div>
          <div className=" w-full">
            <h1 className=" font-bold text-xl">{data?.deviceName}</h1>
            <p className=" text-sm">{data.deviceBrand}</p>
            <div className=" w-full mt-5">
              <Item
                label="Purchase Price"
                value={"PHP" + " " + data.purchase_price}
              />
              <Item
                label="Salvage Price"
                value={"PHP" + " " + data.salvage_amount}
              />
              <Item label="No years used" value={data.number_years + "yrs"} />
              <p className=" font-semibold text-secondary">Description</p>
              <p className=" text-primary ml-3">{data.deviceDescription}</p>
              <div className=" h-6" />
              <p className=" text-lg font-bold">Buyer Info</p>
              <Item label="Buyer" value={data.fullname} />
              <Item label="Reciever" value={data.fullname} />
              <Item
                label="Reciever Contact NO."
                value={data.salvage_recieverMobile}
              />

              <Item
                label="Shipping Address"
                value={data.salvage_shippingAddress}
              />
              <div className=" h-6" />
              <Button
                backgroundColor={"bg-red-500"}
                onClick={() =>
                  (window.location.href = RoutesPath.TRANSACTION_HISTORY)
                }
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
