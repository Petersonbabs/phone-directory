import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditContactForm from '../forms/EditContactForm';

const EditContactModal = ({ cid, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={handleOpen}>
          {children}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Contact</AlertDialogTitle>
          <AlertDialogDescription>
            Please update the form below to edit the contact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <EditContactForm contactId={cid} onClose={handleClose} />
        <AlertDialogFooter>
          <button onClick={handleClose}>Cancel</button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditContactModal;
