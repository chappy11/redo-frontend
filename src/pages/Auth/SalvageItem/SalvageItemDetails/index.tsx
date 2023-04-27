import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ImageInput,
  ImageView,
  Item,
  Modal,
  PageContainer,
} from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import useGetSalvageItemById from "../../../../hooks/salvageitem/useGetSalvageItemById";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { UserEnum } from "../../../../types/UserEnum.enum";
import { convertMoney } from "../../../../utils/money.utils";
import { salvageAddToCart } from "../../../../service/SalvageCart";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { removeSalvage } from "../../../../service/SalvageItem";

import { AlertIcon } from "../../../../types/AlertIcon.enum";

export default function SalvageItemDetails() {
  const { id } = useParams();
  const { data } = useGetSalvageItemById({ salvageItem_id: id ? id : "" });
  const { alertSuccess, alertError, alertWithAction } = useAlertOptions();
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

  async function remove() {
    try {
      const resp = await removeSalvage(data?.salvageItem_id);

      if (resp.data.status === 1) {
        alertWithAction({
          title: "Successfully",
          text: "Salvage Item Successfully Removed",
          icon: AlertIcon.SUCCESS,
          onConfirm: () => {
            window.location.href = RoutesPath.SALVAGE_ITEM;
          },
        });
        return;
      }

      alertError();
    } catch (error) {
      console.log(error);
    }
  }

  const displayBuyButton = useMemo(() => {
    if (!user) {
      return;
    }

    if (user?.userRoles === UserEnum.REPAIRER) {
      return (
        <div>
          <Button onClick={handleAddtoCart}>Add To Cart</Button>;
        </div>
      );
    }

    if (user?.userRoles === UserEnum.USER && data?.isSold === "0") {
      return (
        <div className=" flex space-x-3 ">
          <Button
            onClick={() =>
              (window.location.href =
                RoutesPath.UPDATE_SALVAGE_DETAILS + data?.salvageItem_id)
            }
          >
            Update Details
          </Button>
          <Button onClick={remove} backgroundColor=" bg-red-500">
            Delete
          </Button>
        </div>
      );
    }
  }, [user, data]);

  const displayQuantity = useMemo(() => {
    if (data?.squantity < 1) {
      return "Out of Stock";
    }

    if (data?.squantity < 2) {
      return `${data?.squantity} pc available`;
    }

    return `${data?.squantity} pcs available`;
  }, [data?.squantity]);

  const displaySeller = useMemo(() => {
    if (user?.userRoles === UserEnum.REPAIRER) {
      return <Item label={"Seller"} value={data?.fullname} />;
    }
  }, [user]);
  return (
    <PageContainer>
      <div className=" w-3/4 m-auto md:w-2/4">
        <h1 className=" font-bold text-2xl">Salvage Item Details </h1>
        <div className=" h-5" />
        <div className=" bg-white shadow-lg p-3 flex flex-col md:flex-row lg:flex-row rounded-lg">
          <div className=" flex flex-1">
            <ImageView pic1={data?.pic1} pic2={data?.pic2} pic3={data?.pic3} />
          </div>

          <div className=" p-4 w-full flex flex-1 flex-col">
            <h1 className=" text-xl font-extrabold text-primary">
              {data?.deviceName}
            </h1>
            <div className=" flex flex-row"></div>

            <div className=" border-b-slate-300 my-3 border-b"></div>
            <p className=" mt-2  text-sm mb-5">
              <span className=" font-bold mr-2">Issue Description:</span>
              {data?.deviceDescription}
            </p>

            <Item label={"Device Brand"} value={data?.deviceBrand} />
            <Item label={"Device Stock"} value={displayQuantity} />
            {displaySeller}
            <h3 className=" text-red-500 font-bold text-right mt-5">
              PHP {convertMoney(data?.salvage_price)}
            </h3>
            <div className=" h-5" />
            {displayBuyButton}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
