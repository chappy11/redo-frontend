import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, PageContainer, TextInput } from "../../../components";
import { BASE_URL } from "../../../constant/config";
import useGetSalvageItemById from "../../../hooks/salvageitem/useGetSalvageItemById";
import useAlertOptions from "../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import useGetUserInfo from "../../../hooks/user/useGetUserInfo";
import { checkoutSalvageOrder } from "../../../service/SalvageOrder";
import { AlertIcon } from "../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../types/RoutesPath.enum";

export default function Checkout() {
  const { id } = useParams();
  const { data } = useGetSalvageItemById({ salvageItem_id: id ? id : "" });
  const { data: user, sendRequest: getUserInfo } = useGetUserInfo();
  const { data: currentUser } = useGetFromStorage();
  const [shippingInfo, setShippingInfo] = useState({
    recieverName: "",
    address: "",
    mobileNumber: "",
  });
  const { alertWarning, alertError, alertWithAction } = useAlertOptions();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    getUserInfo(data?.user_id);
  }, [data, getUserInfo]);

  const displaySellerInfo = useMemo(() => {
    if (!user) {
      return;
    }

    return (
      <div className=" flex">
        <img
          src={BASE_URL + user?.profilePic}
          alt="Proifle"
          className=" h-8 w-8 rounded-full"
        />
        <p className=" text-xs align-middle py-2">{user?.fullname}</p>
      </div>
    );
  }, [user, data]);

  async function checkout() {
    try {
      if (!shippingInfo.address) {
        alertWarning("Please put your address");

        return;
      }

      const name = shippingInfo.recieverName
        ? shippingInfo?.recieverName
        : currentUser?.fullname;

      const mobile = shippingInfo.mobileNumber
        ? shippingInfo.mobileNumber
        : currentUser?.phoneNumber;

      const payload = {
        user_id: currentUser?.user_id,
        salvageItem_id: data?.salvageItem_id,
        amount: data?.salvage_price,
        recieverName: name,
        address: shippingInfo.address,
        mobile: mobile,
      };

      const resp = await checkoutSalvageOrder(payload);

      if (resp.data.status === "0") {
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

  function navigateToTransactionPage() {
    window.location.href = RoutesPath.HOME;
  }

  return (
    <PageContainer>
      <div className=" m-auto w-3/4 md:w-1/2">
        <h1 className=" font-bold text-xl">Checkout</h1>
        <div className=" h-5" />
        <div className=" bg-white p-5 shadow-lg rounded-lg">
          <div className=" w-full flex">
            <img
              className=" w-24 h-28"
              src={BASE_URL + data?.pic1}
              alt="pic1"
            />
            <div className=" px-5">
              <h1 className=" font-bold">{data?.deviceName}</h1>
              <h3 className=" text-sm">{data?.deviceBrand}</h3>
              <div className=" h-5" />
              {displaySellerInfo}
            </div>
          </div>
          <div className=" h-5" />
          <div className=" w-full border-b-[0.5px] border-gray-300" />
          <div className=" h-5" />
          <h1 className=" font-bold">Shipping Info</h1>
          <div className=" h-5" />
          <TextInput
            placeholder={currentUser?.fullname}
            name="recieverName"
            onChange={onChange}
          />
          <div className=" h-5" />
          <TextInput
            placeholder={currentUser?.phoneNumber}
            name="mobileNumber"
            onChange={onChange}
          />
          <div className=" h-5" />
          <TextInput
            placeholder="Shipping Address"
            name="address"
            onChange={onChange}
          />
          <div className=" h-5" />
          <div className=" w-full border-b-[0.5px] border-gray-300" />
          <div className=" h-5" />
          <p className=" text-right">
            <span className=" font-bold text-red-500">Total: </span>
            <span className=" font-bold"> PHP {data?.salvage_price}</span>
          </p>
          <div className=" w-full md:w-fit lg:w-fit mt-5">
            <Button isFull onClick={checkout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
