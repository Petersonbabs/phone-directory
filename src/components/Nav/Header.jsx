import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import UserSheet from "../sheet/UserSheet";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="header ">
      <nav className="flex justify-between  items-center  w-[90%] m-auto p-2">
        <h3>Hello, {user?.name.split(" ")[0]}</h3>
        <UserSheet >
          <div className=" drop-shadow-lg  w-[30px] h-[30px] rounded-full flex items-center justify-center  border">
            {user.image ? (
              <img src={user.image} alt="" className="w-full h-full" />
            ) : (
              <h3 className="text-blue text-xl w-fit">
                {user.name && user.name[0].toUpperCase()}
              </h3>
            )}
          </div>
        </UserSheet>
      </nav>
    </header>
  );
};

export default Header;
