import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import headerImage from "../../assets/header-img.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, MapPin, MessageSquareIcon, PhoneCall, Users } from "lucide-react";

const UserSheet = ({ children }) => {
  const { user, logout, isLoading } = useAuth();

  return (
    <section>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-8">
            <div className="relative text-center">
              <img src={headerImage || ""} alt="" />
              <div
                className="mx-auto drop-shadow-lg  w-20 h-20 rounded-full flex items-center justify-center mt-[-40px]"
                style={{ background: "#E9F2FF" }}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name} profile image`}
                    className="w-full h-full"
                  />
                ) : (
                  <h3 className="text-blue text-3xl ">
                    {user.name && user.name[0].toUpperCase()}
                  </h3>
                )}
              </div>
              <h2 className="text-lg font-semibold mt-4 capitalize">
                {user?.name}
              </h2>
              <span className="opacity-50">{user.email}</span>
            </div>
          </SheetHeader>
          <SheetDescription>
            <Tabs defaultValue="contact" className="w-full ">
              <TabsList className=" w-full">
                <TabsTrigger value="contact" className=" w-full">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="about" className=" w-full">
                  About
                </TabsTrigger>
              </TabsList>
              <TabsContent value="contact">
                <ul>
                  <li className="profile-list text-start border-b">
                    <div>
                      <span className="opacity-50">Phone number</span>
                      <h3>{user.phoneNumber}</h3>
                    </div>
                    <a
                      href={`tel:${user.phoneNumber}`}
                      className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]"
                    >
                      <PhoneCall className="size-4" />
                    </a>
                  </li>

                  <li className="profile-list text-start border-b">
                    <div>
                      <span className="opacity-50">Email</span>
                      <h3>{user.email}</h3>
                    </div>
                    <a
                      href={`mailto:${user.email}`}
                      className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]"
                    >
                      <MessageSquareIcon className="size-4" />
                    </a>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="about">
                <ul>
                  <li className="profile-list text-start border-b">
                    <div>
                      <span className="opacity-50">Address</span>
                      <h3>
                        {user.address ||
                          "5 Oke-Ilewo Street, Abeokuta, Ogun State, Nigeria"}
                      </h3>
                    </div>
                    <span className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]">
                      <MapPin className="size-4" />
                    </span>
                  </li>

                  <li className="profile-list text-start border-b">
                    <div>
                      <span className="opacity-50">Gender</span>
                      <h3>{user.gender || "male"}</h3>
                    </div>
                    <span className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]">
                      <Users className="size-4" />
                    </span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </SheetDescription>
          <SheetFooter>
            <button
              className={`absolute bottom-20 flex w-[80%] left-[10%] ${
                isLoading ? "bg-loadingButton" : "bg-orange"
              } text-white p-2 justify-center items-center gap-4 hover:bg-darkOrange`}
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
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default UserSheet;
