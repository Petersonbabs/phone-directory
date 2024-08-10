import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContactContext } from "@/contexts/ContactsContext";
import headerImage from "../../assets/header-img.png";
import { MessageSquareIcon, PhoneCall } from "lucide-react";

const RightSideBar = ({ children }) => {
  const { singleContact } = useContactContext();

  return (
    <section>
      {singleContact && (
        <Sheet>
          <SheetTrigger asChild>{children}</SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-8">
              <div className="relative text-center">
                <img src={headerImage || ""} alt="" />
                <div
                  className="mx-auto drop-shadow-lg  w-20 h-20 rounded-full flex items-center justify-center mt-[-40px]"
                  style={{ background: "#E9F2FF" }}
                >
                  {singleContact.image ? (
                    <img
                      src={singleContact.image}
                      alt={`${singleContact.name} profile image`}
                      className="w-full h-full"
                    />
                  ) : (
                    <h3 className="text-blue text-3xl ">
                      {singleContact.name &&
                        singleContact.name[0].toUpperCase()}
                    </h3>
                  )}
                </div>
                <h2 className="text-lg font-semibold mt-4 capitalize">
                  {singleContact?.name}
                </h2>
                <span className="opacity-50">{singleContact.email}</span>
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
                        <h3>{singleContact.phoneNumber}</h3>
                      </div>
                      <a href={`tel:${singleContact.phoneNumber}`} className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]">
                        <PhoneCall className="size-4" />
                      </a>
                    </li>

                    <li className="profile-list text-start border-b">
                      <div>
                        <span className="opacity-50">Email</span>
                        <h3>{singleContact.email}</h3>
                      </div>
                      <a href={`mailto:${singleContact.email}`} className="flex justify-center items-center bg-green-500 text-white rounded w-[32px] h-[32px]">
                        <MessageSquareIcon className="size-4" />
                        
                      </a>
                    </li>
                    
                  </ul>
                </TabsContent>
                <TabsContent value="about">
                  <h2>About</h2>
                </TabsContent>
                <TabsContent></TabsContent>
              </Tabs>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      )}
    </section>
  );
};

export default RightSideBar;
