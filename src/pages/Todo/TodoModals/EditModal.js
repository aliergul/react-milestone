import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { editToDo } from "../../../store/todoService/todoSlice";
import { ref, update } from "firebase/database";
import { db } from "../../../firebase";
import i18n from "../../../i18n/i18n";

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
      const todoRef = ref(db, `todos/${selectedTodo.id}`);
      const updates = {
        content: state.content,
      };
      update(todoRef, updates)
        .then(() => {
          dispatch(editToDo({ id: selectedTodo.id, content: state.content }));
          setIsOpen(false);
        })
        .catch((error) => {
          console.error("Todo güncelleme hatası:", error);
        });
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >
              <Dialog.Panel className="grid gap-y-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                >
                  {i18n.t("todo_page:edit")}
                </Dialog.Title>
                <input
                  name="content"
                  type="text"
                  className="text-black"
                  value={content}
                  onChange={handleChange}
                />
                <div className="grid gap-y-3">
                  <button
                    onClick={() => handleEdit()}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    {i18n.t("buttons:apply")}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    {i18n.t("buttons:cancel")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default EditModal;
