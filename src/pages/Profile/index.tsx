import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ImageInput,
  Item,
  PageContainer,
  TextInput,
} from "../../components";
import useGetFromStorage from "../../hooks/useGetFromStorage";
import { BASE_URL } from "../../constant/config";
import { updateUser } from "../../service/User";
import { save } from "../../utils/storage.utils";
import useAlertOptions from "../../hooks/useAlertOptions";
import { AlertIcon } from "../../types/AlertIcon.enum";
import { UserEnum } from "../../types/UserEnum.enum";

export default function Profile() {
  const { data } = useGetFromStorage();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [newFullName, setNewFullName] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const { alertSuccess, alertError, alertWithAction } = useAlertOptions();

  const image = useMemo(() => {
    if (data) {
      return BASE_URL + data?.profilePic;
    }
  }, [data]);

  const onChangePic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  }, []);

  const handleUpdate = useCallback(async () => {
    try {
      if (!data) {
        return;
      }
      let formdata = new FormData();
      formdata.append("user_id", data?.user_id);
      formdata.append("fullname", newFullName);
      formdata.append("address", newAddress);
      if (profilePic) {
        formdata.append("pic", profilePic);
      }
      const response = await updateUser(formdata);

      if (response.data.status === 1) {
        save(response.data.data);

        setIsUpdate(false);
        alertWithAction({
          title: "Successfully",
          text: "Successfully Updated",
          icon: AlertIcon.SUCCESS,
          onConfirm: () => window.location.reload(),
        });
        return;
      }

      alertError();
    } catch (error) {
      alertError();
    }
  }, [alertError, alertSuccess, data, newAddress, newFullName, profilePic]);

  const display = useMemo(() => {
    if (!data) {
      return;
    }

    if (!isUpdate) {
      return (
        <>
          <Item label="Fullname" value={data?.fullname as string} />
          <Item label="Email" value={data?.email as string} />
          <Item label="Mobile Number" value={data?.phoneNumber as string} />
          <Item label="Address" value={data?.address as string} />
          <div className=" flex w-full justify-end mt-8">
            <Button className=" right-0" onClick={() => setIsUpdate(true)}>
              Update Now
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <label className=" text-sm">Fullname</label>
        <TextInput
          placeholder={data?.fullname}
          onChange={(e) => setNewFullName(e.target.value)}
        />
        <div className=" h-5" />
        <label className=" text-sm">Address</label>
        <TextInput
          placeholder={data?.address}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <div className=" flex w-full justify-end mt-8">
          <Button className=" right-0" onClick={handleUpdate}>
            Submit
          </Button>
        </div>
      </>
    );
  }, [data, handleUpdate, isUpdate]);

  const displayProfile = useMemo(() => {
    if (isUpdate) {
      if (profilePic) {
        return (
          <div className=" flex justify-center">
            <img
              src={URL.createObjectURL(profilePic)}
              alt="GG"
              className=" rounded-full w-32 h-32 "
            />
          </div>
        );
      }

      return (
        <div className=" flex justify-center">
          {" "}
          <ImageInput
            className=" w-32 h-32 rounded-fulls"
            onChange={onChangePic}
          />
        </div>
      );
    }

    return (
      <img
        className=" rounded-full m-auto w-32 h-32 bg-slate-100  mt-6"
        src={image}
        alt="GG"
      />
    );
  }, [isUpdate, image, profilePic, onChangePic]);

  const displayShopData = useMemo(()=>{
    if(!data){
      return;
    }
    if(data?.userRoles === UserEnum.USER){
      return;
    }

    return ( 
      <div>
         <img
            className=" rounded-full m-auto w-32 h-32 bg-slate-100  mt-6"
            src={BASE_URL + data?.shopImage}
            alt="GG"
          />
            <Item label="Shop name" value={data?.shop_name as string} />
            <Item label="Shop Address" value={data?.shopAddress as string} />
      </div>
   );
  },[data])
  console.log(data?.shopImage ??  data?.shopImage)
  return (
    <PageContainer>
      <div className=" mx-5 md:w-1/2 lg:w-1/2 md:m-auto lg:m-auto mb-10">
        <div className=" bg-white rounded-md shadow-lg p-4">
          <h1 className=" text-xl font-bold ">Profile</h1>
          {displayProfile}
          <div className=" h-5" />
          {display}
        </div>
        <div className=" h-5"/>
        <div className=" bg-white rounded-md shadow-lg p-4 mb-10">
          <h1 className=" text-xl font-bold ">Shop Details</h1>
          {displayShopData}
        </div>
      </div>
    </PageContainer>
  );
}
