import React from "react";
import { Button, TextInput } from "../../../../components";

type Props = {
  setEmail: (email: string) => void;
  handleSendEmail: () => void;
  isloading: boolean;
};

export default function InputEmailAddress(props: Props) {
  const { setEmail, isloading, handleSendEmail } = props;
  return (
    <div>
      {" "}
      <p className=" my-4">
        To Reset your password please enter your email we will send verification
        code.
      </p>
      <TextInput
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className=" h-5" />
      <Button isDisabled={isloading} onClick={handleSendEmail}>
        Send Verification Code
      </Button>
    </div>
  );
}
