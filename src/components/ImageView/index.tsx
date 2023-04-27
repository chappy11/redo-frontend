import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../../constant/config";

type Props = {
  pic1: string;
  pic2: string;
  pic3: string;
};

export default function ImageView(props: Props) {
  const { pic1, pic2, pic3 } = props;
  const [selectedPic, setSelectedPic] = useState<string>("");

  useEffect(() => {
    setSelectedPic(pic1);
  }, [pic1]);

  function changeSelectedPic(picture: string) {
    if (picture === "") {
      return;
    }

    setSelectedPic(picture);
  }

  const isSecondPictureExist = useMemo(() => {
    if (pic2) {
      return <img src={BASE_URL + pic2} className=" w-16 h-28" alt="pic2" />;
    }
  }, [pic2]);

  const isThirdPictureExist = useMemo(() => {
    if (pic3) {
      return <img src={BASE_URL + pic3} className=" w-16 h-28" alt="pic3" />;
    }
  }, [pic3]);

  return (
    <div className=" p-4 m-auto md:m-0 lg:m-0">
      <img src={BASE_URL + selectedPic} alt="Main Pic" className=" w-80 h-80" />
      <div className=" h-2" />
      <div className=" flex">
        <div
          onClick={() => changeSelectedPic(pic1)}
          className=" flex-1 flex justify-center items-center hover:bg-slate-500"
        >
          <img src={BASE_URL + pic1} className=" w-16 h-28 " alt="pic1" />
        </div>
        <div
          onClick={() => changeSelectedPic(pic2)}
          className=" flex-1 flex justify-center items-center hover:bg-slate-500  bg-slate-300 mx-2"
        >
          {isSecondPictureExist}
        </div>
        <div
          onClick={() => changeSelectedPic(pic3)}
          className=" flex-1 flex justify-center items-center hover:bg-slate-500 bg-slate-300 mx-2"
        >
          {isThirdPictureExist}
        </div>
      </div>
    </div>
  );
}
