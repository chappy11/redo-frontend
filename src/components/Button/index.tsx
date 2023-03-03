import React, { useMemo } from "react";
type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: string;
  isrounded?: boolean | undefined;
  isFull?: boolean | undefined;
};
export default function Button(props: Props) {
  const displayRounded = useMemo(() => {
    return props.isrounded ? "rounded-full" : "rounded-lg";
  }, [props.isrounded]);

  const displayFull = useMemo(() => {
    return props.isFull ? "w-full" : "w-1/4";
  }, [props.isFull]);
  return (
    <button
      {...props}
      className={` bg-green-600 text-white py-2  ${displayRounded} ${displayFull} hover:border hover:text-green-500 hover:border-green-500 hover:text-green hover:bg-white`}
    >
      {props.children}
    </button>
  );
}
