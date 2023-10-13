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
  const [selectedId, setSelectedId] = useState(null);

  const handleEditTask = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const selectedTodo = todoList.find((todo) => todo.id === selectedId);
  return (
    <div className="text-black">
      {modalOpen && selectedTodo && (
        <EditModal
          isOpen={modalOpen}
          setIsOpen={closeModal}
          selectedTodo={selectedTodo}
        />
      )}
      <ul>
        {todoList.map(({ id, content }) => {
          return (
            <li key={id}>
              <span>{content}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleEditTask(id)}
              >
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
