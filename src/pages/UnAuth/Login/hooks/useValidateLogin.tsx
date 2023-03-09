import { useCallback, useState } from "react";
import swal from "sweetalert";
import { z } from "zod";
import { LoginPayload } from "../../../../types/UserServiceType.type";

type UseLoginValidation = {
  error: string;
  user: LoginPayload;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  validateUser: () => boolean;
};

export default function useValidateLogin(): UseLoginValidation {
  const [user, setUser] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateUser = useCallback(() => {
    const data = loginSchema.safeParse({
      email: user.email,
      password: user.password,
    });
    if (!data.success) {
      swal("Warning", data.error.issues[0].message, "warning");
      return false;
    }
    return true;
  }, [loginSchema, user.email, user.password]);

  return {
    onChange,
    validateUser,
    user,
    error,
  };
}
