import swal from "sweetalert";
import { defaultButtonList } from "sweetalert/typings/modules/options/buttons";
import { AlertIcon } from "../types/AlertIcon.enum";

type AlertWithAction = {
  title: string;
  text: string;
  icon: AlertIcon;
  dangerMode?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

type UseAlertOptions = {
  alertWarning: (message: string) => void;
  alertError: (message?: string) => void;
  alertSuccess: (message: string) => void;
  alertWithAction: (params: AlertWithAction) => void;
};

export default function useAlertOptions(): UseAlertOptions {
  const alertWarning = (message: string) => {
    swal("Warning", message, "warning");
  };

  const alertError = (message?: string) => {
    message = message ? message : "Something went wrong";
    swal("Error", message, "error");
  };

  const alertSuccess = (message: string) => {
    swal("Success", message, "success");
  };

  const alertWithAction = (params: AlertWithAction) => {
    const { title, text, icon, dangerMode } = params;
    swal({
      title,
      text,
      icon,
      dangerMode,
    }).then((value) => {
      if (value) {
        params.onConfirm();

        return;
      }
    });
  };

  return {
    alertError,
    alertSuccess,
    alertWarning,
    alertWithAction,
  };
}
