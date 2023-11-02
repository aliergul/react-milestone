import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../../store/todoService/todoSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import i18n from "../../i18n/i18n";
import { Tooltip } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { db } from "../../firebase";
import { set, ref } from "firebase/database";

const AddTodo = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    content: "",
    snackbarSuccessOpen: false,
    snackbarFailOpen: false,
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSnackbarClose = () => {
    setState({ ...state, snackbarSuccessOpen: false, snackbarFailOpen: false });
  };

  const add = () => {
    if (content === "") {
      setState({ ...state });
      return;
    }
    dispatch(addToDo({ newContent: content }));

    const timestamp = new Date().getTime();
    const newTodoRef = ref(db, `todos/${timestamp}`);
    const newTodo = {
      content: content,
      status: false,
    };

    set(newTodoRef, newTodo)
      .then(() => {
        dispatch(addToDo({ newContent: content }));
        setState({ ...state, content: "", snackbarSuccessOpen: true });
      })
      .catch((error) => {
        setState({ ...state, snackbarFailOpen: true });
        console.error("Veri eklenirken hata oluştu:", error);
      });

    setState({ ...state, content: "" });
  };
  const { content, snackbarSuccessOpen, snackbarFailOpen } = state;

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="content"
        id="fullWidth"
        label={i18n.t("todo_page:placeholder")}
        variant="filled"
        color="primary"
        value={content}
        onChange={handleChange}
        sx={{ width: 1000 }}
      />
      <div className="ml-auto">
        <Tooltip title={i18n.t("tooltips:add")}>
          <IconButton onClick={add}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {i18n.t("snackbars:todo_add")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarFailOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {i18n.t("snackbars:todo_error")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTodo;
