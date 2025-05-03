import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Importing the Search icon

function SearchBox({ items,className }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

//   const filteredItems = items.filter((item) =>
//     item.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <div className={`text-font-color ${className} rounded-12 w-[300px] bg-white-80 flex items-center p-12`}>
      <div className="flex items-center w-full bg-[var(--color-black-4)] rounded-12">
        <Search size={20} className="ml-12 text-font-color" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          className="focus:outline-none p-12 bg-transparent text-font-color"
        />
      </div>
      {/* <ul className="mt-4">
        {filteredItems.map((item, index) => (
          <li key={index} className="p-4 text-font-color">
            {item}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default SearchBox;