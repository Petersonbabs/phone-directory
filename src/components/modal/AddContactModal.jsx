import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import AddContactForm from "../forms/AddContactForm"; 
import { PlusIcon } from "lucide-react";
import { useState } from "react";
  
  const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button className="add-new-btn bg-orange text-white  text-sm rounded hover:bg-darkOrange flex align-center gap-2 h-fit py-2 px-4" onClick={handleOpen}>
            <PlusIcon className="size-6 sm:size-4 text-white" />
            <span className="hidden">Add New</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill out the form below to add a new contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {
            <AddContactForm onClose={handleClose}/>

          }
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default Modal;
  