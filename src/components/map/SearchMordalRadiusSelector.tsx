import { useState } from "react";

const SearchMordalRadiusSelector = () => {
  const [radius, setRadius] = useState("medium");

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">エリア半径:</label>
      <div className="flex space-x-4">
        {["small", "medium", "large"].map((size) => (
          <label key={size} className="flex-1">
            <input
              type="radio"
              name="radius"
              value={size}
              checked={radius === size}
              onChange={(e) => setRadius(e.target.value)}
              className="sr-only" // Hide the default radio button
            />
            <span className={`
              block text-center py-2 px-4 rounded-full cursor-pointer
              transition-colors duration-200 ease-in-out
              ${radius === size
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}>
              {size === "small" ? "200m" : size === "medium" ? "1km" : "5km"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SearchMordalRadiusSelector;