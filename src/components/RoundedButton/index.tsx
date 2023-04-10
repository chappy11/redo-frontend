import React, { ReactNode } from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode;
  className?: string;
};

export default function RoundedButton(props: Props) {
  function handleClick(e: any) {
    if (!props.onClick) {
      return;
    }

    props.onClick(e);
  }
  return (
    <button className={`rounded-full ${props.className}`} onClick={handleClick}>
      {props.children}
    </button>
  );
}
