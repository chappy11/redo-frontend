import React, { useMemo } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  isRounded?: boolean;
};

export default function TextInput(props: Props) {
  const roundedStyle = useMemo(() => {
    if (props.isRounded) {
      return "rounded-full";
    }

    return "rounded-md";
  }, [props.isRounded]);

  return (
    <input
      {...props}
      className={` border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full ${roundedStyle} focus:border-green-400`}
    />
  );
}
