import React, { useMemo } from "react";
type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: string;
  backgroundColor?: string | undefined;
  isrounded?: boolean | undefined;
  isFull?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isLoading?: boolean | undefined;
};
export default function Button(props: Props) {
  const displayRounded = useMemo(() => {
    return props.isrounded ? "rounded-full" : "rounded-lg";
  }, [props.isrounded]);

  const displayFull = useMemo(() => {
    return props.isFull ? "w-full" : "w-1/4";
  }, [props.isFull]);

  const displayName = useMemo(() => {
    if (props.isLoading) {
      return "Loading ....";
    }

    return props.children;
  }, [props.children, props.isLoading]);

  const bgColor = useMemo(() => {
    if (props.backgroundColor) {
      return props.backgroundColor;
    }

    return "bg-green-600";
  }, [props.backgroundColor]);
  return (
    <button
      {...props}
      className={` ${bgColor} text-white py-2 w-100 min-w-max px-3    ${displayRounded} ${displayFull} hover:border hover:text-green-500 hover:border-green-500 hover:text-green hover:bg-white`}
      disabled={props.isDisabled || props.isLoading}
    >
      {displayName}
    </button>
  );
}
