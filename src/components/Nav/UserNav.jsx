import { useContactContext } from "@/contexts/ContactsContext";
import { Mail, PhoneCall } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import deafultImage from '../../../public/default-user.png'

const UserNav = () => {
  const { id } = useParams();
  const { contacts, getSingleContact, singleContact } = useContactContext();

  useEffect(() => {
    if (contacts) {
      getSingleContact(id);
    }
  });

  return (
    <div className="border w-0 md:w-1/3 hidden md:block p-4 bg-gray-100">
      <div className="container border text-center pb-8 bg-white shadow rounded">
        <div className="m-auto w-16 h-16    ">
          <img src={singleContact?.image || deafultImage} alt="" className="w-full" />
        </div>
        <h2 className="text-lg font-semibold mt-4">{singleContact?.name}</h2>
        <div className="flex justify-between w-3/4 mx-auto my-2 text-gray-400">
          <PhoneCall className="size-6 hover:text-orange cursor-pointer" />
          |
          <Mail className="hover:text-orange cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
