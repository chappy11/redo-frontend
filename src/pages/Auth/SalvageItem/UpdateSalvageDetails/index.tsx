import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ImageInput,
  PageContainer,
  TextArea,
  TextInput,
} from "../../../../components";
import { useParams } from "react-router-dom";
import useGetSalvageItemById from "../../../../hooks/salvageitem/useGetSalvageItemById";
import { updateSalvage } from "../../../../service/SalvageItem";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function UpdateSalvageDetails() {
  const { id } = useParams();
  const { data } = useGetSalvageItemById({ salvageItem_id: id ? id : "" });
  const [secondImage, setSecondImage] = useState<any>();
  const [thirdImage, setThirdImage] = useState<any>();
  const [quantity, setQuantity] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const { alertError, alertSuccess, alertWithAction } = useAlertOptions();

  const onSecondImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSecondImage(e.target.files[0]);
      }
    },
    []
  );

  const onThirdImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setThirdImage(e.target.files[0]);
      }
    },
    []
  );
  const displayPic2 = useMemo(() => {
    if (!data?.pic2 && !secondImage) {
      return <ImageInput onChange={onSecondImageChange} />;
    }
    console.log(secondImage);
    if (secondImage) {
      return (
        <img
          src={URL.createObjectURL(secondImage)}
          alt="second"
          className=" h-56  w-52"
        />
      );
    }
  }, [data?.pic2, secondImage, onSecondImageChange]);

  const displayPic3 = useMemo(() => {
    if (!data?.pic3 && !thirdImage) {
      return <ImageInput onChange={onThirdImageChange} />;
    }

    if (thirdImage) {
      return (
        <img
          src={URL.createObjectURL(thirdImage)}
          alt="third"
          className=" h-56  w-52"
        />
      );
    }
  }, [data?.pic3, thirdImage, onThirdImageChange]);

  async function handleUpdate() {
    try {
      const formData = new FormData();
      formData.append("id", data?.salvageItem_id);

      if (secondImage) {
        formData.append("pic2", secondImage);
      }

      if (thirdImage) {
        formData.append("pic3", thirdImage);
      }

      formData.append("quantity", quantity ? quantity : data?.squantity);
      formData.append("details", details ? details : data?.deviceDescription);

      const response = await updateSalvage(formData);

      if (response.data?.status === "0") {
        alertError();
        return;
      }

      alertWithAction({
        title: "Successfully",
        text: "Item Successfully Updated",
        icon: AlertIcon.SUCCESS,
        onConfirm: () =>
          (window.location.href =
            RoutesPath.SALVAGE_ITEM_DETAILS + data?.salvageItem_id),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageContainer>
      <div className=" w-1/2   m-auto">
        <p className=" text-xl font-bold mb-5">Update Salvage Item Details</p>
        <div className=" bg-white p-5 mb-5">
          <div className=" flex justify-center flex">
            <div className=" m-3">{displayPic2}</div>
            <div className=" m-3">{displayPic3}</div>
          </div>
          <div className=" h-6" />
          <label className=" Device Quantity">Device Quantity</label>
          <TextInput
            placeholder={data?.squantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className=" h-5" />
          <TextArea
            placeholder={data?.deviceDescription}
            name="description"
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className=" h-5" />
          <Button onClick={handleUpdate}>Update Details</Button>
        </div>
      </div>
    </PageContainer>
  );
}
