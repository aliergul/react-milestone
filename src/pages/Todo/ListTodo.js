import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditModal from "./TodoModals/EditModal";
import React, { useState, useContext } from "react";
import DeleteModal from "./TodoModals/DeleteModal";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { markToDo } from "../../store/todoService/todoSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import { FilterContext } from "./TodoFilter/FilterContext";

const ListTodo = () => {
  const dispatch = useDispatch();
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
  const handleMarkTodo = (id) => {
    setSelectedId(id);
    dispatch(markToDo({ id }));
  };
  const selectedTodo = todoList.find((todo) => todo.id === selectedId);

  const { filteredTodoList } = useContext(FilterContext);
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
      <TableContainer component={Paper} sx={{ minWidth: 1200 }}>
        <Table aria-label="simple table">
          <TableBody>
            {filteredTodoList &&
              filteredTodoList.map(({ id, content, status }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="hover:bg-main hover:bg-opacity-30"
                >
                  <TableCell component="th" scope="row">
                    {status === true ? (
                      <span className="line-through">{content}</span>
                    ) : (
                      <span>{content}</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleEditTask(id)}
                      >
                        <EditNoteIcon />
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <span
                        className="cursor-pointer"
                        onClick={() => deleteModal(id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                    <Tooltip title="Check">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleMarkTodo(id)}
                      >
                        <PlaylistAddCheckIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListTodo;
