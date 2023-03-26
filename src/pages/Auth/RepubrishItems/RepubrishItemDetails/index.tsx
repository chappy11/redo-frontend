import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageView, PageContainer } from "../../../../components";
import { getItem } from "../../../../service/RepubrishItem";

export default function RepubrishItemDetails() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});

  const getData = useCallback(async () => {
    try {
      const resp = await getItem(id ? id : "");
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <PageContainer>
      <div className=" w-1/2 m-auto">
        <h1>Details</h1>
        <div className=" h-5" />
        <div className=" w-full bg-white shadow-lg p-3">
          <div className=" flex justify-center">
            <ImageView pic1={data.pic1} pic2={data.pic2} pic3={data.pic3} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
