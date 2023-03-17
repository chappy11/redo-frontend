import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import useGetSalvageItemById from "../../../../hooks/salvageitem/useGetSalvageItemById";
import { convertMoney } from "../../../../utils/money.utils";

export default function SalvageItemDetails() {
  const { id } = useParams();
  const { data } = useGetSalvageItemById({ salvageItem_id: id ? id : "" });
  const [selectedPic, setSelectedPic] = useState<string>("");

  useEffect(() => {
    setSelectedPic(data?.pic1);
  }, [data]);

  function changeSelectedPic(pic: string) {
    setSelectedPic(pic);
  }
  return (
    <PageContainer>
      <div className=" w-3/4 m-auto md:w-2/4 shadow-lg">
        <h1 className=" font-bold text-2xl">Details</h1>
        <div className=" h-5" />
        <div className=" bg-white p-3 flex flex-col md:flex-row lg:flex-row rounded-lg">
          <div className=" p-4 m-auto md:m-0 lg:m-0">
            <img
              src={BASE_URL + selectedPic}
              alt="Main Pic"
              className=" w-80"
            />
            <div className=" h-2" />
            <div className=" flex">
              <div
                onClick={() => changeSelectedPic(data?.pic1)}
                className=" flex-1 flex justify-center items-center hover:bg-slate-500"
              >
                <img
                  src={BASE_URL + data?.pic1}
                  className=" w-16 h-28 "
                  alt="pic1"
                />
              </div>
              <div
                onClick={() => changeSelectedPic(data?.pic2)}
                className=" flex-1 flex justify-center items-center hover:bg-slate-500"
              >
                <img
                  src={BASE_URL + data?.pic2}
                  className=" w-16 h-28"
                  alt="pic2"
                />
              </div>
              <div
                onClick={() => changeSelectedPic(data?.pic3)}
                className=" flex-1 flex justify-center items-center hover:bg-slate-500"
              >
                <img
                  src={BASE_URL + data?.pic3}
                  className=" w-16 h-28"
                  alt="pic3"
                />
              </div>
            </div>
          </div>
          <div className=" p-4">
            <p className=" text-sm font-bold">{data?.deviceType}</p>
            <h1 className=" text-xl font-bold">{data?.deviceName}</h1>
            <h3>{data?.deviceBrand}</h3>
            <h3 className=" text-red-500 font-bold">
              PHP {convertMoney(data?.salvage_price)}
            </h3>
            <h1 className=" mt-10 font-bold">Description</h1>
            <p className=" mt-2 ml-2">{data?.deviceDescription}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
