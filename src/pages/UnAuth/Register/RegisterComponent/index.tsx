import { Button, TextInput } from "../../../../components";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

const IMAGE = require("../../../../asset/white-logo.png");

export default function RegisterComponent() {
  return (
    <div className=" w-full h-full background flex justify-center items-center">
      <div className=" bg-white p-4 w-4/5 bg-opacity-90">
        <div className=" w-full flex justify-center items-center">
          <img src={IMAGE} className=" w-40 h-40" alt="logo" />
        </div>
        <TextInput placeholder="Fullname" isRounded />
        <div className=" h-4" />
        <TextInput placeholder="Email" isRounded />
        <div className=" h-4" />
        <TextInput placeholder="Phone Number" isRounded />
        <div className=" h-4" />
        <TextInput placeholder="Password" isRounded />
        <div className=" h-4" />
        <TextInput placeholder="Confirm Password" isRounded />
        <div className=" h-10" />
        <Button isFull isrounded>
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
