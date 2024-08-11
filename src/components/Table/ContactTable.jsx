import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { EllipsisVertical, PhoneCallIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContactContext } from "@/contexts/ContactsContext";
import Modal from "../modal/AddContactModal";
import EditContactModal from "../modal/EditContactModal"; // Adjust the import path
import DeleteContactModal from "../modal/DeleteContactModal";
import RightSideBar from "../Nav/RightSideBar";

const UserListTable = () => {
  const { contacts, getContacts, getSingleContact } = useContactContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { deleteContact } = useContactContext();

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

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
    <main className="bg-white flex-1 overflow-auto">
      <h2 className="text-[#101828; text-lg my-4 fw-bold">
        CS Department Phone Directory
      </h2>

      <div className="flex gap-2 justify-between items-center mx-auto bg-white py-1 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded block"
        />
        <Modal />
      </div>
      {/* TABLE SECTION */}

      {!contacts ? (
        <div className="flex justify-center items-center py-20">
          <div className="spinner-grow " role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Table className="border rounded w-full ">
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
                <TableRow
                  key={index}
                  className="border-t-none contact-row w-auto"
                >
                  <RightSideBar>
                    <TableCell
                      className="flex align-center gap-4 hover:shadow"
                      onClick={() => {
                        getSingleContact(contact._id);
                      }}
                    >
                      <div className="flex gap-4 flex-wrap">
                        <div className="w-8 h-8 bg-[#E9F2FF] rounded-full flex items-center justify-center">
                          <h1>{contact.name[0].toUpperCase()}</h1>
                        </div>
                        <div>
                          <p className="capitalize font-semibold hover:text-orange">
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </RightSideBar>
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
                        <EditContactModal cid={contact._id}>
                          <p className="py-2 pl-2 mx-auto cursor-pointer hover:bg-defaultBadgeBg">
                            Edit
                          </p>
                        </EditContactModal>
                        <DeleteContactModal
                          handleDelete={() => {
                            deleteContact(contact._id);
                          }}
                        >
                          <p className="py-2 pl-2 mx-auto cursor-pointer hover:bg-defaultBadgeBg">
                            Delete
                          </p>
                        </DeleteContactModal>
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
      )}

      {/* PAGINATION SECTION */}
      <div className="flex items-center space-x-2 py-4 px-2 w-95 m-auto md:w-auto max-w-5xl justify-between">
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
    </main>
  );
};

export default UserListTable;
