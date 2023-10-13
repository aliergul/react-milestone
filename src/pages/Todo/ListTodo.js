import { useDispatch, useSelector } from "react-redux";
import { deleteToDo } from "../../store/todoService/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditModal from "./TodoModals/EditModal";
import React, { useState } from "react";

const ListTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditTask = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="text-black">
      {modalOpen && <EditModal isOpen={modalOpen} setIsOpen={closeModal} />}
      <ul>
        {todoList.map(({ id, content }) => {
          return (
            <li key={id}>
              <span>{content}</span>
              <span className="cursor-pointer" onClick={handleEditTask}>
                <EditNoteIcon />
              </span>
              <span onClick={() => dispatch(deleteToDo({ id }))}>
                <DeleteIcon />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ListTodo;
