import React from "react";
import { Button, TextInput } from "../../../../components";

type Props = {
  setPassword: (e: string) => void;
  setConfirmPassword: (e: string) => void;
  handleChangePassword: () => void;
};

export default function ChangePassword(props: Props) {
  const { setPassword, setConfirmPassword, handleChangePassword } = props;
  return (
    <div>
      <label className=" text-sm">New Password</label>
      <TextInput
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className=" h-3" />
      <label className=" text-sm">Confirm Password</label>
      <TextInput
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className=" h-3" />
      <Button onClick={handleChangePassword}>Change Password</Button>
    </div>
  );
}
