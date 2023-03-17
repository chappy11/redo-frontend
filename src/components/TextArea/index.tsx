type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function TextArea(props: Props) {
  return (
    <textarea
      {...props}
      className="  border-2 outline-none px-5 py-2 border-gray-300 text-gray-600 w-full focus:border-green-400"
    />
  );
}
