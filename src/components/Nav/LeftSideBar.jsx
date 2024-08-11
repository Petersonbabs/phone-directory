import { LogOut, PhoneCall } from "lucide-react";
import headerImage from "../../assets/header-img.png";
import { useAuth } from "@/contexts/AuthContext";

const LeftSideBar = () => {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="bg-white h-screen border sidebar relative">
      <div className="relative text-center">
        <img src={headerImage || ""} alt="" />
        <div
          className="mx-auto drop-shadow-lg  w-20 h-20 rounded-full flex items-center justify-center mt-[-40px]"
          style={{ background: "#E9F2FF" }}
        >
          <h3 className="text-black text-3xl ">{user.name[0].toUpperCase()}</h3>
        </div>
        <h2 className="text-lg font-semibold mt-4 capitalize text-black">{user?.name}</h2>
        <span className="opacity-50 text-black ">{user.email}</span>
        <div className="flex flex-col justify-between w-3/4 mx-auto mt-8 text-gray-400 gap-4">
          <div className="flex items-center gap-4 border-b-2 py-2">
            <PhoneCall className="size-5 hover:text-orange cursor-pointer" />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
      </div>

      <button
        className={`absolute bottom-20 flex w-[80%] left-[10%] ${isLoading ? 'bg-loadingButton' : 'bg-orange'} text-white p-2 justify-center items-center gap-4 hover:bg-darkOrange`}
        onClick={logout}
      >
        {isLoading ? (
          <div className={`spinner-grow size-6`} role="status">
            <span className="visually-hidden">...</span>
          </div>
        ) : (
          <LogOut className="size-4" />
        )}

        <span>Logout</span>
      </button>
    </div>
  );
};

export default LeftSideBar;
