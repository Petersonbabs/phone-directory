import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="header">
      <nav className="  items-center  w-[95%] m-auto">
        <h3>Hello, {user?.name.split(' ')[0]}</h3>
        <div className="mx-auto drop-shadow-lg  w-[30px] h-[30px] rounded-full flex items-center justify-center  border">
          {user.image ? (
            <img src={user.image} alt="" className="w-full h-full"/>
          ) : (
            <h3 className="text-blue text-3xl w-fit">
              {user.name && user.name[0].toUpperCase()}
            </h3>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
