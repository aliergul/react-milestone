import { useDispatch } from "react-redux";
import { deleteToDo } from "../../../store/todoService/todoSlice";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

function DeleteModal({ isOpen, setIsOpen, selectedTodo }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id: selectedTodo ? selectedTodo.id : "",
  });
  const handleDelete = (id) => {
    if (id === "") {
      setState({ ...state });
    } else {
      dispatch(deleteToDo(selectedTodo));
      setIsOpen(false);
    }
  };
  console.log("delete selected todo: ", selectedTodo);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-black">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Description>Are you sure?</Dialog.Description>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default DeleteModal;
