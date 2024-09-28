import { useState } from "react";

interface CategorySelectorProps {
  value? : string
}

const CategorySelector : React.FC<CategorySelectorProps>  = ({value = 'other'}) => {
  const [selectedCategory, setSelectedCategory] = useState(value);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">カテゴリ分類</label>
      <div className="flex space-x-4">
        {["food", "base", "other"].map((category) => (
          <label key={category} className="flex-1">
            <input
              type="radio"
              name="selectedCategory"
              value={category}
              checked={selectedCategory === category}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="sr-only" // Hide the default radio button
            />
            <span
              className={`
              block text-center py-2 px-4 rounded-full cursor-pointer
              transition-colors duration-200 ease-in-out
              ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            >
              {category === "food"
                ? "食事"
                : category === "base"
                ? "宿泊"
                : "その他"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;