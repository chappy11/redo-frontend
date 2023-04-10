import React, { ReactNode, useMemo } from "react";
import Button from "../Button";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  header?: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal(props: Props) {
  const {
    setShowModal,
    showModal,
    header,
    children,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
  } = props;

  const displayConfirmText = useMemo(() => {
    return confirmText ?? "Okay";
  }, [confirmText]);

  const displayCancelText = useMemo(() => {
    return cancelText ?? "Cancel";
  }, [cancelText]);

  function handleOnConfirm() {
    onConfirm();
  }

  function handleOnCancel() {
    onCancel();
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8 w-full">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg ">
              <div className="mt-3  w-full">
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">
                    {header}
                  </h4>
                  <div className=" h-5" />
                  <div className=" w-full ">{children}</div>
                  <div className="items-center gap-2 mt-3 sm:flex w-full justify-end">
                    <Button onClick={handleOnConfirm}>
                      {displayConfirmText}
                    </Button>
                    <Button
                      backgroundColor="bg-red-500"
                      onClick={handleOnCancel}
                    >
                      {displayCancelText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
