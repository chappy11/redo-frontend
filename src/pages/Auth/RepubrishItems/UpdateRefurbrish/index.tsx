import { useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ImageInput,
  PageContainer,
  TextArea,
  TextInput,
} from "../../../../components";
import { getItem, updateRefurbrish } from "../../../../service/RepubrishItem";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function UpdateRefurbrish() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
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
    if (!data?.rpic2 && !secondImage) {
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
  }, [data?.rpic2, secondImage, onSecondImageChange]);

  const displayPic3 = useMemo(() => {
    if (!data?.rpic3 && !thirdImage) {
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
  }, [data?.rpic3, thirdImage, onThirdImageChange]);

  const getData = useCallback(async () => {
    try {
      const resp = await getItem(id ?? "");
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, []);

  async function handleUpdate() {
    try {
      const formdata = new FormData();
      formdata.append("id", data?.repubrishItem_id);
      if (secondImage) {
        formdata.append("pic2", secondImage);
      }

      if (thirdImage) {
        formdata.append("pic3", thirdImage);
      }

      formdata.append("quantity", quantity ? quantity : data?.rquantity);
      formdata.append("details", details ? details : data?.rdevice_description);

      const resp = await updateRefurbrish(formdata);

      if (resp.data.status === 1) {
        alertWithAction({
          title: "Successfully",
          text: resp.data.message,
          icon: AlertIcon.SUCCESS,
          onConfirm: () => {
            window.location.href = RoutesPath.REPUBRISH_ITEMS;
          },
        });
        return;
      }

      alertError();
    } catch (error) {}
  }

  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <p className=" font-bold text-xl mb-5">Update Refurbrish Item</p>
        <div className=" bg-white p-4 shadow-lg rounded-sm">
          <div className=" flex justify-center space-x-3">
            {displayPic2}
            {displayPic3}
          </div>
          <div className=" h-5" />
          <div className="px-10">
            <label className=" text-sm text-slate-500">Stock</label>
            <TextInput
              placeholder={data?.rquantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label className=" text-sm text-slate-500">
              Description Or Issue
            </label>
            <TextArea
              placeholder={data?.rdevice_description}
              onChange={(e) => setDetails(e.target.value)}
            />
            <div className=" mt-10">
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
