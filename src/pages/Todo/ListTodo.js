import { useDispatch } from "react-redux";
import EditModal from "./TodoModals/EditModal";
import React, { useState, useContext, useEffect } from "react";
import DeleteModal from "./TodoModals/DeleteModal";
import { markToDo } from "../../store/todoService/todoSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FilterContext } from "./TodoFilter/FilterContext";
import i18n from "../../i18n/i18n";
import { db } from "../../firebase";
import { ref, update } from "firebase/database";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DraggableTodo from "./Drag&Drop/DraggableTodo";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ListTodo = () => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [todos, setTodos] = useState([]);
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  const { filteredTodoList, setFilteredTodoList } = useContext(FilterContext);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
    const todoRef = ref(db, `todos/${id}`);
    const todo = todos.find((todo) => todo.id === id);
    const updatedStatus = !todo.status;

    update(todoRef, { status: updatedStatus })
      .then(() => {
        const updatedTodos = todos.map((t) =>
          t.id === id ? { ...t, status: updatedStatus } : t
        );
        setTodos(updatedTodos);
        dispatch(markToDo({ id: id }));
      })
      .catch((error) => {
        console.error("Todo güncelleme hatası:", error);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
        <>
          <DeleteModal
            isOpen={deleteModalOpen}
            setIsOpen={closeDeleteModal}
            selectedTodo={selectedTodo}
          />
        </>
      }
      <DndProvider backend={HTML5Backend}>
        <TableContainer component={Paper} sx={{ minWidth: 1200 }}>
          <Table aria-label="simple table">
            <TableBody>
              {(rowsPerPage > 0
                ? filteredTodoList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredTodoList
              ).map(({ id, content, status }, index) => (
                <DraggableTodo
                  key={id}
                  index={index}
                  content={content}
                  status={status}
                  handleEditTask={handleEditTask}
                  deleteModal={deleteModal}
                  handleMarkTodo={handleMarkTodo}
                  todoArray={filteredTodoList}
                  setTodos={setFilteredTodoList}
                />
              ))}

              {showSkeleton ? (
                <Skeleton />
              ) : (
                <>
                  <TableRow>
                    <TablePagination
                      count={filteredTodoList.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage={i18n.t("todo_page:rows_per_page")}
                    />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DndProvider>
    </div>
  );
};
export default ListTodo;
