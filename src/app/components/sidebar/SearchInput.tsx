import { searchProfiles } from "@/app/services/auth/searchProfiles";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { useState } from "react";
import { set } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { user } = useAuth();
  const [perfis, setPerfis] = useState([]);

  const navigate = useNavigate();

  async function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const query = event.target.value;

      if (query.trim() === "") {
        setPerfis([]);
        return;
      }

      const response = await searchProfiles(query);
      const filtered = response.filter(
        (perfil: any) => perfil.userId !== user?.id
      );
      setPerfis(filtered);
    } catch (e) {
      return;
    }
  }

  return (
    <div className="relative w-[95%] group ">
      <IoIosSearch
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-100 text-constrast  group-focus-within:text-theme"
      />
      <input
        onChange={handleSearchChange}
        autoComplete="off"
        className="w-full h-12 bg-fume border border-stroke rounded-3xl transition-all duration-200 focus:border-theme group outline-none ring-0 placeholder:text-constrast pl-10"
        placeholder="Buscar"
      />
      {perfis.length > 0 && (
        <div
          className="absolute top-full left-0 w-full  border border-stroke bg-fume rounded-md mt-1 max-h-60 overflow-y-auto z-10"
        >
          {perfis.map((perfil: any) => (
            <div
              onClick={() => {
                setPerfis([]);
                navigate(`/${perfil.username}`);
                window.location.reload();
              }}
              key={perfil.id}
              className="flex items-center gap-3 px-4 hover:border-theme  border border-fume rounded-md py-2 cursor-pointer"
            >
              {perfil.photoUrl ? (
                <img
                  src={perfil.photoUrl}
                  alt={perfil.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-stroke" />
              )}
              <span>{perfil.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
