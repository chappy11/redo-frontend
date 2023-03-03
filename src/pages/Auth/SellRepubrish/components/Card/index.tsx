import ImageInput from "../../../../../components/ImageInput";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Card(props: Props) {
  const { children } = props;
  return <div className="  p-5 w-3/4 bg-white rounded-md">{children}</div>;
}
