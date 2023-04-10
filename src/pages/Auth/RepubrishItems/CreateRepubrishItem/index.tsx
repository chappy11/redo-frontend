/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import {
  Button,
  ImageInput,
  PageContainer,
  TextArea,
  TextInput,
} from "../../../../components";
import { DeviceType } from "../../../../constant/DeviceType";
import useGetAllBrands from "../../../../hooks/useGetAllBrands";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { createRepubrishItem } from "../../../../service/RepubrishItem";
import { AlertIcon } from "../../../../types/AlertIcon.enum";

export default function CreateRepubrishItem() {
  const { data: user } = useGetFromStorage();
  const [pic1, setPic1] = useState<any>();
  const [pic2, setPic2] = useState<any>();
  const [pic3, setPic3] = useState<any>();
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceType, setDeviceType] = useState<string>("");
  const [deviceBrand, setDeviceBrand] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { alertError, alertSuccess, alertWarning, alertWithAction } =
    useAlertOptions();

  const { brands } = useGetAllBrands();

  const displayDeviceBrand = useMemo(() => {
    return brands.map((val, i) => (
      <option value={val.brandName} key={val.brand_id}>
        {val.brandName}
      </option>
    ));
  }, [brands]);

  const onChangeFirstPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic1(e.target.files[0]);
    }
  };

  const onChangeSecondPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic2(e.target.files[0]);
    }
  };
  const onChangeThirdPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic3(e.target.files[0]);
    }
  };

  const displayDeviceType = useMemo(() => {
    return DeviceType.map((val, i) => (
      <option value={val} key={i.toString()}>
        {val}
      </option>
    ));
  }, [DeviceType]);

  const displayPic1 = useMemo(() => {
    if (pic1) {
      return (
        <div>
          <img
            src={URL.createObjectURL(pic1)}
            alt="phone1"
            className=" w-80 h-80"
          />

          <a
            className=" text-blue-600 cursor-pointer"
            onClick={() => setPic1(null)}
          >
            Remove Image
          </a>
        </div>
      );
    }

    return <ImageInput onChange={onChangeFirstPic} />;
  }, [pic1]);

  const displayPic3 = useMemo(() => {
    if (pic3) {
      return (
        <div>
          <img
            src={URL.createObjectURL(pic3)}
            alt="phone1"
            className=" w-80 h-80"
          />
          <a
            className=" text-blue-600 cursor-pointer"
            onClick={() => setPic3(null)}
          >
            Remove Image
          </a>
        </div>
      );
    }

    return <ImageInput onChange={onChangeThirdPic} />;
  }, [pic3]);

  const displayPic2 = useMemo(() => {
    if (pic2) {
      return (
        <div>
          <img
            src={URL.createObjectURL(pic2)}
            alt="phone1"
            className=" w-80 h-80"
          />
          <a
            className=" text-blue-600 cursor-pointer"
            onClick={() => setPic2(null)}
          >
            Remove Image
          </a>
        </div>
      );
    }

    return <ImageInput onChange={onChangeSecondPic} />;
  }, [pic2]);

  async function submit() {
    try {
      if (!pic1 || !pic2 || !pic3) {
        alertWarning("3 Picture is Required");
        return;
      }

      if (!deviceName) {
        alertWarning("Device Name is Required");

        return;
      }

      if (!deviceType) {
        alertWarning("Device Type is Required");

        return;
      }

      if (!deviceBrand) {
        alertWarning("Device Brand is Required");
        return;
      }

      if (!description) {
        alertWarning("Description is Required");
        return;
      }

      if (parseInt(quantity) < 1) {
        alertWarning("Quanity should be greater than one");

        return;
      }

      if (!user) {
        return;
      }

      let formdata = new FormData();
      formdata.append("name", deviceName);
      formdata.append("description", description);
      formdata.append("type", deviceType);
      formdata.append("brand", deviceBrand);
      formdata.append("price", price);
      formdata.append("pic1", pic1);
      formdata.append("pic2", pic2);
      formdata.append("pic3", pic3);
      formdata.append("quantity", quantity);
      formdata.append("user_id", user?.user_id);

      const resp = await createRepubrishItem(formdata);

      if (resp.data.status === 0) {
        alertError();
        return;
      }

      alertWithAction({
        title: "Success",
        text: "Successfully Created",
        icon: AlertIcon.SUCCESS,
        onConfirm: () => (window.location.href = ""),
      });
    } catch (e) {
      alertError("Something went wrong");
    }
  }
  return (
    <PageContainer>
      <div className=" m-auto w-3/4">
        <h1 className=" font-bold text-xl">Create Repubrish Item</h1>
        <div className=" mt-5 w-full bg-white shadow-lg p-6 mb-10">
          <div className=" flex space-x-5 justify-center">
            {displayPic1}
            {displayPic2}
            {displayPic3}
          </div>
          <div className=" mt-5">
            <h1 className=" text-xl font-bold">Device Info</h1>
            <div className=" h-5" />
            <TextInput
              placeholder="Device Name"
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <div className=" h-5" />
            <select
              className={`border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full rounded  focus:border-green-400`}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option>Please Choose Device Type</option>
              {displayDeviceType}
            </select>
            <div className=" h-5" />
            <select
              className={`border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full rounded  focus:border-green-400`}
              onChange={(e) => setDeviceBrand(e.target.value)}
            >
              <option>Please Choose Device Brand</option>
              {displayDeviceBrand}
            </select>
            <div className=" h-5" />
            <TextInput
              placeholder="Salvage Purchase Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className=" h-5" />
            <TextInput
              placeholder="Quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className=" h-5" />
            <TextArea
              placeholder="Device Details"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className=" h-5" />
          </div>
          <div className=" h-10" />
          <Button onClick={submit}>Submit</Button>
        </div>
      </div>
    </PageContainer>
  );
}
