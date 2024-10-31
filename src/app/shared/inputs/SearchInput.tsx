import { Search } from "lucide-react";
import { ChangeEvent, forwardRef } from "react";

const SearchInput = forwardRef<HTMLInputElement, { onChange: (e: ChangeEvent<HTMLInputElement>) => void }>(
  ({ onChange }, ref) => {
    return (
      <label className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md w-[400px]">
        <input
          type="text"
          className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
          placeholder="Buscar"
          ref={ref}
          onChange={onChange}
          onBlur={onChange}
          id="search-input"
        />
        <Search className="text-sm text-gray-400" />
        {/* TODO: clear input button */}
      </label>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;