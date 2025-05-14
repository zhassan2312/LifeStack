

const Topbar = ({ list, activeTab, setActiveTab }) => {
  return (
    <div>
      <ul className="flex gap-12 ml-24 mt-24">
        {list.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(item)} // Update active tab on click
            className={`text-14 font-normal p-12 rounded-12 cursor-pointer ${
              activeTab === item
                ? "bg-(--color-primary) text-(--color-background-1)"
                : "text-(--color-black-40)"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topbar;