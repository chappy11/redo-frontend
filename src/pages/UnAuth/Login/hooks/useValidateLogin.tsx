import { useState } from "react";
import { z } from "zod/lib";
import { LoginPayload } from "../../../../types/UserServiceType.type";

export default function useValidateLogin() {
  const [user, setUser] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function validateUser() {
    try {
      const newPayload = loginSchema.parse({
        email: user.email,
        password: user.password,
      });

      return newPayload;
    } catch (error) {}
  }

  return {
    onChange,
  };
}
