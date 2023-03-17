import React, { useMemo, useState } from "react";
import {
  Button,
  PageContainer,
  TextArea,
  TextInput,
} from "../../../../components";
import ImageInput from "../../../../components/ImageInput";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetAllBrands from "../../../../hooks/useGetAllBrands";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { createSalvage } from "../../../../service/SalvageItem";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import Card from "../components/Card";

const TYPE = ["Laptop", "Phone"];

export default function CreateSalvageItem() {
  const { brands } = useGetAllBrands();
  const { data: user } = useGetFromStorage();
  const { alertWarning, alertSuccess, alertError, alertWithAction } =
    useAlertOptions();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [deviceInfo, setDeviceInfo] = useState({
    name: "",
    price: 0,
  });
  const [description, setDescription] = useState<string>("");
  const [pic1, setPic1] = useState<any | null>(null);
  const [pic2, setPic2] = useState<any | null>(null);
  const [pic3, setPic3] = useState<any | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value });
  };

  const onChangePic1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic1(e.target.files[0]);
    }
  };

  const onChangePic2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic2(e.target.files[0]);
    }
  };

  const onChangePic3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPic3(e.target.files[0]);
    }
  };

  const displayFirstPic = useMemo(() => {
    if (pic1) {
      return (
        <img
          src={URL.createObjectURL(pic1)}
          alt="pic1"
          className=" h-80  w-80"
        />
      );
    }

    return <ImageInput onChange={onChangePic1} />;
  }, [pic1]);

  const displaySecondPic = useMemo(() => {
    if (pic2) {
      return (
        <img
          src={URL.createObjectURL(pic2)}
          alt="pic2"
          className=" h-80  w-80"
        />
      );
    }

    return <ImageInput onChange={onChangePic2} />;
  }, [pic2]);

  const displayThirdPic = useMemo(() => {
    if (pic3) {
      return (
        <img
          src={URL.createObjectURL(pic3)}
          alt="pic3"
          className=" h-80  w-80"
        />
      );
    }

    return <ImageInput onChange={onChangePic3} />;
  }, [pic3]);
  const displaySelect = useMemo(() => {
    return brands?.map((val, i) => (
      <>
        <option value={val.brandName} className=" p-2" key={val.brand_id}>
          {val.brandName}
        </option>
      </>
    ));
  }, [brands]);

  const displayType = useMemo(() => {
    return TYPE.map((val, i) => (
      <>
        <option key={i.toString()} value={val}>
          {val}
        </option>
      </>
    ));
  }, [TYPE]);

  async function handleSubmit() {
    try {
      if (!pic1 || !pic2 || !pic3) {
        alertWarning("3 picture si required");

        return;
      }

      if (!deviceInfo.name) {
        alertWarning("Device Name is Required");

        return;
      }

      if (deviceInfo.price < 1) {
        alertWarning("Price should not be less 1 peso");

        return;
      }

      if (!description) {
        alertWarning("Please put the description or the issue of device");

        return;
      }

      if (!selectedType) {
        alertWarning("Please choose Device Type");

        return;
      }

      if (!selectedBrand) {
        alertWarning("Please choose Brand of your Device");
      }

      if (!user) {
        return;
      }

      const formdata = new FormData();
      formdata.append("user_id", user?.user_id);
      formdata.append("name", deviceInfo.name);
      formdata.append("description", description);
      formdata.append("type", selectedType);
      formdata.append("brand", selectedBrand);
      formdata.append("price", deviceInfo.price.toString());
      formdata.append("pic1", pic1);
      formdata.append("pic2", pic2);
      formdata.append("pic3", pic3);

      const resp = await createSalvage(formdata);

      if (resp.data.status === 0) {
        alertError();

        return;
      }

      alertWithAction({
        title: "Successful",
        text: "Successfully Added",
        icon: AlertIcon.SUCCESS,
        onConfirm: () => (window.location.href = RoutesPath.SALVAGE_ITEM),
      });
    } catch (error) {
      alertError();
    }
  }

  return (
    <PageContainer>
      <div className="  w-full flex  justify-center mb-10">
        <Card>
          <div className=" flex flex-col-reverse md:flex-col lg:flex-col">
            <div className=" flex flex-col md:flex-row justify-center items-center  w-full gap-4">
              {displayFirstPic}
              {displaySecondPic}
              {displayThirdPic}
            </div>

            <div className=" mt-5">
              <h1 className=" font-bold mb-3">Device Information</h1>
              <TextInput placeholder="Name" onChange={onChange} name="name" />
              <div className=" h-3" />
              <select
                className={`border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full rounded  focus:border-green-400`}
                onChange={(e) => setSelectedType(e.target.value)}
                value={selectedType}
              >
                <option value="">Please Choose Type</option>
                {displayType}
              </select>
              <div className=" h-3" />
              <select
                className={`border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full rounded  focus:border-green-400`}
                onChange={(e) => setSelectedBrand(e.target.value)}
                value={selectedBrand}
              >
                <option value="">Please Choose Brand</option>
                {displaySelect}
              </select>
              <div className=" h-3" />
              <TextInput
                placeholder="Price"
                type="number"
                name="price"
                onChange={onChange}
              />
              <div className=" h-3" />
              <TextArea
                placeholder="Device Details"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className=" h-3" />
            </div>
          </div>
          <div className=" h-3" />
          <Button isFull onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </div>
    </PageContainer>
  );
}
