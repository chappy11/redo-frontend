import { useState } from "react";
import { z } from "zod";
import { ZodError } from "zod/lib";
import { TextInput, Button } from "../../../../components";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { LoginPayload } from "../../../../types/UserServiceType.type";

const IMAGE = require("../../../../asset/white-logo.png");

export default function LoginPage() {
  const [user, setUser] = useState<LoginPayload>({ email: "", password: "" });

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleLogin() {
    try {
      const loginValidation = loginSchema.parse({
        email: user.email,
        password: user.password,
      });
      console.log(loginValidation);
    } catch (error: any) {}
  }
  return (
    <div className=" w-full h-full flex background justify-center items-center">
      <div className=" bg-white w-3/4 p-5 bg-opacity-90">
        <div className=" flex w-full justify-center">
          <img src={IMAGE} className=" h-32 w-50" alt="logo" />
        </div>
        <TextInput
          isRounded
          placeholder="Username"
          onChange={onChange}
          name="email"
        />
        <div className=" h-5" />
        <TextInput
          isRounded
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <div className=" h-3" />
        <p className=" text-gray-600 text-right p-2 mb-3">Forgot Password ?</p>
        <Button isrounded={true} isFull={true} onClick={handleLogin}>
          Login
        </Button>
        <div className=" h-5" />
        <p className=" font-bold text-gray-500 text-center">
          Don't have an account?{" "}
          <a className=" text-blue-700 underline" href={RoutesPath.REGISTER}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
