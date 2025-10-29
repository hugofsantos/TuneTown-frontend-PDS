
import { IoIosSearch } from "react-icons/io";

const SearchInput = () => {
  
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
  }

  return (
    <div className="relative w-[95%] group ">
      <IoIosSearch
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-100 text-constrast  group-focus-within:text-theme"
      />
      <input
        className="w-full h-12 bg-fume border border-stroke rounded-3xl transition-all duration-200 focus:border-theme group outline-none ring-0 placeholder:text-constrast pl-10"
        placeholder="Buscar"
      />
    </div>
  );
};

export default SearchInput;
