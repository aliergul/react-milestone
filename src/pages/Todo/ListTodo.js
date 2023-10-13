import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditModal from "./TodoModals/EditModal";
import React, { useState } from "react";
import DeleteModal from "./TodoModals/DeleteModal";

const ListTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEditTask = (id) => {
    setSelectedId(id);
    setEditModalOpen(true);
  };
  const deleteModal = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const selectedTodo = todoList.find((todo) => todo.id === selectedId);
  console.log("list selected todo: ", selectedTodo);
  return (
    <div className="text-black">
      {editModalOpen && selectedTodo && (
        <EditModal
          isOpen={editModalOpen}
          setIsOpen={closeEditModal}
          selectedTodo={selectedTodo}
        />
      )}
      {
        <DeleteModal
          isOpen={deleteModalOpen}
          setIsOpen={closeDeleteModal}
          selectedTodo={selectedTodo}
        />
      }
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
              <span className="cursor-pointer" onClick={() => deleteModal(id)}>
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
