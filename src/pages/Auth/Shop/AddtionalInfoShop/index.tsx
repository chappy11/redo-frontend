import React, { useMemo, useState } from "react";
import { Button, ImageInput, TextInput } from "../../../../components";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { applyShop } from "../../../../service/RepairShop";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { save } from "../../../../utils/storage.utils";

function AdditionalInfoShop() {
  const { data: user } = useGetFromStorage();
  const { alertError, alertWarning, alertWithAction } = useAlertOptions();
  const [info, setInfo] = useState({
    name: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [birPhoto, setBirPhoto] = useState<any | null>(null);
  const [dtiPhoto, setDtiPhoto] = useState<any | null>(null);
  const [shopPicture, setShopPicture] = useState<any | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const onChangeDtiPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDtiPhoto(e?.target?.files[0]);
    }
  };

  const onChangeBirPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBirPhoto(e?.target?.files[0]);
    }
  };

  const onChangeShopPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setShopPicture(e?.target?.files[0]);
    }
  };

  const displayBirPhoto = useMemo(() => {
    if (birPhoto) {
      return (
        <img
          src={URL.createObjectURL(birPhoto)}
          alt="BIR"
          className=" h-80 w-80"
        />
      );
    }

    return <ImageInput onChange={onChangeBirPhoto} />;
  }, [birPhoto]);

  const displayDtiPhoto = useMemo(() => {
    if (dtiPhoto) {
      return (
        <img
          src={URL.createObjectURL(dtiPhoto)}
          alt="DTI"
          className=" h-80 w-80"
        />
      );
    }

    return <ImageInput onChange={onChangeDtiPhoto} />;
  }, [dtiPhoto]);

  const displayShopPhoto = useMemo(() => {
    if (shopPicture) {
      return (
        <img
          src={URL.createObjectURL(shopPicture)}
          alt="DTI"
          className=" h-80 w-80"
        />
      );
    }

    return <ImageInput onChange={onChangeShopPicture} />;
  }, [shopPicture]);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      if (!shopPicture) {
        alertWarning("Shop Picture is Required");

        return;
      }

      if (!info.name) {
        alertWarning("Shop Name is Required");

        return;
      }

      if (!info.address) {
        alertWarning("Shop Address is Required");

        return;
      }

      if (!birPhoto) {
        alertWarning("BIR Certication Photo is required");

        return;
      }

      if (!dtiPhoto) {
        alertWarning("DTI Certification Photo is required");

        return;
      }

      if (!user) {
        return;
      }

      const formData = new FormData();
      formData.append("user_id", user?.user_id);
      formData.append("pic", shopPicture);
      formData.append("name", info.name);
      formData.append("address", info.address);
      formData.append("bir", birPhoto);
      formData.append("dti", dtiPhoto);
      const resp = await applyShop(formData);

      if (resp.data.status) {
        save(resp.data.data);
        alertWithAction({
          title: "Success",
          text: "Successfully Registered Shop, Wait for the admin to accept your info",
          icon: AlertIcon.SUCCESS,
          onConfirm: () => (window.location.href = RoutesPath.SHOPS),
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alertError();
    }
  }

  console.log(info);
  return (
    <div className=" bg-white w-3/4 m-auto  p-5">
      <h1 className=" text-lg font-bold">Repair Shop Info</h1>
      <div className=" h-10" />
      <p className=" text-center">Shop Picture</p>
      <div className=" flex flex-1 justify-center">{displayShopPhoto}</div>
      <div className=" h-10" />
      <TextInput placeholder="Shop Name" onChange={onChange} name="name" />
      <div className=" h-5" />
      <TextInput
        placeholder="Shop Address"
        onChange={onChange}
        name="address"
      />

      <h2 className=" my-8 font-bold">Certification</h2>
      <div className=" flex flex-col justify-center items-center md:flex-row lg:flex-row">
        <div className=" m-3">
          {displayBirPhoto}
          <p>BIR Certification</p>
        </div>
        <div className=" m-3">
          {displayDtiPhoto}
          <p>DTI Permit</p>
        </div>
      </div>
      <div className=" h-10" />
      <div className=" w-full md:w-1/4">
        <Button isFull onClick={handleSubmit} disabled={isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AdditionalInfoShop;
