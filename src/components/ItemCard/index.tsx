import Button from "../Button";

type Props = {
  name: string;
  image: string;
  price: string;
  onClick: () => void;
};

export default function ItemCard(props: Props) {
  return (
    <div className=" p-3 border w-fit bg-white rounded-lg">
      <img className=" h-52 w-52" src={props.image} alt="pic" />
      <div className=" h-5" />
      <p className=" text-center">{props.name}</p>
      <p className=" font-bold text-center mt-5">PHP {props.price}</p>
      <div className=" h-7" />
      <Button isFull>View Details</Button>
    </div>
  );
}
