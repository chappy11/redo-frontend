import React, { useCallback, useMemo, useState } from "react";
import { PageContainer } from "../../../components";
import InputEmailAddress from "./InputEmailAdress";
import { changePassword, emailVerification } from "../../../service/User";
import useAlertOptions from "../../../hooks/useAlertOptions";
import EnterCode from "./EnterCode";
import ChangePassword from "./ChangePassword";
import { AlertIcon } from "../../../types/AlertIcon.enum";
import { RoutesPath } from "../../../types/RoutesPath.enum";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const { alertSuccess, alertError, alertWithAction } = useAlertOptions();
  const [inputCode, setInputCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleValidateCode = useCallback(() => {
    const isValid = code === inputCode;
    console.log(isValid);
    if (code === inputCode) {
      alertSuccess("Successfully Validated");
      setStep(2);
      return;
    }

    alertError("Code Do not Match");
  }, [alertError, alertSuccess, code, inputCode]);

  const handleSendEmailAndCode = useCallback(async () => {
    try {
      setIsLoading(true);
      const code = Math.floor(100000 + Math.random() * 900000);
      console.log(email);
      const payload = {
        email,
        code,
      };
      const resp = await emailVerification(payload);
      setCode(code.toString());
      if (resp.data.status === 1) {
        setStep(1);
        alertSuccess(resp.data.message);
        return;
      }

      alertError(resp.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [alertError, alertSuccess, email]);

  const handleChangePassword = useCallback(async () => {
    try {
      if (password !== confirmPassword) {
        alertError("Password do not match");

        return;
      }

      const payload = {
        email,
        password,
      };
      const response = await changePassword(payload);

      if (response.data.status === 1) {
        alertWithAction({
          title: "Succesfully Updated",
          text: "Password has been changed",
          icon: AlertIcon.SUCCESS,
          onConfirm: () => (window.location.href = RoutesPath.LOGIN),
        });

        return;
      }

      alertError(response.data.message);
    } catch (error) {}
  }, [alertError, alertWithAction, confirmPassword, email, password]);

  const display = useMemo(() => {
    if (step === 0) {
      return (
        <InputEmailAddress
          setEmail={setEmail}
          isloading={isLoading}
          handleSendEmail={handleSendEmailAndCode}
        />
      );
    }

    if (step === 1) {
      return (
        <EnterCode
          setInputCode={setInputCode}
          handleValidate={handleValidateCode}
        />
      );
    }

    if (step === 2) {
      return (
        <ChangePassword
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleChangePassword={handleChangePassword}
        />
      );
    }
  }, [
    step,
    isLoading,
    handleSendEmailAndCode,
    handleValidateCode,
    handleChangePassword,
  ]);
  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <div className=" bg-white shadow-lg p-4 rounded-md">
          <p className=" font-bold text-lg">Forgot Password</p>
          {display}
        </div>
      </div>
    </PageContainer>
  );
}
