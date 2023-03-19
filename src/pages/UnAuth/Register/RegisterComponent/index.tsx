import { useState } from "react";
import { Button, TextInput } from "../../../../components";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { register } from "../../../../service/User";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

const IMAGE = require("../../../../asset/white-logo.png");

export default function RegisterComponent() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { alertError, alertWithAction } = useAlertOptions();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleRegister() {
    try {
      if (user.password != user.confirmPassword) {
        alertError("Password do not match");
        return;
      }

      const payload = {
        fullname: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
        password: user.password,
      };
      const resp = await register(payload);
      if (resp.data.status === "0") {
        alertError();
        return;
      }

      alertWithAction({
        title: "Successfully Registered",
        icon: AlertIcon.SUCCESS,
        text: "Congratulation you have successfully registered",
        onConfirm: () => {
          window.location.href = RoutesPath.LOGIN;
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-full h-full background flex justify-center items-center">
      <div className=" bg-white p-4 w-4/5 bg-opacity-90 md:w-1/4 lg:w-1/4 mt-48">
        <div className=" w-full flex justify-center items-center">
          <img src={IMAGE} className=" w-32 h-32 md:w-40 md:w-40" alt="logo" />
        </div>
        <TextInput
          placeholder="Fullname"
          isRounded
          name="fullName"
          onChange={onChange}
        />
        <div className=" h-4" />
        <TextInput
          placeholder="Email"
          isRounded
          name="email"
          onChange={onChange}
        />
        <div className=" h-4" />
        <TextInput
          placeholder="Phone Number"
          isRounded
          name="phoneNumber"
          onChange={onChange}
        />
        <div className=" h-4" />
        <TextInput
          placeholder="Password"
          isRounded
          name="password"
          onChange={onChange}
        />
        <div className=" h-4" />
        <TextInput
          placeholder="Confirm Password"
          isRounded
          name="confirmPassword"
          onChange={onChange}
        />
        <div className=" h-10" />
        <Button isFull isrounded onClick={handleRegister}>
          Register
        </Button>
        <div className=" h-4" />
        <p className=" text-center text-sm text-gray-600">
          By signing up, you agree to our Terms, Privacy Policy and Cookies
          Policy
        </p>
        <div className=" h-10" />
        <p className=" text-center">
          Already have an account?{" "}
          <a className=" text-blue-500 underline" href={RoutesPath.LOGIN}>
            Login
          </a>
        </p>
        <div className=" h-4" />
      </div>
    </div>
  );
}
