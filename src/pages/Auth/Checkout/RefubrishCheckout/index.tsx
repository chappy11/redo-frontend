import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Item,
  Modal,
  PageContainer,
  TextInput,
} from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import useGetUserInfo from "../../../../hooks/user/useGetUserInfo";
import { checkoutSalvageOrder } from "../../../../service/SalvageOrder";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import useGetActiveCart from "../../../../hooks/salvageitem/useGetActiveCart";
import { convertMoney } from "../../../../utils/money.utils";
import useGetActiveRefubrishCart from "../../../../hooks/RefubrishItem/useGetActiveRefubrishCart";
import { createRefubrishOrder } from "../../../../service/RefubrishOrder";

const GCASH = require("../../../../asset/GCash-Logo-Transparent-PNG-1.png");

export default function RefubrishCheckout() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useGetActiveRefubrishCart({ seller_id: id ?? "" });
  const { data: user, sendRequest: getUserInfo } = useGetUserInfo();
  const { data: currentUser } = useGetFromStorage();
  const [courier, setCourier] = useState<string>("");

  const { alertWarning, alertError, alertWithAction } = useAlertOptions();

  const total = useMemo(() => {
    let total: number = 0;
    data.forEach((e) => {
      let totalEachItem = parseInt(e.cquantity) * parseFloat(e.selling_price);

      total += totalEachItem;
    });

    return total;
  }, [data]);

  async function checkout() {
    try {
      const payload = {
        user_id: currentUser?.user_id,
        amount: total,
        recieverName: currentUser?.fullname,
        address: currentUser?.address,
        mobile: currentUser?.phoneNumber,
        seller_id: data[0].seller_id,
        courier,
      };

      const resp = await createRefubrishOrder(payload);

      if (resp.data.status === 0) {
        alertWarning(resp.data.message);
        return;
      }

      alertWithAction({
        title: "Successfully",
        text: resp.data.message,
        icon: AlertIcon.SUCCESS,
        onConfirm: () => navigateToTransactionPage(),
      });
    } catch (error) {
      alertError();
    }
  }

  const orderitem = useMemo(() => {
    return data.map((val, i) => (
      <div className=" w-full flex border-b border-b-slate-300 my-3 p-3">
        <img className=" w-24 h-28" src={BASE_URL + val?.rpic1} alt="pic1" />
        <div className=" px-5">
          <h1 className=" font-bold">{val?.rdevice_name}</h1>
          <h3 className=" text-sm">{val?.rdeviceBrand}</h3>
          <div className=" h-5" />
          {val.fullname}
          <p>
            Total:{" "}
            {convertMoney(
              (
                parseInt(val.cquantity) * parseFloat(val.selling_price)
              ).toString()
            )}
            {}
          </p>
        </div>
      </div>
    ));
  }, [data]);

  function navigateToTransactionPage() {
    window.location.href = RoutesPath.HOME;
  }

  function handleOpenPayment() {
    if (!courier) {
      alertWarning("Please choose you delivery Courier");
      return;
    }

    setIsOpen(true);
  }

  return (
    <PageContainer>
      <div className=" m-auto w-3/4 md:w-1/2">
        <h1 className=" font-bold text-xl">Checkout</h1>
        <div className=" h-5" />
        <Modal
          showModal={isOpen}
          setShowModal={setIsOpen}
          confirmText="Confirm"
          onConfirm={() => checkout()}
          onCancel={() => setIsOpen(false)}
        >
          <div className=" p-5 flex justify-center flex-col items-center">
            <h1>Pay with :</h1>
            <img src={GCASH} alt="gcash" className=" h-1/2 w-1/2" />
            <h1 className=" font-bold mt-5">{data[0]?.fullname}</h1>
            <h1>{data[0]?.phoneNumber}</h1>
          </div>
        </Modal>
        <div className=" bg-white p-5 shadow-lg rounded-lg">
          {orderitem}
          <div className=" h-5" />
          <div className=" h-5" />
          <h1 className=" font-bold">Shipping Info</h1>
          <div className=" h-5" />
          <Item
            label={"Reciever Name"}
            value={currentUser?.fullname ? currentUser?.fullname : ""}
          />
          <Item
            label={"Mobile Number"}
            value={currentUser?.phoneNumber ? currentUser?.phoneNumber : ""}
          />
          <Item
            label={"Shipping Address"}
            value={currentUser?.address ? currentUser?.address : ""}
          />
          <div className=" h-5" />
          <select
            className={`border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full rounded  focus:border-green-400`}
            onChange={(e) => setCourier(e.target.value)}
          >
            <option value="">Choose your courier</option>
            <option value="Maxim">Maxim</option>
            <option value="Lalamove">Lalamove</option>
          </select>
          <div className=" h-5" />
          <div className=" w-full border-b-[0.5px] border-gray-300" />
          <div className=" h-5" />
          <p className=" text-right">
            <span className=" font-bold text-red-500">Total: </span>
            <span className=" font-bold">
              {" "}
              PHP {convertMoney(total.toString())}
            </span>
          </p>
          <div className=" w-full md:w-fit lg:w-fit mt-5">
            <Button isFull onClick={handleOpenPayment}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
