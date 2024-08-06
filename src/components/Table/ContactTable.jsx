import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PlusCircle, EllipsisVertical, PhoneCallIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContactContext } from "@/contexts/ContactsContext";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal"; 
import deafultImage from "../../../public/default-user.png"

const UserListTable = ({ deleteContact, editContact }) => {
  const { contacts } = useContactContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredContacts =
    contacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const totalContacts = filteredContacts.length;
  const totalPages = Math.ceil(totalContacts / pageSize);
  const displayedContacts = filteredContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white p-4">
      <div
        className="flex justify-between align-center m-auto bg-white py-1 mb-8"
        style={{ width: "96%" }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <Modal />
      </div>
      {/* TABLE SECTION */}
      <Table>
        <TableHeader className="bg-tableHeadBg border-none">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Call</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedContacts.length > 0 ? (
            displayedContacts.map((contact, index) => (
              <TableRow key={index} className="border-t-none contact-row">
                <TableCell className="flex align-center gap-4 hover:shadow">
                  <Link to={`/${contact.id}`}>
                    <div className="w-10 h-10">
                      <img
                        src={contact.image || deafultImage}
                        alt={contact.name}
                        className="w-full rounded-full"
                      />
                    </div>
                    <div>
                      <p className="capitalize font-semibold hover:text-orange">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>
                  <a href={`tel:${contact.phoneNumber}`}>
                    <PhoneCallIcon className="size-4 hover:text-orange transition-all call-icon" />
                  </a>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-defaultPrimary flex gap-3 hover:bg-defaultPrimaryHover">
                        <EllipsisVertical className="text-black" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <p
                        onClick={() => editContact(contact.id)}
                        className="py-2 pl-2 mx-auto cursor-pointer hover:bg-defaultBadgeBg"
                      >
                        Edit
                      </p>
                      <p
                        onClick={() => deleteContact(contact.id)}
                        className="py-2 pl-2 mx-auto cursor-pointer hover:bg-defaultBadgeBg"
                      >
                        Delete
                      </p>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-60 text-lg text-gray-400 mt-8 border text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* PAGINATION SECTION */}
      <div className="flex items-center space-x-2 py-4 w-95 m-auto max-w-5xl justify-between">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
