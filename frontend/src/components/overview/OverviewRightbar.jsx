import CreateTask from "../CreateTask";
import CreateCalorie from "../CreateCalorie";

const Message = ({ image, name, message }) => {
  return (
    <div className="flex gap-16">
      <img src={image} alt="" className="w-48 h-48 rounded-full" />
      <div className="flex flex-col">
        <h2 className="text-16 font-bold text-(--color-font-heading)">
          {name}
        </h2>
        <p className="text-14 font-normal text-(--color-black-60) max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
};

const messages = [
  {
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    name: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    name: 'Jane Smith',
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    name: 'Alice Johnson',
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];


const OverviewRightbar = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-[360px] bg-(--color-background-1) flex flex-col gap-32 pt-24 pl-24 pr-24 pb-16 overflow-y-auto">
      <div className="flex flex-col gap-24">
        <h1 className="text-20 text-(--color-font-heading) font-semibold">
          Messages
        </h1>
        <ul className="flex flex-col gap-12 max-h-[280px] overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className="flex gap-16 p-16 rounded-16 bg-(--color-background-2)"
            >
              <Message {...message} />
            </li>
          ))}
        </ul>
      </div>
      <hr className="text-(--color-black-20)" />
      <CreateTask />
      <hr className="text-(--color-black-20)" />
      <CreateCalorie />
    </div>
  );
};

export default OverviewRightbar;