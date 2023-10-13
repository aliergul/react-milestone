import React, { useMemo } from "react";
import { Dialog } from "@headlessui/react";

function EditModal({ isOpen, setIsOpen }) {
  const handleDeactivate = () => {
    // Deactivate logic here
    setIsOpen(false);
  };
  return useMemo(
    () => (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-black">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <Dialog.Title>Deactivate account</Dialog.Title>{" "}
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <button onClick={handleDeactivate}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    ),
    // eslint-disable-next-line
    [isOpen, setIsOpen]
  );
}
export default EditModal;
