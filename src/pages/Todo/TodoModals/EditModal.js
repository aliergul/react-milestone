import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { editToDo } from "../../../store/todoService/todoSlice";

function EditModal({ isOpen, setIsOpen, selectedTodo }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    content: selectedTodo ? selectedTodo.content : "",
  });
  const { content } = state;

  const handleEdit = (id) => {
    if (content === "") {
      setState({ ...state });
    } else {
      dispatch(editToDo({ id: selectedTodo.id, content: state.content }));
      setIsOpen(false);
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-black">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>Edit Task</Dialog.Title>
          <Dialog.Description>
            You cand edit the task you choose.
          </Dialog.Description>
          <input
            name="content"
            type="text"
            className="text-black"
            value={content}
            onChange={handleChange}
          />
          <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default EditModal;
