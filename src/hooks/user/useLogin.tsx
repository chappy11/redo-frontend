import { useCallback, useState } from "react";
import { LoginPayload } from "../../types/UserServiceType.type";
import { login } from "../../service/User";
import useAlertOptions from "../useAlertOptions";
import { UserInfo } from "../../types/User.type";

type UseLoginResponse = {
  isLoading: boolean;
  sendRequest: (payload: LoginPayload) => any;
};

export default function useLogin(): UseLoginResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alertError } = useAlertOptions();

  const sendRequest = useCallback(
    async (payload: LoginPayload):Promise<any> => {
      try {
        setIsLoading(true);
        const resp = await login(payload);
        return resp.data;
      } catch (error) {
        alertError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [alertError]
  );

  return {
    isLoading,
    sendRequest,
  };
}
