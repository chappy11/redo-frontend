import React from "react";
import { FaRegFileImage } from "react-icons/fa";

export default function ImageInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <div className="  h-80  w-80  relative bg-gray-300">
      <div className=" absolute flex w-full h-full justify-center items-center">
        <div className=" text-3xl">
          <FaRegFileImage />
        </div>
      </div>
      <input
        type="file"
        className=" opacity-0 h-full w-full z-10"
        placeholder=""
        disabled={props?.disabled}
        onChange={props.onChange}
      />
    </div>
  );
}
