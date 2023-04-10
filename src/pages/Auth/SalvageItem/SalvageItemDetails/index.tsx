import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ImageView, PageContainer } from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import useGetSalvageItemById from "../../../../hooks/salvageitem/useGetSalvageItemById";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { UserEnum } from "../../../../types/UserEnum.enum";
import { convertMoney } from "../../../../utils/money.utils";
import { salvageAddToCart } from "../../../../service/SalvageCart";
import useAlertOptions from "../../../../hooks/useAlertOptions";

export default function SalvageItemDetails() {
  const { id } = useParams();
  const { data } = useGetSalvageItemById({ salvageItem_id: id ? id : "" });
  const { alertSuccess, alertError } = useAlertOptions();
  const { data: user } = useGetFromStorage();

  async function handleAddtoCart() {
    try {
      const payload = {
        item_id: data?.salvageItem_id,
        user_id: user?.user_id,
      };

      const resp = await salvageAddToCart(payload);

      if (resp.data.status === 1) {
        alertSuccess(resp.data.message);

        return;
      }

      alertError(resp.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const displayBuyButton = useMemo(() => {
    if (!user) {
      return;
    }

    if (user?.userRoles === UserEnum.REPAIRER) {
      return <Button onClick={handleAddtoCart}>Add To Cart</Button>;
    }

    if (user?.userRoles === UserEnum.USER && data?.isSold === "0") {
      return <Button>Update Details</Button>;
    }
  }, [user, data]);
  return (
    <PageContainer>
      <div className=" w-3/4 m-auto md:w-2/4">
        <h1 className=" font-bold text-2xl">Details</h1>
        <div className=" h-5" />
        <div className=" bg-white shadow-lg p-3 flex flex-col md:flex-row lg:flex-row rounded-lg">
          <ImageView pic1={data?.pic1} pic2={data?.pic2} pic3={data?.pic3} />
          <div className=" p-4">
            <p className=" text-sm font-bold">{data?.deviceType}</p>
            <h1 className=" text-xl font-bold">{data?.deviceName}</h1>
            <h3>{data?.deviceBrand}</h3>
            <h3 className=" text-red-500 font-bold">
              PHP {convertMoney(data?.salvage_price)}
            </h3>
            <h1 className=" mt-10 font-bold">Description</h1>
            <p className=" mt-2 ml-2">{data?.deviceDescription}</p>
            <div className=" h-5" />
            {displayBuyButton}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
