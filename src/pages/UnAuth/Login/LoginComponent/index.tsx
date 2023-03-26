import { TextInput, Button } from "../../../../components";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useLogin from "../../../../hooks/user/useLogin";
import { AlertIcon } from "../../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { UserInfo } from "../../../../types/User.type";
import { UserEnum } from "../../../../types/UserEnum.enum";
import { save } from "../../../../utils/storage.utils";
import useValidateLogin from "../hooks/useValidateLogin";

const IMAGE = require("../../../../asset/white-logo.png");

export default function LoginPage() {
  const { onChange, validateUser, user: payload } = useValidateLogin();
  const { alertError, alertWithAction } = useAlertOptions();
  const { sendRequest } = useLogin();

  const handleRequest = async () => {
    try {
      if (payload) {
        const data = await sendRequest(payload);
        if (data === undefined || !data) {
          alertError("Invalid Credential");
          return;
        }

        save(data);
        let navigateTo =
          (data as UserInfo).userRoles === UserEnum.ADMIN
            ? (window.location.href = RoutesPath.ADMIN)
            : (window.location.href = RoutesPath.DASHBOARD);

        alertWithAction({
          title: "Successfully",
          text: "Successfully Login!",
          icon: AlertIcon.SUCCESS,
          onConfirm: () => navigateTo,
        });

        return;
      }
    } catch (error) {
      alertError();
    }
  };

  function handleLogin() {
    if (!validateUser()) {
      return;
    }

    handleRequest();
  }

  return (
    <div className=" w-full h-full flex background justify-center items-center">
      <div className=" bg-white w-3/4 p-5 bg-opacity-90 md:w-1/4 lg:w-1/4">
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
          type="password"
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
