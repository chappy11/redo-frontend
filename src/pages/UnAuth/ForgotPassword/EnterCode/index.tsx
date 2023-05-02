import React from "react";
import { Button } from "../../../../components";

type Props = {
  setInputCode: (e: string) => void;
  handleValidate: () => void;
};

export default function EnterCode(props: Props) {
  const { setInputCode, handleValidate } = props;

  return (
    <div>
      <p className=" mb-5">Enter you six digit verification code</p>
      <input
        className=" border border-gray-300 p-3 w-full text-center"
        placeholder="Enter Code"
        onChange={(e) => setInputCode(e.target.value)}
      />
      <div className=" h-5" />
      <Button onClick={handleValidate}>Verify Code</Button>
    </div>
  );
}
