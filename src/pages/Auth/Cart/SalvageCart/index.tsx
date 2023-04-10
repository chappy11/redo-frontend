import React from "react";
import { Button, CartItem, PageContainer } from "../../../../components";
import useGetSalvageCart from "../../../../hooks/salvageitem/useGetSalvageCart";
import {
  salvageUpdateStatus,
  updateQuantity,
} from "../../../../service/SalvageCart";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function SalvageCart() {
  const { data, setRefetch } = useGetSalvageCart();
  const { alertError, alertWarning } = useAlertOptions();

  function countArray(data: any[]): string {
    return `No Items: ${data.length.toString()} `;
  }

  async function updateStatus(cart_id: string, status: string) {
    try {
      setRefetch(true);
      const payload = {
        id: cart_id,
        status,
      };

      const resp = await salvageUpdateStatus(payload);

      if (resp.data.status === 0) {
        alertError();
      }
    } catch (error) {
    } finally {
      setRefetch(false);
    }
  }

  async function handleUpdateQuantity(cart_id: string, type: string) {
    try {
      setRefetch(true);
      const payload = {
        id: cart_id,
        type,
      };
      const res = await updateQuantity(payload);

      if (res.data.status === 0) {
        alertError(res.data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  }

  function handleCheckout(sellerId: string, item: any[]) {
    const activeItems = item.filter((val) => val.scActive === "1");

    if (activeItems.length < 1) {
      alertWarning("Please check items that you to checkout");

      return;
    }

    window.location.href = RoutesPath.CHECKOUT + sellerId;
  }

  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <h1>Salvage Cart</h1>
        <div className=" mx-5" />
        {data.map((item, i) => (
          <div key={item.seller_id}>
            <div className=" flex bg-primary text-white p-3">
              <div className=" flex-1 flex items-center">
                <h1>{item.fullname}</h1>
              </div>
              <Button
                onClick={() => handleCheckout(item.seller_id, item.items)}
              >
                Checkout
              </Button>
              <div className=" flex items-center mx-4">
                <p>{countArray(item.items)}</p>
              </div>
            </div>
            {item.items.map((val: any, i: number) => {
              const total =
                parseInt(val.quantity) * parseFloat(val.salvage_price);
              return (
                <CartItem
                  img={val.pic1}
                  deviceName={val.deviceName}
                  brand={val.deviceBrand}
                  price={val.salvage_price}
                  total={total.toString()}
                  quantity={val.quantity}
                  status={val.scActive === "1"}
                  id={val.salvagecart_id}
                  handleStatus={() =>
                    updateStatus(val.salvagecart_id, val.scActive)
                  }
                  handleIncrement={() =>
                    handleUpdateQuantity(val.salvagecart_id, "increment")
                  }
                  handleDecrement={() =>
                    handleUpdateQuantity(val.salvagecart_id, "decrement")
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
