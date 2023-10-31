import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../../store/todoService/todoSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import i18n from "../../i18n/i18n";
import { Tooltip } from "@mui/material";

const AddTodo = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    content: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const add = () => {
    if (content === "") {
      setState({ ...state });
      return;
    }
    dispatch(addToDo({ newContent: content }));
    setState({ ...state, content: "" });
  };
  const { content } = state;

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
    </Box>
  );
};

export default AddTodo;
