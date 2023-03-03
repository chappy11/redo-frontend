import { ItemCard, Navigation } from "../../../components";

const IMG = require("../../../asset/sample-phone.jpeg");
const MOCK = [
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
  {
    name: "Apple Iphone 5",
    image: IMG,
    price: "5,000",
    onClick: () => console.log("HI"),
  },
];

function Dashboard() {
  return (
    <div>
      <Navigation />
      <div className=" h-36" />
      <div className=" flex justify-center">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK.map((val) => (
            <ItemCard
              name={val.name}
              image={val.image}
              price={val.price}
              onClick={() => val.onClick()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
