import React from "react";
import { Button, CartItem, PageContainer } from "../../../../components";
import useGetRefubrishCart from "../../../../hooks/RefubrishItem/useGetRefubrishCart";

import useAlertOptions from "../../../../hooks/useAlertOptions";
import {
  updatestatus,
  updatequantity,
} from "../../../../service/RefubrishCart";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function RefubrishCart() {
  const { data, setRefetch } = useGetRefubrishCart();
  const { alertError, alertWarning } = useAlertOptions();

  async function handleStatus(id: string, status: string) {
    try {
      setRefetch(true);
      const payload = {
        id,
        status,
      };
      const resp = await updatestatus(payload);

      if (resp.data.status === "0") {
        alertError();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  }

  async function handleupdatequantity(id: string, type: string) {
    try {
      setRefetch(true);
      const payload = { rcart_id: id, type };

      const resp = await updatequantity(payload);

      if (resp.data.status === "0") {
        alertWarning(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  }

  function handleCheckout(seller_id: string, items: any[]) {
    const activeItems = items.filter((val) => val.crisActive === "1");

    if (activeItems.length < 1) {
      alertWarning("Please check the item you want to checkout");
      return;
    }

    window.location.href = RoutesPath.CHECKOUT + seller_id;
  }

  return (
    <PageContainer>
      <div className=" w-1/2 m-auto">
        <h1>My Cart</h1>
        <div className=" h-5" />
        {data.map((item, i) => (
          <div>
            <div className=" flex p-3 bg-primary text-white">
              <div className=" flex flex-1  items-center">
                <p className=" font-bold">{item.shopName}</p>
              </div>
              <Button
                onClick={() => handleCheckout(item.seller_id, item.items)}
              >
                Checkout
              </Button>
            </div>

            {item.items.map((val: any, i: number) => {
              const total =
                parseFloat(val.selling_price) * parseInt(val.cquantity);
              return (
                <CartItem
                  img={val.rpic1}
                  deviceName={val.rdevice_name}
                  brand={val.rdeviceBrand}
                  price={val.selling_price}
                  total={total.toString()}
                  quantity={val.cquantity}
                  status={val.crisActive === "1"}
                  id={val.rcart_id}
                  handleStatus={() =>
                    handleStatus(val.rcart_id, val.crisActive)
                  }
                  handleIncrement={() =>
                    handleupdatequantity(val.rcart_id, "increment")
                  }
                  handleDecrement={() =>
                    handleupdatequantity(val.rcart_id, "decrement")
                  }
                  handleRemove={() => {}}
                />
              );
            })}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
