import React from "react";

type Props = {
  header: string[];
  children: React.ReactNode;
};

export default function Table(props: Props) {
  const { header, children } = props;

  return (
    <table className=" w-full">
      <thead>
        <tr>
          {header.map((val, i) => (
            <th className=" text-left">{val}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
