import React from "react";
import { PageContainer, TextInput } from "../../../components";
import ImageInput from "../../../components/ImageInput";
import Card from "./components/Card";

export default function SellRepubrish() {
  return (
    <PageContainer>
      <div className="  w-full flex  justify-center">
        <Card>
          <div className=" flex flex-col-reverse md:flex-col lg:flex-col">
            <div className=" flex flex-col md:flex-row justify-center items-center  w-full gap-4">
              <ImageInput />
              <ImageInput />
              <ImageInput />
            </div>
            <div className=" h-10" />
            <div className=" mt-10">
              <TextInput placeholder="Device Description" />
              <div className=" h-3" />
              <TextInput placeholder="Price" type="number" />
              <div className=" h-3" />
              <TextInput placeholder="Device Details" />
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
