import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditModal from "./TodoModals/EditModal";
import React, { useState, useContext, useEffect } from "react";
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
import i18n from "../../i18n/i18n";
import { db } from "../../firebase";
import { ref, onValue, update } from "firebase/database";
import moment from "moment";
import TablePagination from "@mui/material/TablePagination";

const ListTodo = () => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [todos, setTodos] = useState([]);
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  const { filteredTodoList } = useContext(FilterContext);

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

  const timestamp = (id) => {
    let time = id / 1000;
    return moment.unix(time).format("L HH:mm");
  };

  useEffect(() => {
    const todosRef = ref(db, "todos"); // Veritabanı referansını doğru bir şekilde alın

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoArray = Object.keys(data).map((key) => ({
          id: key,
          content: data[key].content,
          status: data[key].status,
        }));
        setTodos(todoArray);
      }
    });
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
        <DeleteModal
          isOpen={deleteModalOpen}
          setIsOpen={closeDeleteModal}
          selectedTodo={selectedTodo}
        />
      }
      <TableContainer component={Paper} sx={{ minWidth: 1200 }}>
        <Table aria-label="simple table">
          <TableBody>
            {(rowsPerPage > 0
              ? filteredTodoList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredTodoList
            ).map(({ id, content, status }) => (
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
                  <Tooltip title={i18n.t("tooltips:edit")}>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleEditTask(id)}
                    >
                      <EditNoteIcon className="mr-3" />
                    </span>
                  </Tooltip>
                  <Tooltip title={i18n.t("tooltips:delete")}>
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteModal(id)}
                    >
                      <DeleteIcon className="mr-3" />
                    </span>
                  </Tooltip>
                  <Tooltip title={i18n.t("tooltips:mark")}>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleMarkTodo(id)}
                    >
                      <PlaylistAddCheckIcon className="mr-3" />
                    </span>
                  </Tooltip>
                  <span>
                    {`${i18n.t("tooltips:schedule")} ${timestamp(id)}`}
                  </span>
                </TableCell>
              </TableRow>
            ))}
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListTodo;
